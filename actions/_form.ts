'use server';

import { transformObject } from '@/app/utils/transform-object';
import { env } from '@/config/env';
import { formData1, formData2, formData3, formData4 } from '@/lib/mock-data';
import { conn, queries } from '@/lib/mysql';

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
        type: field.options !== null ? 'select' : field.type,
      }));
      const stepTwoMutated: DataBaseField[] = stepTwoReponse.map((field) => ({
        ...field,
        type: field.options !== null ? 'select' : field.type,
      }));
      const stepThreeMutated: DataBaseField[] = stepThreeReponse.map(
        (field) => ({
          ...field,
          type: field.options !== null ? 'select' : field.type,
        }),
      );
      const stepFourMutated: DataBaseField[] = stepFourReponse.map((field) => ({
        ...field,
        type: field.options !== null ? 'select' : field.type,
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
        fields: stepOne,
      },
      {
        id: 2,
        name: 'Información del Feminicidio',
        fields: stepTwo,
      },
      {
        id: 3,
        name: 'Información del Agresor',
        fields: stepThree,
      },
      {
        id: 4,
        name: 'Información Adicional',
        fields: stepFour,
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
