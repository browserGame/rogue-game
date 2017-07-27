'use strict';
import {
    isRoom,
    getNameSpace,
    $Item,
} from './Room';

import {
    Vector
} from './math';

import {
    AllWeapons,
    //GeneralContent
} from './Symbols';


import {
    GeneralContainer
} from './GeneralContainer';


export interface $ItemArsenal extends $Item {
    addXp: number;
    addHp: number;
    addDp: number;
}

export function processWeapons(
    matrix: string[], 
    width: number, 
    container: GeneralContainer, 
    coords: Vector[], 
    si: AllWeapons) {

    matrix;
    width;

    let itm: $ItemArsenal = {
        tag: si.e,
        p: coords[0],
        addHp: si.addHp || 0,
        addXp: si.addXp || 0,
        addDp: si.addDp || 0 
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


    console.log('Error, not a valid portal its not positioned on a floor tile:', JSON.stringify(itm));
}
