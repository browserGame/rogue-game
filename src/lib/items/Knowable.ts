'use strict';
import {
    IGeneralContainer,
    IGFragment,
    IItem,
    isRoom
} from '~items';

import {
    IVector
} from '~math';

import {
    IAllSpells
} from '~symbols';


export interface IItemKnowable extends IItem {
    spell: string;
}

export function processKnowable(
    _matrix: string[],
    _width: number,
    container: IGeneralContainer,
    coords: IVector[],
    si: IAllSpells) {


    const gui: IGFragment = {
        auxClassNames: ['common_items', 'pccs3', 'book_skill'],
        hasShadow: true,
        left: 0,
        size: ['fsc3', 'pccs3'],
        top: 0,
        zIndex: 0
    };


    const itm: IItemKnowable = {
        gui,
        p: coords[0],
        spell: si.spell,
        tag: si.e
    };
    //
    //
    const { x, y } = coords[0];
    //
    //  Not hidden it is on the playboard
    //
    if (x >= 0 && y >= 0 && isRoom(container)) {
        const drops = container.getNameSpace('drops');
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
