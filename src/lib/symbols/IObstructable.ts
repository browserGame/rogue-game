import { IObstructableType } from './IObstructableType';
import { ISymbolBase } from './ISymbolBase';

export type IObstructable<T extends IObstructableType> = ISymbolBase<T>;
