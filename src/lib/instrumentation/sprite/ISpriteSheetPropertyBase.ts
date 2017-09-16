import { IScaledItemPerc, IScaleItem } from '~instrumentation';

export interface ISpriteSheetPropertyBase {
  fsc?: IScaleItem[];
  plts?: IScaleItem[];
  pccs?: IScaleItem[];
  pxcb?: IScaledItemPerc[];
  shadow?: IScaledItemPerc[];
  /*lookRight?: Scalednumber[];*/
  smooth?: boolean;
}
