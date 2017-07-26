'use strict';

// [(]lava
// [O] water
// [$] acid bath

import {
    $Room,
    getNameSpace
} from './Room';

import {
    Vector
} from './math';

import {
    Water, Acid, Lava
} from './Symbols';

import {
    floorExtrusion
} from './Floor';

import { $Item, isValidArea } from './Room';


export interface $ItemLiquid extends $Item {
    br: Vector;
    /*color: string;*/
}


export function processLiquid(matrix: string[], width: number, room: $Room, coords: Vector[], si: Water | Acid | Lava) {

    matrix;
    width;

    let { isValid, first, last } = isValidArea(coords);
   
    if (!isValid) {
        console.log(`room: ${room.pk} has an invalid liquid (${first.x},${first.y})->(${last.x},${last.y}) ${JSON.stringify(coords)}`);
        return; //do nothing
    }

    let itm: $ItemLiquid = { tag: si.e, p: first, br: last };
    console.log({ liquid: itm });
    floorExtrusion(room, itm);
    let liquid = getNameSpace(room, 'liquid');
    liquid.push(itm);
}
