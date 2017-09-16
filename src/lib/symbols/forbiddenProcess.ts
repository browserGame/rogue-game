import { Room } from '~items/Room';
import { IVector } from '~linear-algebra';
import { ISymbolBase } from './ISymbolBase';

export function forbidden(_matrix: string[], _width: number, room: Room, _coords: IVector[], si: ISymbolBase<string>) {
    throw new Error(`Error in room: ${room.pk} not allowed to process this token ${si.e}`);
}
