import {
    $ItemEdible,
    processEdible
} from './Edible';

import {
    $ItemValuable,
    processValuable
} from './Valuables';

import {
    $ItemArsenal,
    processWeapons
} from './Weapon';

import {
    $ItemKnowable,
    processKnowable
} from './Knowable';

import {
    GeneralContainer
} from './GeneralContainer';

import {
    isEdible,
    isValuable,
    isSpell,
    isWeapon,
    SIGeneralContent,
    AllEdibles,
    AllWeapons,
    AllSpells,
    AllValuebles
} from './Symbols';

export type GeneralContents = $ItemEdible | $ItemValuable | $ItemArsenal | $ItemKnowable;


export function processContents(matrix: string[], width: number, container: GeneralContainer, si: SIGeneralContent) {

    switch (true) {
        case isEdible(si):
            processEdible(matrix, width, container, [{ x: -1, y: -1 }], <AllEdibles>si);
            break;
        case isValuable(si):
            processValuable(matrix, width, container, [{ x: -1, y: -1 }], <AllValuebles>si);
            break;
        case isSpell(si):
            processKnowable(matrix, width, container, [{ x: -1, y: -1 }], <AllSpells>si);
            break;
        case isWeapon(si):
            processWeapons(matrix, width, container, [{ x: -1, y: -1 }], <AllWeapons>si);
        default:
    }
}


