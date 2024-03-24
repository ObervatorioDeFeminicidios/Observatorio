type Field = {
  id: string;
  label: string;
  type: 'text' | 'int' | 'date';
  nullable: boolean;
}

export type Step = {
  id: number;
  name: string;
  href: string;
  status: 'complete' | 'current' | 'upcoming';
  fields: Array<Field>;
};

export const steps: Array<Step> = [
  {
    id: 1,
    name: 'Información de la Víctima',
    href: '#',
    status: 'complete',
    fields: [
      {
        id: 'nombre_victima',
        label: 'Nombre',
        type: 'text',
        nullable: true,
      },
      {
        id: 'direccion_vivienda_victima',
        label: 'Dirección Vivienda',
        type: 'text',
        nullable: false,
      },
      {
        id: 'comuna',
        label: 'Comuna',
        type: 'text',
        nullable: false,
      },
      {
        id: 'nacionalidad',
        label: 'Nacionalidad',
        type: 'text',
        nullable: false,
      },
      {
        id: 'identidad_genero',
        label: 'Identidad de Género',
        type: 'text',
        nullable: false,
      },
      {
        id: 'orientacion_sexual',
        label: 'Orientación Sexual',
        type: 'text',
        nullable: false,
      },
      {
        id: 'identidad_social',
        label: 'Identidad Social',
        type: 'text',
        nullable: false,
      },
      {
        id: 'identidad_politica',
        label: 'Identidad Política',
        type: 'text',
        nullable: false,
      },
      {
        id: 'identidad_etnica',
        label: 'Identidad Étnica',
        type: 'text',
        nullable: false,
      },
    ]
  },
  {
    id: 2,
    name: 'Información del Feminicidio',
    href: '#',
    status: 'current',
    fields: [
      {
        id: 'ano',
        label: 'Año',
        type: 'int',
        nullable: false,
      },
      {
        id: 'mes',
        label: 'Mes',
        type: 'int',
        nullable: false,
      },
      {
        id: 'fecha_violencia',
        label: 'Fecha Violencia',
        type: 'date',
        nullable: true,
      },
      {
        id: 'fecha_en_prensa',
        label: 'Fecha en Prensa',
        type: 'text',
        nullable: true,
      },
      {
        id: 'tipo_violencia',
        label: 'Tipo de Violencia',
        type: 'text',
        nullable: false,
      },
      {
        id: 'departamento',
        label: 'Departamento',
        type: 'text',
        nullable: false,
      },
      {
        id: 'municipio',
        label: 'Municipio',
        type: 'text',
        nullable: false,
      },
      {
        id: 'barrio',
        label: 'Barrio',
        type: 'text',
        nullable: false,
      },
      {
        id: 'direccion_hecho',
        label: 'Dirección Hecho',
        type: 'text',
        nullable: false,
      },
    ]
  },
  {
    id: 3,
    name: 'Información del Agresor',
    href: '#',
    status: 'upcoming',
    fields: [
      {
        id: 'nombre_sujeto_feminicida',
        label: 'Nombre',
        type: 'text',
        nullable: false,
      },
      {
        id: 'alias_sujeto_feminicida',
        label: 'Alias',
        type: 'text',
        nullable: false,
      },
      {
        id: 'edad_sujeto_feminicida',
        label: 'Edad',
        type: 'text',
        nullable: false,
      },
      {
        id: 'sujeto_feminicida',
        label: 'Sujeto',
        type: 'text',
        nullable: false,
      },
      {
        id: 'parentesco_o_relacion',
        label: 'Parentesco o Relación',
        type: 'text',
        nullable: false,
      },
      {
        id: 'sujeto_feminicida_momento_feminicidio',
        label: 'Sujeto Feminicida Momento Feminicidio',
        type: 'text',
        nullable: false,
      },
      {
        id: 'situacion_juridica_sf',
        label: 'Situación Jurídica',
        type: 'text',
        nullable: false,
      },
      {
        id: 'actividad_economica_sf',
        label: 'Actividad Económica',
        type: 'text',
        nullable: false,
      },
      {
        id: 'antecedentes_criminales_sf',
        label: 'Antecedentes Criminales',
        type: 'text',
        nullable: false,
      },
    ]
  },
  {
    id: 4,
    name: 'Información Adicional',
    href: '#',
    status: 'upcoming',
    fields: [
      {
        id: 'causal_atribuido_feminicidio',
        label: 'Causal Atribuido',
        type: 'text',
        nullable: false,
      },
      {
        id: 'desaparecida',
        label: 'Desaparecida',
        type: 'text',
        nullable: false,
      },
      {
        id: 'fuente',
        label: 'Fuente',
        type: 'text',
        nullable: false,
      },
      {
        id: 'descripcion_informacion_noticia',
        label: 'Descripcion Informacion Noticia',
        type: 'text',
        nullable: false,
      },
      {
        id: 'hipotesis',
        label: 'Hipótesis',
        type: 'text',
        nullable: false,
      },
      {
        id: 'titular',
        label: 'Titular',
        type: 'text',
        nullable: false,
      },
      {
        id: 'link_noticia',
        label: 'Link Noticia',
        type: 'text',
        nullable: false,
      },
      {
        id: 'url_corto_noticia',
        label: 'URL Corto Noticia',
        type: 'text',
        nullable: true,
      },
      {
        id: 'observaciones',
        label: 'Observaciones',
        type: 'text',
        nullable: true,
      },
      {
        id: 'observaciones_comision_cspm',
        label: 'Observaciones Comision CSPM',
        type: 'text',
        nullable: true,
      },
    ]
  },
];