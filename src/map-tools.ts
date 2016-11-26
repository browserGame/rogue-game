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
    t: number;//top
    r: number;//right
    l: number;//left
    b: number;//bottom
}

export interface Room {
    parent: Room | null;
    room: Cell;
    level: number;// count down to zero
    id_room: number;
    upDown?: Room[];
    leftRight?: Room[];
    entrance?: number[];
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

export function formatDungeon(width: number, height: number, level: number, prob: fn_Profiler): Room {
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


function collectRoomsSharingBottomWall(r: Room, buttomWall: number): Room[] {
    let rc: Room[] = [];
    if (!r.leftRight && !r.upDown) {
        if (r.room.b == buttomWall) {
            return [r];
        }
    }
    if (r.leftRight) {
        rc.splice(0, 0, ...collectRoomsSharingBottomWall(r.leftRight[0], buttomWall));
        rc.splice(0, 0, ...collectRoomsSharingBottomWall(r.leftRight[1], buttomWall));
    }
    if (r.upDown) {
        rc.splice(0, 0, ...collectRoomsSharingBottomWall(r.upDown[1], buttomWall));
    }
    return rc;
}

function collectRoomsSharingRightWall(r: Room, rightWall: number): Room[] {
    let rc: Room[] = [];
    if (!r.leftRight && !r.upDown) {
        if (r.room.r == rightWall) {
            return [r];
        }
    }
    if (r.leftRight) {
        rc.splice(0, 0, ...collectRoomsSharingRightWall(r.leftRight[1], rightWall));

    }
    if (r.upDown) {
        rc.splice(0, 0, ...collectRoomsSharingRightWall(r.upDown[0], rightWall));
        rc.splice(0, 0, ...collectRoomsSharingRightWall(r.upDown[1], rightWall));
    }
    return rc;
}

function collectRoomsSharingTopWall(r: Room, topWall: number): Room[] {
    let rc: Room[] = [];
    if (!r.leftRight && !r.upDown) {
        if (r.room.t == topWall) {
            return [r];
        }
    }
    if (r.leftRight) {
        rc.splice(0, 0, ...collectRoomsSharingTopWall(r.leftRight[0], topWall));
        rc.splice(0, 0, ...collectRoomsSharingTopWall(r.leftRight[1], topWall));
    }
    if (r.upDown) {
        rc.splice(0, 0, ...collectRoomsSharingTopWall(r.upDown[0], topWall));
    }
    return rc;
}

function collectRoomsSharingLeftWall(r: Room, leftWall: number): Room[] {
    let rc: Room[] = [];
    if (!r.leftRight && !r.upDown) {
        if (r.room.l == leftWall) {
            return [r];
        }
    }
    if (r.upDown) {
        rc.splice(0, 0, ...collectRoomsSharingLeftWall(r.upDown[0], leftWall));
        rc.splice(0, 0, ...collectRoomsSharingLeftWall(r.upDown[1], leftWall));
    }
    if (r.leftRight) {
        rc.splice(0, 0, ...collectRoomsSharingLeftWall(r.leftRight[0], leftWall));
    }
    return rc;
}

export function createDoors(root: Room): void {





    if (!root.upDown && !root.leftRight) {
        //shouldnt be here
        return;
    }
    if (root.upDown && root.leftRight) {
        throw new Error("This room has both upDown and leftRight defined, room_id =" + root.id_room);
    }
    if (root.entrance) {
        //if (!root.parent) {
        //    return; //abort
        // }
        //createDoors(root.parent);//move up
        return;
    }
    //no doors defined in this room
    let childRooms = root.upDown || root.leftRight;
    createDoors(childRooms[0]);
    createDoors(childRooms[1]);
    let rooms: Room[];
    console.log('roomid',root.id_room);
    if (root.upDown) {
        let horizontalWallBottom = root.upDown[0].room.b;
        let roomsTopSide = collectRoomsSharingBottomWall(root.upDown[0], horizontalWallBottom);
        let roomsBottomSide = collectRoomsSharingTopWall(root.upDown[1], horizontalWallBottom + 1);
        console.log('updown', horizontalWallBottom, roomsTopSide, roomsBottomSide);
        //createDoorchooseDoreInterect(roomsTopSide, roomsBottomSide);
    }
    if (root.leftRight) {
        let verticalWallRight = root.leftRight[0].room.r;
        let roomsLeftSide = collectRoomsSharingRightWall(root.leftRight[0], verticalWallRight);
        let roomsRightSide = collectRoomsSharingLeftWall(root.leftRight[1], verticalWallRight + 1);
        console.log('leftright', verticalWallRight, roomsLeftSide, roomsRightSide);
    }
    //onsole.log('id:[%d], rooms [%j]', root.id_room, rooms);
    return;
    //console.log(rooms);








}



/*
#         #
0123456789A
    012
createDungeon(null);

*/