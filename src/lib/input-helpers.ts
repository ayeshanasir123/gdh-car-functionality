// utils/input-helpers.ts
export const filterNumericInput = (value: string) => value.replace(/[^0-9]/g, '');
export const filterAlphabeticInput = (value: string) => value.replace(/[^A-Za-z\s]/g, '');
