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

import {
    $Item,
    $GFragment
} from './Room';

import { isValidArea } from './tools';

export interface $ItemLiquid extends $Item {
    br: Vector;
    /*color: string;*/
}


export function processLiquid(_matrix: string[], _width: number, room: $Room, coords: Vector[], si: Water | Acid | Lava) {

    let { isValid, first, last } = isValidArea(coords);

    if (!isValid) {
        console.log(`room: ${room.pk} has an invalid liquid (${first.x},${first.y})->(${last.x},${last.y}) ${JSON.stringify(coords)}`);
        return; //do nothing
    }

    let NS = {
        O: 'liquid_water',
        '(': 'liquid_lava',
        $: 'liquid_acid',
        '£': 'liquid_swamp'
    };

    let gui: $GFragment = {
        size: ['plts3', 'fsc3'],
        auxClassNames: [NS[si.e]],
        left: 0,
        top: 0,
        zIndex: 0
    };

    let itm: $ItemLiquid = { tag: si.e, p: first, br: last, gui };
    console.log({ liquid: itm });
    floorExtrusion(room, itm);
    let liquid = getNameSpace(room, 'liquid');
    liquid.push(itm);
}
