import { ISymbolBase } from './ISymbolBase';
import { IValuable } from './IValuable';
import { IValuableType } from './IValuableType';

export interface IValuable<T extends IValuableType> extends ISymbolBase<T> {
    credit: number;
}
