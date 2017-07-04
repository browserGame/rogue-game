
import { Vector } from './math';

export interface AreaTypes {
    carpet: 1; // scan carpets
    liquid: 1; //scan water pools
    lantern: 1; // 
    'cobweb&Skulls': 1; //
    mutexItems: 1; // nothing covering these items or nothing below these items (carpets , skulls);
}

export class FloorItem {
    private type: string;
    private start: Vector;
    private end: Vector;
    private obstruction: boolean;

    private zIndex: number;
    public constructor(t: string, start: Vector, end: Vector, zIndex: number, obstruction: boolean) {
        this.start = Object.assign({}, start);
        this.end = Object.assign({}, end);
        this.type = t;
        this.zIndex = zIndex;
        this.obstruction = obstruction;
    }
}

export type CreateAreaFunction = (raw: string[], zIndex?: number) => FloorItem | undefined;

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
                    return new FloorItem(rc.type, rc.start, rc.end, zIndex, true);
                }
                return;
            };
        case 'carpet':
            return function carpet(raw: string[], zIndex = 0): FloorItem | undefined {
                let rc = scanArea(/é/, raw);
                if (rc) {
                    return new FloorItem(rc.type, rc.start, rc.end, zIndex, false);
                }
                return;
            };
        case 'lantern':
            return function lantern(raw: string[], zIndex = 5): FloorItem | undefined {
                let rc = scanArea(/!/, raw);
                if (rc) {
                    return new FloorItem(rc.type, rc.start, rc.end, zIndex, true);
                }
                return;
            };
        case 'cobweb&Skulls':
            return function cobwebSkulls(raw: string[], zIndex = 1): FloorItem | undefined {
                let rc = scanArea(/[KA]/, raw);
                if (rc) {
                    return new FloorItem(rc.type, rc.start, rc.end, zIndex, false);
                }
                return;
            };
        case 'mutexItems':
        ////CIRSwm  [c] secret pressure plate, [I] red pentagram, [R] pentagram, [S]  bear trap, [w] spikes, [m] half moon trap
             return function misc(raw: string[], zIndex = 0): FloorItem | undefined {
                let rc = scanArea(/[CIRSwm]/, raw);
                if (rc) {
                    return new FloorItem(rc.type, rc.start, rc.end, zIndex, false);
                }
                return;
            };
        default:
            throw new Error(`invalid AreaType: ${areaType}`);
    }
}
