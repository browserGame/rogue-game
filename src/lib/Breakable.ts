'use strict';
import {
    $Room,
    getNameSpace,
    $Item,
    $GFragment
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

import {
    sampleFromListEqualProb
} from '../lib/statistics';

export interface $ItemBreakable extends $Item {
    has: GeneralContents[];
    broken: boolean;
}



export function processBreakable(matrix: string[], width: number, room: $Room, coords: Vector[], si: AllBreakables) {


    //barril_2  barril_1 barril_broken


    const select = {
        P: 'monument_3',
        '{': sampleFromListEqualProb(['barril_2', 'barril_1']),
        Y: 'monument_2',
        V: sampleFromListEqualProb(['grave_1', 'grave_2']),
        J: {
            gold:sampleFromListEqualProb(['vase_3', 'vase_4']),
            green: sampleFromListEqualProb(['vase_1', 'vase_2']),
            red: sampleFromListEqualProb(['vase_9', 'vase_10']),
            blue: sampleFromListEqualProb(['vase_7', 'vase_8']),
            gray: sampleFromListEqualProb(['vase_5', 'vase_6'])
        },
        B: 'statue_1'
    };
   
    let obj = si.e === 'J' ? select[si.e][si.color] : select[si.e];
    

    let gui: $GFragment = {
        size: ['normal'],
        auxClassNames: ['dungeon_objects', obj],
        top: 0,
        left: 0,
        zIndex: 0
    };

    /** monument_broken
     export type BreakableTypes =
    'P' | // xx twirl stone, looks like dna helix#  monument_3
    '{' | //xx beer barrel
    'Y' | //xx cross tombstone  //monument_2
    'V' | //xxx tombstone
    'J' | //xx vase 
    'B'; //xx statue wizard
     */

    let itm: $ItemBreakable = {
        tag: si.e,
        p: coords[0],
        broken: false,
        has: [],
        gui
    };

    si.has && si.has.forEach((c) => processContents(matrix, width, itm, c));

    // secret has to be on a tile (prolly has checks for carpets)

    let secret = getNameSpace(room, 'breakable');
    secret.push(itm);
    console.log('breakable', JSON.stringify(itm));
    return;

}
