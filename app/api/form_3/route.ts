import { transformObject } from '@/app/utils/transform-object';
import { env } from '@/config/env';
import { formData3 } from '@/lib/mock-data';
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
          WHEN COLUMN_NAME = 'nombre_sujeto_feminicida' THEN (SELECT GROUP_CONCAT(nombre_sujeto_feminicida) FROM feminicidios_tentativas)
          WHEN COLUMN_NAME = 'alias_sujeto_feminicida' THEN (SELECT GROUP_CONCAT(alias_sujeto_feminicida) FROM feminicidios_tentativas)
          WHEN COLUMN_NAME = 'edad_sujeto_feminicida' THEN (SELECT GROUP_CONCAT(edad_sujeto_feminicida) FROM feminicidios_tentativas)
          WHEN COLUMN_NAME = 'cod_sujeto_feminicida' THEN (SELECT GROUP_CONCAT(cod_sujeto_feminicida) FROM sujeto_feminicida)
          WHEN COLUMN_NAME = 'sujeto_feminicida' THEN (SELECT GROUP_CONCAT(sujeto_feminicida) FROM sujeto_feminicida)
          WHEN COLUMN_NAME = 'cod_parentesco_o_relacion' THEN (SELECT GROUP_CONCAT(cod_parentesco_o_relacion) FROM parentesco_o_relacion)
          WHEN COLUMN_NAME = 'parentesco_o_relacion' THEN (SELECT GROUP_CONCAT(parentesco_o_relacion) FROM parentesco_o_relacion)
          WHEN COLUMN_NAME = 'cod_sujeto_feminicida_momento_feminicidio' THEN (SELECT GROUP_CONCAT(cod_sujeto_feminicida_momento_feminicidio) FROM sujeto_feminicida_momento_feminicidio)
          WHEN COLUMN_NAME = 'sujeto_feminicida_momento_feminicidio' THEN (SELECT GROUP_CONCAT(sujeto_feminicida_momento_feminicidio) FROM sujeto_feminicida_momento_feminicidio)
          WHEN COLUMN_NAME = 'cod_situacion_juridica_sf' THEN (SELECT GROUP_CONCAT(cod_situacion_juridica_sf) FROM situacion_juridica_sf)
          WHEN COLUMN_NAME = 'situacion_juridica_sf' THEN (SELECT GROUP_CONCAT(situacion_juridica_sf) FROM situacion_juridica_sf)
          WHEN COLUMN_NAME = 'cod_actividad_economica_sf' THEN (SELECT GROUP_CONCAT(cod_actividad_economica_sf) FROM actividad_economica_sf)
          WHEN COLUMN_NAME = 'actividad_economica_sf' THEN (SELECT GROUP_CONCAT(actividad_economica_sf) FROM actividad_economica_sf)
          WHEN COLUMN_NAME = 'cod_antecedentes_criminales' THEN (SELECT GROUP_CONCAT(cod_antecedentes_criminales) FROM antecedentes_criminales)
          WHEN COLUMN_NAME = 'antecedentes_criminales' THEN (SELECT GROUP_CONCAT(antecedentes_criminales) FROM antecedentes_criminales)
          WHEN COLUMN_NAME = 'cod_continuum_violencia_sf' THEN (SELECT GROUP_CONCAT(cod_continuum_violencia_sf) FROM continuum_violencia_sf)
          WHEN COLUMN_NAME = 'continuum_violencia_sf' THEN (SELECT GROUP_CONCAT(continuum_violencia_sf) FROM continuum_violencia_sf)
          WHEN COLUMN_NAME = 'cod_perte_etnica_o_racial_sf_mc' THEN (SELECT GROUP_CONCAT(cod_perte_etnica_o_racial_sf_mc) FROM perte_etnica_o_racial_sf_mc)
          WHEN COLUMN_NAME = 'perte_etnica_o_racial_sf_mc' THEN (SELECT GROUP_CONCAT(perte_etnica_o_racial_sf_mc) FROM perte_etnica_o_racial_sf_mc)
          WHEN COLUMN_NAME = 'cod_perte_etnica_o_racial_sf_in_ao' THEN (SELECT GROUP_CONCAT(cod_perte_etnica_o_racial_sf_in_ao) FROM perte_etnica_o_racial_sf_in_ao)
          WHEN COLUMN_NAME = 'perte_etnica_o_racial_sf_in_ao' THEN (SELECT GROUP_CONCAT(perte_etnica_o_racial_sf_in_ao) FROM perte_etnica_o_racial_sf_in_ao)
          WHEN COLUMN_NAME = 'cod_comunidad_o_territ_colect_sf_in' THEN (SELECT GROUP_CONCAT(cod_comunidad_o_territ_colect_sf_in) FROM comunidad_o_territ_colect_sf_in)
          WHEN COLUMN_NAME = 'comunidad_o_territ_colect_sf_in' THEN (SELECT GROUP_CONCAT(comunidad_o_territ_colect_sf_in) FROM comunidad_o_territ_colect_sf_in)
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
        COLUMN_NAME IN ('nombre_sujeto_feminicida', 'alias_sujeto_feminicida', 'edad_sujeto_feminicida', 'cod_sujeto_feminicida', 'sujeto_feminicida', 'cod_parentesco_o_relacion', 'parentesco_o_relacion',
        'cod_sujeto_feminicida_momento_feminicidio','sujeto_feminicida_momento_feminicidio','cod_situacion_juridica_sf', 'situacion_juridica_sf', 'cod_actividad_economica_sf', 'actividad_economica_sf',
        'cod_antecedentes_criminales','antecedentes_criminales','cod_continuum_violencia_sf','continuum_violencia_sf', 'cod_perte_etnica_o_racial_sf_mc', 'perte_etnica_o_racial_sf_mc',
        'cod_perte_etnica_o_racial_sf_in_ao','perte_etnica_o_racial_sf_in_ao', 'cod_comunidad_o_territ_colect_sf_in','comunidad_o_territ_colect_sf_in');
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
      response = formData3;
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
