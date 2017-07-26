'use strict';
import {
    $Room,
    getNameSpace,
    $Item
} from './Room';

import {
    Vector
} from './math';

import {
    LevelStairs,
    Indirection,
    LevelStairsType
} from './Symbols';


import {
    floorExtrusion
} from './Floor';

/*
export interface LevelStairs extends SymbolBase<'µ'> {
    toRoom: number;
    stairs: Indirection | 'µ';
    level: number;
}
*/

export interface $ItemStairs extends $Item {
    toRoom: number;
    alias?: Indirection;
    stairs: Indirection | LevelStairsType;
    level: number;
}

export function processStairs(matrix: string[], width: number, room: $Room, coords: Vector[], si: LevelStairs) {

    matrix;
    width;

    let itm: $ItemStairs = { tag: si.e, p: coords[0], toRoom: si.toRoom, level: si.level, alias: si.m , stairs: si.stairs};
    console.log({ stairs: itm });
    let stairs = getNameSpace(room, 'stairs');
    floorExtrusion(room, itm);
    stairs.push(itm);

}
