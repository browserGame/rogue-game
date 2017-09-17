'use strict';
import {
    IGeneralContainer,
    IGFragment,
    IItem,
    isRoom
} from './';


import {
    IVector
} from '~math';

import {
    IAllEdibles
 } from '~symbols';

import {
    sampleFromListEqualProb
} from '~stats';


export interface IItemEdible extends IItem {
    addMana: number;
    addHp: number;
    poisen: { add: number, release: number };
}

export function processEdible(
    _matrix: string[],
    _width: number,
    container: IGeneralContainer,
    coords: IVector[],
    si: IAllEdibles) {

    const select = {
        ';': 'fish',
        'i': sampleFromListEqualProb(['hp_elixir', 'hp_tube']),
        'l': 'magic_bottle',
        'p': 'milk',
        'q': sampleFromListEqualProb(['cheese',   'rotten_cheese' ]),
        'r': 'chicken_leg',
        's': 'water',
        '§': 'mana_tube'

    };

    const gui: IGFragment = {
        auxClassNames: ['common_items', 'shadow2p5s20', select[si.e]],
        hasShadow: true,
        left: 0,
        size: ['fsc3', 'pccs3'],
        top: 0,
        zIndex: 0
   };


    const itm: IItemEdible = {
        addHp: si.addHp || 0,
        addMana: si.addMana || 0,
        gui,
        p: coords[0],
        poisen: si.poisen || { add: 0, release: 0 },
        tag: si.e
    };
    //
    //
    const { x, y } = coords[0];
    //
    //  Not hidden it is on the playboard
    //
    if (x >= 0 && y >= 0 && isRoom(container)) {
        const drops = container.getNameSpace('edible');
        drops.push(itm);
        console.log('edible', JSON.stringify(itm));

        return;
    }
    if (!isRoom(container)) {
        container.has.push(itm);

        return;
    }

    console.log(`Error, not a valid Edible to be placed at ${{ x, y }} %s`, JSON.stringify(itm));
}
