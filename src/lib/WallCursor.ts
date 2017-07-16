import { $Room, $Item } from './Room';
import { Vector, addV, negV } from './math';
import { Door } from './Door';


function createCursor(coords: Vector[], width: number, height: number, doors: Door[], pk: number) {

    let marked = coords.map((vec) => {
        let w: $Item = { tag: '#', p: vec };
        return w;
    });

    // add doors
    marked.splice(0, 0, ...doors.map((d) => {
        let wd: $Item = { tag: d.dir, p: d.p };
        return wd;
    }));

    const fidx = (p: Vector): $Item | undefined => {
        if (p.x >= 0 && p.x < width && p.y >= 0 && p.y < height) {
            let i = marked.findIndex((itm) => p.x === itm.p.x && p.y === itm.p.y);
            return (i === -1) ? { tag: '.', p } : marked[i];
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
        if (!itm) {
            if (p.x >= 0 && p.x < width && p.y >= 0 && p.y < height) {
                marked.push({ tag: mark[0], p });
            }
        }
        else {
            itm.tag = mark[0];
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

    room.walls.splice(0, room.walls.length, ...cursor.result());
       
}
