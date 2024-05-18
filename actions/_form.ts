'use server';

import { env } from '@/config/env';
import {
  compareByType,
  getLatestId,
  getSchema,
  mutateRawData,
  transformObject,
} from '@/lib/form';
import { formData1, formData2, formData3, formData4 } from '@/lib/mock-data';
import { conn, queries } from '@/lib/mysql';
import { capitalizeEachWord } from '@/lib/utils';
import { FieldValues } from 'react-hook-form';
import { z } from 'zod';

const FIRST_TABLE = 'feminicidios_tentativas';
const SECOND_TABLE = 'feminicidios_violencia_asociada';

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

// Inserting a new register into the database
export async function postFormData(data: FieldValues) {
  try {
    // Getting the form schema
    const formData = await getFormData();
    const formSchema: z.Schema = getSchema(formData);

    // Validating the data against the zod schema
    const validationResult = formSchema.safeParse(data);

    // Validating wether the data has the correct values
    if (validationResult.success) {
      // Separating the data as required
      const { cod_violencia_asociada, violencia_asociada, ...firstData } = data;
      const secondData = { cod_violencia_asociada, violencia_asociada };
      console.log('ACT form firstData ::: ', firstData);
      console.log('ACT form secondData ::: ', secondData);

      // Getting the neccessary queries
      const firstQuery = queries.post.registry(FIRST_TABLE, firstData);
      console.log('ACT form firstQuery ::: ', firstQuery);
      const secondQuery = queries.post.registry(SECOND_TABLE, secondData);
      console.log('ACT form secondQuery ::: ', secondQuery);

      // Handling the environments to test with mocked data if we are in the dev environment
      if (env.ENV !== 'dev') {
        let result = await conn
          .transaction()
          .query(firstQuery)
          .query((r: { insertId: number }) =>
            queries.post.registry(SECOND_TABLE, {
              numero_violencia: r.insertId,
              ...secondData,
            }),
          )
          .commit();

        console.log('ACT form result ::: ', result);

        return {
          success: true,
          errors: null,
          result,
        };
      } else {
        return {
          success: true,
          errors: null,
          result: {
            firstQuery,
            secondQuery,
          },
        };
      }
    } else {
      throw new Error(validationResult.error.message);
    }
  } catch (error) {
    const errorMessage =
      typeof error === 'string'
        ? error
        : error instanceof Error
          ? error.message
          : 'Error Unknown';

    console.log('Database Error: ', errorMessage);
    throw new Error('Error al insertar el registro en la base de datos');
  }
}

// Adding a new option list
export async function putListOption(data: OptionIntoList) {
  try {
    // Getting the form schema
    const dataSchema: z.Schema = z.object({
      id: z.string().trim().min(1, { message: `id no puede estar vacío` }),
      value: z
        .string()
        .trim()
        .min(1, { message: `value no puede estar vacío` }),
    });

    // Validating the data against the zod schema
    const validationResult = dataSchema.safeParse(data);

    if (validationResult.success) {
      // Handling the environments to test with mocked data if we are in the dev environment
      if (env.ENV !== 'dev') {
        // Query to extract the latest id from the reference table
        const firstQuery = queries.get.lastestIdFromList(data.id);
        const firstResponse: Array<DBResponse> = await conn.query(firstQuery);
        const newId = getLatestId(firstResponse[0]) + 1;

        // Query to insert the new item in the reference table
        const secondQuery = queries.put.listOption(
          data.id,
          newId,
          capitalizeEachWord(data.value),
        );
        const response2 = await conn.query(secondQuery);

        return {
          success: true,
          errors: null,
          result: response2,
        };
      } else {
        return {
          success: true,
          errors: null,
          result: {
            data,
          },
        };
      }
    } else {
      throw new Error(validationResult.error.message);
    }
  } catch (error) {
    const errorMessage =
      typeof error === 'string'
        ? error
        : error instanceof Error
          ? error.message
          : 'Error Unknown';

    console.log('Database Error: ', errorMessage);
    throw new Error('Error al insertar el registro en la base de datos');
  }
}
