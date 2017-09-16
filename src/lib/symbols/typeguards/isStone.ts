import { IStone } from '../IStone';

export function isStone(v: any): v is IStone {
    return v.e === 'L' && typeof v.credit === 'number';
}
