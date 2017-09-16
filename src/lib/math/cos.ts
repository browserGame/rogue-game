
import { DEG2RAD } from './constants';

export const cos = Math.cos;
export const cosd = (d: number) => cos(DEG2RAD * d);
