
'use strict';
import {
    $Room,
    getNameSpace,

} from './Room';

import {
    Vector
} from './math';

import {
    Carpet
} from './Symbols';

import {
    $ItemCarpet
} from './Carpet';

import {
    isValidArea
} from './tools';

export function processSkullAndBones(matrix: string[], width: number, room: $Room, coords: Vector[]) {
    matrix;
    width;
    //room;
    //coords;

    let skulls = coords.map((v) => { return { tag: 'A', p: v }; });

    let bones = getNameSpace(room, 'skull&bones');
    bones.splice(0, bones.length, ...skulls);
}


export function processCarpet(matrix: string[], width: number, room: $Room, coords: Vector[], si: Carpet) {

    matrix;
    width;

    let result = isValidArea(coords);

    if (!result.isValid) {
        console.log(`room: ${room.pk} has an invalid carpet (${result.first.x},${result.first.y})->(${result.last.x},${result.last.y})`);
        return; //do nothing
    }

    let bones = getNameSpace(room, 'bones-floor');
    let itm: $ItemCarpet = { tag: si.e, p: result.first, br: result.last, color: si.type };
    bones.push(itm);

}






