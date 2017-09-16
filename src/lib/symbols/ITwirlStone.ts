import { IBreakable } from './IBreakable';

export type ITwirlStone = IBreakable<'P'>;
export type IBeerBarrel = IBreakable<'{'>;
export type ICrossTombStone = IBreakable<'Y'>;
export type ITombStone = IBreakable<'V'>;
export type IWizardStatue = IBreakable<'B'>;

export type IAllBreakables =
    | ITwirlStone
    | IBeerBarrel
    | ICrossTombStone
    | ITombStone
    | IVase
    | IWizardStatue;
