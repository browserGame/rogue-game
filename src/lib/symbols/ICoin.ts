import { IColorCoinType } from './IColorCoinType';
import { IValuable } from './IValuable';

export interface ICoin extends IValuable<'M'> {
    color: IColorCoinType;
}
