'use strict';
import {
    IGFragment,
    IItem,
    Room
} from '~items';

import {
    IVector
} from '~math';

import {
    IIndirection,
    IPortalType,
    ITelePortal
} from '~symbols';

export interface IItemPortal extends IItem {
    toRoom: number;
    alias?: IIndirection;
    portal: IIndirection | IPortalType;
}

export function processPortal(_matrix: string[], _width: number, room: Room, coords: IVector[], si: ITelePortal) {


    const gui: IGFragment = {
        auxClassNames: ['shadow3s30', 'common_floor_objects', 'teleportation'],
        hasShadow: true,
        left: 0,
        size: ['pxcb3s30', 'fsc3'],
        top: 0,
        zIndex: 0
    };

    const itm: IItemPortal = {
        alias: si.m,
        gui,
        p: coords[0],
        portal: si.portal,
        tag: si.e,
        toRoom:
        si.toRoom
    };

    const other = room.getContentAt(coords[0], '.');

    if (other) {
        const portal = room.getNameSpace('portal');
        portal.push(itm);
        console.log({ portal: itm });

        return;
    }
    console.log('Error, not a valid portal its not positioned on a floor tile:', JSON.stringify(itm));
}
