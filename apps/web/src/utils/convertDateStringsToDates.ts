export function convertDateStringsToDates<T extends object | object[] | null>(input: T): T {
  if (Array.isArray(input)) {
    // @ts-expect-error
    return input.map((item) => convertDateStringsToDates(item));
  }
  if (input !== null && typeof input === 'object') {
    const newObj = {};
    // eslint-disable-next-line guard-for-in
    for (const key in input) {
      // @ts-expect-error
      const value = input[key];
      if (typeof value === 'string' && isDateString(value)) {
        // @ts-expect-error
        newObj[key] = new Date(value);
      } else if (Array.isArray(value) && value.every((val) => typeof val === 'string' && isDateString(val))) {
        // @ts-expect-error
        newObj[key] = value.map((val) => new Date(val));
      } else {
        // @ts-expect-error
        newObj[key] = convertDateStringsToDates(value);
      }
    }
    // @ts-expect-error
    return newObj;
  }
  return input;
}

function isDateString(value: any) {
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  return regex.test(value);
}
