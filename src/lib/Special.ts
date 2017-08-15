'use strict';
import {
    $Room,
    getNameSpace,
    $Item,
    $GFragment
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

    const selectContext = {
        '!': undefined,
        U: undefined,
        Q: { enabled: true },
        '"': undefined
    };

    let gui: $GFragment = {
        size: ['normal'],
        auxClassNames: [cssSheet[si.e], select[si.e]],
        left: 0,
        top: 0,
        zIndex: 0
    };


    if (coords.length !== 1) {
        return console.log(`room:${room.pk} has wrong coords for ${si.e}`);
    }
    //
    //
    let itm: $ItemSpecial = {
        tag: si.e,
        p: coords[0],
        gui,
        context : selectContext[si.e]
    };
    //
    //map to namespace
    //
    let nsMap = {
        '!': 'torch',
        U: 'trader',
        Q: 'quest-generator',
        '"': 'death-totem'
    };

    let namespace = nsMap[si.e];

    if (!namespace) {
        console.log(`room: ${room.pk} , error, the speciality tag ${si.e} could not be mapped`);
        return;
    }

    let special = getNameSpace(room, namespace);
    special.push(itm);
    console.log(namespace, JSON.stringify(itm));
    return;

}
