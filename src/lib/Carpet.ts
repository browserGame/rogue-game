'use strict';
import {
    $Room,
    getNameSpace,
    
} from './Room';

import {
    Vector
} from './math';

import {
    Carpet
} from './Symbols';

import {
    floorExtrusion
} from './Floor';

import {
    isValidArea
} from './tools';

import { $Item } from './Room';


export interface $ItemCarpet extends $Item {
    br: Vector;
    color: string; // used by carpet
}


export function processCarpet(matrix: string[], width: number, room: $Room, coords: Vector[], si: Carpet) {

    matrix;
    width;


    let { isValid, first, last } = isValidArea(coords);

    if (!isValid) {
        console.log(`room: ${room.pk} has an invalid carpet (${first.x},${first.y})->(${last.x},${last.y})`);
        return; //do nothing
    }

    let itm: $ItemCarpet = { tag: si.e, p: first, br: last, color: si.type };
    console.log({ carpet: itm });
    floorExtrusion(room, itm);
    let carpet = getNameSpace(room, 'carpet');
    carpet.push(itm);

}
