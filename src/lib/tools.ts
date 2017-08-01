
import { Vector } from './math';
import { SymbolBase, codedItems } from './Symbols';
import { Layout, $Room, getNameSpace } from './Room';

///ref pixl-xml.d.ts

import xml = require('pixl-xml');

export function parseLayout(layout: Layout) {


    if (!(layout.room instanceof Array)) {
        layout.room = [layout.room];
    }

    let metaInfo = mapSymbols(layout.symbols);

    const pk = layout.id;

    let left = 0;
    let top = 0;


    //cleanup
    let raw = layout.room.map((layer) => {
        return layer.split(/[\n\r]+/).filter((line) => line);
    });

    let p = validateMetrics(raw); // will throw typeError
    let width = p.x;
    let height = p.y;

    // convert each array of lines into array grids-cells
    raw = raw.map((layer, idx) => {
        let matrix: string[] = [];
        layer.reduce((acc, line) => {
            acc.push.apply(acc, line.split(''));
            return acc;
        }, matrix);
        return idx ? matrix.join('').replace(/[#\^<v>.]/g, ' ').split('') : matrix;
    });

    let room: $Room = {
        pk,
        top,
        left,
        width,
        height,
        doors: [],
        base: raw[0],
        body: new Map()
    };


    raw.map((matrix, idx) => {
        let itemPalette = createPalette(matrix, width, ' ');
        //process doors first

        let dtag: string[] = [];
        '^<>v#.'.split('').forEach((key) => {
            if (key in itemPalette) {
                dtag.push(key);
            }
        });

        // add the rest
        Object.keys(itemPalette).forEach((key) => {
            if (dtag.indexOf(key) >= 0) {
                return;
            }
            dtag.push(key);
        });

        dtag.forEach((key) => {
            let si = metaInfo.get(key) || { e: key };

            let processor = codedItems[(si && si.e) || key];
            if (processor) {
                //   console.log(`pk:${pk} layer:${idx} key:${(si && si.e) || key}`);
                processor(matrix, width, room, itemPalette[key], si);
            }
            else {
                console.log(`pk:${pk} layer:${idx} key:${(si && si.e) || key}`);
                // console.log('pk:%d, key:%s, no ip for: %s->%s', pk, key, si && si.e, si && si.m);
            }
            //console.log(`pk:${pk} layer:${idx} key:${(si && si.e) || key}`);
        });
    });

    //some debugging
    let keys = Array.from(room.body.keys());
    keys.forEach((ns) => {
        console.log(`${ns}:${getNameSpace(room, ns).map((i) => i.tag).join('')}`);
    });
    return room;

}

export function mapSymbols(symbols: SymbolBase<string>[]): Map<string, SymbolBase<string>> {
    let symbolMap = new Map<string, SymbolBase<string>>();

    symbols.reduce((map, sym) => {
        let key = sym.m || sym.e;
        if (map.has(key)) {
            console.log(symbols);
            throw new Error(`Double key defined: ${key}`);
        }
        map.set(key, sym);
        return map;
    }, symbolMap);

    return symbolMap;
}

interface ItemPalette {
    [index: string]: { x: number; y: number; }[];
}

function createPalette(raw: string[], w: number, skip: string = ''): ItemPalette {
    let rc: ItemPalette = {};
    raw.reduce((acc, c, idx) => {
        if (skip.indexOf(c) >= 0) {
            return acc;
        }
        let x = idx % w;
        let y = (idx - x) / w;
        acc[c] = acc[c] || [];
        acc[c].push({ x, y });
        return acc;
    }, rc);
    return rc;
}

function validateMetrics(raw: string[][]): Vector {

    let roomMetric: Vector = { x: 0, y: 0 };
    raw.reduce((checkRoom, layer, layerIdx, arrLayers) => {
        let layerMetric: Vector = { x: 0, y: 0 };
        layer.reduce((checkLayer, line, y, arr) => {
            if (line.length === 0) {
                throw new TypeError(`layer:${layerIdx} scanline ${y} has width 0, ${arr}`);
            }
            if (checkLayer.x === 0) checkLayer.x = line.length;
            if (checkLayer.x !== line.length) {
                throw new TypeError(`layer:${layerIdx} envelope is not perfectly rectangular, ${arr}`);
            }
            if (y === arr.length - 1) {
                checkLayer.y = arr.length;
            }
            return checkLayer;
        }, layerMetric);
        if (layerIdx === 0) {
            checkRoom.x = layerMetric.x;
            checkRoom.y = layerMetric.y;
            return checkRoom;
        }
        if (layerMetric.x !== checkRoom.x || layerMetric.y !== checkRoom.y) {
            throw new TypeError(`layer:${layerIdx} layout differs from Room, ${arrLayers[layerIdx]}`);
        }
        return checkRoom;
    }, roomMetric);
    return roomMetric;
}


export function flatten(...arr: any[]): any[] {
    let rc = [];
    for (let itm of arr) {
        if (itm instanceof Array) {
            let rc2 = flatten(...itm);
            rc.push(...rc2);
            continue;
        }
        rc.push(itm);
    }
    return rc;
}



export type HTTPMethod = 'GET' | 'POST' | 'PATCH' | 'PUT';
export type ProgressFunction = (arg: { comuteLength: boolean; total: number; progress: number }) => void;

export function loadXMLAsset(method: HTTPMethod, url: string, cb?: ProgressFunction): Promise<any> {

    return new Promise<any>((resolve, reject) => {

        let error = false;

        const xhr = new XMLHttpRequest();
        xhr.overrideMimeType('application/xml');
        xhr.withCredentials = true; //for session cookies and such 
        xhr.open(method, url, true);

        xhr.onreadystatechange = function orsc() {
            if (xhr.HEADERS_RECEIVED === xhr.readyState) {
                if (xhr.status === 404) {
                    xhr.abort(); // dont care, note, this will set xhr.status to zero and
                }
            }
        };

        xhr.onprogress = function op(e) {
            if (cb) {
                cb({ comuteLength: e.lengthComputable, total: e.total, progress: e.loaded });
            }
        };

        xhr.onloadend = function ole() {

            if (!(xhr.status >= 200 && xhr.status < 300)) {

                !error && reject(new ErrorEvent(`status:${xhr.status}, ${xhr.statusText}`));
                error = true;
                return;
            }
            try {
                let data = xml.parse(xhr.response, { preserveAttributes: false, preserveDocumentNode: true });
                return resolve(data);
            }
            catch (e) {
                !error && reject(e);
                error = true;
                return;
            }
        };

        xhr.onerror = function oe(e) {
            !error && reject(e);
            error = true;
            return;
        };

        try {
            xhr.send(null);
        }
        catch (e) {
            !error && reject(e);
            error = true;
            return;
        }
    });



}

