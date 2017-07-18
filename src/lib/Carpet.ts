'use strict';
import {
    $Room,
    $Item,
    getNameSpace
} from './Room';

import {
    Vector
} from './math';

import {
    Carpet
} from './Symbols';

export function processCarpet(matrix: string[], width: number, room: $Room, coords: Vector[], si: Carpet) {

    matrix;
    width;
    console.log(`Carpet token is:`, si);

    let cp = coords.slice(0);
    cp.sort((a, b) => a.y - b.y || a.x - b.x); //first is top-left, last is bottom right
    let first = cp[0];
    let last = cp[cp.length - 1];

    let isValidCarpet = true;
    end:
    for (let x = first.x; x <= last.x; x++) {
        for (let y = first.y; y <= last.y; y++) {
            if (!cp.find((i) => i.x === x && i.y === y)) {
                isValidCarpet = false;
                break end;
            }
        }
    }

    if (!isValidCarpet) {
        console.log(`room: ${room.pk} has an invalid carpet (${first.x},${first.y})->(${last.x},${last.y})`);
        return; //do nothing
    }

    let carpet = getNameSpace(room, 'carpet');
    let itm: $Item = { tag: si.e, p: first, br: last, color: si.type };
    carpet.push(itm);


}



