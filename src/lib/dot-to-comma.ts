export const DotToComma = (value: number): string => {
  return value.toFixed(2).replace(/\./g, ",");
};
