'use strict';
import {
    IGeneralContents,
    IGFragment,
    IItem,
    processContents,
    Room
} from '../items';


import {
    IVector,
    sampleFromListEqualProb
 } from '../math';

import {
    IAllBreakables
} from '../symbols';


export interface IItemBreakable extends IItem {
    has: IGeneralContents[];
    broken: boolean;
}


export function processBreakable(matrix: string[], width: number, room: Room, coords: IVector[], si: IAllBreakables) {

    const select = {
        'B': 'statue_1',
        'J': {
            blue: sampleFromListEqualProb(['vase_7', 'vase_8']),
            gold: sampleFromListEqualProb(['vase_3', 'vase_4']),
            gray: sampleFromListEqualProb(['vase_5', 'vase_6']),
            green: sampleFromListEqualProb(['vase_1', 'vase_2']),
            red: sampleFromListEqualProb(['vase_9', 'vase_10'])

        },

        'P': 'monument_3',
        'V': sampleFromListEqualProb(['grave_1', 'grave_2']),
        'Y': 'monument_2',
        '{': sampleFromListEqualProb(['barril_2', 'barril_1'])

    };

    const obj = si.e === 'J' ? select[si.e][si.color] : select[si.e];


    const gui: IGFragment = {
        auxClassNames: ['dungeon_objects', 'shadow3s30', obj],
        left: 0,
        size: ['pxcb3s30', 'fsc3'],
        top: 0,
        zIndex: 0
    };

    /** monument_broken
     *  export type BreakableTypes =
     * 'P' | // xx twirl stone, looks like dna helix#  monument_3
     * '{' | //xx beer barrel
     * 'Y' | //xx cross tombstone  //monument_2
     * 'V' | //xxx tombstone
     * 'J' | //xx vase
     * 'B'; //xx statue wizard
     */

    const itm: IItemBreakable = {
        broken: false,
        gui,
        has: [],
        p: coords[0],
        tag: si.e
    };

    if (si.has) si.has.forEach(c => processContents(matrix, width, itm, c));

    // Secret has to be on a tile (prolly has checks for carpets)

    const secret = room.getNameSpace('breakable');
    secret.push(itm);
    console.log('breakable', JSON.stringify(itm));

    return;
}
