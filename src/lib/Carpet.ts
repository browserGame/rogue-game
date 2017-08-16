'use strict';
import {
    $Room,
    getNameSpace,
    $GFragment

} from './Room';

import {
    Vector
} from './math';

import {
    Carpet
} from './Symbols';

import {
    floorExtrusion
} from './Floor';

import {
    isValidArea
} from './tools';

import { $Item } from './Room';


export interface $ItemCarpet extends $Item {
    br: Vector;
    //color: string; // used by carpet
}

function getCarpet(size: Vector, color: 'red' | 'blue'): string {
    let s = `${color}_${size.x}x${size.y}`;

    const map: { [index: string]: string; } = {
        red_3x3: 'carpet_red',
        red_3x2: 'carpet_red_horizontal',
        red_2x2: 'carpet_red_square',
        blue_3x3: 'carpet_blue',
        blue_3x2: 'carpet_blue_horizontal',
        blue_2x2: 'carpet_blue_square',
    };

    let rc = map[s];
    return rc;

}

export function processCarpet(_matrix: string[], _width: number, room: $Room, coords: Vector[], si: Carpet) {

 

    let { isValid, first, last } = isValidArea(coords);

    if (!isValid) {
        console.log(`room: ${room.pk} has an invalid carpet (${first.x},${first.y})->(${last.x},${last.y})`);
        return; //do nothing
    }

    let gui: $GFragment = {
        size: ['plts3'],
        auxClassNames: [
            'common_floor_objects', 
            getCarpet({ x: last.x - first.x + 1, y: last.y - first.y + 1 }, si.color)
        ],
        left: 0,
        top: 0,
        zIndex: 0
    };

    let itm: $ItemCarpet = { tag: si.e, p: first, br: last, gui };
    floorExtrusion(room, itm);
    let carpet = getNameSpace(room, 'carpet');
    carpet.push(itm);

}
