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
    PortalType,
    Indirection,
    TelePortal
} from './Symbols';

export interface $ItemPortal extends $Item {
    toRoom: number;
    alias?: Indirection;
    portal: Indirection | PortalType;
}

export function processPortal(matrix: string[], width: number, room: $Room, coords: Vector[], si: TelePortal) {

    matrix;
    width;

    let itm: $ItemPortal = { tag: si.e, p: coords[0], toRoom: si.toRoom, portal:si.portal, alias: si.m };
    console.log({ portal: itm });
    let portal = getNameSpace(room, 'portal');
    portal.push(itm);

}
