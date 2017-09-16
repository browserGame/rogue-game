
import { IBeerBarrel } from './IBeerBarrel';
import { ICrossTombStone } from './ICrossTombStone';
import { ITombStone } from './ITombStone';
import { ITwirlStone } from './ITwirlStone';
import { IVase } from './IVase';
import { IWizardStatue } from './IWizardStatue';

export type IAllBreakables =
    | ITwirlStone
    | IBeerBarrel
    | ICrossTombStone
    | ITombStone
    | IVase
    | IWizardStatue;

