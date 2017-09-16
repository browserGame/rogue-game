import { IColorStonesType } from './IColorStonesType';
import { IStone } from './IStone';
import { IValuable } from './Ivaluable';

export interface IStone extends IValuable<'L'> {
    color: IColorStonesType;
}
