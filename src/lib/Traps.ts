// [w] spikes
// [S] bear trap

'use strict';
import {
    $Room,
    getNameSpace,
    $Item,
    getContentAt
} from './Room';

import {
    Vector
} from './math';

import {
    Spikes,
    BearTrap
} from './Symbols';

export interface $ItemTrap extends $Item {
    delHp: number;
}

export function processTraps(matrix: string[], width: number, room: $Room, coords: Vector[], si: Spikes | BearTrap) {

    matrix;
    width;

    let itms: $ItemTrap[] = coords.map((m) => {
        return { tag: si.e, p: m, delHp: si.delHp || 10 }; //default 10 points lost if not specified
    });
    //
    let err = itms.filter((f) => {
        let other = getContentAt(room, f.p, '.'); //must be on a floor (carpets etc extrude objects anyway)
        return (!other) ? true : false;
    });
    //show errors
    console.log({ 'error-traps': JSON.stringify(err) });
    //
    if (err.length === 0) {
        let traps = getNameSpace(room, 'traps');
        traps.push(...itms);
        console.log({ traps: itms });
    }
}
