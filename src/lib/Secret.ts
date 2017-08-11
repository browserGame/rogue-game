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
    SecretPlate,
    //GeneralContent,
} from './Symbols';

import {
    GeneralContents,
    processContents
} from './GeneralContent';

export interface $ItemSecret extends $Item {
    has: GeneralContents[];
    hidden: boolean;
}

export function processSecret(matrix: string[], width: number, room: $Room, coords: Vector[], si: SecretPlate) {

    matrix;
    width;

    let fi = getContentAt(room, coords[0], '.');
    if (!fi) {
        console.log('secret plate only possible on a floor tile:', coords[0]);
        return;
    }

    let gui: $GFragment = {
        size: undefined,
        auxClassNames: undefined, 
        left: 0,
        top: 0,
        zIndex: 0
    };

    let itm: $ItemSecret = {
        tag: si.e,
        p: coords[0],
        has: [],
        gui,
        hidden: true
    };

    si.has && si.has.forEach((c) => processContents(matrix, width, itm, c));

    // secret has to be on a tile (prolly has checks for carpets)

    let secret = getNameSpace(room, 'secret');
    secret.push(itm);
    console.log('secret', JSON.stringify(itm));
    return;

}
