import { env } from '@/config/env';
import { FieldValues } from 'react-hook-form';
import mysql from 'serverless-mysql';
import sql from 'sql-template-strings';

// Define the connection type
type MySQLConnection = ReturnType<typeof mysql>;

// Setting up the mysql connection
export const conn: MySQLConnection = mysql({
  config: {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    port: env.DB_PORT as unknown as number,
    database: env.DB_DATABASE,
  },
});

// Defining the queries to be used in the SQL transactions
export const queries = {
  get: {
    stepOne: sql`
      SELECT
        COLUMN_NAME AS 'id',
        DATA_TYPE AS 'type',
        CHARACTER_MAXIMUM_LENGTH AS 'length',
        IS_NULLABLE AS 'nullable',
        ETIQUETA AS 'label',
        ACTUALIZABLE AS 'updatable',
        CASE
          WHEN COLUMN_NAME='cod_mujer_gestante_madre' THEN (SELECT GROUP_CONCAT(cod_mujer_gestante_madre) FROM mujer_gestante_madre)
          WHEN COLUMN_NAME='mujer_gestante_madre' THEN (SELECT GROUP_CONCAT(mujer_gestante_madre) FROM mujer_gestante_madre)
          WHEN COLUMN_NAME='cod_nacionalidad' THEN (SELECT GROUP_CONCAT(cod_nacionalidad) FROM nacionalidad)
          WHEN COLUMN_NAME='nacionalidad' THEN (SELECT GROUP_CONCAT(nacionalidad) FROM nacionalidad)
          WHEN COLUMN_NAME='cod_oficio_victima' THEN (SELECT GROUP_CONCAT(cod_oficio_victima) FROM oficio_victima)
          WHEN COLUMN_NAME='oficio_victima' THEN (SELECT GROUP_CONCAT(oficio_victima) FROM oficio_victima)
          WHEN COLUMN_NAME='cod_identidad_genero' THEN (SELECT GROUP_CONCAT(cod_identidad_genero) FROM identidad_genero)
          WHEN COLUMN_NAME='identidad_genero' THEN (SELECT GROUP_CONCAT(identidad_genero) FROM identidad_genero)
          WHEN COLUMN_NAME='cod_orientacion_sexual' THEN (SELECT GROUP_CONCAT(cod_orientacion_sexual) FROM orientacion_sexual)
          WHEN COLUMN_NAME='orientacion_sexual' THEN (SELECT GROUP_CONCAT(orientacion_sexual) FROM orientacion_sexual)
          WHEN COLUMN_NAME='cod_identidad_social' THEN (SELECT GROUP_CONCAT(cod_identidad_social) FROM identidad_social)
          WHEN COLUMN_NAME='identidad_social' THEN (SELECT GROUP_CONCAT(identidad_social) FROM identidad_social)
          WHEN COLUMN_NAME='cod_identidad_politica' THEN (SELECT GROUP_CONCAT(cod_identidad_politica) FROM identidad_politica)
          WHEN COLUMN_NAME='identidad_politica' THEN (SELECT GROUP_CONCAT(identidad_politica) FROM identidad_politica)
          WHEN COLUMN_NAME='cod_identidad_etnica' THEN (SELECT GROUP_CONCAT(cod_identidad_etnica) FROM identidad_etnica)
          WHEN COLUMN_NAME='identidad_etnica' THEN (SELECT GROUP_CONCAT(identidad_etnica) FROM identidad_etnica)
          WHEN COLUMN_NAME='cod_perte_etnica_o_racial_victima_mc' THEN (SELECT GROUP_CONCAT(cod_perte_etnica_o_racial_victima_mc) FROM perte_etnica_o_racial_victima_mc)
          WHEN COLUMN_NAME='perte_etnica_o_racial_victima_mc' THEN (SELECT GROUP_CONCAT(perte_etnica_o_racial_victima_mc) FROM perte_etnica_o_racial_victima_mc)
          WHEN COLUMN_NAME='cod_perte_etnica_o_racial_victima_in_ao' THEN (SELECT GROUP_CONCAT(cod_perte_etnica_o_racial_victima_in_ao) FROM perte_etnica_o_racial_victima_in_ao)
          WHEN COLUMN_NAME='perte_etnica_o_racial_victima_in_ao' THEN (SELECT GROUP_CONCAT(perte_etnica_o_racial_victima_in_ao) FROM perte_etnica_o_racial_victima_in_ao)
          WHEN COLUMN_NAME='cod_comunidad_o_territ_colect_victima_in' THEN (SELECT GROUP_CONCAT(cod_comunidad_o_territ_colect_victima_in) FROM comunidad_o_territ_colect_victima_in)
          WHEN COLUMN_NAME='comunidad_o_territ_colect_victima_in' THEN (SELECT GROUP_CONCAT(comunidad_o_territ_colect_victima_in) FROM comunidad_o_territ_colect_victima_in)
          WHEN COLUMN_NAME='cod_pueblo_indigena_victima' THEN (SELECT GROUP_CONCAT(cod_pueblo_indigena_victima) FROM pueblo_indigena_victima)
          WHEN COLUMN_NAME='pueblo_indigena_victima' THEN (SELECT GROUP_CONCAT(pueblo_indigena_victima) FROM pueblo_indigena_victima)
          WHEN COLUMN_NAME='cod_actividad_economica_victima' THEN (SELECT GROUP_CONCAT(cod_actividad_economica_victima) FROM actividad_economica_victima)
          WHEN COLUMN_NAME='actividad_economica_victima' THEN (SELECT GROUP_CONCAT(actividad_economica_victima) FROM actividad_economica_victima)
          WHEN COLUMN_NAME='cod_situacion_discapacidad_victima' THEN (SELECT GROUP_CONCAT(cod_situacion_discapacidad_victima) FROM situacion_discapacidad_victima)
          WHEN COLUMN_NAME='situacion_discapacidad_victima' THEN (SELECT GROUP_CONCAT(situacion_discapacidad_victima) FROM situacion_discapacidad_victima)
          WHEN COLUMN_NAME='cod_rango_edad_victima' THEN (SELECT GROUP_CONCAT(cod_rango_edad) FROM rango_edad)
          WHEN COLUMN_NAME='rango_edad_victima' THEN (SELECT GROUP_CONCAT(rango_edad) FROM rango_edad)
          WHEN COLUMN_NAME='cod_rango_edad_victima_anterior' THEN (SELECT GROUP_CONCAT(cod_rango_edad_anterior) FROM rango_edad_anterior)
          WHEN COLUMN_NAME='rango_edad_victima_anterior' THEN (SELECT GROUP_CONCAT(rango_edad_anterior) FROM rango_edad_anterior)
          WHEN COLUMN_NAME='cod_clasifica_edad_victima' THEN (SELECT GROUP_CONCAT(cod_clasifica_edad_victima) FROM clasifica_edad_victima)
          WHEN COLUMN_NAME='clasifica_edad_victima' THEN (SELECT GROUP_CONCAT(clasifica_edad_victima) FROM clasifica_edad_victima)
          WHEN COLUMN_NAME='cod_antecedentes_criminales_victima' THEN (SELECT GROUP_CONCAT(cod_antecedentes_criminales) FROM antecedentes_criminales)
          WHEN COLUMN_NAME='antecedentes_criminales_victima' THEN (SELECT GROUP_CONCAT(antecedentes_criminales) FROM antecedentes_criminales)
          WHEN COLUMN_NAME='cod_num_hijos' THEN (SELECT GROUP_CONCAT(cod_num_hijos) FROM num_hijos_menores_huerfan_madre)
          WHEN COLUMN_NAME='num_hijos' THEN (SELECT GROUP_CONCAT(num_hijos) FROM num_hijos_menores_huerfan_madre)
          WHEN COLUMN_NAME='cod_num_hijas' THEN (SELECT GROUP_CONCAT(cod_num_hijas) FROM num_hijas_menores_huerfan_madre)
          WHEN COLUMN_NAME='num_hijas' THEN (SELECT GROUP_CONCAT(num_hijas) FROM num_hijas_menores_huerfan_madre)
        END AS 'options'
      FROM
        (SELECT
          x.TABLE_NAME,
          x.COLUMN_NAME,
          x.DATA_TYPE,
          x.CHARACTER_MAXIMUM_LENGTH,
          x.IS_NULLABLE,
          z.etiqueta,
          z.actualizable,
          z.uso,
          z.tabla_referencia
        FROM INFORMATION_SCHEMA.COLUMNS x
        INNER JOIN tabla_campos_etiquetas z
        ON x.TABLE_NAME=z.nombre_tabla
        AND (
          (x.COLUMN_NAME LIKE 'cod_%' AND SUBSTRING(x.COLUMN_NAME, 5)=z.nombre_campo)
          OR
          (x.COLUMN_NAME NOT LIKE 'cod_%' AND x.COLUMN_NAME=z.nombre_campo)
          )
        ) w
      WHERE
        TABLE_NAME='feminicidios_tentativas' AND w.uso='form_1';
    `,
    stepTwo: sql`
      SELECT
        COLUMN_NAME AS 'id',
        DATA_TYPE AS 'type',
        CHARACTER_MAXIMUM_LENGTH AS 'length',
        IS_NULLABLE AS 'nullable',
        ETIQUETA AS 'label',
        ACTUALIZABLE AS 'updatable',
        CASE
          WHEN COLUMN_NAME='cod_departamento' THEN (SELECT GROUP_CONCAT(cod_departamento) FROM departamento)
          WHEN COLUMN_NAME='departamento' THEN (SELECT GROUP_CONCAT(departamento) FROM departamento)
          WHEN COLUMN_NAME='cod_municipio' THEN (SELECT GROUP_CONCAT(cod_municipio) FROM municipio)
          WHEN COLUMN_NAME='municipio' THEN (SELECT GROUP_CONCAT(municipio) FROM municipio)
          WHEN COLUMN_NAME='cod_postal' THEN (SELECT GROUP_CONCAT(cod_postal) FROM codigo_postal)
          WHEN COLUMN_NAME='postal' THEN (SELECT GROUP_CONCAT(postal) FROM codigo_postal)
          WHEN COLUMN_NAME='cod_comuna' THEN (SELECT GROUP_CONCAT(cod_comuna) FROM comuna)
          WHEN COLUMN_NAME='comuna' THEN (SELECT GROUP_CONCAT(comuna) FROM comuna)
          WHEN COLUMN_NAME='cod_zona_geografica' THEN (SELECT GROUP_CONCAT(cod_zona_geografica) FROM zona_geografica)
          WHEN COLUMN_NAME='zona_geografica' THEN (SELECT GROUP_CONCAT(zona_geografica) FROM zona_geografica)
          WHEN COLUMN_NAME='cod_arma_utilizada' THEN (SELECT GROUP_CONCAT(cod_arma_utilizada) FROM arma_utilizada)
          WHEN COLUMN_NAME='arma_utilizada' THEN (SELECT GROUP_CONCAT(arma_utilizada) FROM arma_utilizada)
          WHEN COLUMN_NAME='cod_lugar_encuentra_cadaver' THEN (SELECT GROUP_CONCAT(cod_lugar) FROM lugar)
          WHEN COLUMN_NAME='lugar_encuentra_cadaver' THEN (SELECT GROUP_CONCAT(lugar) FROM lugar)
          WHEN COLUMN_NAME='cod_lugar_hechos' THEN (SELECT GROUP_CONCAT(cod_lugar) FROM lugar)
          WHEN COLUMN_NAME='lugar_hechos' THEN (SELECT GROUP_CONCAT(lugar) FROM lugar)
          WHEN COLUMN_NAME='cod_tipo_violencia' THEN (SELECT GROUP_CONCAT(cod_tipo_violencia) FROM tipo_violencia)
          WHEN COLUMN_NAME='tipo_violencia' THEN (SELECT GROUP_CONCAT(tipo_violencia) FROM tipo_violencia)
          WHEN COLUMN_NAME='cod_metodo_eliminacion' THEN (SELECT GROUP_CONCAT(cod_metodo_eliminacion) FROM metodo_eliminacion)
          WHEN COLUMN_NAME='metodo_eliminacion' THEN (SELECT GROUP_CONCAT(metodo_eliminacion) FROM metodo_eliminacion)
          WHEN COLUMN_NAME='cod_violencia_asociada' THEN (SELECT GROUP_CONCAT(cod_violencia_asociada) FROM violencia_asociada)
          WHEN COLUMN_NAME='violencia_asociada' THEN (SELECT GROUP_CONCAT(violencia_asociada) FROM violencia_asociada)
        END AS 'options'
      FROM
        (SELECT
          x.TABLE_NAME,
          x.COLUMN_NAME,
          x.DATA_TYPE,
          x.CHARACTER_MAXIMUM_LENGTH,
          x.IS_NULLABLE,
          z.etiqueta,
          z.actualizable,
          z.uso,
          z.tabla_referencia
        FROM INFORMATION_SCHEMA.COLUMNS x
        INNER JOIN tabla_campos_etiquetas z
        ON x.TABLE_NAME=z.nombre_tabla
        AND (
          (x.COLUMN_NAME LIKE 'cod_%' AND SUBSTRING(x.COLUMN_NAME, 5)=z.nombre_campo)
          OR
          (x.COLUMN_NAME NOT LIKE 'cod_%' AND x.COLUMN_NAME=z.nombre_campo)
          )
        ) w
      WHERE
        TABLE_NAME IN ('feminicidios_tentativas', 'feminicidios_violencia_asociada') AND w.uso='form_2';
    `,
    stepThree: sql`
      SELECT
        COLUMN_NAME AS 'id',
        DATA_TYPE AS 'type',
        CHARACTER_MAXIMUM_LENGTH AS 'length',
        IS_NULLABLE AS 'nullable',
        ETIQUETA AS 'label',
        ACTUALIZABLE AS 'updatable',
        CASE
          WHEN COLUMN_NAME='cod_sujeto_feminicida' THEN (SELECT GROUP_CONCAT(cod_sujeto_feminicida) FROM sujeto_feminicida)
          WHEN COLUMN_NAME='sujeto_feminicida' THEN (SELECT GROUP_CONCAT(sujeto_feminicida) FROM sujeto_feminicida)
          WHEN COLUMN_NAME='cod_parentesco_o_relacion' THEN (SELECT GROUP_CONCAT(cod_parentesco_o_relacion) FROM parentesco_o_relacion)
          WHEN COLUMN_NAME='parentesco_o_relacion' THEN (SELECT GROUP_CONCAT(parentesco_o_relacion) FROM parentesco_o_relacion)
          WHEN COLUMN_NAME='cod_sujeto_feminicida_momento_feminicidio' THEN (SELECT GROUP_CONCAT(cod_sujeto_feminicida_momento_feminicidio) FROM sujeto_feminicida_momento_feminicidio)
          WHEN COLUMN_NAME='sujeto_feminicida_momento_feminicidio' THEN (SELECT GROUP_CONCAT(sujeto_feminicida_momento_feminicidio) FROM sujeto_feminicida_momento_feminicidio)
          WHEN COLUMN_NAME='cod_situacion_juridica_sf' THEN (SELECT GROUP_CONCAT(cod_situacion_juridica_sf) FROM situacion_juridica_sf)
          WHEN COLUMN_NAME='situacion_juridica_sf' THEN (SELECT GROUP_CONCAT(situacion_juridica_sf) FROM situacion_juridica_sf)
          WHEN COLUMN_NAME='cod_actividad_economica_sf' THEN (SELECT GROUP_CONCAT(cod_actividad_economica_sf) FROM actividad_economica_sf)
          WHEN COLUMN_NAME='actividad_economica_sf' THEN (SELECT GROUP_CONCAT(actividad_economica_sf) FROM actividad_economica_sf)
          WHEN COLUMN_NAME='cod_antecedentes_criminales' THEN (SELECT GROUP_CONCAT(cod_antecedentes_criminales) FROM antecedentes_criminales)
          WHEN COLUMN_NAME='antecedentes_criminales' THEN (SELECT GROUP_CONCAT(antecedentes_criminales) FROM antecedentes_criminales)
          WHEN COLUMN_NAME='cod_continuum_violencia_sf' THEN (SELECT GROUP_CONCAT(cod_continuum_violencia_sf) FROM continuum_violencia_sf)
          WHEN COLUMN_NAME='continuum_violencia_sf' THEN (SELECT GROUP_CONCAT(continuum_violencia_sf) FROM continuum_violencia_sf)
          WHEN COLUMN_NAME='cod_perte_etnica_o_racial_sf_mc' THEN (SELECT GROUP_CONCAT(cod_perte_etnica_o_racial_sf_mc) FROM perte_etnica_o_racial_sf_mc)
          WHEN COLUMN_NAME='perte_etnica_o_racial_sf_mc' THEN (SELECT GROUP_CONCAT(perte_etnica_o_racial_sf_mc) FROM perte_etnica_o_racial_sf_mc)
          WHEN COLUMN_NAME='cod_perte_etnica_o_racial_sf_in_ao' THEN (SELECT GROUP_CONCAT(cod_perte_etnica_o_racial_sf_in_ao) FROM perte_etnica_o_racial_sf_in_ao)
          WHEN COLUMN_NAME='perte_etnica_o_racial_sf_in_ao' THEN (SELECT GROUP_CONCAT(perte_etnica_o_racial_sf_in_ao) FROM perte_etnica_o_racial_sf_in_ao)
          WHEN COLUMN_NAME='cod_comunidad_o_territ_colect_sf_in' THEN (SELECT GROUP_CONCAT(cod_comunidad_o_territ_colect_sf_in) FROM comunidad_o_territ_colect_sf_in)
          WHEN COLUMN_NAME='comunidad_o_territ_colect_sf_in' THEN (SELECT GROUP_CONCAT(comunidad_o_territ_colect_sf_in) FROM comunidad_o_territ_colect_sf_in)
          WHEN COLUMN_NAME='cod_num_sujetos_feminicidas' THEN (SELECT GROUP_CONCAT(cod_num_sujetos_feminicidas) FROM num_sujetos_feminicidas)
          WHEN COLUMN_NAME='num_sujetos_feminicidas' THEN (SELECT GROUP_CONCAT(num_sujetos_feminicidas) FROM num_sujetos_feminicidas)
          WHEN COLUMN_NAME='cod_nacionalidad_sf_migrante' THEN (SELECT GROUP_CONCAT(cod_nacionalidad) FROM nacionalidad)
          WHEN COLUMN_NAME='nacionalidad_sf_migrante' THEN (SELECT GROUP_CONCAT(nacionalidad) FROM nacionalidad)
          WHEN COLUMN_NAME='cod_rango_edad_sf' THEN (SELECT GROUP_CONCAT(cod_rango_edad) FROM rango_edad)
          WHEN COLUMN_NAME='rango_edad_sf' THEN (SELECT GROUP_CONCAT(rango_edad) FROM rango_edad)
          WHEN COLUMN_NAME='cod_rango_edad_sf_anterior' THEN (SELECT GROUP_CONCAT(cod_rango_edad_anterior) FROM rango_edad_anterior)
          WHEN COLUMN_NAME='rango_edad_sf_anterior' THEN (SELECT GROUP_CONCAT(rango_edad_anterior) FROM rango_edad_anterior)
          WHEN COLUMN_NAME='cod_antecedentes_criminales_sf' THEN (SELECT GROUP_CONCAT(cod_antecedentes_criminales) FROM antecedentes_criminales)
          WHEN COLUMN_NAME='antecedentes_criminales_sf' THEN (SELECT GROUP_CONCAT(antecedentes_criminales) FROM antecedentes_criminales)
        END AS 'options'
      FROM
        (SELECT
          x.TABLE_NAME,
          x.COLUMN_NAME,
          x.DATA_TYPE,
          x.CHARACTER_MAXIMUM_LENGTH,
          x.IS_NULLABLE,
          z.etiqueta,
          z.actualizable,
          z.uso,
          z.tabla_referencia
        FROM INFORMATION_SCHEMA.COLUMNS x
        INNER JOIN tabla_campos_etiquetas z
        ON x.TABLE_NAME=z.nombre_tabla
        AND (
          (x.COLUMN_NAME LIKE 'cod_%' AND SUBSTRING(x.COLUMN_NAME, 5)=z.nombre_campo)
          OR
          (x.COLUMN_NAME NOT LIKE 'cod_%' AND x.COLUMN_NAME=z.nombre_campo)
          )
        ) w
      WHERE
        TABLE_NAME='feminicidios_tentativas' AND w.uso='form_3';
    `,
    stepFour: sql`
      SELECT
        COLUMN_NAME AS 'id',
        DATA_TYPE AS 'type',
        CHARACTER_MAXIMUM_LENGTH AS 'length',
        IS_NULLABLE AS 'nullable',
        ETIQUETA AS 'label',
        ACTUALIZABLE AS 'updatable'
      FROM
        (SELECT
          x.TABLE_NAME,
          x.COLUMN_NAME,
          x.DATA_TYPE,
          x.CHARACTER_MAXIMUM_LENGTH,
          x.IS_NULLABLE,
          z.etiqueta,
          z.actualizable,
          z.uso,
          z.tabla_referencia
        FROM INFORMATION_SCHEMA.COLUMNS x
        INNER JOIN tabla_campos_etiquetas z
        ON x.TABLE_NAME=z.nombre_tabla
        AND (
          (x.COLUMN_NAME LIKE 'cod_%' AND SUBSTRING(x.COLUMN_NAME, 5)=z.nombre_campo)
          OR
          (x.COLUMN_NAME NOT LIKE 'cod_%' AND x.COLUMN_NAME=z.nombre_campo)
          )
        ) w
      WHERE
        TABLE_NAME='feminicidios_tentativas' AND w.uso='form_4';
    `,
    municipality: sql`
      SELECT
        d.cod_departamento as codDepartamento,
        m.cod_municipio as value,
        m.municipio as label
      FROM
        departamento d
      JOIN
        municipio m ON d.cod_departamento = m.cod_departamento;
    `,
    postalCode: sql`
      SELECT
        d.cod_departamento as codDepartamento,
        m.cod_municipio as codMunicipio,
        cp.cod_postal as value,
        cp.limite as info,
        cp.postal as label
      FROM
        departamento d
      JOIN
        municipio m ON d.cod_departamento = m.cod_departamento
      JOIN
        codigo_postal cp ON m.cod_departamento = cp.cod_departamento AND m.cod_municipio = cp.cod_municipio;
    `,
    lastestIdFromList: (table: string) => `
      SELECT * FROM ${table}
      ORDER BY cod_${table} DESC
      LIMIT 1
    `,
  },
  post: {
    registry: (table: string, data: FieldValues) => `
      INSERT INTO ${table} (
        ${Object.keys(data).join(',')}
      ) VALUES (
        ${Object.values(data)
          .map((value) => (typeof value === 'string' ? `'${value}'` : value))
          .join(',')}
      )
    `,
  },
  put: {
    listOption: (table: string, id: number, value: string) => `
      INSERT INTO ${table} (
        cod_${table},
        ${table}
      ) VALUES (
        ${id},
        '${value}'
      );
    `,
  },
};
