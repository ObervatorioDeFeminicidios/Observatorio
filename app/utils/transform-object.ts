export function transformObject(fields: DataBaseField[]): TransformedObject[] {
  const transfomedObjects: TransformedObject[] = [];

  fields.forEach((item) => {
    if (item.id.startsWith('cod_')) {
      const values = item?.options?.split(',');
      let options: Option[] = [];

      if (values) {
        options = values.map((value, index) => ({
          value: parseInt(value.trim()),
          label:
            fields
              .find((obj) => obj.id === item.id.substring(4))
              ?.options?.split(',')
              [index]?.trim() || '',
        }));
      }

      const transformedObject: TransformedObject = {
        id: item.id.replace('cod_', ''),
        type: item.type as BaseFieldType,
        nullable: item.nullable === 'YES' ? true : false,
        label: item.label,
        options,
      };

      transfomedObjects.push(transformedObject);
    } else {
      if (item.type !== 'select') {
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
  if (a.type === 'text' && b.type === 'select') {
    // Field comes before select
    return -1;
  }
  if (a.type === 'select' && b.type === 'text') {
    // Field comes after text
    return 1;
  }
  // Equal types, or other types, maintain the original order
  return 0;
}

export function getLatestId(data: DBResponse): number {
  let latestId = null;

  for (let key in data) {
    if (key.startsWith('cod_')) {
      latestId = data[key] as number;
      break;
    }
  }

  console.log("El valor de la clave que empieza con 'cod_' es:", latestId);

  return latestId || 0;
}

const capitalize = (str) =>
  str.split(' ')
    .map(([first, ...rest]) => [first.toUpperCase(), ...rest].join(''))
    .join(' ');

export const capitalizeEachWord = (text: string) => {
  const words = text.toLocaleLowerCase().split(" ");
  const wordsCapitalized = words.map(word => capitalize(word));
  return wordsCapitalized.join(" ");
}
