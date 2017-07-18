
import { Vector } from './math';
import { DoorType, DoorWay } from './Symbols';
import {
    $Room,
   // getNameSpace
} from './Room';

export interface $Door {
    //from: number;
    to: number;
    inset: boolean;
    p: Vector;
    dir: '^' | '<' | '>' | 'v';
}

export function processDoor(matrix: string[], width: number, room: $Room, coords: Vector[], si: DoorWay<DoorType>) {
    if (coords.length > 1) {
        throw new Error(`Room ${room.pk} has multiple coords for door ${si.m || si.e}`);
    }
    width;
    matrix;
    room.doors.push({ /*from: room.pk,*/ to: si.toRoom, inset: (si.inset || false), p: coords[0], dir: si.e });
}





