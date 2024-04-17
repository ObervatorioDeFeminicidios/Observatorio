import { NextResponse } from 'next/server';
import { conn } from '../../libs/mysql';
import { transformObject } from '@/app/utils/transform-object';

export async function GET() {
  try {
    const query: string = `
    SELECT
    COLUMN_NAME AS 'id',
    COLUMN_TYPE AS 'type',
    IS_NULLABLE AS 'nullable',
    ETIQUETA AS 'label',
    CASE

      WHEN COLUMN_NAME = 'cod_departamento' THEN (SELECT GROUP_CONCAT(cod_departamento) FROM departamento)
      WHEN COLUMN_NAME = 'departamento' THEN (SELECT GROUP_CONCAT(departamento) FROM departamento)

      WHEN COLUMN_NAME = 'cod_municipio' THEN (SELECT GROUP_CONCAT(cod_municipio) FROM municipio)
      WHEN COLUMN_NAME = 'municipio' THEN (SELECT GROUP_CONCAT(municipio) FROM municipio)   

      WHEN COLUMN_NAME = 'barrio' THEN (SELECT GROUP_CONCAT(barrio) FROM feminicidios_tentativas)
      WHEN COLUMN_NAME = 'direccion_hecho' THEN (SELECT GROUP_CONCAT(direccion_hecho) FROM feminicidios_tentativas)

      WHEN COLUMN_NAME = 'cod_comuna' THEN (SELECT GROUP_CONCAT(cod_comuna) FROM comuna)
      WHEN COLUMN_NAME = 'comuna' THEN (SELECT GROUP_CONCAT(comuna) FROM comuna)   

      WHEN COLUMN_NAME = 'cod_zona_geografica' THEN (SELECT GROUP_CONCAT(cod_zona_geografica) FROM zona_geografica)
      WHEN COLUMN_NAME = 'zona_geografica' THEN (SELECT GROUP_CONCAT(zona_geografica) FROM zona_geografica)

      WHEN COLUMN_NAME = 'cod_num_sujetos_feminicidas' THEN (SELECT GROUP_CONCAT(cod_num_sujetos_feminicidas) FROM num_sujetos_feminicidas)
      WHEN COLUMN_NAME = 'num_sujetos_feminicidas' THEN (SELECT GROUP_CONCAT(num_sujetos_feminicidas) FROM num_sujetos_feminicidas)

      WHEN COLUMN_NAME = 'cod_arma_utilizada' THEN (SELECT GROUP_CONCAT(cod_arma_utilizada) FROM arma_utilizada)
      WHEN COLUMN_NAME = 'arma_utilizada' THEN (SELECT GROUP_CONCAT(arma_utilizada) FROM arma_utilizada)

      WHEN COLUMN_NAME = 'cod_lugar' THEN (SELECT GROUP_CONCAT(cod_lugar) FROM lugar)
      WHEN COLUMN_NAME = 'lugar' THEN (SELECT GROUP_CONCAT(lugar) FROM lugar)

      WHEN COLUMN_NAME = 'cod_metodo_eliminacion' THEN (SELECT GROUP_CONCAT(cod_metodo_eliminacion) FROM metodo_eliminacion)
      WHEN COLUMN_NAME = 'metodo_eliminacion' THEN (SELECT GROUP_CONCAT(metodo_eliminacion) FROM metodo_eliminacion)

     WHEN COLUMN_NAME = 'cod_lugar_encuentra_cadaver' THEN (SELECT GROUP_CONCAT(cod_lugar_encuentra_cadaver) FROM feminicidios_tentativas)
     WHEN COLUMN_NAME = 'lugar_encuentra_cadaver' THEN (SELECT GROUP_CONCAT(lugar_encuentra_cadaver) FROM feminicidios_tentativas)

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
    COLUMN_NAME IN ('cod_departamento', 'departamento','cod_municipio', 'municipio','barrio', 'direccion_hecho', 'cod_comuna','comuna', 'cod_zona_geografica', 'zona_geografica',
    'cod_num_sujetos_feminicidas','num_sujetos_feminicidas','cod_arma_utilizada','arma_utilizada', 'cod_lugar', 'lugar', 'cod_metodo_eliminacion', 'metodo_eliminacion',
    'cod_lugar_encuentra_cadaver','lugar_encuentra_cadaver'  );
    `;

    const result: DataBaseField[] = await conn.query<DataBaseField[]>(query);

    const mutatedFields: DataBaseField[] = result.map((field) => ({
      ...field,
      type: field.options !== null ? 'select' : field.type,
    }));

    // Return the result in JSON format
    return NextResponse.json(transformObject(mutatedFields));

    // Return only the column names and their data types
    // return NextResponse.json(result.map(row => ({ column_name: row.COLUMN_NAME, data_type: row.DATA_TYPE })));
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
