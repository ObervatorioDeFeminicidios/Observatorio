import { NextResponse } from "next/server";
import { conn } from "../../libs/mysql";

export async function GET() {
  try {
    const query: string = `
      SELECT
          COLUMN_NAME AS 'id',
          COLUMN_TYPE AS 'type',
          IS_NULLABLE AS 'nullable',
          ETIQUETA AS 'label',
          CASE
              WHEN COLUMN_NAME = 'nombre_victima' THEN (SELECT GROUP_CONCAT(nombre_victima) FROM feminicidios_tentativas)

              WHEN COLUMN_NAME = 'direccion_vivienda_victima' THEN (SELECT GROUP_CONCAT(direccion_vivienda_victima) FROM feminicidios_tentativas)

              WHEN COLUMN_NAME = 'cod_mujer_gestante_madre' THEN (SELECT GROUP_CONCAT(cod_mujer_gestante_madre) FROM mujer_gestante_madre)
              WHEN COLUMN_NAME = 'mujer_gestante_madre' THEN (SELECT GROUP_CONCAT(mujer_gestante_madre) FROM mujer_gestante_madre)

              WHEN COLUMN_NAME = 'cod_nacionalidad' THEN (SELECT GROUP_CONCAT(cod_nacionalidad) FROM nacionalidad)
              WHEN COLUMN_NAME = 'nacionalidad' THEN (SELECT GROUP_CONCAT(nacionalidad) FROM nacionalidad)

              WHEN COLUMN_NAME = 'cod_oficio_victima' THEN (SELECT GROUP_CONCAT(cod_oficio_victima) FROM oficio_victima)
              WHEN COLUMN_NAME = 'oficio_victima' THEN (SELECT GROUP_CONCAT(oficio_victima) FROM oficio_victima)

              WHEN COLUMN_NAME = 'cod_identidad_genero' THEN (SELECT GROUP_CONCAT(cod_identidad_genero) FROM identidad_genero)
              WHEN COLUMN_NAME = 'identidad_genero' THEN (SELECT GROUP_CONCAT(identidad_genero) FROM identidad_genero)

              WHEN COLUMN_NAME = 'cod_orientacion_sexual' THEN (SELECT GROUP_CONCAT(cod_orientacion_sexual) FROM orientacion_sexual)
              WHEN COLUMN_NAME = 'orientacion_sexual' THEN (SELECT GROUP_CONCAT(orientacion_sexual) FROM orientacion_sexual)

              WHEN COLUMN_NAME = 'cod_identidad_social' THEN (SELECT GROUP_CONCAT(cod_identidad_social) FROM identidad_social)
              WHEN COLUMN_NAME = 'identidad_social' THEN (SELECT GROUP_CONCAT(identidad_social) FROM identidad_social)

              WHEN COLUMN_NAME = 'cod_identidad_etnica' THEN (SELECT GROUP_CONCAT(cod_identidad_etnica) FROM identidad_etnica)
              WHEN COLUMN_NAME = 'identidad_etnica' THEN (SELECT GROUP_CONCAT(identidad_etnica) FROM identidad_etnica)

              WHEN COLUMN_NAME = 'cod_perte_etnica_o_racial_sf_mc' THEN (SELECT GROUP_CONCAT(cod_perte_etnica_o_racial_sf_mc) FROM perte_etnica_o_racial_sf_mc)
              WHEN COLUMN_NAME = 'perte_etnica_o_racial_sf_mc' THEN (SELECT GROUP_CONCAT(perte_etnica_o_racial_sf_mc) FROM perte_etnica_o_racial_sf_mc)

              WHEN COLUMN_NAME = 'cod_perte_etnica_o_racial_sf_in_ao' THEN (SELECT GROUP_CONCAT(cod_perte_etnica_o_racial_sf_in_ao) FROM perte_etnica_o_racial_sf_in_ao)
              WHEN COLUMN_NAME = 'perte_etnica_o_racial_sf_in_ao' THEN (SELECT GROUP_CONCAT(perte_etnica_o_racial_sf_in_ao) FROM perte_etnica_o_racial_sf_in_ao)        

              WHEN COLUMN_NAME = 'cod_comunidad_o_territ_colect_victima_in' THEN (SELECT GROUP_CONCAT(cod_comunidad_o_territ_colect_victima_in) FROM comunidad_o_territ_colect_victima_in)
              WHEN COLUMN_NAME = 'comunidad_o_territ_colect_victima_in' THEN (SELECT GROUP_CONCAT(comunidad_o_territ_colect_victima_in) FROM comunidad_o_territ_colect_victima_in)        

              WHEN COLUMN_NAME = 'cod_pueblo_indigena_victima' THEN (SELECT GROUP_CONCAT(cod_pueblo_indigena_victima) FROM pueblo_indigena_victima)
              WHEN COLUMN_NAME = 'pueblo_indigena_victima' THEN (SELECT GROUP_CONCAT(pueblo_indigena_victima) FROM pueblo_indigena_victima)

              WHEN COLUMN_NAME = 'cod_actividad_economica_victima' THEN (SELECT GROUP_CONCAT(cod_actividad_economica_victima) FROM actividad_economica_victima)
              WHEN COLUMN_NAME = 'actividad_economica_victima' THEN (SELECT GROUP_CONCAT(actividad_economica_victima) FROM actividad_economica_victima)

              WHEN COLUMN_NAME = 'cod_situacion_discapacidad_victima' THEN (SELECT GROUP_CONCAT(cod_situacion_discapacidad_victima) FROM situacion_discapacidad_victima)
              WHEN COLUMN_NAME = 'situacion_discapacidad_victima' THEN (SELECT GROUP_CONCAT(situacion_discapacidad_victima) FROM situacion_discapacidad_victima) 

              WHEN COLUMN_NAME = 'edad_victima' THEN (SELECT GROUP_CONCAT(edad_victima) FROM feminicidios_tentativas)

              WHEN COLUMN_NAME = 'cod_antecedentes_criminales' THEN (SELECT GROUP_CONCAT(cod_antecedentes_criminales) FROM antecedentes_criminales)
              WHEN COLUMN_NAME = 'antecedentes_criminales' THEN (SELECT GROUP_CONCAT(antecedentes_criminales) FROM antecedentes_criminales)

              WHEN COLUMN_NAME = 'cod_rango_edad' THEN (SELECT GROUP_CONCAT(cod_rango_edad) FROM rango_edad)
              WHEN COLUMN_NAME = 'rango_edad' THEN (SELECT GROUP_CONCAT(rango_edad) FROM rango_edad)

              WHEN COLUMN_NAME = 'cod_num_hijos' THEN (SELECT GROUP_CONCAT(cod_num_hijos) FROM num_hijos_menores_huerfan_madre)
              WHEN COLUMN_NAME = 'num_hijos' THEN (SELECT GROUP_CONCAT(num_hijos) FROM num_hijos_menores_huerfan_madre)

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
          COLUMN_NAME IN ('nombre_victima', 'direccion_vivienda_victima', 'cod_mujer_gestante_madre', 'mujer_gestante_madre', 'cod_num_hijos', 'num_hijos', 'cod_nacionalidad', 'nacionalidad', 'cod_oficio_victima', 'oficio_victima', 'edad_victima',
         'cod_identidad_genero','identidad_genero','cod_orientacion_sexual','orientacion_sexual','cod_identidad_social','identidad_social','cod_identidad_etnica','identidad_etnica','cod_perte_etnica_o_racial_sf_mc', 'perte_etnica_o_racial_sf_mc',
         'cod_perte_etnica_o_racial_sf_in_ao','perte_etnica_o_racial_sf_in_ao','cod_comunidad_o_territ_colect_victima_in','comunidad_o_territ_colect_victima_in','cod_pueblo_indigena_victima','pueblo_indigena_victima','cod_actividad_economica_victima',
        'actividad_economica_victima', 'cod_rango_edad', 'rango_edad', 'cod_antecedentes_criminales','antecedentes_criminales','cod_situacion_discapacidad_victima', 'situacion_discapacidad_victima' );
    `;
    const result: DataBaseField[] = await conn.query <DataBaseField[]>(query);
    console.log('Result of the consultation:', result);
    console.log('number:', result.length);

    const mutatedFields = result.map(field => ({
      ...field,
      type: field.options !== null ? 'select' : field.type,
    }))

    // Return the result in JSON format
    return NextResponse.json(mutatedFields);

    // Return only the column names and their data types
    // return NextResponse.json(result.map(row => ({ column_name: row.COLUMN_NAME, data_type: row.DATA_TYPE })));
  } catch (error) {
    const errorMessage = typeof error === 'string' ? error : (error instanceof Error ? error.message : 'Error Unknown');
    console.error('Error al ejecutar la consulta:', errorMessage);
    return NextResponse.error();
  }
}


