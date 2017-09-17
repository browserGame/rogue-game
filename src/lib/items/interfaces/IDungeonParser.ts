
import { Room } from '~items';
import { IVector } from '~linear-algebra';
import { ISymbolBase } from '~symbols';

export type IDungeonParser =
(matrix: string[], width: number, room: Room, coords: IVector[], si: ISymbolBase<string>) => void;
