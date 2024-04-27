import { capitalizeEachWord, getLatestId, transformObject } from '@/app/utils/transform-object';
import { env } from '@/config/env';
import { formData1, formData2, formData3, formData4 } from '@/lib/mock-data';
import { conn, queries } from '@/lib/mysql';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
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
    return NextResponse.json(formData);
  } catch (error) {
    const errorMessage =
      typeof error === 'string'
        ? error
        : error instanceof Error
          ? error.message
          : 'Error Unknown';

    // Return the error message
    return NextResponse.json({ error: errorMessage, status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Extract data from the body of the request
    const data = await request.json();

    // Make newdata mandatory and contain all variables in the database
    const newdata = {
      ano: data.ano,
      mes: data.mes,
      fecha_violencia: data.fecha_violencia,
      fecha_en_prensa: data.fecha_en_prensa,
      cod_tipo_violencia: data.cod_tipo_violencia,
      tipo_violencia: data.tipo_violencia,
      nombre_victima: data?.nombre_victima ||  '',
      cod_nacionalidad: data.cod_nacionalidad,
      nacionalidad: data.nacionalidad,
      cod_departamento: data.cod_departamento,
      departamento: data.departamento,
      cod_municipio: data.cod_municipio,
      municipio: data.municipio,
      barrio: data.barrio,
      direccion_hecho: data.direccion_hecho,
      direccion_vivienda_victima: data.direccion_vivienda_victima,
      cod_comuna: data.cod_comuna,
      comuna: data.comuna,
      cod_mujer_gestante_madre: data.cod_mujer_gestante_madre,
      mujer_gestante_madre: data.mujer_gestante_madre,
      cod_num_hijas: data.cod_num_hijas,
      num_hijas_menores_huerfanas_madre: data.num_hijas_menores_huerfanas_madre,
      cod_num_hijos: data.cod_num_hijos,
      num_hijos_menores_huerfanos_madre: data.num_hijos_menores_huerfanos_madre,
      cod_identidad_genero: data.cod_identidad_genero,
      identidad_genero: data.identidad_genero,
      cod_orientacion_sexual: data.cod_orientacion_sexual,
      orientacion_sexual: data.orientacion_sexual,
      cod_identidad_social: data.cod_identidad_social,
      identidad_social: data.identidad_social,
      cod_identidad_politica: data.cod_identidad_politica,
      identidad_politica: data.identidad_politica,
      cod_identidad_etnica: data.cod_identidad_etnica,
      identidad_etnica: data.identidad_etnica,
      cod_perte_etnica_o_racial_victima_mc:
        data.cod_perte_etnica_o_racial_victima_mc,
      perte_etnica_o_racial_victima_mc: data.perte_etnica_o_racial_victima_mc,
      cod_perte_etnica_o_racial_victima_in_ao:
        data.cod_perte_etnica_o_racial_victima_in_ao,
      perte_etnica_o_racial_victima_in_ao:
        data.perte_etnica_o_racial_victima_in_ao,
      cod_comunidad_o_territ_colect_victima_in:
        data.cod_comunidad_o_territ_colect_victima_in,
      comunidad_o_territ_colect_victima_in:
        data.comunidad_o_territ_colect_victima_in,
      cod_pueblo_indigena_victima: data.cod_pueblo_indigena_victima,
      pueblo_indigena_victima: data.pueblo_indigena_victima,
      nombre_pueblo_indigena_victima: data.nombre_pueblo_indigena_victima,
      cod_zona_geografica: data.cod_zona_geografica,
      zona_geografica: data.zona_geografica,
      cod_num_sujetos_feminicidas: data.cod_num_sujetos_feminicidas,
      num_sujetos_feminicidas: data.num_sujetos_feminicidas,
      cod_actividad_economica_victima: data.cod_actividad_economica_victima,
      actividad_economica_victima: data.actividad_economica_victima,
      cod_oficio_victima: data.cod_oficio_victima,
      oficio_victima: data.oficio_victima,
      cod_arma_utilizada: data.cod_arma_utilizada,
      arma_utilizada: data.arma_utilizada,
      cod_lugar_hechos: data.cod_lugar_hechos,
      lugar_hechos: data.lugar_hechos,
      cod_lugar_encuentra_cadaver: data.cod_lugar_encuentra_cadaver,
      lugar_encuentra_cadaver: data.lugar_encuentra_cadaver,
      cod_metodo_eliminacion: data.cod_metodo_eliminacion,
      metodo_eliminacion: data.metodo_eliminacion,
      edad_victima: data?.edad_victim ||  '',
      cod_rango_edad_victima_anterior: data.cod_rango_edad_victima_anterior,
      rango_edad_victima_anterior: data.rango_edad_victima_anterior,
      cod_rango_edad_victima: data.cod_rango_edad_victima,
      rango_edad_victima: data.rango_edad_victima,
      cod_clasifica_edad_victima: data.cod_clasifica_edad_victima,
      clasifica_edad_victima: data.clasifica_edad_victima,
      cod_antecedentes_criminales_victima:
        data.cod_antecedentes_criminales_victima,
      antecedentes_criminales_victima: data.antecedentes_criminales_victima,
      cod_situacion_discapacidad_victima:
        data.cod_situacion_discapacidad_victima,
      situacion_discapacidad_victima: data.situacion_discapacidad_victima,
      nombre_sujeto_feminicida: data.nombre_sujeto_feminicida,
      alias_sujeto_feminicida: data.alias_sujeto_feminicida,
      edad_sujeto_feminicida: data.edad_sujeto_feminicida,
      cod_rango_edad_sf_anterior: data.cod_rango_edad_sf_anterior,
      rango_edad_sf_anterior: data.rango_edad_sf_anterior,
      cod_rango_edad_sf: data.cod_rango_edad_sf,
      rango_edad_sf: data.rango_edad_sf,
      cod_sujeto_feminicida: data.cod_sujeto_feminicida,
      sujeto_feminicida: data.sujeto_feminicida,
      cod_parentesco_o_relacion: data.cod_parentesco_o_relacion,
      parentesco_o_relacion: data.parentesco_o_relacion,
      cod_sujeto_feminicida_momento_feminicidio:
        data.cod_sujeto_feminicida_momento_feminicidio,
      sujeto_feminicida_momento_feminicidio:
        data.sujeto_feminicida_momento_feminicidio,
      cod_situacion_juridica_sf: data.cod_situacion_juridica_sf,
      situacion_juridica_sf: data.situacion_juridica_sf,
      cod_actividad_economica_sf: data.cod_actividad_economica_sf,
      actividad_economica_sf: data.actividad_economica_sf,
      cod_antecedentes_criminales_sf: data.cod_antecedentes_criminales_sf,
      antecedentes_criminales_sf: data.antecedentes_criminales_sf,
      cod_continuum_violencia_sf: data.cod_continuum_violencia_sf,
      continuum_violencia_sf: data.continuum_violencia_sf,
      cod_perte_etnica_o_racial_sf_mc: data.cod_perte_etnica_o_racial_sf_mc,
      perte_etnica_o_racial_sf_mc: data.perte_etnica_o_racial_sf_mc,
      cod_perte_etnica_o_racial_sf_in_ao:
        data.cod_perte_etnica_o_racial_sf_in_ao,
      perte_etnica_o_racial_sf_in_ao: data.perte_etnica_o_racial_sf_in_ao,
      cod_comunidad_o_territ_colect_sf_in:
        data.cod_comunidad_o_territ_colect_sf_in,
      comunidad_o_territ_colect_sf_in: data.comunidad_o_territ_colect_sf_in,
      cod_nacionalidad_sf_migrante: data.cod_nacionalidad_sf_migrante,
      nacionalidad_sf_migrante: data.nacionalidad_sf_migrante,
      causal_atribuido_feminicidio: data.causal_atribuido_feminicidio,
      desaparecida: data.desaparecida,
      fuente: data.fuente,
      descripcion_informacion_noticia: data.descripcion_informacion_noticia,
      hipotesis: data.hipotesis,
      titular: data.titular,
      link_noticia: data.link_noticia,
      url_corto_noticia: data?.url_corto_noticia ||  '',
      observaciones: data?.observaciones ||  '',
      observaciones_comision_cspm: data?.observaciones_comision_cspm  ||  '',
    };

    // Log data to verify
    console.log(newdata);

    // Query
    const query1 = `
      INSERT INTO feminicidios_tentativas (
        ano,
        mes,
        fecha_violencia,
        fecha_en_prensa,
        cod_tipo_violencia,
        tipo_violencia,
        nombre_victima,
        cod_nacionalidad,
        nacionalidad,
        cod_departamento,
        departamento,
        cod_municipio,
        municipio,
        barrio,
        direccion_hecho,
        direccion_vivienda_victima,
        cod_comuna,
        comuna,
        cod_mujer_gestante_madre,
        mujer_gestante_madre,
        cod_num_hijas,
        num_hijas_menores_huerfanas_madre,
        cod_num_hijos,
        num_hijos_menores_huerfanos_madre,
        cod_identidad_genero,
        identidad_genero,
        cod_orientacion_sexual,
        orientacion_sexual,
        cod_identidad_social,
        identidad_social,
        cod_identidad_politica,
        identidad_politica,
        cod_identidad_etnica,
        identidad_etnica,
        cod_perte_etnica_o_racial_victima_mc,
        perte_etnica_o_racial_victima_mc,
        cod_perte_etnica_o_racial_victima_in_ao,
        perte_etnica_o_racial_victima_in_ao,
        cod_comunidad_o_territ_colect_victima_in,
        comunidad_o_territ_colect_victima_in,
        cod_pueblo_indigena_victima,
        pueblo_indigena_victima,
        nombre_pueblo_indigena_victima,
        cod_zona_geografica,
        zona_geografica,
        cod_num_sujetos_feminicidas,
        num_sujetos_feminicidas,
        cod_actividad_economica_victima,
        actividad_economica_victima,
        cod_oficio_victima,
        oficio_victima,
        cod_arma_utilizada,
        arma_utilizada,
        cod_lugar_hechos,
        lugar_hechos,
        cod_lugar_encuentra_cadaver,
        lugar_encuentra_cadaver,
        cod_metodo_eliminacion,
        metodo_eliminacion,
        edad_victima,
        cod_rango_edad_victima_anterior,
        rango_edad_victima_anterior,
        cod_rango_edad_victima,
        rango_edad_victima,
        cod_clasifica_edad_victima,
        clasifica_edad_victima,
        cod_antecedentes_criminales_victima,
        antecedentes_criminales_victima,
        cod_situacion_discapacidad_victima,
        situacion_discapacidad_victima,
        nombre_sujeto_feminicida,
        alias_sujeto_feminicida,
        edad_sujeto_feminicida,
        cod_rango_edad_sf_anterior,
        rango_edad_sf_anterior,
        cod_rango_edad_sf,
        rango_edad_sf,
        cod_sujeto_feminicida,
        sujeto_feminicida,
        cod_parentesco_o_relacion,
        parentesco_o_relacion,
        cod_sujeto_feminicida_momento_feminicidio,
        sujeto_feminicida_momento_feminicidio,
        cod_situacion_juridica_sf,
        situacion_juridica_sf,
        cod_actividad_economica_sf,
        actividad_economica_sf,
        cod_antecedentes_criminales_sf,
        antecedentes_criminales_sf,
        cod_continuum_violencia_sf,
        continuum_violencia_sf,
        cod_perte_etnica_o_racial_sf_mc,
        perte_etnica_o_racial_sf_mc,
        cod_perte_etnica_o_racial_sf_in_ao,
        perte_etnica_o_racial_sf_in_ao,
        cod_comunidad_o_territ_colect_sf_in,
        comunidad_o_territ_colect_sf_in,
        cod_nacionalidad_sf_migrante,
        nacionalidad_sf_migrante,
        causal_atribuido_feminicidio,
        desaparecida,
        fuente,
        descripcion_informacion_noticia,
        hipotesis,
        titular,
        link_noticia,
        url_corto_noticia,
        observaciones,
        observaciones_comision_cspm
    ) VALUES (
      ${newdata.ano},
      ${newdata.mes},
      '${newdata.fecha_violencia}',
      '${newdata.fecha_en_prensa}',
      ${newdata.cod_tipo_violencia},
      '${newdata.tipo_violencia}',
      '${newdata.nombre_victima}',
      ${newdata.cod_nacionalidad},
      '${newdata.nacionalidad}',
      '${newdata.cod_departamento}',
      '${newdata.departamento}',
      '${newdata.cod_municipio}',
      '${newdata.municipio}',
      '${newdata.barrio}',
      '${newdata.direccion_hecho}',
      '${newdata.direccion_vivienda_victima}',
      ${newdata.cod_comuna},
      '${newdata.comuna}',
      ${newdata.cod_mujer_gestante_madre},
      '${newdata.mujer_gestante_madre}',
      ${newdata.cod_num_hijas},
      '${newdata.num_hijas_menores_huerfanas_madre}',
      ${newdata.cod_num_hijos},
      '${newdata.num_hijos_menores_huerfanos_madre}',
      ${newdata.cod_identidad_genero},
      '${newdata.identidad_genero}',
      ${newdata.cod_orientacion_sexual},
      '${newdata.orientacion_sexual}',
      ${newdata.cod_identidad_social},
      '${newdata.identidad_social}',
      ${newdata.cod_identidad_politica},
      '${newdata.identidad_politica}',
      ${newdata.cod_identidad_etnica},
      '${newdata.identidad_etnica}',
      ${newdata.cod_perte_etnica_o_racial_victima_mc},
      '${newdata.perte_etnica_o_racial_victima_mc}',
      ${newdata.cod_perte_etnica_o_racial_victima_in_ao},
      '${newdata.perte_etnica_o_racial_victima_in_ao}',
      ${newdata.cod_comunidad_o_territ_colect_victima_in},
      '${newdata.comunidad_o_territ_colect_victima_in}',
      ${newdata.cod_pueblo_indigena_victima},
      '${newdata.pueblo_indigena_victima}',
      '${newdata.nombre_pueblo_indigena_victima}',
      ${newdata.cod_zona_geografica},
      '${newdata.zona_geografica}',
      ${newdata.cod_num_sujetos_feminicidas},
      '${newdata.num_sujetos_feminicidas}',
      ${newdata.cod_actividad_economica_victima},
      '${newdata.actividad_economica_victima}',
      ${newdata.cod_oficio_victima},
      '${newdata.oficio_victima}',
      ${newdata.cod_arma_utilizada},
      '${newdata.arma_utilizada}',
      ${newdata.cod_lugar_hechos},
      '${newdata.lugar_hechos}',
      ${newdata.cod_lugar_encuentra_cadaver},
      '${newdata.lugar_encuentra_cadaver}',
      ${newdata.cod_metodo_eliminacion},
      '${newdata.metodo_eliminacion}',
      '${newdata.edad_victima}',
      ${newdata.cod_rango_edad_victima_anterior},
      '${newdata.rango_edad_victima_anterior}',
      ${newdata.cod_rango_edad_victima},
      '${newdata.rango_edad_victima}',
      ${newdata.cod_clasifica_edad_victima},
      '${newdata.clasifica_edad_victima}',
      ${newdata.cod_antecedentes_criminales_victima},
      '${newdata.antecedentes_criminales_victima}',
      ${newdata.cod_situacion_discapacidad_victima},
      '${newdata.situacion_discapacidad_victima}',
      '${newdata.nombre_sujeto_feminicida}',
      '${newdata.alias_sujeto_feminicida}',
      '${newdata.edad_sujeto_feminicida}',
      ${newdata.cod_rango_edad_sf_anterior},
      '${newdata.rango_edad_sf_anterior}',
      ${newdata.cod_rango_edad_sf},
      '${newdata.rango_edad_sf}',
      ${newdata.cod_sujeto_feminicida},
      '${newdata.sujeto_feminicida}',
      ${newdata.cod_parentesco_o_relacion},
      '${newdata.parentesco_o_relacion}',
      ${newdata.cod_sujeto_feminicida_momento_feminicidio},
      '${newdata.sujeto_feminicida_momento_feminicidio}',
      ${newdata.cod_situacion_juridica_sf},
      '${newdata.situacion_juridica_sf}',
      ${newdata.cod_actividad_economica_sf},
      '${newdata.actividad_economica_sf}',
      ${newdata.cod_antecedentes_criminales_sf},
      '${newdata.antecedentes_criminales_sf}',
      ${newdata.cod_continuum_violencia_sf},
      '${newdata.continuum_violencia_sf}',
      ${newdata.cod_perte_etnica_o_racial_sf_mc},
      '${newdata.perte_etnica_o_racial_sf_mc}',
      ${newdata.cod_perte_etnica_o_racial_sf_in_ao},
      '${newdata.perte_etnica_o_racial_sf_in_ao}',
      ${newdata.cod_comunidad_o_territ_colect_sf_in},
      '${newdata.comunidad_o_territ_colect_sf_in}',
      ${newdata.cod_nacionalidad_sf_migrante},
      '${newdata.nacionalidad_sf_migrante}',
      '${newdata.causal_atribuido_feminicidio}',
      '${newdata.desaparecida}',
      '${newdata.fuente}',
      '${newdata.descripcion_informacion_noticia}',
      '${newdata.hipotesis}',
      '${newdata.titular}',
      '${newdata.link_noticia}',
      '${newdata.url_corto_noticia}',
      '${newdata.observaciones}',
      '${newdata.observaciones_comision_cspm}'
    );
    `
    // const query2 = `
    //   INSERT INTO feminicidios_violencia_asociada (
    //     cod_violencia_asociada,
    //     violencia_asociada
    //   ) VALUES (
    //       1, -- cod_violencia_asociada
    //       'Violencia física' -- violencia_asociada
    //   );
    // `

    const response = await conn.query(query1);

    // Devolver la respuesta en formato JSON con los datos procesados
    return NextResponse.json(response);
  } catch (error) {
    // Manejar errores si ocurren durante el proceso
    console.error(error);
    return NextResponse.error();
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Extract data from the body of the request
    const data = await request.json();

    // Make newdata mandatory and contain all variables in the database
    const newData = {
      id: data.id,
      value: capitalizeEachWord(data.value),
    };

    // Log data to verify
    console.log(newData);

    // Query para extraer el ultimo id en la tabla de referencia
    const query1 = `
      SELECT * FROM ${newData.id}
      ORDER BY cod_${newData.id} DESC
      LIMIT 1
    `
    const response1: Array<DBResponse> = await conn.query(query1);
    const newId = getLatestId(response1[0]) + 1;

    // Query to insert the new item in the reference table
    const query2 = `
      INSERT INTO ${newData.id} (
        cod_${newData.id},
        ${newData.id})
          VALUES (
            ${newId},
            '${newData.value}');
    `
    const response2 = await conn.query(query2);

    // Return the format JSON response with the data process
    return NextResponse.json(response2);
  } catch (error) {
    //Handle error in the process
    console.error(error);
    return NextResponse.error();
  }
}