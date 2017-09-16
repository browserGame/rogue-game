
import { IVector } from '~math/IVector';

export function isVector(v: any): v is IVector {
    return v && typeof v.x === 'number' && typeof v.y === 'number';
}
