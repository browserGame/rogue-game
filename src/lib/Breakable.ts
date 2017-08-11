'use strict';
import {
    $Room,
    getNameSpace,
    $Item,
    $GFragment
} from './Room';

import {
    Vector
} from './math';

import {
    AllBreakables,
    //GeneralContent,
} from './Symbols';

import {
    GeneralContents,
    processContents
} from './GeneralContent';

export interface $ItemBreakable extends $Item {
    has: GeneralContents[];
    broken: boolean;
}

export function processBreakable(matrix: string[], width: number, room: $Room, coords: Vector[], si: AllBreakables) {

    matrix;
    width;

    //barril_2  barril_1 barril_broken

    let gui: $GFragment = {
        size: 'normal',
        auxClassNames: ['dungeon_objects'],
        top: 0,
        left: 0,
        zIndex: 0
    };

    /** monument_broken
     export type BreakableTypes =
    'P' | // xx twirl stone, looks like dna helix#  monument_3
    '{' | //xx beer barrel
    'Y' | //xx cross tombstone  //monument_2
    'V' | //xxx tombstone
    'J' | //xx vase 
    'B'; //xx statue wizard
     */

    let itm: $ItemBreakable = {
        tag: si.e,
        p: coords[0],
        broken: false,
        has: [],
        gui
    };

    si.has && si.has.forEach((c) => processContents(matrix, width, itm, c));

    // secret has to be on a tile (prolly has checks for carpets)

    let secret = getNameSpace(room, 'breakable');
    secret.push(itm);
    console.log('breakable', JSON.stringify(itm));
    return;

}
