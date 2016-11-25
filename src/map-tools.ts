export interface NumberProps {
    [propname: string]: number;
}

export interface fn_Profiler {
    (N: number): number[];
}

interface fn_profilerFactory {
    (name: string, options: NumberProps): fn_Profiler;
}


export interface Cell {
    t: number,//top
    r: number,//right
    l: number,//left
    b: number//bottom
    finished: boolean;//finished
}

export interface Room {
    parent: Room | null;
    room: Cell;
    level: number;// count down to zero
    id_room: number;
    upDown?: Room[];
    leftRight?: Room[];
}

function normalize(arr: number[]): number[] {
    let tsum = arr.reduce((rsum, itm) => {
        rsum += itm;
        return rsum;
    }, 0);
    if (!tsum) {
        arr;
    }
    return arr.map((n) => {
        return n / tsum;
    });
}

export function profilerFactory(name: string, options: NumberProps): fn_Profiler {
    switch (name) {
        case "gaussian":
            return function (N: number) {
                let rc: number[] = [];
                if (!N) {
                    throw new Error('Invalid Argument, N must be at least >= 2');
                }
                let σ = N / (options['sigma'] || 4);
                let µ = (N - 1) / 2;
                for (let i = 0; i < N; i++) {
                    let t_2 = Math.pow((i - µ) / (σ), 2);
                    let ans = Math.exp(-0.5 * t_2);
                    rc.push(ans);
                }
                return normalize(rc);
            }
        default:
            throw new Error("Invalid profiler used");
    }
}

export function multinomial_random_sample(multinomial_arr: number[]): number {


    let cdf = multinomial_arr.reduce((aggr, v: number) => {
        aggr.sum += v;
        aggr.arr.push(aggr.sum);
        return aggr;
    }, { sum: 0 as number, arr: [] as number[] })
        .arr;

    let sample = Math.random();

    for (let i = 0; i < cdf.length; i++) {
        let left = cdf[i - 1] || 0;
        let right = cdf[i];
        if (sample >= left && sample < right) {
            return i;
        }
    }
    throw new Error('Propability uniform multinomial Mapping error');
}


function cloneRoom(r: Room) {
    let rc: Room = {
        parent: r.parent,
        room: Object.assign({}, r.room),
        level: r.level,
        id_room: r.id_room,
    };
    return rc;
}

var global_pk: number = 0;

function incr_pk(): number {
    return ++global_pk;
}



function createDungeonRooms(root: Room | null, profiler: fn_Profiler): void {

    if (!root) {
        return;
    }


    if (root.upDown || root.leftRight) {
        let cpy = Object.assign({}, root);
        delete cpy.parent;
        throw new Error("This room is already used" + JSON.stringify(cpy));
    }
    root.id_room = incr_pk();
    if (!root.level) {
        return;
    }
    let allow_up_down = (root.room.b - root.room.t) > 9;
    let allow_left_right = (root.room.r - root.room.l) > 9;

    if (!allow_up_down && !allow_left_right) {
        return;
    }
    let up_down_direction = false;
    switch (true) {
        case allow_up_down && allow_left_right:
            up_down_direction = (multinomial_random_sample([0.5, 0.5]) == 0);
            break;
        case allow_up_down:
            up_down_direction = true;
            break;
        case allow_left_right:
            up_down_direction = false;
            break;
    }

    let length: number;

    if (up_down_direction) {
        length = (root.room.b - root.room.t) - 3 * 2 - 1; //documentation purpose
    }
    else {
        length = (root.room.r - root.room.l) - 3 * 2 - 1; //documentation purpose
    }

    let probabilities = profiler(length);
    let wall_position = multinomial_random_sample(probabilities);
    if (up_down_direction) {
        let upRoom = cloneRoom(root);
        let downRoom = cloneRoom(root);
        upRoom.parent = root;
        downRoom.parent = root;
        upRoom.level--;
        downRoom.level--;
        root.upDown = [upRoom, downRoom];
        upRoom.room.b = wall_position + 3 + root.room.t;
        downRoom.room.t = wall_position + 1 + 3 + root.room.t;
        createDungeonRooms(upRoom, profiler);
        createDungeonRooms(downRoom, profiler);
    }
    else {
        let leftRoom = cloneRoom(root);
        let rightRoom = cloneRoom(root);
        leftRoom.parent = root;
        rightRoom.parent = root;
        leftRoom.level--;
        rightRoom.level--;
        root.leftRight = [leftRoom, rightRoom];
        leftRoom.room.r = wall_position + 3 + root.room.l;
        rightRoom.room.l = wall_position + 1 + 3 + root.room.l;
        createDungeonRooms(leftRoom, profiler);
        createDungeonRooms(rightRoom, profiler);
    }
    return;
}

export function formatDungeon(width: number, height: number, level: number, prob: fn_Profiler):Room 
{
    let room: Room = {
        parent: null,
        id_room: 10,
        room: {
            t: 0,
            l: 0,
            r: width,
            b: height
        } as Cell,
        level: level
    };
    createDungeonRooms(room, prob);
    return room;
}
/*
#         #
0123456789A
    012
createDungeon(null);

*/