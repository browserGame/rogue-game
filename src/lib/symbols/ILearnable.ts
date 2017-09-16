
import { ILearnableType } from './ILearnableType';
import { ISymbolBase } from './ISymbolBase';

export interface ILearnable<I extends ILearnableType> extends ISymbolBase<I> {
    spell: string;
}

