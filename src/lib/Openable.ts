'use strict';
import {
    $Room,
    getNameSpace,
    $Item,
    $GFragment,
    $GUISizeType
} from './Room';

import {
    Vector
} from './math';

import {
    sampleFromListEqualProb
} from './statistics';

import {
    AllOpenables,

} from './Symbols';

import {
    GeneralContents,
    processContents
} from './GeneralContent';

export interface $ItemOpenable extends $Item {
    has: GeneralContents[];
    opened: boolean;
}

export function processOpenable(matrix: string[], width: number, room: $Room, coords: Vector[], si: AllOpenables) {

    const select = {
        z: sampleFromListEqualProb(['bookshelf_1', 'bookshelf_2']), //bookshelf_1_searched, bookshelf_2_searched
        '&': 'safe', //safe_open
        H: sampleFromListEqualProb(['coffin_02', 'coffin_01']), // coffine_open_02, //coffin_open_01
        '*': sampleFromListEqualProb(['table_1', 'table_2']) //table_broken
    };

    const namespace = {
        z: 'dungeon_objects',
        '&': 'common_floor_objects',
        H: 'dungeon_objects',
        '*': 'dungeon_objects'
    };

    const sizes: { [index: string]: $GUISizeType[]; } = {
        z: ['pxcb30ps3', 'fsc3'],
        '&': ['pxcb3s30', 'fsc3'],
        H: ['pxcb30ps3', 'fsc3'],
        '*': ['pxcb30ps3', 'fsc3']
    };

    const shadows = {
        z: 'shadow',
        '&': 'shadow3s30',
        H: 'shadow',
        '*': 'shadow'
    };

    let gui: $GFragment = {
        size: sizes[si.e],
        auxClassNames: [shadows[si.e], namespace[si.e], select[si.e]],
        left: 0,
        top: 0,
        zIndex: 0,
        hasShadow: true
    };

    let itm: $ItemOpenable = {
        tag: si.e,
        p: coords[0],
        has: [],
        opened: false,
        gui
    };
    processContents;
    matrix;
    width;
    si.has && si.has.forEach((c) => processContents(matrix, width, itm, c));

    // secret has to be on a tile (prolly has checks for carpets)

    let secret = getNameSpace(room, 'openable');
    secret.push(itm);
    console.log('openablex', JSON.stringify(itm));
    return;

}
