import { IDungeonFloorCoverType } from './IDungeonFloorCoverType';
import { ISymbolBase } from './ISymbolBase';

export type IDungeonFloorCover<T extends IDungeonFloorCoverType> = ISymbolBase<T>;
