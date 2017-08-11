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
    AllEdibles,
    //  GeneralContent
} from './Symbols';

import {
    sampleFromListEqualProb
} from '../lib/statistics';

import {
    GeneralContainer
} from './GeneralContainer';

export interface $ItemEdible extends $Item {
    addMana: number;
    addHp: number;
    poisen: { add: number, release: number };
}

export function processEdible(
    _matrix: string[],
    _width: number,
    container: GeneralContainer,
    coords: Vector[],
    si: AllEdibles) {

    /*

    export type EdibleType =
    's' | //   bottle water
    'p' | // bottle  milk
    'r' | //   chicken-bone
    'q' | //   cheese
    'i' | //   elixer
    ';' | //   fish
    '§' | //   mana
    'l'; //   magic-potion
 BottleWater | BottleMilk | ChickenBone | Cheese | Elixer | Fish | Mana | MagicPotion;

namespace: .common_items

    .milk
    .water
    .chicken_leg
    .cheese
    .rotten_cheese
    .hp_elixir
    .hp_tube
    .fish
    .mana_tube
    .magic_bottle
 */


    const select = {
        s: 'water',
        p: 'milk',
        r: 'chicken_leg',
        q: sampleFromListEqualProb(['cheese', 'rotten_cheese']),
        i: sampleFromListEqualProb(['hp_elixir', 'hp_tube']),
        ';': 'fish',
        '§': 'mana_tube',
        l: 'magic_bottle'
    };

    let gui: $GFragment = {
        size: 'normal',
        auxClassNames: ['common_items', select[si.e]],
        left: 0,
        top: 0,
        zIndex: 0
    };




    let itm: $ItemEdible = {
        tag: si.e,
        p: coords[0],
        addMana: si.addMana || 0,
        addHp: si.addHp || 0,
        poisen: si.poisen || { add: 0, release: 0 },
        gui
    };
    //
    //
    let { x, y } = coords[0];
    //
    //  Not hidden it is on the playboard
    //
    if (x >= 0 && y >= 0 && isRoom(container)) {
        let drops = getNameSpace(container, 'drops');
        drops.push(itm);
        console.log('drops', JSON.stringify(itm));
        return;
    }
    if (!isRoom(container)) {
        container.has.push(itm);
        return;
    }

    console.log(`Error, not a valid Edible to be placed at ${{ x, y }} %s`, JSON.stringify(itm));
}
