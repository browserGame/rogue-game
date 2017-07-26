'use strict';
import {
    $Room,
    isRoom,
    getNameSpace,
    $Item,
 } from './Room';

import {
    Vector
} from './math';

import {
    AllEdibles
} from './Symbols';

import {
    $ItemSecret,
    //isSecretItem
} from './Secret';

export interface $ItemEdible extends $Item {
    addMana: number;
    addHp: number;
    poisen: { add: number, release: number };
}

export function processEdible(matrix: string[], width: number, container: $Room |$ItemSecret, coords: Vector[], si: AllEdibles) {

    matrix;
    width;

    let itm: $ItemEdible = {
        tag: si.e,
        p: coords[0],
        addMana: si.addMana || 0,
        addHp: si.addHp || 0,
        poisen: si.poisen || { add: 0, release: 0 }
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
    if (!isRoom(container)){
        container.has.push(itm);
        return;
    }


    console.log('Error, not a valid portal its not positioned on a floor tile:', JSON.stringify(itm));
}
