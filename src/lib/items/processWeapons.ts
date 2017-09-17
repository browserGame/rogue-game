'use strict';
import {
    IGeneralContainer,
    IGFragment,
    IItem,
    isRoom
} from '~items';

import {
    IVector,
    sampleFromListEqualProb
} from '~math';

import {
    IAllWeapons
} from '~symbols';

export interface IItemArsenal extends IItem {
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
    t: strArrGen(18, 'mace'),
    x: strArrGen(11, 'shoes'),
    Z: strArrGen(14, 'shield'),
    ç: strArrGen(11, 'pants')
};


export function processWeapons(
    _matrix: string[],
    _width: number,
    container: IGeneralContainer,
    coords: IVector[],
    si: IAllWeapons) {

    const gui: IGFragment = {
        auxClassNames: ['shadow2p5s20', 'equipment', sampleFromListEqualProb(select[si.e])],
        hasShadow: true,
        left: 0,
        size: ['pxcb3s30', 'fsc3'],
        top: 0,
        zIndex: 0
    };

    const itm: IItemArsenal = {
        addDp: si.addDp || 0,
        addHp: si.addHp || 0,
        addXp: si.addXp || 0,
        gui,
        p: coords[0],
        tag: si.e
    };
    //
    //
    const { x, y } = coords[0];
    //
    //  Not hidden it is on the playboard
    //
    if (x >= 0 && y >= 0 && isRoom(container)) {
        const drops = container.getNameSpace('weapons');
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
