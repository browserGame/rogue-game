'use strict';
import {
    $Room,
    $ItemPortal,
    getNameSpace
} from './Room';

import {
    Vector
} from './math';

import {
    TelePortal,
} from './Symbols';


export function processTeleport(matrix: string[], width: number, room: $Room, coords: Vector[], si: TelePortal) {

    matrix;
    width;
    //room;
   
    if (coords.length !== 1) {
        console.log(`Error: room:${room.pk} has invalid teleports, mapping ${si.m || si.e}, has more then one location.`);
        return;
    }
    let t: $ItemPortal = { tag: si.e, toRoom: si.toRoom, portal: si.portal, p: coords[0] };

    let portals = getNameSpace(room, 'portal');
    portals.push(t);
}




