'use strict';
import {
    $Room,
    getNameSpace,
    $Item,
    //getContentAt
} from './Room';

import {
    Vector
} from './math';

import {
    SpecialtyItems,
} from './Symbols';

export interface $ItemSpecial extends $Item {
    //
    //to be determined
    //
}

export function processSpecial(matrix: string[], width: number, room: $Room, coords: Vector[], si: SpecialtyItems) {

    matrix;
    width;
    //
    // sanity check
    //
    if (coords.length !== 1) {
        return console.log(`room:${room.pk} has wrong coords for ${si.e}`);
    }
    //
    //
    let itm: $ItemSpecial = {
        tag: si.e,
        p: coords[0]
    };
    //
    //map to namespace
    //
    let nsMap = {
        '!': 'torch',
        U: 'trader',
        Q: 'quest-generator',
        '"': 'death-totem'
    };

    let namespace = nsMap[si.e];

    if (!namespace) {
        console.log(`room: ${room.pk} , error, the speciality tag ${si.e} could not be mapped`);
        return;
    }

    let special = getNameSpace(room, namespace);
    special.push(itm);
    console.log(namespace, JSON.stringify(itm));
    return;

}
