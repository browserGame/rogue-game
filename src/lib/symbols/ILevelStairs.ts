import { IIndirection } from './IIndirection';
import { ISymbolBase } from './ISymbolBase';

export interface ILevelStairs extends ISymbolBase<'µ'> {
    toRoom: number;
    stairs: IIndirection | 'µ';
    level: number;
}
