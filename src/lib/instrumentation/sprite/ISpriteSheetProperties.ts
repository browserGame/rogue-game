import {
    ISpriteData,
    ISpriteSheetPropertyBase
} from '~instrumentation';

export interface ISpriteSheetProperties extends ISpriteSheetPropertyBase {
    actualUrl: string; // Mangled
    sprites: ISpriteData[];
    options: ISpriteSheetPropertyBase;
  }
