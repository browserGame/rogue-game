'use strict';
import {
    IGFragment,
    IItem,
    Room
} from '~items';

import {
    addV, IVector
} from '~math';


export function processCobWeb(_matrix: string[], _width: number, room: Room, coords: IVector[]) {

    // Unused but tslint wants it

    const isWall = (v: IVector) => {
        const walls = room.getNameSpace('walls');
        const f = walls.find(i =>
            i.p.x === v.x && i.p.y === v.y && '#┗┓┛┏┃━'.indexOf(i.tag) >= 0);

        return !!f;
    };
    /**
     *
     * @param v  the corner to be tested
     * @param corner index 0, 1, 2, 3 , representing the corners in a box
     */
    const isCorner = (v: IVector, corner: number): boolean => {
        // Upper left //jups with 3 steps
        const templ: IVector[] = [
            { x: -1, y: 1 },
            { x: -1, y: 0 },
            { x: -1, y: -1 },
            { x: 0, y: -1 },
            { x: 1, y: -1 },
            //
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 0, y: 1 }
        ];
        // 0,2,4,6 mod 8
        /*
           top left //0    x***xsss
           **x
           *cs
           xss

           top right //+2
           x**
           sc*
           ssx

           bottom right //+2
           ss*
           sc*
           ***

           bottom left //+2

           *ss
           *cs
           ***

        */

        const testCoords = templ.map(i => addV(v, i)).map((_, idx, arr) => arr[(idx + corner * 2) % 8]);

        const pattern = testCoords.map(i => isWall(i) ? '*' : 's').join(''); // This is always 1,1,1,1,1,0,0,0 (or should be)

        return /^.\*{3}.s{3}$/.test(pattern);

        // Let start = bools.findIndex((val) => val === false); // this is index 5
        // Let startReverse = bools.reverse().findIndex((val) => val === true); // this is index 4  000 11111
    };

    /*
    There are different kind of cobwebs because cobwebs sit in the corners of rooms
    */

    const validWebs = coords.map(v => {
        const selected = [0, 1, 2, 3].filter(corner => isCorner(v, corner));
        if (selected.length !== 1) {
            return undefined;
        }
        const tile = room.getContentAt(v, '.');
        if (!tile) {
            return undefined;
        }

        const className = ['spiderweb_03', 'spiderweb_04', 'spiderweb_05', 'spiderweb_06'][selected[0]];

        const gui: IGFragment = {
            auxClassNames: ['dungeon_decor_props', className],
            left: 0,
            size: ['pccs3', 'fsc3'],
            top: 0,
            zIndex: 0
        };

        const rc: IItem = { tag: `${selected[0]}`, p: v, gui };

        return rc;
    }).filter(i => i !== undefined);


    const cobWebs = room.getNameSpace('cobwebs');
    cobWebs.splice(0, cobWebs.length, ...validWebs);
}

