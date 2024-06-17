import { z } from 'zod';
import { InsertDataResult } from './definitions';

export const FIRST_TABLE = 'feminicidios_tentativas';
export const SECOND_TABLE = 'feminicidios_violencia_asociada';
export const VIOLENCIA_ASOCIADA = 'violencia_asociada';

interface ISchema {
  [key: string]: any;
}

export const INITAL_RESULT: InsertDataResult = {
  success: false,
  errors: '',
};

// Setting the schema of each field based on the type
const setFieldSchema = (schema: ISchema, field: TransformedObject) => {
  switch (field.type) {
    case 'text':
      schema[field.id] = field.nullable
        ? z.string().optional()
        : z
            .string()
            .trim()
            .min(1, { message: `${field.label} no puede estar vacío` });
      break;
    case 'select':
      schema[field.id] = field.nullable
        ? z.string().optional()
        : z.string().min(1, {
            message: `Debe elegir una opción para ${field.label}`,
          });
      break;
    case 'select-multiple':
      const arraySchema = z.array(
        z.object({ value: z.string(), label: z.string() }),
      );
      schema[field.id] = field.nullable
        ? z
            .union([
              arraySchema,
              z
                .string()
                .refine(() => false, {
                  message: `Debe elegir una opción para ${field.label}`,
                }),
            ])
            .optional()
        : z
            .union([
              arraySchema,
              z
                .string()
                .refine(() => false, {
                  message: `Debe elegir una opción para ${field.label}`,
                }),
            ])
            .refine((value) => Array.isArray(value), {
              message: `Debe elegir una opción para ${field.label}`,
            });
      break;
    case 'int':
      schema[field.id] = field.nullable
        ? z
            .number()
            .optional()
            .transform((v) => Number(v) || 0)
        : z
            .number({
              required_error: `${field.label} no puede estar vacío`,
              invalid_type_error: `Se esperaba un número`,
            })
            .transform((v) => Number(v) || 0);
      break;
    case 'date':
      schema[field.id] = field.nullable
        ? z.string().optional()
        : z.string({
            required_error: `${field.label} no puede estar vacío`,
            invalid_type_error: `Se esperaba una fecha`,
          });
      break;
    default:
      break;
  }
  return schema;
};

// Setting the schema of each step of the multistep form
export function getSchemaByStep(fields: TransformedObject[]) {
  return z.object(
    fields.reduce((schema: ISchema, field) => {
      return setFieldSchema(schema, field);
    }, {}),
  );
}

// Getting the general form schema
export function getSchema(steps: Step[]) {
  return z.object(
    steps.reduce((schema: ISchema, step) => {
      step.fields.forEach((field) => {
        return setFieldSchema(schema, field);
      });
      return schema;
    }, {}),
  );
}

// Getting the default values of the form fields
export function getDefaultValues(steps: Step[]) {
  return steps.reduce((values: { [key: string]: string }, step) => {
    step.fields.forEach((field) => {
      const predifenedIds = [
        'alias_sujeto_feminicida',
        'nombre_sujeto_feminicida',
        'edad_sujeto_feminicida',
      ];
      if (predifenedIds.includes(field.id)) {
        values[field.id] = 'Sin información';
      } else {
        values[field.id] = '';
      }
    });
    return values;
  }, {});

  // const mockData = {
  //   nombre_victima: 'NV',
  //   direccion_vivienda_victima: 'DVV',
  //   nombre_pueblo_indigena_victima: 'NPIV',
  //   edad_victima: '22',
  //   nacionalidad: 'Angola',
  //   mujer_gestante_madre: 'Mujer no gestante y sin hijas e hijos',
  //   num_hijas: '0',
  //   num_hijos: '0',
  //   identidad_genero: 'Mujer Cis',
  //   orientacion_sexual: 'Lesbiana',
  //   identidad_social: 'Campesina',
  //   identidad_politica: 'Lideresa sindicalista',
  //   identidad_etnica: 'Afro',
  //   perte_etnica_o_racial_victima_mc: 'Negra',
  //   perte_etnica_o_racial_victima_in_ao: 'Negra',
  //   comunidad_o_territ_colect_victima_in: 'Consejo Comunitario',
  //   pueblo_indigena_victima: 'Pueblo',
  //   actividad_economica_victima: 'Trabajadora informal',
  //   oficio_victima: 'Estudiante',
  //   rango_edad_victima_anterior: '00-04',
  //   rango_edad_victima: '00 a 04',
  //   clasifica_edad_victima: 'Mayor de edad',
  //   antecedentes_criminales_victima: 'Sin información',
  //   situacion_discapacidad_victima: 'Ninguna',
  //   fecha_violencia: '2024-05-01',
  //   ano: 2024,
  //   mes: 4,
  //   barrio: 'B',
  //   direccion_hecho: 'DH',
  //   tipo_violencia: 'Feminicidio',
  //   departamento: 'Antioquia',
  //   municipio: 'Medellín',
  //   comuna: 'Laureles-Estadio',
  //   zona_geografica: 'Zona rural',
  //   arma_utilizada: 'Arma de fuego',
  //   lugar_hechos: 'Vía urbana',
  //   lugar_encuentra_cadaver: 'Vía urbana',
  //   metodo_eliminacion: 'Apuñalada',
  //   violencia_asociada: [
  //     {
  //       value: '1',
  //       label: 'Baleada',
  //     },
  //     {
  //       value: '2',
  //       label: 'Apuñalada',
  //     },
  //     {
  //       value: '3',
  //       label: 'Asfixiada',
  //     },
  //   ],
  //   postal: '050001',
  //   alias_sujeto_feminicida: 'ASF',
  //   edad_sujeto_feminicida: '31',
  //   nombre_sujeto_feminicida: 'NSF',
  //   num_sujetos_feminicidas: '1',
  //   rango_edad_sf_anterior: '00-04',
  //   rango_edad_sf: '00 a 04',
  //   sujeto_feminicida: 'Paramilitar',
  //   parentesco_o_relacion: 'Compañero permanente',
  //   sujeto_feminicida_momento_feminicidio: 'Autolesionado',
  //   situacion_juridica_sf: 'Condenado como reo ausente y orden de captra',
  //   actividad_economica_sf: 'Campesino',
  //   antecedentes_criminales_sf: 'Sin información',
  //   continuum_violencia_sf: 'Sin información',
  //   perte_etnica_o_racial_sf_mc: 'Negro',
  //   perte_etnica_o_racial_sf_in_ao: 'Negro',
  //   comunidad_o_territ_colect_sf_in: 'Consejo Comunitario',
  //   nacionalidad_sf_migrante: 'Angola',
  //   fecha_en_prensa: 'FP',
  //   causal_atribuido_feminicidio: 'CAF',
  //   desaparecida: 'Sin información',
  //   fuente: 'F',
  //   descripcion_informacion_noticia: 'DIN',
  //   hipotesis: 'H',
  //   titular: 'T',
  //   link_noticia: 'LN',
  //   url_corto_noticia: 'URL',
  //   observaciones: 'O',
  //   observaciones_comision_cspm: 'CSPM',
  //   cod_nacionalidad: 1,
  //   cod_mujer_gestante_madre: 1,
  //   cod_num_hijas: 1,
  //   cod_num_hijos: 1,
  //   cod_identidad_genero: 1,
  //   cod_orientacion_sexual: 1,
  //   cod_identidad_social: 1,
  //   cod_identidad_politica: 1,
  //   cod_identidad_etnica: 2,
  //   cod_perte_etnica_o_racial_victima_mc: 1,
  //   cod_perte_etnica_o_racial_victima_in_ao: 1,
  //   cod_comunidad_o_territ_colect_victima_in: 1,
  //   cod_pueblo_indigena_victima: 1,
  //   cod_actividad_economica_victima: 1,
  //   cod_oficio_victima: 1,
  //   cod_rango_edad_victima_anterior: 1,
  //   cod_rango_edad_victima: 1,
  //   cod_clasifica_edad_victima: 1,
  //   cod_antecedentes_criminales_victima: 1,
  //   cod_situacion_discapacidad_victima: 1,
  //   cod_tipo_violencia: 1,
  //   cod_departamento: '05',
  //   cod_municipio: '001',
  //   cod_comuna: 11,
  //   cod_zona_geografica: 1,
  //   cod_arma_utilizada: 1,
  //   cod_lugar_hechos: 1,
  //   cod_lugar_encuentra_cadaver: 1,
  //   cod_metodo_eliminacion: 1,
  //   cod_postal: '050001',
  //   cod_num_sujetos_feminicidas: 1,
  //   cod_rango_edad_sf_anterior: 1,
  //   cod_rango_edad_sf: 1,
  //   cod_sujeto_feminicida: 1,
  //   cod_parentesco_o_relacion: 1,
  //   cod_sujeto_feminicida_momento_feminicidio: 1,
  //   cod_situacion_juridica_sf: 1,
  //   cod_actividad_economica_sf: 1,
  //   cod_antecedentes_criminales_sf: 1,
  //   cod_continuum_violencia_sf: 1,
  //   cod_perte_etnica_o_racial_sf_mc: 1,
  //   cod_perte_etnica_o_racial_sf_in_ao: 1,
  //   cod_comunidad_o_territ_colect_sf_in: 1,
  //   cod_nacionalidad_sf_migrante: 1,
  //   cod_desaparecida: 2,
  // };

  // return mockData;
}

// Mutating the DB data in order to set the correct field type
export function mutateRawData(rawData: DataBaseField[]): DataBaseField[] {
  return rawData.map((field) => {
    const type: BaseFieldType =
      field.id === 'cod_violencia_asociada'
        ? 'select-multiple'
        : !!field?.options
          ? 'select'
          : field.type;

    return {
      ...field,
      type,
    };
  });
}

// Transforming the mutated data the get the list of options
export function transformObject(fields: DataBaseField[]): TransformedObject[] {
  const transfomedObjects: TransformedObject[] = [];

  fields.forEach((item) => {
    // Checking if the field id has the list of values -> cod_
    if (item.id.startsWith('cod_')) {
      const values = item?.options?.split(',');
      let options: Option[] = [];

      if (values) {
        // Matching the value with its corresponding label
        options = values.map((value, index) => ({
          value: parseInt(value.trim()),
          label:
            fields
              .find((obj) => obj.id === item.id.substring(4))
              ?.options?.split(',')
              [index]?.trim() || '',
        }));
      }

      // Coupling the field data with the defined schema
      const transformedObject: TransformedObject = {
        id: item.id.replace('cod_', ''),
        type: item.type as BaseFieldType,
        nullable: item.nullable === 'YES' ? true : false,
        updatable: item.updatable,
        label: item.label,
        options,
      };

      transfomedObjects.push(transformedObject);
    } else {
      // Checking if the field has no a list of options
      if (item.type !== 'select' && item.type !== 'select-multiple') {
        transfomedObjects.push({
          ...item,
          nullable: item.nullable === 'YES' ? true : false,
          options: [],
        });
      }
    }
  });

  return transfomedObjects;
}

// Custom comparison object to sort by type
export function compareByType(a: TransformedObject, b: TransformedObject) {
  // Defining the priority of order by type
  const typePriority: { [key: string]: number } = {
    date: 0,
    int: 1,
    text: 2,
    select: 3,
    'select-multiple': 4,
  };

  const priorityA = typePriority[a.type];
  const priorityB = typePriority[b.type];

  // Compare based on priority
  if (priorityA < priorityB) {
    return -1;
  } else if (priorityA > priorityB) {
    return 1;
  } else {
    // Equal priorities, maintain the original order
    return 0;
  }
}

// Getting the latest id of a list to identify the next id to be inserted
export function getLatestId(data: DBResponse): number {
  let latestId = null;

  for (let key in data) {
    if (key.startsWith('cod_')) {
      latestId = data[key] as number;
      break;
    }
  }

  return latestId || 0;
}
