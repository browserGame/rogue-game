
import { Vector } from './math';
import { SymbolBase, codedItems } from './Symbols';
import { Layout, $Room } from './Room';

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

    let room: $Room = {
        pk,
        top,
        left,
        width,
        height,
        doors: []
    };
    room;

    // convert each array of lines into array grids-cells
    raw = raw.map((layer) => {
        let matrix: string[] = [];
        layer.reduce((acc, line) => {
            acc.push.apply(acc, line.split(''));
            return acc;
        }, matrix);
        return matrix;
    });

    raw.map((matrix) => {
        let itemPalette = createPalette(matrix, width, '.#');
        Object.keys(itemPalette).forEach((key) => {
            let si = metaInfo.get(key);
            if (si) {
                let processor = codedItems[si.e];
                if (processor) {
                    //processor(matrix, width, pk, si, room);
                    console.log('processor found for type %s', si.e, itemPalette[key]);
                }
                else {
                    //console.log('pk:%d, no ip for: %s->%s', pk, si.e, si.m);
                }
            }
        });
    });



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
