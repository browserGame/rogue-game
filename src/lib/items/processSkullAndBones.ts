'use strict';

import {
    IGFragment,
    IItem,
    Room
} from '~items';

import {
   IVector,
   sampleFromListEqualProb
} from '~math';

const skeletons = [1, 2, 3, 4, 5, 8].map(sk => `skeleton_remains_0${sk}`);

export function processSkullAndBones(_matrix: string[], _width: number, room: Room, coords: IVector[]) {

    const skulls = coords.map(v => {
        const gui: IGFragment = {
            auxClassNames: ['dungeon_decor_props', sampleFromListEqualProb(skeletons)],
            left: 0,
            size: ['fsc3', 'pccs3'],
            top: 0,
            zIndex: 0
        };

        const rc: IItem = {
            gui, p: v, tag: 'A'
        };

        return rc;
    });
    const bones = room.getNameSpace('skull&bones');
    bones.push(...skulls);
}
