
import {
    IDoor,
    IGFragment,
    Room
    // GetNameSpace
} from '~items';
import { IVector } from '~math';
import { IDoorType, IDoorWay } from '~symbols';


export function processDoor(matrix: string[], width: number, room: Room, coords: IVector[], si: IDoorWay<IDoorType>) {
    if (coords.length > 1) {
        throw new Error(`Room ${room.pk} has multiple coords for door ${si.m || si.e}`);
    }
    width;
    matrix;

    const gui: IGFragment = {
        auxClassNames: !si.inset ? [] : ['floor_crypt', 'door' /* just plain 'door_open'  for open door */],
        left: 0,
        size: !si.inset ? [] : ['fsc3', 'plts3'],
        top: 0,
        zIndex: 0
    }; //   Show a normal tile

    const door: IDoor = {

        gui,
        inset: (si.inset || false),
        p: coords[0],
        tag: si.e,
        to: si.toRoom

    };

    room.doors.push(door);

}

