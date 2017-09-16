'use strict';
import {
    isRoom,
    getNameSpace,
    $Item,
    $GFragment
} from './Room';

import {
    Vector
} from './math';

import {
    AllWeapons
    // GeneralContent
} from './Symbols';

import {
    sampleFromListEqualProb
} from './statistics';

import {
    GeneralContainer
} from './GeneralContainer';


export interface IItemArsenal extends $Item {
    addXp: number;
    addHp: number;
    addDp: number;
}

const strArrGen = (l: number, prefix: string) => {
    const arr = new Array(l);
    arr.fill(0);
    return arr.map((_c, idx) => `${prefix}_${idx + 1}`);
};

const select = {
    Z: strArrGen(14, 'shield'),
    t: strArrGen(18, 'mace'),
    ç: strArrGen(11, 'pants'),
    x: strArrGen(11, 'shoes')
};


export function processWeapons(
    _matrix: string[],
    _width: number,
    container: GeneralContainer,
    coords: Vector[],
    si: AllWeapons) {

    /**

    export type ArsenalType =
    //. [Z] shield shield_1 t/m shield_14
    //. [t] mace mace_1 t/m mace_18
    //. [ç] pants  pants_1 t/m pants_11
    //. [x] boots shoes_1 t/m shoes_11
    //

    */


    const gui: $GFragment = {
        size: ['pxcb3s30', 'fsc3'],
        auxClassNames: ['shadow2p5s20', 'equipment', sampleFromListEqualProb(select[si.e])],
        left: 0,
        top: 0,
        zIndex: 0,
        hasShadow: true
    };


    const itm: $ItemArsenal = {
        tag: si.e,
        p: coords[0],
        addHp: si.addHp || 0,
        addXp: si.addXp || 0,
        addDp: si.addDp || 0,
        gui
    };
    //
    //
    const { x, y } = coords[0];
    //
    //  Not hidden it is on the playboard
    //
    if (x >= 0 && y >= 0 && isRoom(container)) {
        const drops = getNameSpace(container, 'weapons');
        drops.push(itm);
        console.log('weapons', JSON.stringify(itm));
        return;
    }
    if (!isRoom(container)) {
        container.has.push(itm);
        return;
    }


    console.log('Error, not a valid portal its not positioned on a floor tile:', JSON.stringify(itm));
}
