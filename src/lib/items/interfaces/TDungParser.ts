
import { ISymbolBase } from '~items';
import { Room } from '~items/Room';
import { IVector } from '~linear-algebra';

export type TDungParser =
(matrix: string[], width: number, room: Room, coords: IVector[], si: ISymbolBase<string>) => void;
