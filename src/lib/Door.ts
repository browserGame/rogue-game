import { Vector } from './math';

export class Door {
    private rx: number;
    private ry: number;
    private toRoom: number;
    private inset: boolean;
    private roomId: number;
    private _dir: string;
    private _open: boolean;
    constructor(dir: string, rx: number, ry: number, inset: boolean, from: number, to: number) {

        if ('^v<>'.indexOf(dir) === -1) {
            throw new Error('not a valid door token:' + dir);
        }
        this._dir = dir;
        this.rx = rx;
        this.ry = ry;
        this.inset = inset;
        this.toRoom = to;
        this.roomId = from;
        this._open = false;
    }
    public stamp(matrix: string[], scanWidth: number) {
        let s = scanWidth * this.ry + this.rx;
        matrix[s] = this.inset ? this.dir : '.';
    }

    public get hasDoor(): boolean {
        return this.inset;
    }
    public get IsOpen(): boolean {
        return this._open;
    }

    public open() {
        let old = this._open;
        this._open = true;
        return old;
    }
    public close() {
        let old = this._open;
        this._open = false;
        return old;
    }
    public toggle() {
        this._open = !this._open;
        return !this._open;
    }
    public get dir() {
        return this._dir;
    }

    public get p(): Vector {
        return { x: this.rx, y: this.ry };
    }

    public get to(): number {
        return this.toRoom;
    }
}
