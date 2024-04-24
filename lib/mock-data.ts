export const formData1: TransformedObject[] = [
  {
    id: 'identidad_etnica',
    type: 'select',
    nullable: false,
    label: 'Identidad Etnica',
    options: [
      {
        value: 2,
        label: 'Afro',
      },
      {
        value: 5,
        label: 'Indígena',
      },
      {
        value: 6,
        label: 'Mestiza',
      },
      {
        value: 7,
        label: 'Sin información',
      },
    ],
  },
  {
    id: 'edad_victima',
    type: 'text',
    nullable: false,
    label: 'Edad Victima',
    options: [],
  },
  {
    id: 'nombre_victima',
    type: 'text',
    nullable: false,
    label: 'Nombre Victima',
    options: [],
  },
];

// export const formData1: TransformedObject[] = [
//   {
//     id: 'actividad_economica_victima',
//     type: 'select',
//     nullable: false,
//     label: 'Actividad Economica Victima',
//     options: [
//       {
//         value: 1,
//         label: 'Trabajadora informal',
//       },
//       {
//         value: 2,
//         label: 'Trabajadora formal',
//       },
//       {
//         value: 3,
//         label: 'Trabajadora sexual',
//       },
//       {
//         value: 4,
//         label: 'Expendedora de drogas',
//       },
//       {
//         value: 5,
//         label: 'Obrera',
//       },
//       {
//         value: 6,
//         label: 'Trabajo reproductivo exclusivo en el hogar',
//       },
//       {
//         value: 7,
//         label: 'Jubilada',
//       },
//       {
//         value: 8,
//         label: 'Dueña de negocio',
//       },
//       {
//         value: 9,
//         label: 'Sin información',
//       },
//       {
//         value: 10,
//         label: 'No aplica',
//       },
//       {
//         value: 11,
//         label: 'Desempleada',
//       },
//       {
//         value: 12,
//         label: 'Modelo Web Cam',
//       },
//       {
//         value: 13,
//         label: 'Vendedora informal',
//       },
//       {
//         value: 14,
//         label: 'Contadora',
//       },
//     ],
//   },
//   {
//     id: 'comunidad_o_territ_colect_victima_in',
//     type: 'select',
//     nullable: false,
//     label: 'Comunidad o Territ Colect Victima IN',
//     options: [
//       {
//         value: 1,
//         label: 'Consejo Comunitario',
//       },
//       {
//         value: 2,
//         label: 'Resguardo',
//       },
//       {
//         value: 3,
//         label: 'Sin información',
//       },
//       {
//         value: 4,
//         label: 'No aplica',
//       },
//     ],
//   },
//   {
//     id: 'identidad_etnica',
//     type: 'select',
//     nullable: false,
//     label: 'Identidad Etnica',
//     options: [
//       {
//         value: 2,
//         label: 'Afro',
//       },
//       {
//         value: 5,
//         label: 'Indígena',
//       },
//       {
//         value: 6,
//         label: 'Mestiza',
//       },
//       {
//         value: 7,
//         label: 'Sin información',
//       },
//     ],
//   },
//   {
//     id: 'identidad_genero',
//     type: 'select',
//     nullable: false,
//     label: 'Identidad Genero',
//     options: [
//       {
//         value: 1,
//         label: 'Mujer Cis',
//       },
//       {
//         value: 2,
//         label: 'Mujer Trans',
//       },
//       {
//         value: 3,
//         label: 'Hombre Trans',
//       },
//       {
//         value: 4,
//         label: 'Sin información',
//       },
//     ],
//   },
//   {
//     id: 'identidad_social',
//     type: 'select',
//     nullable: false,
//     label: 'Identidad Social',
//     options: [
//       {
//         value: 1,
//         label: 'Campesina',
//       },
//       {
//         value: 2,
//         label: 'Reclamante de tierras',
//       },
//       {
//         value: 3,
//         label: 'Migrante',
//       },
//       {
//         value: 4,
//         label: 'Extranjera visitante',
//       },
//       {
//         value: 5,
//         label: 'Extranjera residente',
//       },
//       {
//         value: 6,
//         label: 'Lideresa indígena',
//       },
//       {
//         value: 7,
//         label: 'Lideresa campesina',
//       },
//       {
//         value: 8,
//         label: 'Lideresa comunitaria',
//       },
//       {
//         value: 9,
//         label: 'Lideresa negra',
//       },
//       {
//         value: 10,
//         label: 'Habitante de calle',
//       },
//       {
//         value: 11,
//         label: 'Mujer urbana',
//       },
//       {
//         value: 12,
//         label: 'Defensora derechos humanos',
//       },
//       {
//         value: 13,
//         label: 'Sin información',
//       },
//       {
//         value: 14,
//         label: 'No aplica',
//       },
//     ],
//   },
//   {
//     id: 'mujer_gestante_madre',
//     type: 'select',
//     nullable: false,
//     label: 'Mujer Gestante Madre',
//     options: [
//       {
//         value: 1,
//         label: 'Mujer no gestante y sin hijas e hijos',
//       },
//       {
//         value: 2,
//         label: 'Mujer madre y embarazada',
//       },
//       {
//         value: 3,
//         label: 'Embarazada',
//       },
//       {
//         value: 4,
//         label: 'Madre',
//       },
//       {
//         value: 5,
//         label: 'Sin información',
//       },
//       {
//         value: 6,
//         label: 'No aplica (niñas)',
//       },
//     ],
//   },
//   {
//     id: 'nacionalidad',
//     type: 'select',
//     nullable: false,
//     label: 'Nacionalidad',
//     options: [
//       {
//         value: 1,
//         label: 'Angola',
//       },
//       {
//         value: 2,
//         label: 'Argelia',
//       },
//       {
//         value: 3,
//         label: 'Benín',
//       },
//       {
//         value: 4,
//         label: 'Botsuana',
//       },
//       {
//         value: 5,
//         label: 'Burkina Faso',
//       },
//       {
//         value: 6,
//         label: 'Burundi',
//       },
//       {
//         value: 7,
//         label: 'Cabo Verde',
//       },
//       {
//         value: 8,
//         label: 'Camerún',
//       },
//       {
//         value: 9,
//         label: 'Chad',
//       },
//       {
//         value: 10,
//         label: 'Comoras',
//       },
//       {
//         value: 11,
//         label: 'Costa de Marfil',
//       },
//       {
//         value: 12,
//         label: 'Egipto',
//       },
//       {
//         value: 13,
//         label: 'Eritrea',
//       },
//       {
//         value: 14,
//         label: 'Etiopía',
//       },
//       {
//         value: 15,
//         label: 'Gabón',
//       },
//       {
//         value: 16,
//         label: 'Gambia',
//       },
//       {
//         value: 17,
//         label: 'Ghana',
//       },
//       {
//         value: 18,
//         label: 'Guinea',
//       },
//       {
//         value: 19,
//         label: 'Guinea Ecuatorial',
//       },
//       {
//         value: 20,
//         label: 'Guinea-Bisáu',
//       },
//       {
//         value: 21,
//         label: 'Kenia',
//       },
//       {
//         value: 22,
//         label: 'Lesoto',
//       },
//       {
//         value: 23,
//         label: 'Liberia',
//       },
//       {
//         value: 24,
//         label: 'Libia',
//       },
//       {
//         value: 25,
//         label: 'Madagascar',
//       },
//       {
//         value: 26,
//         label: 'Malaui',
//       },
//       {
//         value: 27,
//         label: 'Malí',
//       },
//       {
//         value: 28,
//         label: 'Marruecos',
//       },
//       {
//         value: 29,
//         label: 'Mauricio',
//       },
//       {
//         value: 30,
//         label: 'Mauritania',
//       },
//       {
//         value: 31,
//         label: 'Mozambique',
//       },
//       {
//         value: 32,
//         label: 'Namibia',
//       },
//       {
//         value: 33,
//         label: 'Níger',
//       },
//       {
//         value: 34,
//         label: 'Nigeria',
//       },
//       {
//         value: 35,
//         label: 'Nombre oficial',
//       },
//       {
//         value: 36,
//         label: 'República Centroafricana',
//       },
//       {
//         value: 37,
//         label: 'República del Congo',
//       },
//       {
//         value: 38,
//         label: 'República Democrática del Congo',
//       },
//       {
//         value: 39,
//         label: 'Ruanda',
//       },
//       {
//         value: 40,
//         label: 'Sahara Occidental',
//       },
//       {
//         value: 41,
//         label: 'Santo Tomé y Príncipe',
//       },
//       {
//         value: 42,
//         label: 'Senegal',
//       },
//       {
//         value: 43,
//         label: 'Seychelles',
//       },
//       {
//         value: 44,
//         label: 'Sierra Leona',
//       },
//       {
//         value: 45,
//         label: 'Somalia',
//       },
//       {
//         value: 46,
//         label: 'Somalilandia',
//       },
//       {
//         value: 47,
//         label: 'Suazilandia',
//       },
//       {
//         value: 48,
//         label: 'Sudáfrica',
//       },
//       {
//         value: 49,
//         label: 'Sudán',
//       },
//       {
//         value: 50,
//         label: 'Sudán del Sur',
//       },
//       {
//         value: 51,
//         label: 'Tanzania',
//       },
//       {
//         value: 52,
//         label: 'Togo',
//       },
//       {
//         value: 53,
//         label: 'Túnez',
//       },
//       {
//         value: 54,
//         label: 'Uganda',
//       },
//       {
//         value: 55,
//         label: 'Yibuti',
//       },
//       {
//         value: 56,
//         label: 'Zambia',
//       },
//       {
//         value: 57,
//         label: 'Zimbabue',
//       },
//       {
//         value: 58,
//         label: 'Antigua y Barbuda',
//       },
//       {
//         value: 59,
//         label: 'Argentina',
//       },
//       {
//         value: 60,
//         label: 'Bahamas',
//       },
//       {
//         value: 61,
//         label: 'Barbados',
//       },
//       {
//         value: 62,
//         label: 'Belice',
//       },
//       {
//         value: 63,
//         label: 'Bolivia',
//       },
//       {
//         value: 64,
//         label: 'Brasil',
//       },
//       {
//         value: 65,
//         label: 'Canadá',
//       },
//       {
//         value: 66,
//         label: 'Chile',
//       },
//       {
//         value: 67,
//         label: 'Colombia',
//       },
//       {
//         value: 68,
//         label: 'Costa Rica',
//       },
//       {
//         value: 69,
//         label: 'Cuba',
//       },
//       {
//         value: 70,
//         label: 'Dominica',
//       },
//       {
//         value: 71,
//         label: 'Ecuador',
//       },
//       {
//         value: 72,
//         label: 'El Salvador',
//       },
//       {
//         value: 73,
//         label: 'Estados Unidos',
//       },
//       {
//         value: 74,
//         label: 'Granada',
//       },
//       {
//         value: 75,
//         label: 'Guatemala',
//       },
//       {
//         value: 76,
//         label: 'Guyana',
//       },
//       {
//         value: 77,
//         label: 'Haití',
//       },
//       {
//         value: 78,
//         label: 'Honduras',
//       },
//       {
//         value: 79,
//         label: 'Jamaica',
//       },
//       {
//         value: 80,
//         label: 'México',
//       },
//       {
//         value: 81,
//         label: 'Nicaragua',
//       },
//       {
//         value: 82,
//         label: 'Panamá',
//       },
//       {
//         value: 83,
//         label: 'Paraguay',
//       },
//       {
//         value: 84,
//         label: 'Perú',
//       },
//       {
//         value: 85,
//         label: 'Puerto Rico',
//       },
//       {
//         value: 86,
//         label: 'República Dominicana',
//       },
//       {
//         value: 87,
//         label: 'San Cristóbal y Nieves',
//       },
//       {
//         value: 88,
//         label: 'San Vicente y las Granadinas',
//       },
//       {
//         value: 89,
//         label: 'Santa Lucía',
//       },
//       {
//         value: 90,
//         label: 'Surinam',
//       },
//       {
//         value: 91,
//         label: 'Trinidad y Tobago',
//       },
//       {
//         value: 92,
//         label: 'Uruguay',
//       },
//       {
//         value: 93,
//         label: 'Venezuela',
//       },
//       {
//         value: 94,
//         label: 'Afganistán',
//       },
//       {
//         value: 95,
//         label: 'Arabia Saudita',
//       },
//       {
//         value: 96,
//         label: 'Armenia',
//       },
//       {
//         value: 97,
//         label: 'Azerbaiyán',
//       },
//     ],
//   },
//   {
//     id: 'oficio_victima',
//     type: 'select',
//     nullable: false,
//     label: 'Oficio Victima',
//     options: [
//       {
//         value: 1,
//         label: 'Estudiante',
//       },
//       {
//         value: 2,
//         label: 'Profesora',
//       },
//       {
//         value: 3,
//         label: 'Servicios generales',
//       },
//       {
//         value: 4,
//         label: 'Estilista',
//       },
//       {
//         value: 5,
//         label: 'Comerciante',
//       },
//       {
//         value: 6,
//         label: 'Sin información',
//       },
//       {
//         value: 7,
//         label: 'Otra',
//       },
//       {
//         value: 8,
//         label: 'No aplica',
//       },
//       {
//         value: 9,
//         label: 'Enfermera',
//       },
//       {
//         value: 10,
//         label: 'Administradora',
//       },
//       {
//         value: 11,
//         label: 'Trabajo exclusivo en el hogar',
//       },
//     ],
//   },
//   {
//     id: 'orientacion_sexual',
//     type: 'select',
//     nullable: false,
//     label: 'Orientacion Sexual',
//     options: [
//       {
//         value: 1,
//         label: 'Lesbiana',
//       },
//       {
//         value: 2,
//         label: 'Bisexual',
//       },
//       {
//         value: 3,
//         label: 'Heterosexual',
//       },
//       {
//         value: 4,
//         label: 'Pansexual',
//       },
//       {
//         value: 5,
//         label: 'Otra orientación sexual',
//       },
//       {
//         value: 6,
//         label: 'No aplica',
//       },
//       {
//         value: 7,
//         label: 'Sin información',
//       },
//     ],
//   },
//   {
//     id: 'perte_etnica_o_racial_sf_in_ao',
//     type: 'select',
//     nullable: false,
//     label: 'Perte Etnica o Racial SF IN AO',
//     options: [
//       {
//         value: 1,
//         label: 'Negro',
//       },
//       {
//         value: 2,
//         label: 'Afrodescendiente de piel clara',
//       },
//       {
//         value: 3,
//         label: 'Indígena',
//       },
//       {
//         value: 4,
//         label: 'Sin información',
//       },
//     ],
//   },
//   {
//     id: 'perte_etnica_o_racial_sf_mc',
//     type: 'select',
//     nullable: false,
//     label: 'Perte Etnica o Racial SF MC',
//     options: [
//       {
//         value: 1,
//         label: 'Negro',
//       },
//       {
//         value: 2,
//         label: 'Afrodescendiente',
//       },
//       {
//         value: 3,
//         label: 'Raizal',
//       },
//       {
//         value: 4,
//         label: 'Palenquero',
//       },
//       {
//         value: 5,
//         label: 'Indígena',
//       },
//       {
//         value: 6,
//         label: 'Sin información',
//       },
//     ],
//   },
//   {
//     id: 'pueblo_indigena_victima',
//     type: 'select',
//     nullable: false,
//     label: 'Pueblo Indigena Victima',
//     options: [
//       {
//         value: 1,
//         label: 'Pueblo',
//       },
//       {
//         value: 2,
//         label: 'No aplica',
//       },
//       {
//         value: 3,
//         label: 'Sin información',
//       },
//     ],
//   },
//   {
//     id: 'situacion_discapacidad_victima',
//     type: 'select',
//     nullable: false,
//     label: 'Situacion Discapacidad Victima',
//     options: [
//       {
//         value: 1,
//         label: 'Ninguna',
//       },
//       {
//         value: 2,
//         label: 'Física',
//       },
//       {
//         value: 3,
//         label: 'Auditiva',
//       },
//       {
//         value: 4,
//         label: 'Visual',
//       },
//       {
//         value: 5,
//         label: 'Psicosocial (Mental)',
//       },
//       {
//         value: 6,
//         label: 'Sin información',
//       },
//     ],
//   },
//   {
//     id: 'direccion_vivienda_victima',
//     type: 'text',
//     nullable: false,
//     label: 'Direccion Vivienda Victima',
//     options: [],
//   },
//   {
//     id: 'edad_victima',
//     type: 'text',
//     nullable: true,
//     label: 'Edad Victima',
//     options: [],
//   },
//   {
//     id: 'nombre_victima',
//     type: 'text',
//     nullable: true,
//     label: 'Nombre Victima',
//     options: [],
//   },
// ];

export const formData2: TransformedObject[] = [
  {
    id: 'barrio',
    type: 'text',
    nullable: false,
    label: 'Barrio',
    options: [],
  },
  {
    id: 'comuna',
    type: 'select',
    nullable: false,
    label: 'Comuna',
    options: [
      {
        value: 1,
        label: 'Popular',
      },
      {
        value: 2,
        label: 'Santa Cruz',
      },
      {
        value: 3,
        label: 'Manrique',
      },
      {
        value: 4,
        label: 'Aranjuez',
      },
      {
        value: 5,
        label: 'Castilla',
      },
      {
        value: 6,
        label: 'Doce de Octubre',
      },
      {
        value: 7,
        label: 'Robledo',
      },
      {
        value: 8,
        label: 'Villa Hermosa',
      },
      {
        value: 9,
        label: 'Buenos Aires',
      },
      {
        value: 10,
        label: 'La Candelaria',
      },
      {
        value: 11,
        label: 'Laureles-Estadio',
      },
      {
        value: 12,
        label: 'La América',
      },
      {
        value: 13,
        label: 'San Javier',
      },
      {
        value: 14,
        label: 'El Poblado',
      },
      {
        value: 15,
        label: 'Guayabal',
      },
      {
        value: 16,
        label: 'Belén',
      },
      {
        value: 50,
        label: 'San Sebastián de Palmitas',
      },
      {
        value: 60,
        label: 'San Cristóbal',
      },
      {
        value: 70,
        label: 'Altavista',
      },
      {
        value: 80,
        label: 'San Antonio de Prado',
      },
      {
        value: 90,
        label: 'Santa Elena',
      },
      {
        value: 100,
        label: 'Sin información',
      },
      {
        value: 200,
        label: 'No aplica',
      },
    ],
  },
  {
    id: 'zona_geografica',
    type: 'select',
    nullable: false,
    label: 'Zona Geografica',
    options: [
      {
        value: 1,
        label: 'Zona rural',
      },
      {
        value: 2,
        label: 'Zona urbana',
      },
      {
        value: 3,
        label: 'Sin información',
      },
    ],
  },
];

// export const formData2: TransformedObject[] = [
//   {
//     id: 'barrio',
//     type: 'text',
//     nullable: false,
//     label: 'Barrio',
//     options: [],
//   },
//   {
//     id: 'arma_utilizada',
//     type: 'select',
//     nullable: false,
//     label: 'Arma Utilizada',
//     options: [
//       {
//         value: 1,
//         label: 'Arma de fuego',
//       },
//       {
//         value: 2,
//         label: 'Arma cortopunzante',
//       },
//       {
//         value: 3,
//         label: 'Manos del agresor',
//       },
//       {
//         value: 4,
//         label: 'Objeto contundente',
//       },
//       {
//         value: 5,
//         label: 'Objeto para estrangular',
//       },
//       {
//         value: 6,
//         label: 'Objeto para asfixiar',
//       },
//       {
//         value: 7,
//         label: 'Combustible',
//       },
//       {
//         value: 8,
//         label: 'Veneno',
//       },
//       {
//         value: 9,
//         label: 'Ácido',
//       },
//       {
//         value: 10,
//         label: 'Explosivo',
//       },
//       {
//         value: 11,
//         label: 'Caída de altura',
//       },
//       {
//         value: 12,
//         label: 'Otra',
//       },
//       {
//         value: 13,
//         label: 'Objeto desconocido',
//       },
//       {
//         value: 14,
//         label: 'Sin información',
//       },
//       {
//         value: 15,
//         label: 'Líquido inflamable',
//       },
//     ],
//   },
//   {
//     id: 'comuna',
//     type: 'select',
//     nullable: false,
//     label: 'Comuna',
//     options: [
//       {
//         value: 1,
//         label: 'Popular',
//       },
//       {
//         value: 2,
//         label: 'Santa Cruz',
//       },
//       {
//         value: 3,
//         label: 'Manrique',
//       },
//       {
//         value: 4,
//         label: 'Aranjuez',
//       },
//       {
//         value: 5,
//         label: 'Castilla',
//       },
//       {
//         value: 6,
//         label: 'Doce de Octubre',
//       },
//       {
//         value: 7,
//         label: 'Robledo',
//       },
//       {
//         value: 8,
//         label: 'Villa Hermosa',
//       },
//       {
//         value: 9,
//         label: 'Buenos Aires',
//       },
//       {
//         value: 10,
//         label: 'La Candelaria',
//       },
//       {
//         value: 11,
//         label: 'Laureles-Estadio',
//       },
//       {
//         value: 12,
//         label: 'La América',
//       },
//       {
//         value: 13,
//         label: 'San Javier',
//       },
//       {
//         value: 14,
//         label: 'El Poblado',
//       },
//       {
//         value: 15,
//         label: 'Guayabal',
//       },
//       {
//         value: 16,
//         label: 'Belén',
//       },
//       {
//         value: 50,
//         label: 'San Sebastián de Palmitas',
//       },
//       {
//         value: 60,
//         label: 'San Cristóbal',
//       },
//       {
//         value: 70,
//         label: 'Altavista',
//       },
//       {
//         value: 80,
//         label: 'San Antonio de Prado',
//       },
//       {
//         value: 90,
//         label: 'Santa Elena',
//       },
//       {
//         value: 100,
//         label: 'Sin información',
//       },
//       {
//         value: 200,
//         label: 'No aplica',
//       },
//     ],
//   },
//   {
//     id: 'departamento',
//     type: 'select',
//     nullable: false,
//     label: 'Departamento',
//     options: [
//       {
//         value: 0,
//         label: 'Fuera de Colombia',
//       },
//       {
//         value: 5,
//         label: 'Antioquia',
//       },
//       {
//         value: 8,
//         label: 'Atlántico',
//       },
//       {
//         value: 11,
//         label: 'Bogotá D.C.',
//       },
//       {
//         value: 13,
//         label: 'Bolívar',
//       },
//       {
//         value: 15,
//         label: 'Boyacá',
//       },
//       {
//         value: 17,
//         label: 'Caldas',
//       },
//       {
//         value: 18,
//         label: 'Caquetá',
//       },
//       {
//         value: 19,
//         label: 'Cauca',
//       },
//       {
//         value: 20,
//         label: 'Cesar',
//       },
//       {
//         value: 23,
//         label: 'Córdoba',
//       },
//       {
//         value: 25,
//         label: 'Cundinamarca',
//       },
//       {
//         value: 27,
//         label: 'Chocó',
//       },
//       {
//         value: 41,
//         label: 'Huila',
//       },
//       {
//         value: 44,
//         label: 'Guajira',
//       },
//       {
//         value: 47,
//         label: 'Magdalena',
//       },
//       {
//         value: 50,
//         label: 'Meta',
//       },
//       {
//         value: 52,
//         label: 'Nariño',
//       },
//       {
//         value: 54,
//         label: 'Norte de Santander',
//       },
//       {
//         value: 63,
//         label: 'Quindio',
//       },
//       {
//         value: 66,
//         label: 'Risaralda',
//       },
//       {
//         value: 68,
//         label: 'Santander',
//       },
//       {
//         value: 70,
//         label: 'Sucre',
//       },
//       {
//         value: 73,
//         label: 'Tolima',
//       },
//       {
//         value: 76,
//         label: 'Valle del Cauca',
//       },
//       {
//         value: 81,
//         label: 'Arauca',
//       },
//       {
//         value: 85,
//         label: 'Casanare',
//       },
//       {
//         value: 86,
//         label: 'Putumayo',
//       },
//       {
//         value: 88,
//         label: 'San Andrés',
//       },
//       {
//         value: 91,
//         label: 'Amazonas',
//       },
//       {
//         value: 94,
//         label: 'Guainía',
//       },
//       {
//         value: 95,
//         label: 'Guaviare',
//       },
//       {
//         value: 97,
//         label: 'Vaupés',
//       },
//       {
//         value: 99,
//         label: 'Vichada',
//       },
//     ],
//   },
//   {
//     id: 'metodo_eliminacion',
//     type: 'select',
//     nullable: false,
//     label: 'Metodo Eliminacion',
//     options: [
//       {
//         value: 1,
//         label: 'Apuñalada',
//       },
//       {
//         value: 2,
//         label: 'Asfixiada',
//       },
//       {
//         value: 3,
//         label: 'Baleada',
//       },
//       {
//         value: 4,
//         label: 'Cortada',
//       },
//       {
//         value: 5,
//         label: 'Decapitada',
//       },
//       {
//         value: 6,
//         label: 'Degollada',
//       },
//       {
//         value: 7,
//         label: 'Empalada',
//       },
//       {
//         value: 8,
//         label: 'Envenenada',
//       },
//       {
//         value: 9,
//         label: 'Estrangulada',
//       },
//       {
//         value: 10,
//         label: 'Explosión',
//       },
//       {
//         value: 11,
//         label: 'Golpeada',
//       },
//       {
//         value: 12,
//         label: 'Incinerada',
//       },
//       {
//         value: 13,
//         label: 'Lanzada de altura',
//       },
//       {
//         value: 14,
//         label: 'Mutilada',
//       },
//       {
//         value: 15,
//         label: 'Otro',
//       },
//       {
//         value: 16,
//         label: 'Quemada',
//       },
//       {
//         value: 17,
//         label: 'Desconocido',
//       },
//       {
//         value: 18,
//         label: 'Sin información',
//       },
//       {
//         value: 19,
//         label: 'Quemada con ácido',
//       },
//     ],
//   },
//   {
//     id: 'municipio',
//     type: 'select',
//     nullable: false,
//     label: 'Municipio',
//     options: [
//       {
//         value: 0,
//         label: 'Fuera de Colombia',
//       },
//       {
//         value: 1,
//         label: 'Medellín',
//       },
//       {
//         value: 2,
//         label: 'Abejorral',
//       },
//       {
//         value: 4,
//         label: 'Abriaquí',
//       },
//       {
//         value: 21,
//         label: 'Alejandría',
//       },
//       {
//         value: 30,
//         label: 'Amagá',
//       },
//       {
//         value: 31,
//         label: 'Amalfi',
//       },
//       {
//         value: 34,
//         label: 'Andes',
//       },
//       {
//         value: 36,
//         label: 'Angelópolis',
//       },
//       {
//         value: 38,
//         label: 'Angostura',
//       },
//       {
//         value: 40,
//         label: 'Anorí',
//       },
//       {
//         value: 42,
//         label: 'Santa Fe de Antioquia',
//       },
//       {
//         value: 44,
//         label: 'Anza',
//       },
//       {
//         value: 45,
//         label: 'Apartadó',
//       },
//       {
//         value: 51,
//         label: 'Arboletes',
//       },
//       {
//         value: 55,
//         label: 'Argelia',
//       },
//       {
//         value: 59,
//         label: 'Armenia',
//       },
//       {
//         value: 79,
//         label: 'Barbosa',
//       },
//       {
//         value: 86,
//         label: 'Belmira',
//       },
//       {
//         value: 88,
//         label: 'Bello',
//       },
//       {
//         value: 91,
//         label: 'Betania',
//       },
//       {
//         value: 93,
//         label: 'Betulia',
//       },
//       {
//         value: 101,
//         label: 'Ciudad Bolívar',
//       },
//       {
//         value: 107,
//         label: 'Briceño',
//       },
//       {
//         value: 113,
//         label: 'Buriticá',
//       },
//       {
//         value: 120,
//         label: 'Cáceres',
//       },
//       {
//         value: 125,
//         label: 'Caicedo',
//       },
//       {
//         value: 129,
//         label: 'Caldas',
//       },
//       {
//         value: 134,
//         label: 'Campamento',
//       },
//       {
//         value: 138,
//         label: 'Cañasgordas',
//       },
//       {
//         value: 142,
//         label: 'Caracolí',
//       },
//       {
//         value: 145,
//         label: 'Caramanta',
//       },
//       {
//         value: 147,
//         label: 'Carepa',
//       },
//       {
//         value: 148,
//         label: 'El Carmen de Viboral',
//       },
//       {
//         value: 150,
//         label: 'Carolina',
//       },
//       {
//         value: 154,
//         label: 'Caucasia',
//       },
//       {
//         value: 172,
//         label: 'Chigorodó',
//       },
//       {
//         value: 190,
//         label: 'Cisneros',
//       },
//       {
//         value: 197,
//         label: 'Cocorná',
//       },
//       {
//         value: 206,
//         label: 'Concepción',
//       },
//       {
//         value: 209,
//         label: 'Concordia',
//       },
//       {
//         value: 212,
//         label: 'Copacabana',
//       },
//       {
//         value: 234,
//         label: 'Dabeiba',
//       },
//       {
//         value: 237,
//         label: 'Don Matías',
//       },
//       {
//         value: 240,
//         label: 'Ebéjico',
//       },
//       {
//         value: 250,
//         label: 'El Bagre',
//       },
//       {
//         value: 264,
//         label: 'Entrerrios',
//       },
//       {
//         value: 266,
//         label: 'Envigado',
//       },
//       {
//         value: 282,
//         label: 'Fredonia',
//       },
//       {
//         value: 284,
//         label: 'Frontino',
//       },
//       {
//         value: 306,
//         label: 'Giraldo',
//       },
//       {
//         value: 308,
//         label: 'Girardota',
//       },
//       {
//         value: 310,
//         label: 'Gómez Plata',
//       },
//       {
//         value: 313,
//         label: 'Granada',
//       },
//       {
//         value: 315,
//         label: 'Guadalupe',
//       },
//       {
//         value: 318,
//         label: 'Guarne',
//       },
//       {
//         value: 321,
//         label: 'Guatapé',
//       },
//       {
//         value: 347,
//         label: 'Heliconia',
//       },
//       {
//         value: 353,
//         label: 'Hispania',
//       },
//       {
//         value: 360,
//         label: 'Itaguí',
//       },
//       {
//         value: 361,
//         label: 'Ituango',
//       },
//       {
//         value: 364,
//         label: 'Jardín',
//       },
//       {
//         value: 368,
//         label: 'Jericó',
//       },
//       {
//         value: 376,
//         label: 'La Ceja',
//       },
//       {
//         value: 380,
//         label: 'La Estrella',
//       },
//       {
//         value: 390,
//         label: 'La Pintada',
//       },
//       {
//         value: 400,
//         label: 'La Unión',
//       },
//       {
//         value: 411,
//         label: 'Liborina',
//       },
//       {
//         value: 425,
//         label: 'Maceo',
//       },
//       {
//         value: 440,
//         label: 'Marinilla',
//       },
//       {
//         value: 467,
//         label: 'Montebello',
//       },
//       {
//         value: 475,
//         label: 'Murindó',
//       },
//       {
//         value: 480,
//         label: 'Mutatá',
//       },
//       {
//         value: 483,
//         label: 'Nariño',
//       },
//       {
//         value: 490,
//         label: 'Necoclí',
//       },
//       {
//         value: 495,
//         label: 'Nechí',
//       },
//       {
//         value: 501,
//         label: 'Olaya',
//       },
//       {
//         value: 541,
//         label: 'Peñol',
//       },
//       {
//         value: 543,
//         label: 'Peque',
//       },
//       {
//         value: 576,
//         label: 'Pueblorrico',
//       },
//       {
//         value: 579,
//         label: 'Puerto Berrío',
//       },
//       {
//         value: 585,
//         label: 'Puerto Nare',
//       },
//       {
//         value: 591,
//         label: 'Puerto Triunfo',
//       },
//       {
//         value: 604,
//         label: 'Remedios',
//       },
//       {
//         value: 607,
//         label: 'Retiro',
//       },
//       {
//         value: 615,
//         label: 'Rionegro',
//       },
//       {
//         value: 628,
//         label: 'Sabanalarga',
//       },
//       {
//         value: 631,
//         label: 'Sabaneta',
//       },
//       {
//         value: 642,
//         label: 'Salgar',
//       },
//       {
//         value: 647,
//         label: 'San Andrés de Cuerquía',
//       },
//       {
//         value: 649,
//         label: 'San Carlos',
//       },
//       {
//         value: 652,
//         label: 'San Francisco',
//       },
//       {
//         value: 656,
//         label: 'San Jerónimo',
//       },
//       {
//         value: 658,
//         label: 'San José de La Montaña',
//       },
//       {
//         value: 659,
//         label: 'San Juan de Urabá',
//       },
//       {
//         value: 660,
//         label: 'San Luis',
//       },
//       {
//         value: 664,
//         label: 'San Pedro',
//       },
//       {
//         value: 665,
//         label: 'San Pedro de Uraba',
//       },
//       {
//         value: 667,
//         label: 'San Rafael',
//       },
//       {
//         value: 670,
//         label: 'San Roque',
//       },
//     ],
//   },
//   {
//     id: 'num_sujetos_feminicidas',
//     type: 'select',
//     nullable: false,
//     label: 'Num Sujetos Feminicidas',
//     options: [
//       {
//         value: 1,
//         label: '1',
//       },
//       {
//         value: 2,
//         label: '2',
//       },
//       {
//         value: 3,
//         label: '3',
//       },
//       {
//         value: 4,
//         label: '4',
//       },
//       {
//         value: 5,
//         label: 'Más de 4',
//       },
//       {
//         value: 6,
//         label: 'Varios',
//       },
//       {
//         value: 7,
//         label: 'Sin información',
//       },
//     ],
//   },
//   {
//     id: 'zona_geografica',
//     type: 'select',
//     nullable: false,
//     label: 'Zona Geografica',
//     options: [
//       {
//         value: 1,
//         label: 'Zona rural',
//       },
//       {
//         value: 2,
//         label: 'Zona urbana',
//       },
//       {
//         value: 3,
//         label: 'Sin información',
//       },
//     ],
//   },
//   {
//     id: 'direccion_hecho',
//     type: 'text',
//     nullable: false,
//     label: 'Direccion Hecho',
//     options: [],
//   },
//   {
//     id: 'lugar_encuentra_cadaver',
//     type: 'text',
//     nullable: false,
//     label: 'Lugar Encuentra Cadaver',
//     options: [],
//   },
// ];

export const formData3: TransformedObject[] = [
  {
    id: 'alias_sujeto_feminicida',
    type: 'text',
    nullable: false,
    label: 'Alias Sujeto Feminicida',
    options: [],
  },
  {
    id: 'actividad_economica_sf',
    type: 'select',
    nullable: false,
    label: 'Actividad Economica SF',
    options: [
      {
        value: 1,
        label: 'Campesino',
      },
      {
        value: 2,
        label: 'Criminal',
      },
      {
        value: 3,
        label: 'Empresario',
      },
      {
        value: 4,
        label: 'Habitante de la calle',
      },
      {
        value: 5,
        label: 'Ladrón',
      },
      {
        value: 6,
        label: 'Mecánico',
      },
      {
        value: 7,
        label: 'Construcción',
      },
      {
        value: 8,
        label: 'Sin Información',
      },
      {
        value: 9,
        label: 'Vendedor ambulante',
      },
      {
        value: 10,
        label: 'Vigilante',
      },
      {
        value: 11,
        label: 'Minero',
      },
      {
        value: 12,
        label: 'Desempleado',
      },
      {
        value: 13,
        label: 'Conductor',
      },
      {
        value: 14,
        label: 'Labores de la tierra',
      },
      {
        value: 15,
        label: 'Funcionario público',
      },
      {
        value: 16,
        label: 'Policía',
      },
      {
        value: 17,
        label: 'Militar (ejército)',
      },
    ],
  },
  {
    id: 'edad_sujeto_feminicida',
    type: 'text',
    nullable: false,
    label: 'Edad Sujeto Feminicida',
    options: [],
  },
];

// export const formData3: TransformedObject[] = [
//   {
//     id: 'alias_sujeto_feminicida',
//     type: 'text',
//     nullable: false,
//     label: 'Alias Sujeto Feminicida',
//     options: [],
//   },
//   {
//     id: 'actividad_economica_sf',
//     type: 'select',
//     nullable: false,
//     label: 'Actividad Economica SF',
//     options: [
//       {
//         value: 1,
//         label: 'Campesino',
//       },
//       {
//         value: 2,
//         label: 'Criminal',
//       },
//       {
//         value: 3,
//         label: 'Empresario',
//       },
//       {
//         value: 4,
//         label: 'Habitante de la calle',
//       },
//       {
//         value: 5,
//         label: 'Ladrón',
//       },
//       {
//         value: 6,
//         label: 'Mecánico',
//       },
//       {
//         value: 7,
//         label: 'Construcción',
//       },
//       {
//         value: 8,
//         label: 'Sin Información',
//       },
//       {
//         value: 9,
//         label: 'Vendedor ambulante',
//       },
//       {
//         value: 10,
//         label: 'Vigilante',
//       },
//       {
//         value: 11,
//         label: 'Minero',
//       },
//       {
//         value: 12,
//         label: 'Desempleado',
//       },
//       {
//         value: 13,
//         label: 'Conductor',
//       },
//       {
//         value: 14,
//         label: 'Labores de la tierra',
//       },
//       {
//         value: 15,
//         label: 'Funcionario público',
//       },
//       {
//         value: 16,
//         label: 'Policía',
//       },
//       {
//         value: 17,
//         label: 'Militar (ejército)',
//       },
//     ],
//   },
//   {
//     id: 'comunidad_o_territ_colect_sf_in',
//     type: 'select',
//     nullable: false,
//     label: 'Comunidad o Territ Colect SF IN',
//     options: [
//       {
//         value: 1,
//         label: 'Consejo Comunitario',
//       },
//       {
//         value: 2,
//         label: 'Resguardo',
//       },
//       {
//         value: 3,
//         label: 'No reporta',
//       },
//       {
//         value: 4,
//         label: 'Sin información',
//       },
//     ],
//   },
//   {
//     id: 'continuum_violencia_sf',
//     type: 'select',
//     nullable: false,
//     label: 'Continuum Violencia SF',
//     options: [
//       {
//         value: 1,
//         label: 'Sin información',
//       },
//       {
//         value: 2,
//         label: 'Ninguno',
//       },
//       {
//         value: 3,
//         label: 'Violencia sexual',
//       },
//       {
//         value: 4,
//         label: 'Feminicidio',
//       },
//       {
//         value: 5,
//         label: 'Homicidio',
//       },
//       {
//         value: 6,
//         label: 'Violencia de pareja',
//       },
//       {
//         value: 7,
//         label: 'Tentativa feminicidio',
//       },
//       {
//         value: 8,
//         label: 'Tentativa homicidio',
//       },
//       {
//         value: 9,
//         label: 'Hurto',
//       },
//       {
//         value: 10,
//         label: 'Venta drogas',
//       },
//       {
//         value: 11,
//         label: 'Porte de armas',
//       },
//       {
//         value: 12,
//         label: 'Violencia intrafamiliar',
//       },
//     ],
//   },
//   {
//     id: 'parentesco_o_relacion',
//     type: 'select',
//     nullable: false,
//     label: 'Parentesco o Relacion',
//     options: [
//       {
//         value: 1,
//         label: 'Compañero permanente',
//       },
//       {
//         value: 2,
//         label: 'Excompañero permanente',
//       },
//       {
//         value: 3,
//         label: 'Padre',
//       },
//       {
//         value: 4,
//         label: 'Hermano',
//       },
//       {
//         value: 5,
//         label: 'Tío',
//       },
//       {
//         value: 6,
//         label: 'Sobrino',
//       },
//       {
//         value: 7,
//         label: 'Primo',
//       },
//       {
//         value: 8,
//         label: 'Abuelo',
//       },
//       {
//         value: 9,
//         label: 'Nieto',
//       },
//       {
//         value: 10,
//         label: 'Cuñado',
//       },
//       {
//         value: 11,
//         label: 'Suegro',
//       },
//       {
//         value: 12,
//         label: 'Yerno',
//       },
//       {
//         value: 13,
//         label: 'Padrastro',
//       },
//       {
//         value: 14,
//         label: 'Cónyuge',
//       },
//       {
//         value: 15,
//         label: 'Novio',
//       },
//       {
//         value: 16,
//         label: 'Exnovio',
//       },
//       {
//         value: 17,
//         label: 'Ninguno',
//       },
//       {
//         value: 18,
//         label: 'Sin información',
//       },
//       {
//         value: 19,
//         label: 'Familiar',
//       },
//       {
//         value: 20,
//         label: 'Hijo',
//       },
//     ],
//   },
//   {
//     id: 'perte_etnica_o_racial_sf_in_ao',
//     type: 'select',
//     nullable: false,
//     label: 'Perte Etnica o Racial SF IN AO',
//     options: [
//       {
//         value: 1,
//         label: 'Negro',
//       },
//       {
//         value: 2,
//         label: 'Afrodescendiente de piel clara',
//       },
//       {
//         value: 3,
//         label: 'Indígena',
//       },
//       {
//         value: 4,
//         label: 'Sin información',
//       },
//     ],
//   },
//   {
//     id: 'perte_etnica_o_racial_sf_mc',
//     type: 'select',
//     nullable: false,
//     label: 'Perte Etnica o Racial SF MC',
//     options: [
//       {
//         value: 1,
//         label: 'Negro',
//       },
//       {
//         value: 2,
//         label: 'Afrodescendiente',
//       },
//       {
//         value: 3,
//         label: 'Raizal',
//       },
//       {
//         value: 4,
//         label: 'Palenquero',
//       },
//       {
//         value: 5,
//         label: 'Indígena',
//       },
//       {
//         value: 6,
//         label: 'Sin información',
//       },
//     ],
//   },
//   {
//     id: 'situacion_juridica_sf',
//     type: 'select',
//     nullable: false,
//     label: 'Situacion Juridica SF',
//     options: [
//       {
//         value: 1,
//         label: 'Condenado como reo ausente y orden de captra',
//       },
//       {
//         value: 2,
//         label: 'Condenado por feminicidio',
//       },
//       {
//         value: 3,
//         label: 'Condenado por femininicidio agravado',
//       },
//       {
//         value: 4,
//         label: 'Condenado por homicidio',
//       },
//       {
//         value: 5,
//         label: 'Condenado por homicidio agravado',
//       },
//       {
//         value: 6,
//         label: 'Condenado por homicidio atenuado',
//       },
//       {
//         value: 7,
//         label: 'Procesado como feminicidio en grado de tentativa',
//       },
//       {
//         value: 8,
//         label: 'Procesado como reo ausente',
//       },
//       {
//         value: 9,
//         label: 'Procesado con medida privativa de la libertad',
//       },
//       {
//         value: 10,
//         label: 'Procesado con orden de captura y huyendo',
//       },
//       {
//         value: 11,
//         label: 'Procesado por intento de homicidio',
//       },
//       {
//         value: 12,
//         label: 'Procesado por violencia intrafamiliar',
//       },
//       {
//         value: 13,
//         label: 'Sin captura',
//       },
//       {
//         value: 14,
//         label: 'Capturado',
//       },
//       {
//         value: 15,
//         label: 'Libre por vencimiento de términos',
//       },
//       {
//         value: 16,
//         label: 'Sin información',
//       },
//       {
//         value: 17,
//         label: 'Captura por lesiones personales',
//       },
//       {
//         value: 18,
//         label: 'Captura por violencia intrafamiliar',
//       },
//       {
//         value: 19,
//         label: 'Entregado',
//       },
//       {
//         value: 20,
//         label: 'No aplica (suicidio)',
//       },
//     ],
//   },
//   {
//     id: 'sujeto_feminicida',
//     type: 'select',
//     nullable: false,
//     label: 'Sujeto Feminicida',
//     options: [
//       {
//         value: 1,
//         label: 'Paramilitar',
//       },
//       {
//         value: 2,
//         label: 'Militar (ejército)',
//       },
//       {
//         value: 3,
//         label: 'Guerrilla',
//       },
//       {
//         value: 4,
//         label: 'Sicario',
//       },
//       {
//         value: 5,
//         label: 'Policía',
//       },
//       {
//         value: 6,
//         label: 'Conocido',
//       },
//       {
//         value: 7,
//         label: 'Vecino',
//       },
//       {
//         value: 8,
//         label: 'Extraño',
//       },
//       {
//         value: 9,
//         label: 'Banda criminal mafiosa',
//       },
//       {
//         value: 10,
//         label: 'Banda narco mafiosa',
//       },
//       {
//         value: 11,
//         label: 'Delincuencia común',
//       },
//       {
//         value: 12,
//         label: 'Estructuras del narcotráfico',
//       },
//       {
//         value: 13,
//         label: 'Hombre desconocido por la mujer',
//       },
//       {
//         value: 14,
//         label: 'Sin información',
//       },
//       {
//         value: 15,
//         label: 'Otro',
//       },
//       {
//         value: 16,
//         label: 'Ninguno',
//       },
//       {
//         value: 17,
//         label: 'Inquilino',
//       },
//     ],
//   },
//   {
//     id: 'sujeto_feminicida_momento_feminicidio',
//     type: 'select',
//     nullable: false,
//     label: 'Sujeto Feminicida Momento Feminicidio',
//     options: [
//       {
//         value: 1,
//         label: 'Autolesionado',
//       },
//       {
//         value: 2,
//         label: 'Suicidio',
//       },
//       {
//         value: 3,
//         label: 'Capturado',
//       },
//       {
//         value: 4,
//         label: 'Fugado',
//       },
//       {
//         value: 5,
//         label: 'Linchado',
//       },
//       {
//         value: 6,
//         label: 'Otro',
//       },
//       {
//         value: 7,
//         label: 'Sin información',
//       },
//     ],
//   },
//   {
//     id: 'edad_sujeto_feminicida',
//     type: 'text',
//     nullable: false,
//     label: 'Edad Sujeto Feminicida',
//     options: [],
//   },
// ];

export const formData4: TransformedObject[] = [
  {
    id: 'causal_atribuido_feminicidio',
    type: 'text',
    nullable: false,
    label: 'Causal Atribuido Feminicidio',
    options: [],
  },
  {
    id: 'desaparecida',
    type: 'text',
    nullable: false,
    label: 'Desaparecida',
    options: [],
  },
];

// export const formData4: TransformedObject[] = [
//   {
//     id: 'causal_atribuido_feminicidio',
//     type: 'text',
//     nullable: false,
//     label: 'Causal Atribuido Feminicidio',
//     options: [],
//   },
//   {
//     id: 'desaparecida',
//     type: 'text',
//     nullable: false,
//     label: 'Desaparecida',
//     options: [],
//   },
//   {
//     id: 'descripcion_informacion_noticia',
//     type: 'text',
//     nullable: false,
//     label: 'Descripcion Informacion Noticia',
//     options: [],
//   },
//   {
//     id: 'fuente',
//     type: 'text',
//     nullable: false,
//     label: 'Fuente',
//     options: [],
//   },
//   {
//     id: 'hipotesis',
//     type: 'text',
//     nullable: false,
//     label: 'Hipotesis',
//     options: [],
//   },
//   {
//     id: 'link_noticia',
//     type: 'text',
//     nullable: false,
//     label: 'Link Noticia',
//     options: [],
//   },
//   {
//     id: 'observaciones',
//     type: 'text',
//     nullable: true,
//     label: 'Observaciones',
//     options: [],
//   },
//   {
//     id: 'observaciones_comision_cspm',
//     type: 'text',
//     nullable: true,
//     label: 'Observaciones Comision CSPM',
//     options: [],
//   },
//   {
//     id: 'titular',
//     type: 'text',
//     nullable: false,
//     label: 'Titular',
//     options: [],
//   },
//   {
//     id: 'url_corto_noticia',
//     type: 'text',
//     nullable: true,
//     label: 'URL Corto Noticia',
//     options: [],
//   },
// ];
