
'use strict';
import {
    $Room,
    getNameSpace,
    $GFragment,
    $Item

} from './Room';

import {
    Vector
} from './math';

import {
    sampleFromListEqualProb
} from './statistics';

const skeletons = [1, 2, 3, 4, 5 , 8].map((sk) => `skeleton_remains_0${sk}`);


export function processSkullAndBones(_matrix: string[], _width: number, room: $Room, coords: Vector[]) {


    let skulls = coords.map((v) => {

        let gui: $GFragment = {
            size: 'normal',
            auxClassNames: ['dungeon_decor_props', sampleFromListEqualProb(skeletons)],
            left: 0,
            top: 0,
            zIndex: 0
        };

        let rc: $Item = {
            tag: 'A', p: v, gui
        };

        return rc;
    });
    let bones = getNameSpace(room, 'skull&bones');
    bones.push(...skulls);
}
