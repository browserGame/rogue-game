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
} from './Symbols';

import {
    GeneralContents,
    processContents
} from './GeneralContent';

export interface $ItemEnemy extends $Item {
    xp: number;
    hp: number;
    level: number;
    triggeredBy?: string;
    has: GeneralContents[];
}

export function isEnemyItem(s: any): s is $ItemEnemy {
    return s.e === 'C' && s.has instanceof Array;
}

export function processEnemies(matrix: string[], width: number, room: $Room, coords: Vector[], si: AllEnemies) {

    matrix;
    width;

   
    let itm: $ItemEnemy = {
        tag: si.e,
        xp: si.xp,
        hp: si.hp,
        level: si.level,
        p: coords[0],
        triggeredBy: si.triggeredBy,
        has: []
    };
    si.has && si.has.forEach((c) => processContents(matrix, width, itm, c) );
        
    // secret has to be on a tile (prolly has checks for carpets)

    let enemy = getNameSpace(room, 'enemy');
    enemy.push(itm);
    console.log('enemy', JSON.stringify(itm));
    return;

}
