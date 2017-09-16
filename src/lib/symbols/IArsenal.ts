import { IArsenalType } from './IArsenalType';
import { ISymbolBase } from './ISymbolBase';

export interface IArsenal<T extends IArsenalType> extends ISymbolBase<T> {
addHp?: number;
addXp?: number;
addDp?: number;
}
