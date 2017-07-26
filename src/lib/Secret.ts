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
    SecretPlate,
    AllEdibles,
    isEdible
} from './Symbols';

import {
    processEdible,
    $ItemEdible
} from './Edible';


export interface $ItemSecret extends $Item {
    has: $ItemEdible[];
}

export function isSecretItem(s: any): s is $ItemSecret {
    return s.e === 'C' && s.has instanceof Array;
}

export function processSecret(matrix: string[], width: number, room: $Room, coords: Vector[], si: SecretPlate) {

    matrix;
    width;

    let fi = getContentAt(room, coords[0], '.');
    if (!fi) {
        console.log('secret plate only possible on a floor tile:', coords[0]);
        return;
    }


    let itm: $ItemSecret = {
        tag: si.e,
        p: coords[0],
        has: []
    };
    si.has.forEach((c) => {
        switch (true) {
            case isEdible(c):
                processEdible(matrix, width, itm, [{ x: -1, y: -1 }], <AllEdibles>c);
                break;
            default:
        }
    });

    // secret has to be on a tile (prolly has checks for carpets)

    let secret = getNameSpace(room, 'secret');
    secret.push(itm);
    console.log('secret', JSON.stringify(itm));
    return;

}
