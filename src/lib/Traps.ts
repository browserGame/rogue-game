// [w] spikes
// [S] bear trap

'use strict';
import {
    $Room,
    getNameSpace,
    $Item,
    $GFragment,
    getContentAt
} from './Room';

import {
    Vector
} from './math';

import {
    AllTraps
} from './Symbols';

export interface $ItemTrap extends $Item {
    delHp: number;
}

export function processTraps(_matrix: string[], _width: number, room: $Room, coords: Vector[], si: AllTraps) {

    const select = {
        w: 'hazard_spikes', //spikes
        S: 'hazard_trap' //beartrap
    };

    let gui: $GFragment = {
        size: ['plts3', 'fsc3'],
        auxClassNames: ['common_floor_objects', select[si.e]],
        left: 0,
        top: 0,
        zIndex: 0,
        hasShadow: false
    };

    let itms: $ItemTrap[] = coords.map((m) => {
        return {
            tag: si.e,
            p: m,
            delHp: si.delHp || 10,
            gui
        }; //default 10 points lost if not specified
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
