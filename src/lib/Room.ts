

import { SymbolBase } from './Symbols';
import { Vector } from './math';
import { Door } from './Door';

export interface Layout {
    room: string[];
    id: number;
    symbols: (SymbolBase<string>)[];
}

export interface $Item {
    tag: string;
    p: Vector;
}

export interface $Room {
    pk: number;
    top: number;
    left: number;
    width: number;
    height: number;
    walls: $Item[];
    doors: Door[];
    base: string[];
    floor: $Item[];
    cobWebs: $Item[];
}
