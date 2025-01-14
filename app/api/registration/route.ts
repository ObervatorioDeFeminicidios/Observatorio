import { getFormData } from '@/actions/_form';
import { env } from '@/config/env';
import { OkPacket } from '@/lib/definitions';
import { FIRST_TABLE, getSchema, SECOND_TABLE } from '@/lib/form';
import { conn, queries } from '@/lib/mysql';
import { OptionField } from '@/types';
import * as Sentry from '@sentry/nextjs';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Inserting a new register into the database
export async function POST(request: Request) {
  const data = await request.json();

  // Getting the form schema
  const formData = await getFormData();
  const formSchema: z.Schema = getSchema(formData);

  // Validating the data against the zod schema
  const validationResult = formSchema.safeParse(data);

  // Validating wether the data has the correct values
  if (validationResult.success) {
    // Separating the data as required
    const { violencia_asociada, ...registerData } = data;
    const associatedViolences: Array<OptionField> = violencia_asociada;
    console.log('POST registerData ::: ', registerData);
    console.log('POST associatedViolences ::: ', associatedViolences);

    // Getting the neccessary queries
    const firstQuery = queries.post.registry(FIRST_TABLE, registerData);
    console.log('POST firstQuery ::: ', firstQuery);

    // Handling the environments to test with mocked data if we are in the dev environment
    if (env.ENV !== 'dev') {
      const db = await conn.connect();

      try {
        // Start the transaction
        await conn.query('START TRANSACTION');

        // Insert the first record
        const firstResult: OkPacket = await conn.query(firstQuery);
        console.log('POST firstResult ::: ', firstResult);

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

                // Log the validation error to Sentry
                Sentry.captureException(new Error(errorMessage), {
                  extra: {
                    context:
                      'Database error while trying to insert the associated violences',
                    requestBody: data,
                    associatedViolence,
                  },
                });

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
            'POST associatedViolencesResults ::: ',
            associatedViolencesResults,
          );

          // Check for errors in the associated violences insertions
          const failedInserts = associatedViolencesResults.filter(
            (result) => result?.error,
          );
          console.log('POST failedInserts ::: ', failedInserts);

          if (failedInserts.length > 0) {
            // Rollback the transaction if any insert failed
            await conn.query('ROLLBACK');

            // Log the validation error to Sentry
            Sentry.captureException(
              new Error(
                'Database error while trying to insert the associated violences',
              ),
              {
                extra: {
                  context:
                    'Database error while trying to insert the associated violences',
                  requestBody: data,
                  errors: failedInserts.map((failed) => ({
                    associatedViolence: failed?.associatedViolence,
                    error: failed?.error,
                  })),
                },
              },
            );

            return NextResponse.json({
              success: false,
              errorMessage:
                'Algo ocurrió al insertar el registro en la base de datos',
              errors: failedInserts.map((failed) => ({
                associatedViolence: failed?.associatedViolence,
                error: failed?.error,
              })),
            });
          }

          // Commit the transaction if all inserts succeeded
          await conn.query('COMMIT');

          return NextResponse.json({
            success: true,
            message:
              'Se insertó el registro y las violencias asociadas exitosamente',
            data,
            insertId: firstResult.insertId,
          });
        } else {
          // Rollback the transaction if the first insert failed
          await conn.query('ROLLBACK');

          // Log the validation error to Sentry
          Sentry.captureException(
            new Error('Database error while trying to insert the register'),
            {
              extra: {
                context: 'Database error while trying to insert the register',
                requestBody: data,
              },
            },
          );

          return NextResponse.json({
            success: false,
            errorMessage:
              'Se produjo un error al intentar insertar un registro en la base de datos',
          });
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

        // Log the validation error to Sentry
        Sentry.captureException(new Error(errorMessage), {
          extra: {
            context: 'Database error while trying to insert the register',
            requestBody: data,
          },
        });

        return NextResponse.json({
          success: false,
          errorMessage,
        });
      } finally {
        // Close the connection
        await conn.end();
      }
    } else {
      return NextResponse.json({
        success: true,
        result: {
          firstQuery,
        },
      });
    }
  } else {
    // Log the validation error to Sentry
    Sentry.captureException(new Error(validationResult.error.message), {
      extra: {
        context: 'Data validation was unsuccesful',
        requestBody: data,
      },
    });

    return NextResponse.json({
      success: false,
      errorMessage: validationResult.error.message,
    });
  }
}

// Updating a register
export async function PUT(request: Request) {
  const data = await request.json();

  // Getting the form schema
  const formData = await getFormData();
  const formSchema: z.Schema = getSchema(formData);

  // Validating the data against the zod schema
  const validationResult = formSchema.safeParse(data);

  // Validating wether the data has the correct values
  if (validationResult.success) {
    // Separating the data as required
    const { numero_violencia, violencia_asociada, ...registerData } = data;
    const id = numero_violencia;
    const associatedViolences: Array<OptionField> = violencia_asociada;
    console.log('PUT registerData ::: ', registerData);
    console.log('PUT associatedViolences ::: ', associatedViolences);

    // Getting the neccessary queries
    const firstQuery = queries.put.registry(FIRST_TABLE, id, registerData);
    console.log('PUT firstQuery ::: ', firstQuery);

    // Handling the environments to test with mocked data if we are in the dev environment
    if (env.ENV !== 'dev') {
      const db = await conn.connect();

      try {
        // Start the transaction
        await conn.query('START TRANSACTION');

        // Insert the first record
        const firstResult: OkPacket = await conn.query(firstQuery);
        console.log('PUT firstResult ::: ', firstResult);

        if (
          (firstResult.affectedRows > 0 && firstResult.insertId) ||
          firstResult.changedRows === 1
        ) {
          // Commit the transaction if all inserts succeeded
          await conn.query('COMMIT');

          return NextResponse.json({
            success: true,
            message: 'Se actualizó el registro exitosamente',
            data,
            insertId: id,
          });
        } else {
          // Rollback the transaction if the first insert failed
          await conn.query('ROLLBACK');

          const errorMessage =
            'Se produjo un error al intentar actualizar el registro en la base de datos';

          Sentry.captureException(new Error(errorMessage), {
            extra: {
              context:
                'Database error while trying to update the register',
              requestBody: data,
            },
          });

          return NextResponse.json({
            success: false,
            errorMessage,
          });
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
            context: 'Database error while trying to update the register',
            requestBody: data,
          },
        });

        return NextResponse.json({
          success: false,
          errorMessage,
        });
      } finally {
        // Close the connection
        await conn.end();
      }
    } else {
      return NextResponse.json({
        success: true,
        result: {
          firstQuery,
        },
      });
    }
  } else {
    // Log the validation error to Sentry
    Sentry.captureException(new Error(validationResult.error.message), {
      extra: {
        context: 'Data validation was unsuccesful',
        requestBody: data,
      },
    });

    return NextResponse.json({
      success: false,
      errorMessage: validationResult.error.message,
    });
  }
}
