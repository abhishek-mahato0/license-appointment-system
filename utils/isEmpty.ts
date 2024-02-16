export const areAllObjectsEmpty = (value: Array<object>) => {
    return value.every((obj) => Object.keys(obj).length === 0);
  };