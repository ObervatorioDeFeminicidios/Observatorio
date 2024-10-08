'use server';

import { env } from '@/config/env';
import { InsertDataResult, OkPacket, Register } from '@/lib/definitions';
import {
  FIRST_TABLE,
  SECOND_TABLE,
  compareByType,
  getLatestId,
  getSchema,
  mutateRawData,
  transformObject,
} from '@/lib/form';
import { formData1, formData2, formData3, formData4 } from '@/lib/mock-data';
import { conn, queries } from '@/lib/mysql';
import { capitalizeEachWord } from '@/lib/utils';
import { unstable_noStore as noStore } from 'next/cache';
import { FieldValues } from 'react-hook-form';
import { z } from 'zod';

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
            const options: Option[] = municipality.map((item) => ({
              ...item,
              value: Number(item.value),
            }));

            return {
              ...field,
              options,
            };
          }

          if (field.id === 'postal') {
            const options: Option[] = postalCode.map((item) => ({
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
        name: 'Información de la Víctima',
        fields: stepOne.sort(compareByType),
      },
      {
        id: 2,
        name: 'Información del Feminicidio',
        fields: stepTwo.sort(compareByType),
      },
      {
        id: 3,
        name: 'Información del Agresor',
        fields: stepThree.sort(compareByType),
      },
      {
        id: 4,
        name: 'Información Adicional',
        fields: stepFour.sort(compareByType),
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

    console.log('Database Error: ', errorMessage);
    throw new Error('Error al cargar el formulario');
  }
}

// This server function is unused -> Moved to API routes
// Inserting a new register into the database
export async function postRegister(
  data: FieldValues,
): Promise<InsertDataResult> {
  // Getting the form schema
  const formData = await getFormData();
  const formSchema: z.Schema = getSchema(formData);

  // Validating the data against the zod schema
  const validationResult = formSchema.safeParse(data);

  // Validating wether the data has the correct values
  if (validationResult.success) {
    // Separating the data as required
    const { violencia_asociada, ...registerData } = data;
    const associatedViolences: Array<Option> = violencia_asociada;
    console.log('postFormData registerData ::: ', registerData);
    console.log('postFormData associatedViolences ::: ', associatedViolences);

    // Getting the neccessary queries
    const firstQuery = queries.post.registry(FIRST_TABLE, registerData);
    console.log('postFormData firstQuery ::: ', firstQuery);

    // Handling the environments to test with mocked data if we are in the dev environment
    if (env.ENV !== 'dev') {
      const db = await conn.connect();
      console.log('postFormData db ::: ', db);

      try {
        // Start the transaction
        await conn.query('START TRANSACTION');

        // Insert the first record
        const firstResult: OkPacket = await conn.query(firstQuery);
        console.log('postFormData firstResult ::: ', firstResult);

        if (firstResult.affectedRows > 0 && firstResult.insertId) {
          // Insert multiple associated violences
          const associatedViolencesPromises = associatedViolences.map(
            async (associatedViolence) => {
              try {
                const result = (await conn.query(
                  queries.post.registry(SECOND_TABLE, {
                    numero_violencia: firstResult.insertId,
                    cod_violencia_asociada: associatedViolence.value,
                    violencia_asociada: associatedViolence.label,
                  }),
                )) as OkPacket;
                return result;
              } catch (error) {
                // Setting the right error message
                const errorMessage =
                  typeof error === 'string'
                    ? error
                    : error instanceof Error
                      ? error.message
                      : 'Error Unknown';

                console.error(
                  'Database associated violence Error: ',
                  errorMessage,
                );

                return {
                  error: errorMessage,
                  associatedViolence,
                };
              }
            },
          );

          const associatedViolencesResults = await Promise.all(
            associatedViolencesPromises,
          );
          console.log(
            'postFormData associatedViolencesResults ::: ',
            associatedViolencesResults,
          );

          // Check for errors in the associated violences insertions
          const failedInserts = associatedViolencesResults.filter(
            (result) => result?.error,
          );
          console.log('postFormData failedInserts ::: ', failedInserts);

          if (failedInserts.length > 0) {
            // Rollback the transaction if any insert failed
            await conn.query('ROLLBACK');
            return {
              success: false,
              errors: failedInserts.map((failed) => ({
                associatedViolence: failed?.associatedViolence,
                error: failed?.error,
              })),
            };
          }

          // Commit the transaction if all inserts succeeded
          await conn.query('COMMIT');
          return {
            success: true,
            message:
              'Se insertó el registro y las violencias asociadas exitosamente',
          };
        } else {
          // Rollback the transaction if the first insert failed
          await conn.query('ROLLBACK');
          return {
            success: false,
            errors:
              'Se produjo un error al intentar insertar un registro en la base de datos',
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

        console.error('Database Error: ', errorMessage);

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
        result: {
          firstQuery,
        },
      };
    }
  } else {
    console.error(
      'postFormData failed validation result ::: ',
      validationResult.error.message,
    );
    throw new Error(validationResult.error.message);
  }
}

// Adding a new option list
export async function putListOption(data: OptionIntoList) {
  console.log('putListOption data ::: ', data);
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
          throw new Error('Un error ocurrió al insertar la nueva opción');
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

        console.log('putListOption errorMessage ::: ', errorMessage);

        return {
          success: false,
          errors: errorMessage,
        };
      } finally {
        // Close the connection
        await conn.end();
      }
    } else {
      console.log('putListOption env !== dev');
      return {
        success: true,
        errors: null,
      };
    }
  } else {
    console.log(
      'putListOption validationResult.error.message ::: ',
      validationResult.error.message,
    );
    return {
      success: false,
      errors: validationResult.error.message,
    };
  }
}

// Getting the data registered in the database
export async function fetchRegisters() {
  noStore();
  try {
    // Start the transaction
    await conn.query('START TRANSACTION');

    const registersData = await conn.query<Register[]>(queries.get.registers);

    // Return the data
    return JSON.parse(JSON.stringify(registersData));
  } catch (error) {
    // Rollback the transaction on any error
    await conn.query('ROLLBACK');

    const errorMessage =
      typeof error === 'string'
        ? error
        : error instanceof Error
          ? error.message
          : 'Error Unknown';

    console.log('Database Error: ', errorMessage);
    return {
      success: false,
      errors: 'Error al traer los registros de la base de datos',
    };
  } finally {
    // Close the connection
    await conn.end();
  }
}
