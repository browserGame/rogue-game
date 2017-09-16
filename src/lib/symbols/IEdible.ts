import { IEdibleType } from './IEdibleType';
import { ISymbolBase } from './ISymbolBase';

export interface IEdible<T extends IEdibleType> extends ISymbolBase<T> {
    addMana?: number;
    addHp?: number;
    poisen?: { add: number, release: number };
}
