import { transformObject } from '@/app/utils/transform-object';
import { env } from '@/config/env';
import { formData4 } from '@/lib/mock-data';
import { NextResponse } from 'next/server';
import { conn } from '../../libs/mysql';

export async function GET() {
  try {
    const query: string = `
      SELECT
        COLUMN_NAME AS 'id',
        COLUMN_TYPE AS 'type',
        IS_NULLABLE AS 'nullable',
        ETIQUETA AS 'label',
        CASE
          WHEN COLUMN_NAME = 'desaparecida' THEN (SELECT GROUP_CONCAT(desaparecida) FROM feminicidios_tentativas)
          WHEN COLUMN_NAME = 'causal_atribuido_feminicidio' THEN (SELECT GROUP_CONCAT(causal_atribuido_feminicidio) FROM feminicidios_tentativas)
          WHEN COLUMN_NAME = 'fuente' THEN (SELECT GROUP_CONCAT(fuente) FROM feminicidios_tentativas)
          WHEN COLUMN_NAME = 'descripcion_informacion_noticia' THEN (SELECT GROUP_CONCAT(descripcion_informacion_noticia) FROM feminicidios_tentativas)
          WHEN COLUMN_NAME = 'hipotesis' THEN (SELECT GROUP_CONCAT(hipotesis) FROM feminicidios_tentativas)
          WHEN COLUMN_NAME = 'titular' THEN (SELECT GROUP_CONCAT(titular) FROM feminicidios_tentativas)
          WHEN COLUMN_NAME = 'link_noticia' THEN (SELECT GROUP_CONCAT(link_noticia) FROM feminicidios_tentativas)
          WHEN COLUMN_NAME = 'url_corto_noticia' THEN (SELECT GROUP_CONCAT(url_corto_noticia) FROM feminicidios_tentativas)
          WHEN COLUMN_NAME = 'observaciones' THEN (SELECT GROUP_CONCAT(observaciones) FROM feminicidios_tentativas)
          WHEN COLUMN_NAME = 'observaciones_comision_cspm' THEN (SELECT GROUP_CONCAT(observaciones_comision_cspm) FROM feminicidios_tentativas)
        END AS 'options'
      FROM
        (SELECT
          x.TABLE_NAME,
          x.COLUMN_NAME,
          x.COLUMN_TYPE,
          x.IS_NULLABLE,
          z.etiqueta
        FROM INFORMATION_SCHEMA.COLUMNS x
        INNER JOIN tabla_campos_etiquetas z
        ON x.TABLE_NAME = z.nombre_tabla
        AND (
          (x.COLUMN_NAME LIKE 'cod_%' AND SUBSTRING(x.COLUMN_NAME, 5) = z.nombre_campo)
          OR
          (x.COLUMN_NAME NOT LIKE 'cod_%' AND x.COLUMN_NAME = z.nombre_campo)
          )
        ) w
      WHERE
        TABLE_NAME = 'feminicidios_tentativas' AND
        COLUMN_NAME IN ('desaparecida', 'causal_atribuido_feminicidio', 'fuente', 'descripcion_informacion_noticia','hipotesis','titular','link_noticia','url_corto_noticia','observaciones','observaciones_comision_cspm');
    `;

    let response = [];

    if (env.ENV !== 'dev') {
      const result: DataBaseField[] = await conn.query<DataBaseField[]>(query);

      const mutatedFields: DataBaseField[] = result.map((field) => ({
        ...field,
        type: field.options !== null ? 'select' : field.type,
      }));

      response = transformObject(mutatedFields);
    } else {
      response = formData4;
    }

    // Return the result in JSON format
    return NextResponse.json(response);
  } catch (error) {
    const errorMessage =
      typeof error === 'string'
        ? error
        : error instanceof Error
          ? error.message
          : 'Error Unknown';
    console.error('Error al ejecutar la consulta:', errorMessage);
    return NextResponse.error();
  }
}
