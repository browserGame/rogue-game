import { IAllEdibles } from './IAllEdibles';
import { IAllSpells } from './IAllSpells';
import { IAllValuebles } from './IAllValuebles';
import { IAllWeapons } from './IAllWeapons';

export type ISIGeneralContent =
  | IAllValuebles
  | IAllEdibles
  | IAllSpells
  | IAllWeapons;
