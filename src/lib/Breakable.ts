'use strict';
import {
    $Room,
    getNameSpace,
    $Item,
   
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
}

export function processBreakable(matrix: string[], width: number, room: $Room, coords: Vector[], si: AllBreakables) {

    matrix;
    width;

    let itm: $ItemBreakable = {
        tag: si.e,
        p: coords[0],
        has: []
    };
    si.has.forEach((c) => processContents(matrix, width, itm, c));
 
    // secret has to be on a tile (prolly has checks for carpets)

    let secret = getNameSpace(room, 'breakable');
    secret.push(itm);
    console.log('breakable', JSON.stringify(itm));
    return;

}
