
import { IClawSpikesTypes } from './IClawSpikesTypes';
import { ISymbolBase } from './ISymbolBase';

export interface IClawSpikes<T extends IClawSpikesTypes> extends ISymbolBase<T> {
    delHp: number;
}

