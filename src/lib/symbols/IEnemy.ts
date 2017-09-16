import { IBreakableTypes } from './IBreakableTypes';
import { IEnemyTypes } from './IEnemyTypes';
import { IFloorGlyphsType } from './IFloorGlyphsType';
import { IIndirection } from './IIndirection';
import { ISIGeneralContent } from './ISIGeneralContent';
import { ISymbolBase } from './ISymbolBase';

export interface IEnemy<T extends IEnemyTypes> extends ISymbolBase<T> {
  triggeredBy?: IIndirection | IBreakableTypes | IFloorGlyphsType;
  hp: number;
  xp: number;
  level: number;
  has: ISIGeneralContent[];
}
