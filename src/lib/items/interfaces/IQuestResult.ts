import { IQuestResultType, ISymbolBase } from '~items';

export interface IQuestResult<T extends IQuestResultType> extends ISymbolBase<T> {
    credits: number;
    vitality: number;
    wisdom: number;
    agility: number;
}
