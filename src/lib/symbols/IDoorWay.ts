import { IDoorType } from './IDoorType';
import { ISymbolBase } from './ISymbolBase';

export interface IDoorWay<T extends IDoorType> extends ISymbolBase<T> {
  toRoom: number;
  inset?: boolean;
}
