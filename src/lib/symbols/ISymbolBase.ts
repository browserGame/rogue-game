import { IIndirection } from '~items';

export interface ISymbolBase<T> {
    m?: IIndirection;
    e: T;
}
