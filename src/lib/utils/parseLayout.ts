import { ILayout, Room } from '~items';
import { symbolProcessTable } from '~symbols';
import { createPalette, mapSymbols, validateRoomMetrics } from './';

export function parseLayout(layout: ILayout) {


        if (!(layout.room instanceof Array)) {
            layout.room = [layout.room];
        }

        const metaInfo = mapSymbols(layout.symbols);

        const pk = layout.id;

        const left = 0;
        const top = 0;


        // Cleanup
        let raw = layout.room.map(layer =>
            layer.split(/[\n\r]+/).filter(line => line));

        const p = validateRoomMetrics(raw); // Will throw typeError
        const width = p.x;
        const height = p.y;

        // Convert each array of lines into array grids-cells
        raw = raw.map((layer, idx) => {
            const matrix: string[] = [];
            layer.reduce((acc, line) => {
                acc.push.apply(acc, line.split(''));

                return acc;
            },           matrix);

            return idx ? matrix.join('').replace(/[#\^<v>.]/g, ' ').split('') : matrix;
        });

        const room = new Room({
            // tslint:disable:object-literal-sort-keys
            pk,
            top,
            left,
            base: raw[0],
            width,
            height,
            doors: [],
            body: new Map()
            // tslint:enable
        });

        raw.map((matrix, idx) => {
            const itemPalette = createPalette(matrix, width, ' ');
            // Process doors first

            const dtag: string[] = [];
            '^<>v#.'.split('').forEach(key => {
                if (key in itemPalette) {
                    dtag.push(key);
                }
            });

            // Add the rest
            Object.keys(itemPalette).forEach(key => {
                if (dtag.indexOf(key) >= 0) {
                    return;
                }
                dtag.push(key);
            });

            dtag.forEach(key => {
                const si = metaInfo.get(key) || { e: key };

                const processor = symbolProcessTable[(si && si.e) || key];
                if (processor) {
                    //   Console.log(`pk:${pk} layer:${idx} key:${(si && si.e) || key}`);
                    processor(matrix, width, room, itemPalette[key], si);
                } else {
                    console.log('%c %s', 'color:red', `ERROR ERROR, unprocessed, pk:${pk} layer:${idx} key:${(si && si.e) || key}`);
                    // Throw new Error('stopped');
                    // Console.log('pk:%d, key:%s, no ip for: %s->%s', pk, key, si && si.e, si && si.m);
                }
                // Console.log(`pk:${pk} layer:${idx} key:${(si && si.e) || key}`);
            });
        });

        // Some debugging
        const keys = Array.from(room.body.keys());
        keys.forEach(ns => {
            console.log(`${ns}:${room.getNameSpace(ns).map(i => i.tag).join('')}`);
        });

        return room;

    }
