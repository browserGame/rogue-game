'use strict';
import {
    $Room,
    $Item,
    getNameSpace,
    getContentAt,
    $GFragment
} from './Room';

import {
    Vector, addV
} from './math';


export function processCobWeb(matrix: string[], width: number, room: $Room, coords: Vector[]) {

    //unused but tslint wants it
    matrix;
    width;

    const isWall = (v: Vector) => {
        let walls = getNameSpace(room, 'walls');
        let f = walls.find((i) => {
            return i.p.x === v.x && i.p.y === v.y && '#┗┓┛┏┃━'.indexOf(i.tag) >= 0;
        });
        return !!f;
    };
    /**
     * 
     * @param v  the corner to be tested
     * @param corner index 0, 1, 2, 3 , representing the corners in a box 
     */
    const isCorner = (v: Vector, corner: number): boolean => {
        //upper left //jups with 3 steps
        let templ: Vector[] = [
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
        //0,2,4,6 mod 8
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

        let testCoords = templ.map((i) => addV(v, i)).map((_, idx, arr) => arr[(idx + corner * 2) % 8]);

        let pattern = testCoords.map((i) => isWall(i) ? '*' : 's').join(''); //this is always 1,1,1,1,1,0,0,0 (or should be)

        return /^.\*{3}.s{3}$/.test(pattern);

        //let start = bools.findIndex((val) => val === false); // this is index 5
        //let startReverse = bools.reverse().findIndex((val) => val === true); // this is index 4  000 11111
    };

    /* 
    There are different kind of cobwebs because cobwebs sit in the corners of rooms 
    */

    let validWebs = coords.map((v) => {
        let selected = [0, 1, 2, 3].filter((corner) => isCorner(v, corner));
        if (selected.length !== 1) {
            return undefined;
        }
        let tile = getContentAt(room, v, '.');
        if (!tile) {
            return undefined;
        }

        let className = ['spiderweb_03', 'spiderweb_04', 'spiderweb_05', 'spiderweb_06'][selected[0]];

        let gui: $GFragment = {
            size: 'normal',
            auxClassNames: ['dungeon_decor_props', className],
            left: 0,
            top: 0,
            zIndex: 0
        };

        let rc: $Item = { tag: `${selected[0]}`, p: v, gui };
        return rc;
    }).filter((i) => i !== undefined);


    let cobWebs = getNameSpace(room, 'cobwebs');
    cobWebs.splice(0, cobWebs.length, ...validWebs);
}

