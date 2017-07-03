import { Room } from './Room';
import { Vector, addV, negV } from './math';


export class WallCursor {
    private room: Room;

    private t: Vector;
    private n: Vector;

    // private tb: number;
    private tt: string;
    private tn: string;
    private nt: string;
    private nn: string;
    private dd: string;
    protected dir: string;

    protected p: Vector;


    private init() {
        let firstDoor = this.room.doors[0];
        this.dir = firstDoor.dir;
        this.p = firstDoor.p;

    }

    protected setCursorParams() {

        switch (this.dir) {
            case '>':
                this.t = { x: 0, y: 1 };
                this.n = { x: -1, y: 0 };

                //this.tb = this.room.h;
                this.tt = '┃';
                this.tn = '┛';
                this.nt = '┏';
                this.nn = '━';
                this.dd = '┗';
                break;
            case '<':
                this.t = { x: 0, y: -1 };
                this.n = { x: 1, y: 0 };

                //this.tb = 0;
                this.tt = '┃';
                this.tn = '┏';
                this.nt = '┛';
                this.nn = '━';
                this.dd = '┓';
                break;
            case '^':
                this.t = { x: 1, y: 0 };
                this.n = { x: 0, y: 1 };

                //this.tb = this.room.w;
                this.tt = '━';
                this.tn = '┓';
                this.nt = '┗';
                this.nn = '━';
                this.dd = '┛';
                break;
            case 'v':
            default:
                this.t = { x: -1, y: 0 };
                this.n = { x: 0, y: -1 };

                //this.tb = 0;
                this.tt = '━';
                this.tn = '┗';
                this.nt = '┓';
                this.nn = '┃';
                this.dd = '┏';
                break;
        }
    }

    private turnCursor() {

        let n = '<^>v'.split('').indexOf(this.dir);
        n = (n === 3) ? 0 : n + 1;
        this.dir = '<^>v'[n];
        this.setCursorParams();
    }

    public step(): boolean {
        let token = this.room.getToken(0, addV(this.p, this.t));
        let normal = <string>this.room.getToken(0, addV(this.p, this.n));
        if (token === undefined || '┗┓┛┏┃━#'.indexOf(normal) >= 0) {
            this.turnCursor();
            token = <string>this.room.getToken(0, addV(this.p, this.t));
        }
        if ('┗┓┛┏┃━#'.indexOf(normal) === -1 && '┗┓┛┏┃━#^>v<'.indexOf(token) === -1) {
            this.turnCursor(); //270°
            this.turnCursor();
            this.turnCursor();
            token = <string>this.room.getToken(0, addV(this.p, this.t));
        }
        if ('┗┓┛┏┃━'.indexOf(token) >= 0) {
            return false;
        }
        this.p = addV(this.p, this.t);
        //console.log(this.p);
        return true;
    }


    public render(): boolean {

        let token = this.room.getToken(0, this.p);
        if (token === undefined) {
            throw new Error(`x:${this.p.x}, y:${this.p.y} are outside confines of room ${this.room.id}`);
        }
        //its a door?
        if ('<^>v'.indexOf(token) >= 0) {
            return true; //nothing
        }
        //already wall?
        if ('┗┓┛┏┃━'.indexOf(token) >= 0) {
            return false; // all done
        }
        //undrawnwall.
        if ('#' === token) {

            let prev = addV(this.p, negV(this.t));
            let nextToken = this.room.getToken(0, addV(this.p, this.t));
            let tangentToken = <string>(this.room.getToken(0, addV(this.p, this.n)));
            let prevToken = this.room.getToken(0, prev);
            if (prevToken === undefined) { //error
                throw new Error(`prevToken was undefined ${prev.x} , ${prev.y} `);
            }
            if (nextToken === undefined) {
                if ('^<>v'.indexOf(tangentToken) >= 0) {
                    this.room.setToken(0, this.p, this.tt);
                }
                else {
                    this.room.setToken(0, this.p, this.tn);
                }
                return true;
            }
            if ('┗┓┛┏┃━#'.indexOf(prevToken) === -1) {// only possible if it is a opening for a door
                if ('┗┓┛┏┃━#'.indexOf(tangentToken) >= 0) {
                    this.room.setToken(0, this.p, this.nn);
                }
                else {
                    this.room.setToken(0, this.p, this.nt);
                }
                return true;
            }
            if ('┗┓┛┏┃━#'.indexOf(tangentToken) === -1) {
                if ('┗┓┛┏┃━#'.indexOf(nextToken) === -1) {
                    this.room.setToken(0, this.p, this.dd);
                }
                else {
                    this.room.setToken(0, this.p, this.tt);
                }
                return true;
            }
            if ('┗┓┛┏┃━#'.indexOf(tangentToken) >= 0) {
                this.room.setToken(0, this.p, this.tn);
                return true;
            }
        }
        return true;
    }

    public renderWall() {

        do {
            this.render();
        } while (this.step());
    }



    constructor(room: Room) {
        this.room = room;
        this.init();
        this.setCursorParams();
    }
}



export class InnerWallCursor extends WallCursor {
    constructor(room: Room) {
        super(room);
        //find upper right conrenr
        let v: Vector = { x: -1, y: -1 };
        room.room[0].reduce((prev, line, y) => {
            if (prev.x > 0) {
                return prev;
            }
            let x = line.indexOf('#');
            if (x > 0) {
                prev.x = x;
                prev.y = y;
            }
            return prev;
        }, v);
        if (v.y === -1) {
            throw new Error(`no inner wall for room ${room.id}`);
        }
        v.y++;
        this.dir = '<';
        this.setCursorParams();
        this.p = v;

    }
}
