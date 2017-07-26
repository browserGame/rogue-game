
'use strict';
import {
    $Room,
    getNameSpace
} from './Room';

import {
    Vector
} from './math';

import {
    Carpet
} from './Symbols';

import {
    $ItemCarpet
} from './Carpet';

export function processSkullAndBones(matrix: string[], width: number, room: $Room, coords: Vector[]) {
    matrix;
    width;
    //room;
    //coords;

    let skulls = coords.map((v) => { return { tag: 'A', p: v }; });

    let bones = getNameSpace(room, 'skull&bones');
    bones.splice(0, bones.length, ...skulls);
}


export function processCarpet(matrix: string[], width: number, room: $Room, coords: Vector[], si: Carpet) {

    matrix;
    width;

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
    let itm: $ItemCarpet = { tag: si.e, p: first, br: last, color: si.type };
    carpet.push(itm);

}






