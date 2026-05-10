/* eslint-disable @typescript-eslint/no-explicit-any */
export type ArrayPredicate<T> = (item?: T, index?: number, collection?: T[]) => boolean;

export const isUndefined = (value: any): value is undefined => typeof value === 'undefined'
export const isNull = (value: any): value is null => value === null
export const isNumber = (value: any): value is number => typeof value === 'number'
export const isNumberFinite = (value: any): value is number => isNumber(value) && isFinite(value)
export const isPositive = (value: number): boolean => value >= 0
export const isInteger = (value: number): boolean => value % 1 === 0
export const isNil = (value: any): value is null | undefined => value === null || typeof value === 'undefined'
export const isString = (value: any): value is string => typeof value === 'string'
export const isObject = (value: any): boolean => value !== null && typeof value === 'object'
export const isArray = (value: any): boolean => Array.isArray(value)
export const isFunction = (value: any): boolean => typeof value === 'function'

export const compare = (a: any, b: any): number => {
  if (a instanceof Date && b instanceof Date) {
    return a.valueOf() - b.valueOf();
  }
  if (!isNaN(+a) && !isNaN(+b))
    return +a - +b;
  return a?.toString().localeCompare(b?.toString()) ?? -1;
}
