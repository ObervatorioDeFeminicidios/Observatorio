'use server';

import { initialFilters } from '@/components/table/columns';
import { env } from '@/config/env';
import {
  OkPacket,
  Register,
  TotalRecordsResult,
} from '@/lib/definitions';
import {
  compareByType,
  getLatestId,
  mutateRawData,
  reorganizeData,
  transformObject,
} from '@/lib/form';
import { formData1, formData2, formData3, formData4 } from '@/lib/mock-data';
import { conn, queries } from '@/lib/mysql';
import { capitalizeEachWord } from '@/lib/utils';
import {
  DataBaseField,
  DBResponse,
  TableFilters,
  MunicipalityPostalCodeType,
  OptionField,
  OptionIntoList,
  TransformedObject,
} from '@/types';
import { unstable_noStore as noStore } from 'next/cache';
import { z } from 'zod';
import * as Sentry from '@sentry/nextjs';

// Getting the form fields from the database schema
export async function getFormData() {
  try {
    let stepOne: TransformedObject[] = [];
    let stepTwo: TransformedObject[] = [];
    let stepThree: TransformedObject[] = [];
    let stepFour: TransformedObject[] = [];

    // Handling the environments to test with mocked data if we are in the dev environment
    if (env.ENV !== 'dev') {
      // Getting the data from the database
      const stepOneResponse = await conn.query<DataBaseField[]>(
        queries.get.stepOne,
      );
      const stepTwoResponse = await conn.query<DataBaseField[]>(
        queries.get.stepTwo,
      );
      const stepThreeResponse = await conn.query<DataBaseField[]>(
        queries.get.stepThree,
      );
      const stepFourResponse = await conn.query<DataBaseField[]>(
        queries.get.stepFour,
      );
      const municipality = await conn.query<MunicipalityPostalCodeType[]>(
        queries.get.municipality,
      );
      const postalCode = await conn.query<MunicipalityPostalCodeType[]>(
        queries.get.postalCode,
      );

      // Close the connection
      await conn.end();

      // Mutated the reponses so we get the correct type
      const stepOneMutated = mutateRawData(stepOneResponse);
      const stepTwoMutated = mutateRawData(stepTwoResponse);
      const stepThreeMutated = mutateRawData(stepThreeResponse);
      const stepFourMutated = mutateRawData(stepFourResponse);

      // Transformed the objects so we get the correct list of options
      stepOne = transformObject(stepOneMutated);
      stepTwo = transformObject(stepTwoMutated);
      stepThree = transformObject(stepThreeMutated);
      stepFour = transformObject(stepFourMutated);

      // Adding data to the municipality and postal code columns
      if (municipality.length > 0 && postalCode.length > 0) {
        stepTwo = stepTwo.map((field) => {
          if (field.id === 'municipio') {
            const options: OptionField[] = municipality.map((item) => ({
              ...item,
              value: Number(item.value),
            }));

            return {
              ...field,
              options,
            };
          }

          if (field.id === 'postal') {
            const options: OptionField[] = postalCode.map((item) => ({
              ...item,
              value: Number(item.value),
            }));

            return {
              ...field,
              options,
            };
          }

          return field;
        });
      }
    } else {
      stepOne = formData1;
      stepTwo = formData2;
      stepThree = formData3;
      stepFour = formData4;
    }

    // Adding the necessary info of the each step
    const formData = [
      {
        id: 1,
        name: 'Información del Feminicidio',
        fields: stepTwo.sort(compareByType),
      },
      {
        id: 2,
        name: 'Información de la Víctima',
        fields: stepOne.sort(compareByType),
      },
      {
        id: 3,
        name: 'Información del Agresor',
        fields: stepThree.sort(compareByType),
      },
      {
        id: 4,
        name: 'Información Adicional',
        fields: reorganizeData(stepFour.sort(compareByType)),
      },
    ];

    // Return the result in JSON format
    return formData;
  } catch (error) {
    const errorMessage =
      typeof error === 'string'
        ? error
        : error instanceof Error
          ? error.message
          : 'Error Unknown';

    Sentry.captureException(new Error(errorMessage), {
      extra: {
        context: 'Database error while trying to get the form data',
      },
    });

    throw new Error(errorMessage);
  }
}

// Adding a new option list
export async function putListOption(data: OptionIntoList) {
  // Getting the form schema
  const dataSchema: z.Schema = z.object({
    id: z.string().trim().min(1, { message: `id no puede estar vacío` }),
    value: z.string().trim().min(1, { message: `value no puede estar vacío` }),
  });

  // Validating the data against the zod schema
  const validationResult = dataSchema.safeParse(data);
  console.log('putListOption validationResult ::: ', validationResult);

  if (validationResult.success) {
    // Query to extract the latest id from the reference table
    const firstQuery = queries.get.lastestIdFromList(data.id);
    console.log('putListOption firstQuery ::: ', firstQuery);

    // Handling the environments to test with mocked data if we are in the dev environment
    if (env.ENV !== 'dev') {
      try {
        // Start the transaction
        await conn.query('START TRANSACTION');

        // Get the latest Id to set it to the new option list
        const firstResult: Array<DBResponse> = await conn.query(firstQuery);
        const newId = getLatestId(firstResult[0]) + 1;
        const newLabel = capitalizeEachWord(data.value);
        console.log('putListOption firstResult ::: ', firstResult);
        console.log('putListOption newId ::: ', newId);
        console.log('putListOption newLabel ::: ', newLabel);

        // Query to insert the new item in the reference table
        const secondQuery = queries.put.listOption(data.id, newId, newLabel);
        console.log('putListOption secondQuery ::: ', secondQuery);
        const secondResult: OkPacket = await conn.query(secondQuery);
        console.log('putListOption secondResult ::: ', secondResult);

        // Commit the transaction if all inserts succeeded
        await conn.query('COMMIT');

        if (secondResult.affectedRows === 1) {
          return {
            success: true,
            errors: null,
            result: {
              value: newId,
              label: newLabel,
            },
          };
        } else {
          const errorMessage = 'Un error ocurrió al insertar la nueva opción';
          Sentry.captureException(new Error(errorMessage), {
            extra: {
              context:
                'Database error while trying to insert the new option',
              query: queries.put.listOption(data.id, newId, newLabel),
            },
          });

          return {
            success: false,
            errors: errorMessage,
          };
        }
      } catch (error) {
        // Rollback the transaction on any error
        await conn.query('ROLLBACK');

        // Setting the right error message
        const errorMessage =
          typeof error === 'string'
            ? error
            : error instanceof Error
              ? error.message
              : 'Error Unknown';

        Sentry.captureException(new Error(errorMessage), {
          extra: {
            context: 'Database error while trying to insert the new option',
          },
        });

        return {
          success: false,
          errors: errorMessage,
        };
      } finally {
        // Close the connection
        await conn.end();
      }
    } else {
      return {
        success: true,
        errors: null,
      };
    }
  } else {
    Sentry.captureException(new Error(validationResult.error.message), {
      extra: {
        context: 'Validation error while trying to insert the new option',
      },
    });

    return {
      success: false,
      errors: validationResult.error.message,
    };
  }
}

// Getting the table filters
export async function fetchSelectFilters() {
  try {
    // Start the transaction
    await conn.query('START TRANSACTION');

    const filtersResponse = await conn.query<any>(
      queries.get.selectFilters(),
    );

    // Commit the transaction if successful
    await conn.query('COMMIT');

    // Mutated the reponse so we get the correct type
    const filtersMutated = mutateRawData(filtersResponse);

    // Transformed the objects so we get the correct list of options
    const filters = transformObject(filtersMutated);

    // Return the data
    return {
      success: true,
      results: filters
    };
  } catch (error) {
    // Rollback the transaction on any error
    await conn.query('ROLLBACK');

    const errorMessage =
      typeof error === 'string'
        ? error
        : error instanceof Error
          ? error.message
          : 'Error Unknown';

    Sentry.captureException(new Error(errorMessage), {
      extra: {
        context:
          'Database error while trying to get the table filters',
        query: queries.get.selectFilters(),
      },
    });

    return {
      success: false,
      errors: 'Error al traer los filtros de la tabla',
    };
  } finally {
    // Close the connection
    await conn.end();
  }
}

// Getting the data registered in the database with filters
export async function fetchRegisters(filters: TableFilters) {
  noStore();

  const {
    pageIndex = initialFilters.pageIndex,
    pageSize = initialFilters.pageSize,
    columnFilters,
  } = filters;

  try {
    // Start the transaction
    await conn.query('START TRANSACTION');

    const offset = pageIndex * pageSize;

    // Calculate the pagination info
    const totalRecordsResult = await conn.query<TotalRecordsResult[]>(
      queries.get.totalRegisters({ ...filters, offset }),
    );
    const totalRecords = totalRecordsResult[0]?.totalRecords;
    const totalPages = Math.ceil(totalRecords / pageSize);

    // Get the registers from the database
    const paginatedRegistersData = await conn.query<Register[]>(
      queries.get.registers({ ...filters, offset }),
    );

    // Commit the transaction if successful
    await conn.query('COMMIT');

    // If you're fetching from MySQL or another database, make sure it's plain data
    const plainPaginatedRegistersData = paginatedRegistersData?.map((row) => ({
      ...row,
    }));

    // Return the data
    return {
      success: true,
      pageIndex,
      pageSize,
      totalRecords,
      totalPages,
      columnFilters,
      results: plainPaginatedRegistersData || [],
    };
  } catch (error) {
    // Rollback the transaction on any error
    await conn.query('ROLLBACK');

    const errorMessage =
      typeof error === 'string'
        ? error
        : error instanceof Error
          ? error.message
          : 'Error Unknown';

    Sentry.captureException(new Error(errorMessage), {
      extra: {
        context:
          'Database error while trying to get the registers',
        pageIndex,
        pageSize,
        columnFilters,
      },
    });

    return {
      success: false,
      errors: 'Error al traer los registros de la base de datos',
    };
  } finally {
    // Close the connection
    await conn.end();
  }
}

// Get a single register data
export async function fetchRegister(id: string) {
  noStore();

  if (!id) {
    return {
      success: false,
      errors: 'El ID es requerido',
    };
  }

  try {
    // Start the transaction
    await conn.query('START TRANSACTION');

    // Query to obtain the record based on the id (numero_violencia)
    const recordData = await conn.query<Register[]>(
      queries.get.register(id),
    );

    // Query to obtain the associated violence records based on the id (numero_violencia)
    const associatedViolenceData = await conn.query<any[]>(
      queries.get.associatedViolences(id),
    );

    // Commit the transaction if successful
    await conn.query('COMMIT');

    // If you're fetching from MySQL or another database, make sure it's plain data
    const plainRecordData = recordData?.map((row) => ({
      ...row,
      fecha_violencia: (row['fecha_violencia'] as unknown as Date)?.toISOString()?.split('T')[0],
    }));
    const plainAssociatedViolenceData = associatedViolenceData?.map((row) => ({
      value: row.cod_violencia_asociada.toString(),
      label: row.violencia_asociada,
    }));

    // Return the data
    return {
      success: true,
      results: {
        ...plainRecordData[0],
        violencia_asociada: plainAssociatedViolenceData
      },
    };
  } catch (error) {
    // Rollback the transaction on any error
    await conn.query('ROLLBACK');

    const errorMessage =
      typeof error === 'string'
        ? error
        : error instanceof Error
          ? error.message
          : 'Error Unknown';

    Sentry.captureException(new Error(errorMessage), {
      extra: {
        context:
          'Database error while trying to get the register by id',
        registerQuery: queries.get.register(id),
        associatedViolenceQuery: queries.get.associatedViolences(id),
      },
    });

    return {
      success: false,
      errors: 'Error al traer el registro de la base de datos',
    };
  } finally {
    // Close the connection
    await conn.end();
  }
}
