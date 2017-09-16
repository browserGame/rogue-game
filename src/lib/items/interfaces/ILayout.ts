import { ISymbolBase } from '~items';

export interface ILayout {
    room: string[];
    id: number;
    symbols: (ISymbolBase<string>)[];
}
