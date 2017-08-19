'use strict';
import {
    $Room,
    getNameSpace,
    $Item,
    $GFragment,
    $GUISizeType
    //getContentAt
} from './Room';

import {
    Vector
} from './math';

import {
    SpecialtyItems,
} from './Symbols';

export interface $ItemSpecial extends $Item {
    context: any;
    //
    //to be determined
    //
}

export function processSpecial(_matrix: string[], _width: number, room: $Room, coords: Vector[], si: SpecialtyItems) {

    /*

    '"' | '!' | 'U' | 'Q' |
    export type Torch = Obstructable<'!'>;  'common_floor_objects','candles'// animation
    export type Trader = Obstructable<'U'>; 'heroes','shopkeeper_idle'
    export type QuestGenerator = Obstructable<'Q'>;  'common_floor_objects','quest_stone','quest_stone_disabled'
    export type DeathTotem = Obstructable<'"'>; 'common_floor_objects','sign'
    export type SpecialtyItems = Torch | Trader | QuestGenerator | DeathTotem;
    
    */
    //
    // sanity check
    //

    const cssSheet = {
        '!': 'common_floor_objects',
        U: 'heroes',
        Q: 'common_floor_objects',
        '"': 'common_floor_objects'
    };

    const select = {
        '!': 'candles',
        U: 'shopkeeper_idle',
        Q: 'quest_stone',
        '"': 'sign'
    };

    const sizes: { [index: string]: $GUISizeType[]; } = {
        '!': ['pxcb30ps3', 'fsc3'],
        U: ['normal'],
        Q: ['normal'],
        '"': ['pccs3', 'fsc3']
    };

    const selectContext = {
        '!': undefined,
        U: undefined,
        Q: { enabled: true },
        '"': undefined
    };

    let gui: $GFragment = {
        size: sizes[si.e],
        auxClassNames: [cssSheet[si.e], select[si.e]],
        left: 0,
        top: 0,
        zIndex: 0
    };


    if (coords.length !== 1 && 'U"'.indexOf(si.e) >= 0) {
        return console.log('%c %s', 'color:red', `room:${room.pk} has wrong number of coords for ${si.e}`);
    }
    //
    //
    let itms = coords.map((c) => {
        let itm: $ItemSpecial = {
            tag: si.e,
            p: c,
            gui,
            context: selectContext[si.e]
        };
        return itm;
    });
    //
    //map to namespace
    //

    let special = getNameSpace(room, 'specials');
    special.push(...itms);
    console.log('specials', JSON.stringify(itms));
    return;

}
