import { ICoin } from '../ICoin';
import { IStone } from '../IStone';
import { isCoin } from './isCoin';
import { isStone } from './isStone';

export function isValuable(v: any): v is IStone | ICoin {
    return isCoin(v) || isStone(v);
}
