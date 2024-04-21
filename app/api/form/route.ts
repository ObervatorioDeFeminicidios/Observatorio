import { transformObject } from '@/app/utils/transform-object';
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
    // Extraer los datos del cuerpo de la solicitud
    const data = await request.json();

    // Hacer que newdata sea obligatorio y contenga todas las variables de la base de datos
    const newdata = {
      ano: data.ano,
      mes: data.mes,
      fecha_violencia: data.fecha_violencia,
      fecha_en_prensa: data.fecha_en_prensa,
      cod_tipo_violencia: data.cod_tipo_violencia,
      tipo_violencia: data.tipo_violencia,
      nombre_victima: data.nombre_victima,
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
      edad_victima: data.edad_victima,
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
      url_corto_noticia: data.url_corto_noticia,
      observaciones: data.observaciones,
      observaciones_comision_cspm: data.observaciones_comision_cspm,
    };

    // Logear los datos para verificar
    console.log(newdata);

    // Devolver la respuesta en formato JSON con los datos procesados
    return NextResponse.json(newdata);
  } catch (error) {
    // Manejar errores si ocurren durante el proceso
    console.error(error);
    return NextResponse.error();
  }
}
