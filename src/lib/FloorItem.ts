
import { Vector } from './math';
import { SymbolBase as Symbol } from './Symbols';

export interface AreaTypes {
    carpet: 1; // scan carpets
    liquid: 1; //scan water pools
    lantern: 1; // 
    'cobweb&Skulls': 1; //
    mutexItems: 1; // nothing covering these items or nothing below these items (carpets , skulls);
    breakableItems: 1; //
    enemy: 1; //
    openableItems: 1; //
    consumables: 1; //
}

export class FloorItem {
    private type: string;
    private start: Vector;
    private end: Vector;
    private canPlaceOnTop: boolean;
    private obstruction: boolean;

    private zIndex: number;
    public constructor(t: string, start: Vector, end: Vector, zIndex: number, obstruction: boolean, canPlaceOnTop: boolean) {
        this.start = Object.assign({}, start);
        this.end = Object.assign({}, end);
        this.type = t;
        this.zIndex = zIndex;
        this.obstruction = obstruction;
        this.canPlaceOnTop = canPlaceOnTop;
    }
}

export class Property {
    private type: string;
    private _pos: Vector; // where it is placed on the floor after it is dropped

    constructor(t: string, pos: Vector) {
        this.type = t;
        this._pos = Object.assign({}, pos);

    }

    public set pos(v: Vector) {
        this.pos = Object.assign({}, this._pos, v); //copy
    }

    public get pos() {
        return Object.assign({}, this._pos); //copy
    }
}

/**
 * Consumables like Chees, bootles of potion etc, chicken-leg.
 */
export class Consumable extends Property {

    private hp: number;

    constructor(t: string, pos: Vector, hpDelta: number) {
        super(t, pos);
        this.hp = hpDelta;
    }

}

export class Enemy {

    private pos: Vector;
    private contains: Property[]; //coins , gold, magic items
    private xp: number; // experience points
    private level: number; // efficacy of your experience points for attack and defense
    private hp: number; // health pooints
    private type: string;

    public constructor(t: string, pos: Vector, health: number, experience: number, level: number) {
        this.pos = Object.assign({}, pos);
        this.type = t;
        this.hp = health;
        this.xp = experience;
        this.level = level;
        this.contains = [];
    }
}

export type CreateAreaFunction = (raw: string[], zIndex?: number, meta?: Symbol<any>[]) => FloorItem | Enemy | Consumable | undefined;

export function factoryAreaScanner(areaType: keyof AreaTypes): CreateAreaFunction {

    function scanArea(regExp: RegExp, raw: string[]): { start: Vector, end: Vector, type: string } | undefined {
        let start: Vector = { x: -1, y: -1 };
        let type: string | undefined;

        const clear = (d: Vector) => {
            let arr = raw[d.y].split('');
            let numDeletes = d.x - start.x + 1;
            let inserts = new Array(numDeletes);
            inserts.fill('.');
            arr.splice(start.x, numDeletes, ...inserts); //clear it}
            raw[d.y] = arr.join('');
        };

        for (let y = 0; y < raw.length; y++) {
            let line = raw[y];
            let m = line.match(regExp);
            if (m && m.index) {
                type = m[0];
                start.x = m.index;
                start.y = y;
                break;
            }
        }

        if (!type) {
            return;
        }

        let c = Object.assign({}, start);
        for (let i = 0; i < 2; i++) {
            let dx = (i === 0) ? 1 : 0;
            let dy = (i === 0) ? 0 : 1;
            do {
                clear(c);
                c.x += dx;
                c.y += dy;
            } while (raw[c.y][c.x] === type);
            if (dx) {
                c.x--;
            }
            if (dy) {
                c.y--;
            }

        }
        return { start, end: c, type };
    }


    switch (areaType) {
        case 'liquid':
            return function lavaWater(raw: string[], zIndex = 0): FloorItem | undefined {
                let rc = scanArea(/[O\(]/, raw);
                if (rc) {
                    return new FloorItem(rc.type, rc.start, rc.end, zIndex, true /*obstruction*/, false /*canplaceontop*/);
                }
                return;
            };
        case 'carpet':
            return function carpet(raw: string[], zIndex = 0): FloorItem | undefined {

                let rc = scanArea(/é/, raw);
                if (rc) {
                    return new FloorItem(rc.type, rc.start, rc.end, zIndex, false /*obstruction*/, true /*canplaceontop*/);
                }
                return;
            };
        case 'lantern'://nothing above a lantern
            return function lantern(raw: string[], zIndex = 99): FloorItem | undefined {
                let rc = scanArea(/!/, raw);
                if (rc) {
                    return new FloorItem(rc.type, rc.start, rc.end, zIndex, true /*obstruction*/, false /*canplaceontop*/);
                }
                return;
            };
        case 'cobweb&Skulls':
            return function cobwebSkulls(raw: string[], zIndex = 1): FloorItem | undefined {
                let rc = scanArea(/[KA]/, raw);
                if (rc) {
                    return new FloorItem(rc.type, rc.start, rc.end, zIndex, false, true);
                }
                return;
            };
        case 'mutexItems':
            ////CIRSwm  [c] secret pressure plate, [I] red pentagram, [R] pentagram, [S]  bear trap, [w] spikes, [m] half moon trap
            return function misc(raw: string[], zIndex = 0): FloorItem | undefined {
                let rc = scanArea(/[CIRSwm]/, raw);
                if (rc) {
                    return new FloorItem(rc.type, rc.start, rc.end, zIndex, false /*obstruction*/, false /*canplaceontop*/);
                }
                return;
            };
        case 'breakableItems':
            return function breakable(raw: string[], zIndex = 99, meta = []): FloorItem | undefined {
                let pattern = 'BJPY{V';
                let regE = meta.filter((f) => f.m && f.e && pattern.indexOf(f.e) >= 0).map((m) => m.m).join('');

                let regExp = new RegExp('[' + pattern + regE + ']');
                let rc = scanArea(regExp, raw);
                if (rc) {
                    for (let ms of meta) {
                        if (ms.m === rc.type && ms.e !== undefined) {
                            rc.type = ms.e; //map back
                            break;
                        }
                        if (ms.e === rc.type && ms.m === undefined) {
                            //do nothing
                            break;
                        }
                    }
                    return new FloorItem(rc.type, rc.start, rc.end, zIndex, true /*obstruction*/, true /*canplaceontop*/);
                }
                return; 
            };
        case 'openableItems':
            return function openable(raw: string[], zIndex = 99, meta = []): FloorItem | undefined {
                let pattern = 'H&*zQU"';
                let regE = meta.filter((f) => f.m && f.e && pattern.indexOf(f.e) >= 0).map((m) => m.m).join('');

                let regExp = new RegExp('[' + pattern + regE + ']');
                let rc = scanArea(regExp, raw);
                if (rc) {
                    for (let ms of meta) {
                        if (ms.m === rc.type && ms.e !== undefined) {
                            rc.type = ms.e; //map back
                            break;
                        }
                        if (ms.e === rc.type && ms.m === undefined) {
                            //do nothing
                            break;
                        }
                    }
                    return new FloorItem(rc.type, rc.start, rc.end, zIndex, true /*obstruction*/, false /*canplaceontop*/);
                }
                return;
            };
            break;
        case 'enemy':
            return function enemies(raw: string[], zIndex = 99, meta = []): Enemy | undefined {

                let pattern = 'EFGT@%';
                let regE = meta.filter((f) => f.m && f.e && pattern.indexOf(f.e) >= 0).map((m) => m.m).join('');
                let regExp = new RegExp('[' + pattern + regE + ']');
                let rc = scanArea(regExp, raw);
                zIndex;
                if (rc) {
                    //let has: any;
                    let realType = rc.type;
                    let ms: Symbol<any>;
                    for (ms of meta) {
                        //has = ms.has;
                        if (ms.m === rc.type && ms.e !== undefined) {
                            realType = ms.e;
                            break;
                        }
                        if (ms.e === rc.type && ms.m === undefined) {
                            break;
                        }
                    }
                    // now we have everything
                    return new Enemy(realType, rc.start, 10, 10, 1);
                }
                return;
            };
            break;
        case 'consumables':
            return function consumables(raw: string[], zIndex = 99, meta = []): Consumable | undefined {

                let pattern = 'LMZxut';
                let regE = meta.filter((f) => f.m && f.e && pattern.indexOf(f.e) >= 0).map((m) => m.m).join('');
                let regExp = new RegExp('[' + pattern + regE + ']');
                let rc = scanArea(regExp, raw);
                zIndex;
                if (rc) {
                    //let has: any;
                    let realType = rc.type;
                    let ms: Symbol<any>;
                    for (ms of meta) {
                       // has = ms.has;
                        if (ms.m === rc.type && ms.e !== undefined) {
                            realType = ms.e;
                            break;
                        }
                        if (ms.e === rc.type && ms.m === undefined) {
                            break;
                        }
                    }
                    // now we have everything
                    return new Consumable(realType, rc.start, 10);
                }
                return;
            };
            break;
        default:
            throw new Error(`invalid AreaType: ${areaType}`);
    }
}
