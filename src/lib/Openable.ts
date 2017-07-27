'use strict';
import {
    $Room,
    getNameSpace,
    $Item
} from './Room';

import {
    Vector
} from './math';

import {
    AllOpenables,
  
} from './Symbols';

import {
    GeneralContents,
    processContents
} from './GeneralContent';

export interface $ItemOpenable extends $Item {
    has: GeneralContents[];
}

export function processOpenable(matrix: string[], width: number, room: $Room, coords: Vector[], si: AllOpenables) {

    let itm: $ItemOpenable = {
        tag: si.e,
        p: coords[0],
        has: []
    };
    si.has.forEach((c) => processContents(matrix, width, itm, c));
 
    // secret has to be on a tile (prolly has checks for carpets)

    let secret = getNameSpace(room, 'openable');
    secret.push(itm);
    console.log('openable', JSON.stringify(itm));
    return;

}
