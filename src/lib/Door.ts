
import { Vector } from './math';
import { DoorType, DoorWay } from './Symbols';
import {
    $Room,
    $Item,
    $GFragment
    // getNameSpace
} from './Room';



export interface $Door extends $Item {
    //from: number;
    to: number;
    inset: boolean;
    /* p: Vector;*/
    tag: '^' | '<' | '>' | 'v';
    //gui: $GFragment;
}


export function processDoor(matrix: string[], width: number, room: $Room, coords: Vector[], si: DoorWay<DoorType>) {
    if (coords.length > 1) {
        throw new Error(`Room ${room.pk} has multiple coords for door ${si.m || si.e}`);
    }
    width;
    matrix;

    let gui: $GFragment = {
        size: !si.inset ? undefined : 'normal',
        auxClassNames: !si.inset ? undefined : ['floor_crypt', 'door', /* just plain 'door_open'  for open door */],
        left: 0,
        top: 0,
        zIndex: 0
    }; //   show a normal tile

    let door: $Door = {
        to: si.toRoom,
        inset: (si.inset || false),
        p: coords[0],
        tag: si.e,
        gui
    };
    
    room.doors.push(door);

}





