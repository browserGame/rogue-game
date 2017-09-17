'use strict';

import {
    IGeneralContents,
    IGFragment,
    IItem,
    processContents,
    Room
} from '~items';

import {
    IVector,
    sampleFromListEqualProb
} from '~math';

import {
    IAllOpenables
} from '~symbols';


export interface IItemOpenable extends IItem {
    has: IGeneralContents[];
    opened: boolean;
}

export function processOpenable(matrix: string[], width: number, room: Room, coords: IVector[], si: IAllOpenables) {

    const select = {
        '&': 'safe', // Safe_open
        '*': sampleFromListEqualProb(['table_1', 'table_2']), // Table_broken
        'H': sampleFromListEqualProb(['coffin_02', 'coffin_01']), // Coffine_open_02, //coffin_open_01
        'z': sampleFromListEqualProb(['bookshelf_1', 'bookshelf_2']) // Bookshelf_1_searched, bookshelf_2_searched
    };

    const namespace = {
        '&': 'common_floor_objects',
        '*': 'dungeon_objects',
        'H': 'dungeon_objects',
        'z': 'dungeon_objects'
    };

    const gui: IGFragment = {
        auxClassNames: ['shadow3s30', namespace[si.e], select[si.e]],
        hasShadow: true,
        left: 0,
        size:  ['pxcb3s30', 'fsc3'],
        top: 0,
        zIndex: 0

    };

    const itm: IItemOpenable = {
        gui,
        has: [],
        opened: false,
        p: coords[0],
        tag: si.e

    };
    processContents;
    matrix;
    width;
    if (si.has) si.has.forEach(c => processContents(matrix, width, itm, c));

    // Secret has to be on a tile (prolly has checks for carpets)

    const secret = room.getNameSpace('openable');
    secret.push(itm);
    console.log('openable', JSON.stringify(itm));

    return;

}
