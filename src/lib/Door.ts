
import { Vector } from './math';

export interface Door {
    from: number;
    to: number;
    inset: boolean;
    p: Vector;
    dir: '^' | '<' | '>' | 'v';
}




