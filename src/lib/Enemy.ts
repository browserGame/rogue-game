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
    AllEnemies,

    AllEdibles,
    AllValuebles,

   

    isEdible,
    isValuable,
} from './Symbols';

import {
    processEdible,
    $ItemEdible,

} from './Edible';

import {
    $ItemValuable,
    processValuable
} from './Valuables';

export interface $ItemEnemy extends $Item {
    has: ($ItemValuable|$ItemEdible)[];
}

export function isEnemyItem(s: any): s is $ItemEnemy {
    return s.e === 'C' && s.has instanceof Array;
}

export function processEnemies(matrix: string[], width: number, room: $Room, coords: Vector[], si: AllEnemies) {

    matrix;
    width;

    //let fi = getContentAt(room, coords[0], '.');
    //if (!fi) {
    //    console.log('secret plate only possible on a floor tile:', coords[0]);
    //    return;
    //}


    let itm: $ItemEnemy = {
        tag: si.e,
        p: coords[0],
        has: []
    };
    si.has && si.has.forEach((c) => {
        switch (true) {
            case isEdible(c):
                processEdible(matrix, width, itm, [{ x: -1, y: -1 }], <AllEdibles>c);
                break;
            case isValuable(c):
                processValuable(matrix, width, itm, [{ x: -1, y: -1 }], <AllValuebles>c);
            default:
        }
    });

    // secret has to be on a tile (prolly has checks for carpets)

    let enemy = getNameSpace(room, 'enemy');
    enemy.push(itm);
    console.log('enemy', JSON.stringify(itm));
    return;

}
