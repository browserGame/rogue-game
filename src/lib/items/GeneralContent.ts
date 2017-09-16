import {
    IGeneralContainer,
    IItemArsenal,
    IItemEdible,
    IItemKnowable,
    IItemValuable,
    processEdible,
    processKnowable,
    processValuable,
    processWeapons
} from '~items';

import {
    IAllEdibles,
    IAllSpells,
    IAllValuebles,
    IAllWeapons,
    isEdible,
    ISIGeneralContent,
    isSpell,
    isValuable,
    isWeapon
} from '~symbols';

export type GeneralContents = IItemEdible | IItemValuable | IItemArsenal | IItemKnowable;


export function processContents(matrix: string[], width: number, container: IGeneralContainer, si: ISIGeneralContent) {

    switch (true) {
        case isEdible(si):
            processEdible(matrix, width, container, [{ x: -1, y: -1 }], <IAllEdibles> si);
            break;
        case isValuable(si):
            processValuable(matrix, width, container, [{ x: -1, y: -1 }], <IAllValuebles> si);
            break;
        case isSpell(si):
            processKnowable(matrix, width, container, [{ x: -1, y: -1 }], <IAllSpells> si);
            break;
        case isWeapon(si):
            processWeapons(matrix, width, container, [{ x: -1, y: -1 }], <IAllWeapons> si);
            break;
        default:
        break;
    }
}
