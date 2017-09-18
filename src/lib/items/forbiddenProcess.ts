import { Room } from '~items';
import { IVector } from '~math';
import { ISymbolBase } from '~symbols';

export function forbiddenProcess(_matrix: string[], _width: number, room: Room, _coords: IVector[], si: ISymbolBase<string>) {
    throw new Error(`Error in room: ${room.pk} not allowed to process this token ${si.e}`);
}
