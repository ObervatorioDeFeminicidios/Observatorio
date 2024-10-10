import { OptionField } from "@/types";

interface AssociatedViolenceEntity {
  value: string;
  label: string;
}

export type Register = {
  numero_violencia: number;
  nombre_victima: string;
  direccion_vivienda_victima: string;
  nombre_pueblo_indigena_victima: string;
  edad_victima: string;
  nacionalidad: string;
  mujer_gestante_madre: string;
  num_hijas: string;
  num_hijos: string;
  identidad_genero: string;
  orientacion_sexual: string;
  identidad_social: string;
  identidad_politica: string;
  identidad_etnica: string;
  perte_etnica_o_racial_victima_mc: string;
  perte_etnica_o_racial_victima_in_ao: string;
  comunidad_o_territ_colect_victima_in: string;
  pueblo_indigena_victima: string;
  actividad_economica_victima: string;
  oficio_victima: string;
  rango_edad_victima_anterior: string;
  rango_edad_victima: string;
  clasifica_edad_victima: string;
  antecedentes_criminales_victima: string;
  situacion_discapacidad_victima: string;
  fecha_violencia: string;
  ano: number;
  mes: number;
  barrio: string;
  direccion_hecho: string;
  tipo_violencia: string;
  departamento: string;
  municipio: string;
  comuna: string;
  zona_geografica: string;
  arma_utilizada: string;
  lugar_hechos: string;
  lugar_encuentra_cadaver: string;
  metodo_eliminacion: string;
  postal: string;
  violencia_asociada?: AssociatedViolenceEntity[] | null;
  alias_sujeto_feminicida: string;
  edad_sujeto_feminicida: string;
  nombre_sujeto_feminicida: string;
  num_sujetos_feminicidas: string;
  rango_edad_sf_anterior: string;
  rango_edad_sf: string;
  sujeto_feminicida: string;
  parentesco_o_relacion: string;
  sujeto_feminicida_momento_feminicidio: string;
  situacion_juridica_sf: string;
  actividad_economica_sf: string;
  antecedentes_criminales_sf: string;
  continuum_violencia_sf: string;
  perte_etnica_o_racial_sf_mc: string;
  perte_etnica_o_racial_sf_in_ao: string;
  comunidad_o_territ_colect_sf_in: string;
  nacionalidad_sf_migrante: string;
  fecha_en_prensa: string;
  causal_atribuido_feminicidio: string;
  fuente: string;
  descripcion_informacion_noticia: string;
  hipotesis: string;
  titular: string;
  link_noticia: string;
  url_corto_noticia: string;
  observaciones: string;
  observaciones_comision_cspm: string;
  desaparecida: string;
  cod_nacionalidad: number;
  cod_mujer_gestante_madre: number;
  cod_num_hijas: number;
  cod_num_hijos: number;
  cod_identidad_genero: number;
  cod_orientacion_sexual: number;
  cod_identidad_social: number;
  cod_identidad_politica: number;
  cod_identidad_etnica: number;
  cod_perte_etnica_o_racial_victima_mc: number;
  cod_perte_etnica_o_racial_victima_in_ao: number;
  cod_comunidad_o_territ_colect_victima_in: number;
  cod_pueblo_indigena_victima: number;
  cod_actividad_economica_victima: number;
  cod_oficio_victima: number;
  cod_rango_edad_victima_anterior: number;
  cod_rango_edad_victima: number;
  cod_clasifica_edad_victima: number;
  cod_antecedentes_criminales_victima: number;
  cod_situacion_discapacidad_victima: number;
  cod_tipo_violencia: number;
  cod_departamento: string;
  cod_municipio: string;
  cod_comuna: number;
  cod_postal: string;
  cod_zona_geografica: number;
  cod_arma_utilizada: number;
  cod_lugar_hechos: number;
  cod_lugar_encuentra_cadaver: number;
  cod_metodo_eliminacion: number;
  cod_num_sujetos_feminicidas: number;
  cod_rango_edad_sf_anterior: number;
  cod_rango_edad_sf: number;
  cod_sujeto_feminicida: number;
  cod_parentesco_o_relacion: number;
  cod_sujeto_feminicida_momento_feminicidio: number;
  cod_situacion_juridica_sf: number;
  cod_actividad_economica_sf: number;
  cod_antecedentes_criminales_sf: number;
  cod_continuum_violencia_sf: number;
  cod_perte_etnica_o_racial_sf_mc: number;
  cod_perte_etnica_o_racial_sf_in_ao: number;
  cod_comunidad_o_territ_colect_sf_in: number;
  cod_nacionalidad_sf_migrante: number;
  cod_desaparecida: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type OkPacket = {
  affectedRows: number;
  insertId: number;
  error?: string;
  associatedViolence?: OptionField;
};

// Define the type for the result of an individual associated violence insertion
export interface ViolenceResult {
  error?: Error;
  associatedViolence?: OptionField;
  affectedRows?: number;
  insertId?: number;
}

// Define the type for the function's return value
export interface InsertDataResult {
  success: boolean;
  message?: string;
  errors?:
    | string
    | null
    | Array<{
        associatedViolence?: OptionField | null;
        error?: string | null;
      }>;
  result?: object;
  insertId?: number;
}

// Define the type for the paginated history registers
export type TotalRecordsResult = {
  totalRecords: number;
}

export type RegistersResult = {
  success: boolean;
  pageIndex: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  results: Register[];
}
