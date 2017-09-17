'use strict';
import {
    IGeneralContents,
    IGFragment,
    IGUISizeTypeKeys,
    IItem,
    processContents,
    Room
} from '~items';

import {
    IVector,
    sampleFromListEqualProb
} from '~math';

import {
    IAllEnemies
} from '~symbols';


export interface IItemEnemy extends IItem {
    xp: number;
    hp: number;
    level: number;
    triggeredBy?: string;
    has: IGeneralContents[];
}

export function isEnemyItem(s: any): s is IItemEnemy {
    return s.e === 'C' && s.has instanceof Array;
}

export function processEnemies(matrix: string[], width: number, room: Room, coords: IVector[], si: IAllEnemies) {

    const select = {
        '%': sampleFromListEqualProb(['ogre03_idle', 'minotaur01_idle', 'death03_idle', 'dragon01_idle', 'troll01_idle']),
        '@': 'lizard05_idle',
        'E': 'gnome05_idle',
        'F': 'bat_idle',
        'G': 'rat_idle',
        'T': 'skeleton_idle'
    };

    const orientation = sampleFromListEqualProb(['right', '']);

    const shadows = {
        '%': 'shadow3p75s30',
        '@': 'shadow3s30',
        'E': 'shadow3s30',
        'F': 'shadow3s30',
        'G': 'shadow3s30',
        'T': 'shadow3s30'
    };

    const sizes: { [index: string]: IGUISizeTypeKeys} = {
        '%': 'pxcb3p75s30',
        '@': 'pxcb3s30',
        'E': 'pxcb3s30',
        'F': 'pxcb3s30',
        'G': 'pxcb3s30',
        'T': 'pxcb3s30'
    };

    const gui: IGFragment = {
        auxClassNames: [
            'enemies',
            orientation,
            select[si.e],
            shadows[si.e]
        ],
        left: 0,
        size: [sizes[si.e], 'fsc3'], // , si.e === '%' ? 'boss' : ''],
        top: 0,
        zIndex: 0
    };

    if (si.e === '%') {
        gui.size.splice(0, 1, 'pxcb3p75s30');
    }

    const itm: IItemEnemy = {
        gui,
        has: [],
        hp: si.hp,
        level: si.level,
        p: coords[0],
        tag: si.e,
        triggeredBy: si.triggeredBy,
        xp: si.xp
    };

    if (si.has) si.has.forEach(c => processContents(matrix, width, itm, c));

    // Secret has to be on a tile (prolly has checks for carpets)

    const enemy = room.getNameSpace('enemy');
    enemy.push(itm);
    console.log('enemy', JSON.stringify(itm));

    return;

}
