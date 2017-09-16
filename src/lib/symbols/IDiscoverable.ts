
import { IDiscoverableType } from './IDiscoverableType';
import { ISIGeneralContent } from './ISIGeneralContent';
import { ISymbolBase } from './ISymbolBase';

export interface IDiscoverable<T extends IDiscoverableType> extends ISymbolBase<T> {
    has: ISIGeneralContent[];
}

