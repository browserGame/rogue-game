

import { SymbolBase, Indirection, PortalType } from './Symbols';
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

}

export interface $ItemCarpet extends $Item {
    br: Vector; // used by carpet , bottom right
    color: string; // used by carpet
}

export interface $ItemPortal extends $Item {
    toRoom: number;
    portal: Indirection | PortalType;
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

export function getContentAt(r: $Room, p: Vector): $Item[] | undefined {
    let all = flatten(Array.from(r.body.values())) as $Item[];
    let rc = all.filter((i) => {
        if (i.p.x === p.x && i.p.y === p.y) {
            return true;
        }
    });
    if (rc.length) {
        return rc;
    }
    return undefined;
}


