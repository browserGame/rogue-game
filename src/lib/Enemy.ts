'use strict';
import {
    $Room,
    getNameSpace,
    $Item,
    $GFragment
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

import {
    sampleFromListEqualProb
} from './statistics';

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

    const select = {
        '%': sampleFromListEqualProb(['ogre03_idle', 'minotaur01_idle', 'death03_idle', 'dragon01_idle', 'troll01_idle']),
        E: 'gnome05_idle',
        F: 'bat_idle',
        G: 'rat_idle',
        '@': 'lizard05_idle',
        T: 'skeleton_idle'
    };

    /*
    export type EnemyTypes = 
        'T' | //xxx skeleton-enemy //skeleton_idle, skeleton_attack
        '%' | //xx boss //random(ogre03_idle,minotaur01_idle,death03_idle,dragon01_idle,troll01_idle)
        'E' | //xx goblin //gnome05_idle
        'F' | //xx bat //.bat_idle
        'G' | //xx rat //. .rat_idle 
        '@';  //xx green wizard shaman throws fire //lizard05_idle
    */
    let gui: $GFragment = {
        size: si.e === '%' ? 'boss' : 'normal',
        left: 0,
        top: 0,
        auxClassNames: ['enemies', select[si.e]],
        zIndex: 0
    };

    let itm: $ItemEnemy = {
        tag: si.e,
        xp: si.xp,
        hp: si.hp,
        level: si.level,
        p: coords[0],
        triggeredBy: si.triggeredBy,
        has: [],
        gui
    };

    si.has && si.has.forEach((c) => processContents(matrix, width, itm, c));

    // secret has to be on a tile (prolly has checks for carpets)

    let enemy = getNameSpace(room, 'enemy');
    enemy.push(itm);
    console.log('enemy', JSON.stringify(itm));
    return;

}
