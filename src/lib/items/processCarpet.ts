'use strict';
import {
    floorExtrusion,
    IGFragment,
    IItem,
    Room
} from '~items';

import {
    IVector
} from '~math';

import {
    ICarpet
} from '~symbols';

import {
    coordsNoExtrusions
} from '~utils';

export interface IItemCarpet extends IItem {
    br: IVector;
    // Color: string; // used by carpet
}

function getCarpet(size: IVector, color: 'red' | 'blue'): string {
    const s = `${color}_${size.x}x${size.y}`;

    const map: { [index: string]: string; } = {
        blue_2x2: 'carpet_blue_square',
        blue_3x2: 'carpet_blue_horizontal',
        blue_3x3: 'carpet_blue',
        red_2x2: 'carpet_red_square',
        red_3x2: 'carpet_red_horizontal',
        red_3x3: 'carpet_red'
      };

    const rc = map[s];

    return rc;

}

export function processCarpet(_matrix: string[], _width: number, room: Room, coords: IVector[], si: ICarpet) {


    const { isValid, first, last } = coordsNoExtrusions(coords);

    if (!isValid) {
        console.log(`room: ${room.pk} has an invalid carpet (${first.x},${first.y})->(${last.x},${last.y})`);

        return; // Do nothing
    }

    const gui: IGFragment = {
        auxClassNames: [
            'common_floor_objects',
            getCarpet({ x: last.x - first.x + 1, y: last.y - first.y + 1 }, si.color)
        ],
        hasShadow: false,
        left: 0,
        size: ['plts3'],
        top: 0,
        zIndex: 0

    };

    const itm: IItemCarpet = { tag: si.e, p: first, br: last, gui };
    floorExtrusion(room, itm);
    const carpet = room.getNameSpace('carpet');
    carpet.push(itm);

}
