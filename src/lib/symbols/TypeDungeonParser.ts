import { Room } from '~items/Room';
import { IVector } from '~linear-algebra';
import { ISymbolBase } from './ISymbolBase';

export type TypeDungeonParser =
(matrix: string[], width: number, room: Room, coords: IVector[], si: ISymbolBase<string>) => void;
