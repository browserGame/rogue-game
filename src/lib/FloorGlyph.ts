

'use strict';
import {
    $Room,
    getNameSpace,
    $Item,
    $GFragment,
    getContentAt
} from './Room';

import {
    Vector
} from './math';

import {
    AllGlyphs,
} from './Symbols';

export interface $ItemFloor extends $Item {
    enabled: boolean;
}


export function processGlyphs(_matrix: string[], _width: number, room: $Room, coords: Vector[], si: AllGlyphs) {


    /*
        export type RedPentagram = FloorGlyphs<'I'>;
        export type HalfMoonTrap = FloorGlyphs<'m'>;
        export type Pentagram = FloorGlyphs<'R'>;
        export type AllGlyphs = RedPentagram | HalfMoonTrap | Pentagram |DungeonEntrance;
    */
    let select = {
        I: 'star_block',
        m: 'moon_block',
        R: 'shrine',
        '²': 'dungeon_entrance'
    };

    let itms: $ItemFloor[] = coords.map((m) => {
        let gui: $GFragment = {
            size: 'normal',
            auxClassNames: ['common_floor_objects', select[si.e]],
            top: 0,
            left: 0,
            zIndex: 0
        };
        return {
            tag: si.e,
            p: m,
            enabled: false,
            gui
        }; //default 10 points lost if not specified
    });
    //
    let err = itms.filter((f) => {
        let other = getContentAt(room, f.p, '.é'); //must be on a floor or carpet
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
