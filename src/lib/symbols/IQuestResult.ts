import { IQuestResultType } from './IQuestResultType';
import { ISymbolBase } from './ISymbolBase';

export interface IQuestResult<T extends IQuestResultType> extends ISymbolBase<T> {
    credits: number;
    vitality: number;
    wisdom: number;
    agility: number;
}
