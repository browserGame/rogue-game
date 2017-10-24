import { isDate, isNumber, isObject, isString } from '~utils';

export function clone<T>(s: T): any {

  if (isDate(s)) return new Date(s);
  if (isNumber(s)) return s;
  if (isString(s)) return `${s}`;
  if (isObject(s)) return { ...<Object> s };

  return s;
}
