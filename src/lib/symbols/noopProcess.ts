import { Room } from '~items/Room';
import { IVector } from '~linear-algebra';
import { ISymbolBase } from './ISymbolBase';

export function noopProcess(_matrix: string[], _width: number, _room: Room, _coords: IVector[], _si: ISymbolBase<string>) {
    return;
}
