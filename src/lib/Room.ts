
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

export interface GUISizeType {
    normal: 1;
    boss: 1;
    super: 1;
    plts3: 1; //position top-left scale 3
    fsc3: 1; // fix scale container 3
    pxcb30ps3: 1;
    pccs3: 1;
    pxcycs3: 1;
    pxcb3s30: 1;
    pxcb3p75s30: 1;
    pxcb10p5s30: 1;
    
}

export type $GUISizeType = keyof GUISizeType;

export interface $GFragment {
    size: $GUISizeType[];
    auxClassNames: string[];
    left: number;
    top: number;
    zIndex: number;
    hasShadow?: boolean;
}


export interface $Item {
    namespace?: string;
    tag: string;
    p: Vector;
    br?: Vector;
    gui: $GFragment;
}

export interface $RoomProperties {
    pk: number;
    top: number;
    left: number;
    width: number;
    height: number;
    doors: $Door[];
    body: Map<string, $Item[]>;
    base: string[];
}

export class $Room {

    public static isRoom(r: any): r is $Room {

        let arr: (keyof $Room)[];
        arr = ['pk', 'top', 'left', 'width', 'height'];
        return arr.filter((f) => {
            return !(typeof r[f] === 'number');
        }).length === 0;
    }

    pk: number;
    top: number;
    left: number;
    width: number;
    height: number;
    private _doors: $Door[] = [];
    body: Map<string, $Item[]>;
    base: string[];

    constructor(c: $RoomProperties) {
        this.pk = c.pk;
        this.top = c.top;
        this.left = c.left;
        this.width = c.width;
        this.height = c.height;
        this._doors = [];
        this.body = new Map();
    }

    public getNameSpace(key: string): $Item[] {
        let ns = this.body.get(key);
        if (!ns) {
            ns = [];
            this.body.set(key, ns);
        }
        return ns;
    }

    get doors(): $Door[] {
        return this.getNameSpace('doors') as $Door[];
    }

    contentNS(p: Vector, select: string = ''): $Item[] | undefined {
        let all = flatten(Array.from(this.body.values())) as $Item[];
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



}



export function isRoom(r: any): r is $Room {

    let arr: (keyof $Room)[];
    arr = ['pk', 'top', 'left', 'width', 'height'];

    return arr.filter((f) => {
        return !(typeof r[f] === 'number');
    }).length === 0;
}

export function getNameSpace(r: $Room, key: string): $Item[] {
    return r.getNameSpace(key);
    /* let ns = r.body.get(key);
     if (!ns) {
         ns = [];
         r.body.set(key, ns);
     }
     return ns;*/
}


/* function addContent(r: $Room, key: string, value: $Item): boolean {
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
}*/

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

