import {

    IItemArsenal,
    IItemEdible,
    IItemKnowable,
    IItemValuable
} from '~items';

export type IGeneralContents = IItemEdible | IItemValuable | IItemArsenal | IItemKnowable;
