import { $Room, $Item, $GFragment, getNameSpace } from './Room';
import { Vector, addV, negV } from './math';
import { $Door } from './Door';
import {
    sampleFromList,
    /*profilerFactory*/
} from './statistics';

type HWallType = 'top_top_1' | 'top_top_2';
type VWallType = 'wall_side_1' | 'wall_side_2';
//type FloorTypes = 'floor_0' | 'floor_1' | 'floor_2' | 'floor_3';


function getRandomVerticalWall(): VWallType {
    return sampleFromList<VWallType>([{
        probability: 4,
        payload: 'wall_side_1'
    }, {
        probability: 1,
        payload: 'wall_side_2' //cracked vertical
    }]);
}


function getRandomHorizontalWall(): HWallType {
    return sampleFromList<HWallType>([{
        probability: 4,
        payload: 'top_top_1'
    }, {
        probability: 1,
        payload: 'top_top_2' //cracked horizontal
    }]);
}

const dudFragment: $GFragment = {
    size: 'normal',
    auxClassNames: [],
    left: 0,
    top: 0,
    zIndex: 0
};




function mapAsciiToGUIWall(token: string): $GFragment {


    let wallName: string;
    switch (token) {
        case '┃':
            wallName = getRandomVerticalWall();
            break;
        case '━':
            wallName = getRandomHorizontalWall();
            break;
        case '┗':
            wallName = 'top_bottom_left_corner';
            break;
        case '┛':
            wallName = 'top_bottom_right_corner';
            break;
        case '┏':
            wallName = 'top_top_left_corner';
            break;
        case '┓':
            wallName = 'top_top_right_corner';
            break;
        default:
            throw new Error(`Wrong token for wall ${token}`);
    }

    return {
        size: 'normal',
        auxClassNames: ['floor_crypt', wallName],
        left: 0,  //parameter adjusted for the gui state used by the render
        top: 0,
        zIndex: 0
    };
}

function createCursor(coords: Vector[], width: number, height: number, doors: $Door[], pk: number) {

    let marked = coords.map((vec) => {
        let w: $Item = { tag: '#', p: vec, gui: dudFragment };
        return w;
    });

    // add doors
    marked.splice(0, 0, ...doors.map((d) => {
        let wd: $Item = { tag: d.dir, p: d.p, gui: dudFragment };
        return wd;
    }));

    const fidx = (p: Vector): $Item | undefined => {
        if (p.x >= 0 && p.x < width && p.y >= 0 && p.y < height) {
            let i = marked.findIndex((itm) => p.x === itm.p.x && p.y === itm.p.y);
            return (i === -1) ? { tag: '.', p, gui: dudFragment } : marked[i];
        }
        return undefined;
    };

    let t: Vector;
    let n: Vector;

    // private tb: number;
    let tt: string;
    let tn: string;
    let nt: string;
    let nn: string;
    let dd: string;

    let { dir, p } = doors[0];

    const has = (arr: string, i?: $Item) => {
        if (!(i && i.tag)) {
            return false;
        }
        return arr.indexOf(i.tag) >= 0;
    };

    const set = (p: Vector, mark: string) => {
        let itm = fidx(p);
        let gui = mapAsciiToGUIWall(mark[0]);
        if (!itm) {
            if (p.x >= 0 && p.x < width && p.y >= 0 && p.y < height) {
                itm = { tag: mark[0], p, gui };
                marked.push(itm);
            }
        }
        else {
            itm.tag = mark[0];
            itm.gui = gui;
        }
    };

    const setCursorParams = () => {

        switch (dir) {
            case '>':
                t = { x: 0, y: 1 };
                n = { x: -1, y: 0 };

                //this.tb = this.room.h;
                tt = '┃';
                tn = '┛';
                nt = '┏';
                nn = '━';
                dd = '┗';
                break;
            case '<':
                t = { x: 0, y: -1 };
                n = { x: 1, y: 0 };

                //this.tb = 0;
                tt = '┃';
                tn = '┏';
                nt = '┛';
                nn = '━';
                dd = '┓';
                break;
            case '^':
                t = { x: 1, y: 0 };
                n = { x: 0, y: 1 };

                //this.tb = this.room.w;
                tt = '━';
                tn = '┓';
                nt = '┗';
                nn = '┃';
                dd = '┛';
                break;
            case 'v':
            default:
                t = { x: -1, y: 0 };
                n = { x: 0, y: -1 };

                //this.tb = 0;
                tt = '━';
                tn = '┗';
                nt = '┓';
                nn = '┃';
                dd = '┏';
                break;
        }
    };

    const turnCursor = () => {
        let n = '<^>v'.split('').indexOf(dir);
        n = (n === 3) ? 0 : n + 1;
        dir = <any>'<^>v'[n];
        setCursorParams();
    };

    const step = (): boolean => {
        let token = fidx(addV(p, t));
        let normal = fidx(addV(p, n)); //always yields a result
        if (token === undefined || has('┗┓┛┏┃━#', normal)) {
            turnCursor();
            token = fidx(addV(p, t));
        }
        if (has('┗┓┛┏┃━#', normal) === false && has('┗┓┛┏┃━#^>v<', token) === false) {
            turnCursor(); //270°
            turnCursor();
            turnCursor();
            token = fidx(addV(p, t));
        }
        if (has('┗┓┛┏┃━', token)) {
            return false;
        }
        p = addV(p, t);
        //console.log(this.p);
        return true;
    };

    const render = (): boolean => {

        let token = fidx(p);
        if (token === undefined) {
            throw new Error(`x:${p.x}, y:${p.y} are outside confines of room:${pk}`);
        }
        //its a door?
        if (has('<^>v', token)) {
            return true; //nothing
        }
        //already wall?
        if (has('┗┓┛┏┃━', token)) {
            return false; // all done
        }
        //undrawnwall.
        if ('#' === token.tag) {

            let prev = addV(p, negV(t));
            let nextToken = fidx(addV(p, t));
            let tangentToken = fidx(addV(p, n));
            let prevToken = fidx(prev);
            if (prevToken === undefined) { //error
                throw new Error(`prevToken was undefined ${prev.x} , ${prev.y} `);
            }
            if (nextToken === undefined) {
                if (has('^<>v', tangentToken)) {
                    set(p, tt);
                }
                else {
                    set(p, tn);
                }
                return true;
            }
            if (has('┗┓┛┏┃━#', prevToken) === false) {// only possible if it is a opening for a door
                if (has('┗┓┛┏┃━#', tangentToken)) {
                    set(p, nn);
                }
                else {
                    set(p, nt);
                }
                return true;
            }
            if (has('┗┓┛┏┃━#', tangentToken) === false) {
                if (has('┗┓┛┏┃━#', nextToken) === false) {
                    set(p, dd);
                }
                else {
                    set(p, tt);
                }
                return true;
            }
            if (has('┗┓┛┏┃━#', tangentToken)) {
                set(p, tn);
                return true;
            }
        }
        return true;
    };

    const chizzleOutsideWalls = () => {
        marked = marked.map((i) => { i.tag = i.tag.replace(/[\^v<>]/g, ' '); return i; });
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let token = <$Item>fidx({ x, y });
                if (token.tag === '#') {
                    token.tag = ' ';
                    continue;
                }
                break;
            }
            for (let x = width - 1; x >= 0; x--) {
                let token = <$Item>fidx({ x, y });
                if (token.tag === '#') {
                    token.tag = ' ';
                    continue;
                }
                break;
            }
        }
        marked = marked.filter((i) => i.tag !== ' ');

    };

    setCursorParams();

    const moveToInnerWall = (): boolean => {
        marked.sort((a, b) => a.p.y - b.p.y || a.p.x - b.p.x);
        let itm = marked.find((i) => i.tag === '#');
        if (!itm) {
            return false;
        }
        dir = '<';
        p = addV(itm.p, { x: 0, y: 1 });
        setCursorParams();
        return true;
    };

    return {
        step,
        render,
        chizzleOutsideWalls,
        moveToInnerWall,
        result: () => marked.sort((a, b) => a.p.y - b.p.y || a.p.x - b.p.x)
    };
}

export function processWalls(matrix: string[], width: number, room: $Room, coords: Vector[]) {

    let height = matrix.length / width;

    const cursor = createCursor(coords, width, height, room.doors, room.pk);

    do {
        cursor.render();
    } while (cursor.step());

    cursor.chizzleOutsideWalls();

    // draw all inner walls
    while (cursor.moveToInnerWall()) {
        do {
            cursor.render();
        } while (cursor.step());
    }
    let walls = getNameSpace(room, 'walls');
    walls.splice(0, walls.length, ...cursor.result());

}
