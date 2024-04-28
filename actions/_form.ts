'use server';

import {
  capitalizeEachWord,
  compareByType,
  getLatestId,
  transformObject,
} from '@/app/utils/transform-object';
import { env } from '@/config/env';
import { getSchema } from '@/lib/form';
import { formData1, formData2, formData3, formData4 } from '@/lib/mock-data';
import { conn, queries } from '@/lib/mysql';
import { FieldValues } from 'react-hook-form';
import { z } from 'zod';

export async function getFormData() {
  try {
    let stepOne: TransformedObject[] = [];
    let stepTwo: TransformedObject[] = [];
    let stepThree: TransformedObject[] = [];
    let stepFour: TransformedObject[] = [];

    // Handling the environments to test with mocked data if we are in the dev environment
    if (env.ENV !== 'dev') {
      // Getting the data from the database
      const stepOneReponse = await conn.query<DataBaseField[]>(
        queries.get.stepOne,
      );
      const stepTwoReponse = await conn.query<DataBaseField[]>(
        queries.get.stepTwo,
      );
      const stepThreeReponse = await conn.query<DataBaseField[]>(
        queries.get.stepThree,
      );
      const stepFourReponse = await conn.query<DataBaseField[]>(
        queries.get.stepFour,
      );

      // Mutated the reponses so we get the correct type
      const stepOneMutated: DataBaseField[] = stepOneReponse.map((field) => ({
        ...field,
        type: !!field?.options ? 'select' : field.type,
      }));
      const stepTwoMutated: DataBaseField[] = stepTwoReponse.map((field) => ({
        ...field,
        type: !!field?.options ? 'select' : field.type,
      }));
      const stepThreeMutated: DataBaseField[] = stepThreeReponse.map(
        (field) => ({
          ...field,
          type: !!field?.options ? 'select' : field.type,
        }),
      );
      const stepFourMutated: DataBaseField[] = stepFourReponse.map((field) => ({
        ...field,
        type: !!field?.options ? 'select' : field.type,
      }));

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

export async function postFormData(data: FieldValues) {
  try {
    // Getting the form schema
    const formData = await getFormData();
    const formSchema: z.Schema = getSchema(formData);

    // Validating the data against the zod schema
    const validationResult = formSchema.safeParse(data);

    const firstQuery = queries.post.registry('feminicidios_tentativas', data);

    const secondData = {
      cod_violencia_asociada: 27,
      violencia_asociada: 'Sin información',
    };
    const secondQuery = queries.post.registry(
      'feminicidios_violencia_asociada',
      secondData,
    );

    if (validationResult.success) {
      // Handling the environments to test with mocked data if we are in the dev environment
      if (env.ENV !== 'dev') {
        const firstResponse = await conn.query(firstQuery);
        const secondResponse = await conn.query(secondQuery);
        return {
          success: true,
          errors: null,
          result: secondResponse,
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

    // Query to extract the latest id from the reference table
    const firstQuery = queries.get.lastestIdFromList(data.id);
    // Query to insert the new item in the reference table
    const secondQuery = queries.put.listOption(
      data.id,
      16,
      capitalizeEachWord(data.value),
    );

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
