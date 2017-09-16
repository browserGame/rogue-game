import { IBreakableTypes } from './IBreakableTypes';
import { ISIGeneralContent } from './ISIGeneralContent';
import { ISymbolBase } from './ISymbolBase';

export interface IBreakable<T extends IBreakableTypes> extends ISymbolBase<T> {
  has: ISIGeneralContent[];
}
