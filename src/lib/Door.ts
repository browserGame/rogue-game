
import { Vector } from './math';
import { DoorType, DoorWay } from './Symbols';
import {
    $Room,
    $GFragment
    // getNameSpace
} from './Room';

import { getRandomFloor } from './Floor';

export interface $Door {
    //from: number;
    to: number;
    inset: boolean;
    p: Vector;
    dir: '^' | '<' | '>' | 'v';
    gui: $GFragment;
}


export function processDoor(matrix: string[], width: number, room: $Room, coords: Vector[], si: DoorWay<DoorType>) {
    if (coords.length > 1) {
        throw new Error(`Room ${room.pk} has multiple coords for door ${si.m || si.e}`);
    }
    width;
    matrix;

    let gui: $GFragment = (!si.inset) ? {
        size: 'normal',
        auxClassNames: getRandomFloor().auxClassNames,
        left: 0,
        top: 0,
        zIndex: 0
    } : {
            size: 'normal',
            auxClassNames: ['floor_crypt', 'door_open', /*'door'  for closed door */],
            left: 0,
            top: 0,
            zIndex: 0
        }; //   show a normal tile

    let door: $Door = {
        to: si.toRoom,
        inset: (si.inset || false),
        p: coords[0],
        dir: si.e,
        gui
    };

    room.doors.push(door);

}





