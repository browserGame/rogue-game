export const sin = Math.sin;
export const cos = Math.cos;
export const tan = Math.tan;
export const atan = Math.atan;
export const acos = Math.acos;
export const asin = Math.asin;

import { DEG2RAD } from './constants';

export const sind = (d: number) => sin(DEG2RAD * d);
export const cosd = (d: number) => cos(DEG2RAD * d);
export const tand = (d: number) => tan(DEG2RAD * d);
export const asind = (d: number) => asin(d) / DEG2RAD;
export const acosd = (d: number) => acos(d) / DEG2RAD;
export const atand = (d: number) => atan(d) / DEG2RAD;
