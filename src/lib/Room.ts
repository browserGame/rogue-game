

import { SymbolBase } from './Symbols';
import { Vector } from './math';
import { Door } from './Door';
//import { WallCursor, InnerWallCursor } from './WallCursor';
//import { factoryAreaScanner, FloorItem } from './FloorItem';
import {
    // validateMetrics,
    //createPalette,
    //    ItemPalette 
} from './tools';

/*
const liquidExtracor = factoryAreaScanner('liquid');
const carpetExtractor = factoryAreaScanner('carpet');
const lanternExtractor = factoryAreaScanner('lantern');
const cobWebsAndSkullsExtractor = factoryAreaScanner('cobweb&Skulls');
const mutexExtractor = factoryAreaScanner('mutexItems');
const breakableExtractor = factoryAreaScanner('breakableItems');
const enemyExtractor = factoryAreaScanner('enemy');
const openableExtractor = factoryAreaScanner('openableItems');
const consumableExtractor = factoryAreaScanner('consumables');
*/

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
}

export class Room {
    private _id: number;
    public t: number;
    public l: number;
    public w: number;
    public h: number;

    public room: string[][];
    public doors: Door[];


    public get id() {
        return this._id;

    }

    private renderWalls() {
      /*  let cursor = new WallCursor(this);
        cursor.renderWall();
        let fl = this.room[0];
        fl = fl.map((s) => {
            let raw = s.split('');
            let i = 0;
            while (raw[i] === '#') {
                raw[i] = ' ';
                i++;
            }
            i = s.length - 1;
            while (raw[i] === '#') {
                raw[i] = ' ';
                i--;
            }
            return raw.join('');
        });
        this.room[0] = fl;
        try {
            cursor = new InnerWallCursor(this);
            cursor.renderWall();
        }
        catch (e) {
            //no inner wall--nothing
        }*/
    }

    private validateCoords(layer: number, x: number, y: number): string[] | undefined {
        if (x < 0 || x >= this.w || y < 0 || y >= this.h) {
            return undefined;
        }
        let f = this.room[layer];
        if (!f) {
            throw new Error(`This layer ${layer} doesnt exist in room ${this._id}`);
        }
        return f;
    }

    public getToken(layer: number, v: Vector): string | undefined {
        let f = this.validateCoords(layer, v.x, v.y);
        if (!f) {
            return undefined;
        }
        let s = v.y * this.w + v.x;
        return f[s];
    }

    public setToken(layer: number, v: Vector, token: string) {
        let f = this.validateCoords(layer, v.x, v.y);
        if (f) {
            let s = v.y * this.w + v.x;
            f[s] = token;
        }
    }


    public constructor(roomData: Layout) {

        if (!(roomData.room instanceof Array)) {
            roomData.room = [roomData.room];
        }

        this._id = roomData.id;

        if (roomData.id < 0 || !Number.isInteger(roomData.id)) {
            throw new TypeError(`${roomData.id} is not a valid Room ID`);
        }

        this.l = 0;
        this.t = 0;
        this.doors = [];

        let raw = roomData.room.map((layer) => {
            return layer.split(/[\n\r]+/).filter((line) => line);
        });

        // let p = validateMetrics(raw); // will throw typeError
        //this.w = p.x;
        // this.h = p.y;

        //let symbolMap = new Map<string, SymbolBase<string>>();


        // create true room grid
        raw = raw.map((layer) => {
            let matrix: string[] = [];
            layer.reduce((acc, line) => {
                acc.push.apply(acc, line.split(''));
                return acc;
            }, matrix);
            return matrix;
        });

        //let symbolMap = mapSymbols(roomData.symbols);

        //for (let layer of raw) {
        //parseLayerData(layer, p.x, '#.', symbolMap);
        //console.log('roomItems:', roomItems);
        //}
        return;



        this.renderWalls();

    }
}

