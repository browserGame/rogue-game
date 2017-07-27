'use strict';
import {
    $Room,
    isRoom,
    getNameSpace,
    $Item,
} from './Room';

import {
    Vector
} from './math';

import {
    AllValuebles
} from './Symbols';

import {
    $ItemSecret,
    //isSecretItem
} from './Secret';

import {
    $ItemEnemy
} from './Enemy';

export interface $ItemValuable extends $Item {
    credit: number;
    color?: string;
}


export function processValuable(matrix: string[], width: number, container: $Room | $ItemSecret | $ItemEnemy, coords: Vector[], si: AllValuebles) {

    matrix;
    width;

    let itm: $ItemValuable = {
        tag: si.e,
        p: coords[0],
        credit: si.credit,
        color: si.color
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
