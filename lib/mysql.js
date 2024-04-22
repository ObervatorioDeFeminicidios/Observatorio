import { env } from '@/config/env';
import mysql from 'serverless-mysql';

export const conn = mysql({
  config: {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    port: env.DB_PORT,
    database: env.DB_DATABASE,
  },
});

export const queries = {
  get: {
    stepOne: `
      SELECT
        COLUMN_NAME AS 'id',
        COLUMN_TYPE AS 'type',
        IS_NULLABLE AS 'nullable',
        ETIQUETA AS 'label',
        CASE
          WHEN COLUMN_NAME = 'nombre_victima' THEN (SELECT GROUP_CONCAT(nombre_victima) FROM feminicidios_tentativas)
          WHEN COLUMN_NAME = 'nombre_pueblo_indigena_victima' THEN (SELECT GROUP_CONCAT(nombre_pueblo_indigena_victima) FROM feminicidios_tentativas)
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
          WHEN COLUMN_NAME = 'cod_identidad_politica' THEN (SELECT GROUP_CONCAT(cod_identidad_politica) FROM identidad_politica)
          WHEN COLUMN_NAME = 'identidad_politica' THEN (SELECT GROUP_CONCAT(identidad_politica) FROM identidad_politica)
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
        'actividad_economica_victima', 'cod_rango_edad', 'rango_edad', 'cod_antecedentes_criminales','antecedentes_criminales','cod_situacion_discapacidad_victima', 'situacion_discapacidad_victima', 'cod_identidad_politica', 'identidad_politica','nombre_pueblo_indigena_victima');
    `,
    stepTwo: `
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
        WHEN COLUMN_NAME = 'mes' THEN (SELECT GROUP_CONCAT(mes) FROM feminicidios_tentativas)
        WHEN COLUMN_NAME = 'ano' THEN (SELECT GROUP_CONCAT(ano) FROM feminicidios_tentativas)
        WHEN COLUMN_NAME = 'fecha_violencia' THEN (SELECT GROUP_CONCAT(fecha_violencia) FROM feminicidios_tentativas)          
        WHEN COLUMN_NAME = 'direccion_hecho' THEN (SELECT GROUP_CONCAT(direccion_hecho) FROM feminicidios_tentativas)
        WHEN COLUMN_NAME = 'cod_comuna' THEN (SELECT GROUP_CONCAT(cod_comuna) FROM comuna)
        WHEN COLUMN_NAME = 'comuna' THEN (SELECT GROUP_CONCAT(comuna) FROM comuna)
        WHEN COLUMN_NAME = 'cod_zona_geografica' THEN (SELECT GROUP_CONCAT(cod_zona_geografica) FROM zona_geografica)
        WHEN COLUMN_NAME = 'zona_geografica' THEN (SELECT GROUP_CONCAT(zona_geografica) FROM zona_geografica)
        WHEN COLUMN_NAME = 'cod_arma_utilizada' THEN (SELECT GROUP_CONCAT(cod_arma_utilizada) FROM arma_utilizada)
        WHEN COLUMN_NAME = 'arma_utilizada' THEN (SELECT GROUP_CONCAT(arma_utilizada) FROM arma_utilizada)
        WHEN COLUMN_NAME = 'cod_lugar' THEN (SELECT GROUP_CONCAT(cod_lugar) FROM lugar)
        WHEN COLUMN_NAME = 'lugar' THEN (SELECT GROUP_CONCAT(lugar) FROM lugar)
        WHEN COLUMN_NAME = 'cod_tipo_violencia' THEN (SELECT GROUP_CONCAT(cod_tipo_violencia) FROM tipo_violencia)
        WHEN COLUMN_NAME = 'tipo_violencia' THEN (SELECT GROUP_CONCAT(tipo_violencia) FROM tipo_violencia)
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
      COLUMN_NAME IN ('cod_departamento', 'departamento','cod_municipio', 'municipio','barrio', 'direccion_hecho', 'cod_comuna','comuna', 
      'cod_zona_geografica', 'zona_geografica','cod_arma_utilizada','arma_utilizada', 'cod_lugar', 'lugar', 'cod_metodo_eliminacion', 'metodo_eliminacion',
      'cod_lugar_encuentra_cadaver','lugar_encuentra_cadaver', 'mes','ano','fecha_violencia', 'tipo_violencia','cod_tipo_violencia');

    `,
    stepThree: `
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
        WHEN COLUMN_NAME = 'cod_num_sujetos_feminicidas' THEN (SELECT GROUP_CONCAT(cod_num_sujetos_feminicidas) FROM num_sujetos_feminicidas)
        WHEN COLUMN_NAME = 'num_sujetos_feminicidas' THEN (SELECT GROUP_CONCAT(num_sujetos_feminicidas) FROM num_sujetos_feminicidas)          
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
      COLUMN_NAME IN ('alias_sujeto_feminicida', 'edad_sujeto_feminicida', 'cod_sujeto_feminicida', 'sujeto_feminicida', 'cod_parentesco_o_relacion', 'parentesco_o_relacion',
      'cod_sujeto_feminicida_momento_feminicidio','sujeto_feminicida_momento_feminicidio','cod_situacion_juridica_sf', 'situacion_juridica_sf', 'cod_actividad_economica_sf', 'actividad_economica_sf',
      'cod_antecedentes_criminales','antecedentes_criminales','cod_continuum_violencia_sf','continuum_violencia_sf', 'cod_perte_etnica_o_racial_sf_mc', 'perte_etnica_o_racial_sf_mc',
      'cod_perte_etnica_o_racial_sf_in_ao','perte_etnica_o_racial_sf_in_ao', 'cod_comunidad_o_territ_colect_sf_in','comunidad_o_territ_colect_sf_in', 'nombre_sujeto_feminicida', 'cod_num_sujetos_feminicidas','num_sujetos_feminicidas');
`,
    stepFour: `
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
        WHEN COLUMN_NAME = 'fecha_en_prensa' THEN (SELECT GROUP_CONCAT(fecha_en_prensa) FROM feminicidios_tentativas)          
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
      COLUMN_NAME IN ('desaparecida', 'causal_atribuido_feminicidio', 'fuente', 'descripcion_informacion_noticia','hipotesis','titular','link_noticia','url_corto_noticia','observaciones','observaciones_comision_cspm', 'fecha_en_prensa');

    `,
  },
};
