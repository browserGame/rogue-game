import { IIndirection } from './';

export interface ISymbolBase<T> {
    m?: IIndirection;
    e: T;
}
