import { isDate, isNumber, isString } from '~utils';

export function clone<T>(s: any): any {

  if (isDate(s)) return new Date(s);
  if (isNumber(s)) return s;
  if (isString(s)) return `${s}`;

  return {...s};

}
