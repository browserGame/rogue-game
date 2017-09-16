import { ICoin } from '../ICoin';

export function isCoin(v: any): v is ICoin {
    return v.e === 'M' && typeof v.credit === 'number';
}
