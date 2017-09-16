import { IItem } from './IItem';

export interface IDoor extends IItem {
    // From: number;
    to: number;
    inset: boolean;
    /* p: Vector;*/
    tag: '^' | '<' | '>' | 'v';
    // Gui: $GFragment;
}
