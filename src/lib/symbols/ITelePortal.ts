import { IIndirection } from './IIndirection';
import { ISymbolBase } from './ISymbolBase';

export interface ITelePortal extends ISymbolBase<'X'> {
    toRoom: number;
    portal: IIndirection | 'X';
}
