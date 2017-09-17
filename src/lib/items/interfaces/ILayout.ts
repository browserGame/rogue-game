import { ISymbolBase } from '~symbols';

export interface ILayout {
    room: string[];
    id: number;
    symbols: (ISymbolBase<string>)[];
}
