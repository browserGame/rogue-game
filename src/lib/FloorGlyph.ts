

'use strict';
import {
    $Room,
    getNameSpace,
    $Item,
    getContentAt
} from './Room';

import {
    Vector
} from './math';

import {
    AllGlyphs
} from './Symbols';

export interface $ItemGlyph extends $Item {
   //connect triggered items here
}

export function processGlyphs(matrix: string[], width: number, room: $Room, coords: Vector[], si: AllGlyphs) {

    matrix;
    width;

    let itms: $ItemGlyph[] = coords.map((m) => {
        return { tag: si.e, p: m }; //default 10 points lost if not specified
    });
    //
    let err = itms.filter((f) => {
        let other = getContentAt(room, f.p, '.'); //must be on a floor (carpets etc extrude objects anyway)
        return (!other) ? true : false;
    });
    //
    // Show errors
    //
    console.log({ 'error-traps': JSON.stringify(err) });
    //
    //
    //
    if (err.length === 0) {
        let fglyphs = getNameSpace(room, 'floor-glyphs');
        fglyphs.push(...itms);
        console.log({ traps: itms });
    }
}
