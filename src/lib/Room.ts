

import { SymbolBase } from './Symbols';
import { Vector } from './math';
import { flatten } from './tools';
import {
    $Door
} from './Door';


export interface Layout {
    room: string[];
    id: number;
    symbols: (SymbolBase<string>)[];
}

export interface $Item {
    namespace?: string;
    tag: string;
    p: Vector;
    br?: Vector;
}


export interface $Room {
    pk: number;
    top: number;
    left: number;
    width: number;
    height: number;
    doors: $Door[];
    body: Map<string, $Item[]>;
    base: string[];
}

export function getNameSpace(r: $Room, key: string): $Item[] {
    let ns = r.body.get(key);
    if (!ns) {
        ns = [];
        r.body.set(key, ns);
    }
    return ns;
}


export function addContent(r: $Room, key: string, value: $Item): boolean {
    r.body = r.body || new Map();
    let content = r.body.get(key);
    if (!content) {
        content = [];
        r.body.set(key, content);
    }
    value.namespace = key;
    let found = content.find((i) => i.p.x === value.p.x && i.p.y === value.p.y);
    if (found) { // ,xy, must be unique within a namespace (key)
        return false; // node added
    }
    content.push(value);
    return true;
}

export function getContentAt(r: $Room, p: Vector, select: string = ''): $Item[] | undefined {
    let all = flatten(Array.from(r.body.values())) as $Item[];
    let rc = all.filter((i) => {
        if (i.p.x === p.x && i.p.y === p.y) {
            return true;
        }
        if (i.br) {
            if (p.x <= i.br.x && p.x >= p.x && p.y >= i.p.y && p.y <= i.br.y) {
                return true;
            }
        }
        return false;
    });

    if (select) {
        rc = rc.filter((j) => select.split('').indexOf(j.tag) >= 0);
    }

    if (rc.length) {
        return rc;
    }
    return undefined;
}

export function isValidArea(coords: Vector[]): { isValid: boolean; first: Vector; last: Vector } {

    let cp = coords.slice(0);
    cp.sort((a, b) => a.y - b.y || a.x - b.x); //first is top-left, last is bottom right

    let first = cp[0];
    let last = cp[cp.length - 1];

    let isValid = true;
    end:
    for (let x = first.x; x <= last.x; x++) {
        for (let y = first.y; y <= last.y; y++) {
            if (!cp.find((i) => i.x === x && i.y === y)) {
                isValid = false;
                break end;
            }
        }
    }
    return { isValid, first, last };
}
