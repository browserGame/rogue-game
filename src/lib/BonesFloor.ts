
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
    Sample,
    sampleFromList,
} from './statistics';

type SkeletonAndBonusType =
    'skeleton_remains_01'
    | 'skeleton_remains_02'
    | 'skeleton_remains_03'
    | 'skeleton_remains_04'
    | 'skeleton_remains_08';

function chooseBones(): string {
    return sampleFromList<SkeletonAndBonusType>([0, 1, 2, 3, 4, 8].map((c) => {
        let rc: Sample<SkeletonAndBonusType> = {
            probability: 1,
            payload: ([
                'skeleton_remains_01',
                'skeleton_remains_02',
                'skeleton_remains_03',
                'skeleton_remains_04',
                'skeleton_remains_08'
            ] as SkeletonAndBonusType[])[c]
        };
        return rc;
    }));

}


export function processSkullAndBones(matrix: string[], width: number, room: $Room, coords: Vector[]) {
    matrix;
    width;
    //room;
    //coords;

    let skulls = coords.map((v) => {

        let gui: $GFragment = {
            size: 'normal',
            auxClassNames: ['dungeon_decor_props', chooseBones()],
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
    bones.splice(0, bones.length, ...skulls);
}
