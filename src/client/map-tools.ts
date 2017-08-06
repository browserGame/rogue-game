/*
MIT License

Copyright (c) November 2016, Jacob Kenneth Falodun Bogers

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


import {
    BaseImageOrientation,

    ImageSprites,
    crypt_floor,
    crypt_decorations,
    SPRITE_WIDTH,
    SPRITE_HEIGHT
} from './media';

import {

    Sample,
    sampleOfList,
    sampleOfListNoReplacement,
    normalize,
    FnProfiler,
    multinomial_random_sample
} from '../lib/statistics';


export interface Door {
    x: number;
    y: number;
    hasDoor: number;
    connectingRoom: number;
    [index: string]: number;
}

export interface Cell {
    t: number; //top
    r: number; //right
    l: number; //left
    b: number; //bottom
    [index: string]: number;
}

export interface Room {
    parent: Room | null;
    dungeon_sprites: HTMLImageElement;
    decorator_sprites: HTMLImageElement;
    room: Cell;
    level: number; // count down to zero
    id_room: number;
    upDown?: Room[];
    leftRight?: Room[];
    entrance: Door[];
    decorations: number[]; //extra decorations untop of the floor, lights, spiderwebs, etc
    layout: number[]; //base scaffolding, floor, walls
    dungeonObjects?: number[]; //state changeble objects (doors, chest, bookshelves) belong to this class
}



/** GLOBALS */
/** GLOBALS */
/** GLOBALS */
/** GLOBALS */

const horizontal_wall_choices: Sample<BaseImageOrientation>[] = [{
    payload: BaseImageOrientation.WALL_HORIZONTAL_CRACKED,
    probability: 1
}, {
    payload: BaseImageOrientation.WALL_HORIZONTAL_CRYPT,
    probability: 1
}];


const vertical_wall_choices: Sample<BaseImageOrientation>[] = [{
    payload: BaseImageOrientation.WALL_VERT_CRACKED,
    probability: 1
}, {
    payload: BaseImageOrientation.WALL_VERT_NORMAL,
    probability: 1
}];

const horizontal_wall_asymetric_choices: Sample<BaseImageOrientation>[] = [{
    payload: BaseImageOrientation.WALL_HORIZONTAL_CRACKED,
    probability: 1
}, {
    payload: BaseImageOrientation.WALL_HORIZONTAL_CRYPT,
    probability: 3 // 3x higher chance to select this option
}];


const vertical_wall_asymmetric_choices: Sample<BaseImageOrientation>[] = [{
    payload: BaseImageOrientation.WALL_VERT_CRACKED,
    probability: 1
}, {
    payload: BaseImageOrientation.WALL_VERT_NORMAL,
    probability: 3 // 3x higher chance to select this option
}];

const floor_asymetric_choices: Sample<BaseImageOrientation>[] = [{
    payload: BaseImageOrientation.NORMAL_FLOOR,
    probability: 4 // 4/7 chance of being selected
}, {
    payload: BaseImageOrientation.CRACKED_FLOOR,
    probability: 1 // 1/7 chance of being selected
}, {
    payload: BaseImageOrientation.CIRCLE_FLOOR,
    probability: 1 // 1/7 chance of being selected
}, {
    payload: BaseImageOrientation.HALF_CIRCLE_FLOOR,
    probability: 1 // 1/7 chance of being selected
}
];


function cloneRoom(r: Room) {
    let rc: Room = {
        decorations:[],
        dungeon_sprites: r.dungeon_sprites,
        decorator_sprites: r.decorator_sprites,
        parent: r.parent,
        room: Object.assign({}, r.room),
        level: r.level,
        id_room: r.id_room,
        entrance: [],
        layout:[]
    };
    return rc;
}

let global_pk: number = 0;

function incr_pk(): number {
    return ++global_pk;
}



function createDungeonRooms(root: Room | null, profiler: FnProfiler): void {

    const WALL_DISTANCE: number = 4;

    if (!root) {
        return;
    }


    if (root.upDown || root.leftRight) {
        let cpy = Object.assign({}, root);
        delete cpy.parent;
        throw new Error('This room is already used' + JSON.stringify(cpy));
    }
    root.id_room = incr_pk();
    if (!root.level) {
        return;
    }
    let allow_up_down = (root.room.b - root.room.t) > WALL_DISTANCE * 2 + 3;
    let allow_left_right = (root.room.r - root.room.l) > WALL_DISTANCE * 2 + 3;

    if (!allow_up_down && !allow_left_right) {
        return;
    }
    let up_down_direction = false;
    switch (true) {
        case allow_up_down && allow_left_right:
            up_down_direction = (multinomial_random_sample([0.5, 0.5]) === 0);
            break;
        case allow_up_down:
            up_down_direction = true;
            break;
        case allow_left_right:
            up_down_direction = false;
            break;
        default:
    }

    let length: number;

    if (up_down_direction) {
        length = (root.room.b - root.room.t) - WALL_DISTANCE * 2 - 1; //documentation purpose
    }
    else {
        length = (root.room.r - root.room.l) - WALL_DISTANCE * 2 - 1; //documentation purpose
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
        upRoom.room.b = wall_position + WALL_DISTANCE + root.room.t;
        downRoom.room.t = wall_position + 1 + WALL_DISTANCE + root.room.t;
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
        leftRoom.room.r = wall_position + WALL_DISTANCE + root.room.l;
        rightRoom.room.l = wall_position + 1 + WALL_DISTANCE + root.room.l;
        createDungeonRooms(leftRoom, profiler);
        createDungeonRooms(rightRoom, profiler);
    }
    return;
}

export function formatDungeon(width: number, height: number, level: number, prob: FnProfiler): Room {
    let root: Room = {
        decorations:[],
        entrance: [],
        layout:[],
        parent: null,
        id_room: 10,
        room: {
            t: 0,
            l: 0,
            r: width,
            b: height
        } as Cell,
        level: level,
        dungeon_sprites: document.getElementById('floor_crypt') as HTMLImageElement,
        decorator_sprites: document.getElementById('decor_props') as HTMLImageElement
    };
    createDungeonRooms(root, prob);
    createDoors(root);
    let rooms = flatMapRooms(root).sort(sortRooms);
    //let media_base_layout = crypt_floor(root.dungeon_sprites);
    for (let room of rooms) {
        formatRoom(room);
        decorateRoom(room);
    }
    return root;
}


function collectRoomsSharingBottomWall(r: Room, buttomWall: number): Room[] {
    let rc: Room[] = [];
    if (!r.leftRight && !r.upDown) {
        if (r.room.b === buttomWall) {
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
        if (r.room.r === rightWall) {
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
        if (r.room.t === topWall) {
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
        if (r.room.l === leftWall) {
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

function createIntersectProcessor(direction: string, roomGroups: Room[][]): Function {

    let propsScan: string[];
    let propsCut: string[];
    let doorCoords: string[];
    switch (direction) {
        case 'horizontal':
            propsScan = ['l', 'r'];
            propsCut = ['t', 'b'];
            doorCoords = ['x', 'y'];
            break;
        case 'vertical':
            propsScan = ['t', 'b'];
            propsCut = ['l', 'r'];
            doorCoords = ['y', 'x'];
            break;
        default:
            throw new Error('Wrong direction value:' + direction);
    }

    function sort_func(a: Room, b: Room): number {
        return a.room[propsScan[0]] - b.room[propsScan[0]];
    }

    return function processor() {
        let intersects: { f: Room, s: Room, region: { start: number, stop: number } }[] = [];
        let firstArr = roomGroups[0].sort(sort_func);
        let secondArr = roomGroups[1].sort(sort_func);
        for (let i = 0; i < firstArr.length; i++) {
            let s1 = firstArr[i].room[propsScan[0]] + 1;
            let e1 = firstArr[i].room[propsScan[1]] - 1;
            for (let j = 0; j < secondArr.length; j++) {
                let s2 = secondArr[j].room[propsScan[0]] + 1;
                let e2 = secondArr[j].room[propsScan[1]] - 1;

                // 1.
                //   |--|
                // |------|
                if (s2 <= s1 && e2 >= e1) {
                    intersects.push({
                        f: firstArr[i],
                        s: secondArr[j],
                        region: {
                            start: s1,
                            stop: e1
                        }
                    });
                    continue;
                }
                //2.
                //|------|
                //  |--|
                if (s1 <= s2 && e1 >= e2) {
                    intersects.push({
                        f: firstArr[i],
                        s: secondArr[j],
                        region: {
                            start: s2,
                            stop: e2
                        }
                    });
                    continue;
                }
                //3.
                //   |------|
                // |----|
                if (s1 >= s2 && s1 <= e2 && e1 >= e2) {
                    intersects.push({
                        f: firstArr[i],
                        s: secondArr[j],
                        region: {
                            start: s1,
                            stop: e2
                        }
                    });
                    continue;
                }
                //4.
                //   |------|
                //       |----|
                if (s2 >= s1 && s2 <= e1 && e2 >= e1) {
                    intersects.push({
                        f: firstArr[i],
                        s: secondArr[j],
                        region: {
                            start: s2,
                            stop: e1
                        }
                    });
                    continue;
                }
                console.log('no intersect');
            }//forj
        }//fori
        let probabilities = normalize(intersects.map((itm) => {
            return (itm.region.stop - itm.region.start) + 1;
        }));

        let selected = multinomial_random_sample(probabilities);
        let length_uniform_prop = intersects[selected].region.stop - intersects[selected].region.start + 1;
        let arr: number[] = new Array<number>(length_uniform_prop);
        arr.fill(1);
        let door_position = intersects[selected].region.start + multinomial_random_sample(normalize(arr));
        //shortcuts
        let firstRoom = intersects[selected].f;
        let secondRoom = intersects[selected].s;
        firstRoom.entrance = firstRoom.entrance || [];
        secondRoom.entrance = secondRoom.entrance || [];

        // the door shall be placed in the wall of either the first or the secon, choose 50/50 
        let flipcoin = (multinomial_random_sample([0.5, 0.5]) === 1);
        let obj: { [index: string]: number } = {};
        //first room:
        //horizontal wall splitting (top/down) rooms
        //  x->doorpos  /check
        //  y->b        /check
        //vertical wall splitting (left/right) rooms
        //  x->right  /check
        //  y->doorpos  /check 
        obj[doorCoords[1]] = firstRoom.room[propsCut[1]];
        obj[doorCoords[0]] = door_position;
        (obj as Door).hasDoor = flipcoin ? 1 : 0;
        (obj as Door).connectingRoom = secondRoom.id_room;
        firstRoom.entrance.push(Object.assign({}, obj) as Door);
        //second room:
        //horizontal wall splitting (top/down) rooms
        //  x->doorpos  /check
        //  y->t        /check
        //vertical wall splitting (left/right) rooms
        //  x->left 
        //  y->doorpos /check 
        obj[doorCoords[1]] = secondRoom.room[propsCut[0]];
        obj[doorCoords[0]] = door_position;
        (obj as Door).hasDoor = flipcoin ? 0 : 1;
        (obj as Door).connectingRoom = firstRoom.id_room;
        secondRoom.entrance.push(Object.assign({}, obj) as Door);

        //console.log("entrace will be created here:", { intersect: intersects[selected], door_position, arr: normalize(arr) });
    };

}

export function createDoors(root: Room): void {

    if (!root.upDown && !root.leftRight) {
        //shouldnt be here
        return;
    }
    if (root.upDown && root.leftRight) {
        throw new Error('This room has both upDown and leftRight defined, room_id =' + root.id_room);
    }
    if (root.entrance) {
        console.log('Entrance object detected bailing out');
        return;
    }
    //no doors defined in this room
    let childRooms = <Room[]>(root.upDown || root.leftRight);
    createDoors(childRooms[0]);
    createDoors(childRooms[1]);

    let intersectProcessor;
    //console.log('roomid', root.id_room);
    if (root.upDown) {
        let horizontalWallBottom = root.upDown[0].room.b;
        let roomsTopSide = collectRoomsSharingBottomWall(root.upDown[0], horizontalWallBottom);
        let roomsBottomSide = collectRoomsSharingTopWall(root.upDown[1], horizontalWallBottom + 1);
        intersectProcessor = createIntersectProcessor('horizontal', [roomsTopSide, roomsBottomSide]);
    }
    if (root.leftRight) {
        let verticalWallRight = root.leftRight[0].room.r;
        let roomsLeftSide = collectRoomsSharingRightWall(root.leftRight[0], verticalWallRight);
        let roomsRightSide = collectRoomsSharingLeftWall(root.leftRight[1], verticalWallRight + 1);
        intersectProcessor = createIntersectProcessor('vertical', [roomsLeftSide, roomsRightSide]);
    }
    (<Function>intersectProcessor)();
    return;
}

function flatMapRooms(root: Room): Room[] {
    let rc: Room[] = [];

    function collect(node: Room) {
        if (!node.leftRight && !node.upDown) {
            rc.push(node);
            return;
        }
        let children = <Room[]>(node.leftRight || node.upDown);
        collect(children[0]);
        collect(children[1]);
    }
    collect(root);
    return rc;
}

function sortRooms(a: Room, b: Room) {
    if (a.room.t > b.room.t) {
        return 1;
    }
    if (a.room.t < b.room.t) {
        return -1;
    }
    if (a.room.l > b.room.l) {
        return 1;
    }
    if (a.room.l < b.room.l) {
        return -1;
    }
    return 0;
}



function initRoom(room: Room): void {

    let width = room.room.r - room.room.l + 1;
    let height = room.room.b - room.room.t + 1;

    room.layout = new Array(width * height);
    room.decorations = new Array(width * height);
    room.dungeonObjects = new Array(width * height);

    room.layout.fill(0);
    room.decorations.fill(0);
    room.dungeonObjects.fill(0);

}

function formatWalls(node: Room) {

    let width = node.room.r - node.room.l + 1;
    let height = node.room.b - node.room.t + 1;

    let x: number;
    let y: number;

    node.entrance.forEach((entrance: Door) => {
        x = entrance.x - node.room.l;
        y = entrance.y - node.room.t;
        let idx = x + y * width;
        //left-wall
        if (x === 0) {
            //handle Room-corner cases in case you are next a door on the bottom wall or top wall
            if (y === 1) {
                if (node.layout[idx - width]) {
                    node.layout[idx - width] = BaseImageOrientation.TOP_BOTTOM_RIGHT_CORNER; //╝
                }
                else {
                    node.layout[idx - width] = sampleOfList<BaseImageOrientation>(horizontal_wall_choices);
                }
                node.layout[idx + width] = BaseImageOrientation.TOP_RIGHT_CORNER; //╗
                return;
            }
            //handle Corner case left-bottom corner 
            if (entrance.y === node.room.b - 1) {
                if (node.layout[idx + width]) {
                    node.layout[idx + width] = BaseImageOrientation.TOP_RIGHT_CORNER; //╗
                }
                else {
                    node.layout[idx + width] = sampleOfList<BaseImageOrientation>(horizontal_wall_choices);
                }
                node.layout[idx - width] = BaseImageOrientation.TOP_BOTTOM_RIGHT_CORNER; //╗
                return;
            }
            //regular case
            node.layout[idx - width] = BaseImageOrientation.TOP_BOTTOM_RIGHT_CORNER; //╝
            node.layout[idx + width] = BaseImageOrientation.TOP_RIGHT_CORNER; //╗
            return;
        }
        //top wall
        if (y === 0) {
            //handle Room-corner cases in case you are next a door on the bottom wall or top wall
            //top left corner
            if (x === 1) {
                if (node.layout[idx - 1]) {
                    node.layout[idx - 1] = BaseImageOrientation.TOP_BOTTOM_RIGHT_CORNER; //╝
                }
                else {
                    node.layout[idx - 1] = sampleOfList<BaseImageOrientation>(vertical_wall_choices);
                }
                node.layout[idx + 1] = BaseImageOrientation.TOP_BOTTOM_LEFT_CORNER; //╚
                return;
            }
            //handle Corner case top-right corner 
            if (entrance.x === node.room.r - 1) {
                if (node.layout[idx + 1]) {
                    node.layout[idx + 1] = BaseImageOrientation.TOP_BOTTOM_LEFT_CORNER; //╚
                }
                else {
                    node.layout[idx + 1] = sampleOfList<BaseImageOrientation>(vertical_wall_choices);
                }
                node.layout[idx - 1] = BaseImageOrientation.TOP_BOTTOM_RIGHT_CORNER; //╝
                return;
            }
            //regular case
            node.layout[idx + 1] = BaseImageOrientation.TOP_BOTTOM_LEFT_CORNER; //╚
            node.layout[idx - 1] = BaseImageOrientation.TOP_BOTTOM_RIGHT_CORNER; //╝
            return;
        }
        //right wall
        if (x === width - 1) {
            //top right corner
            if (y === 1) {
                if (node.layout[idx - width]) {
                    node.layout[idx - width] = BaseImageOrientation.TOP_BOTTOM_LEFT_CORNER; //╚ 
                }
                else {
                    node.layout[idx - width] = sampleOfList<BaseImageOrientation>(horizontal_wall_choices);
                }
                node.layout[idx + width] = BaseImageOrientation.TOP_LEFT_CORNER; //╔
                return;
            }
            //bottom right corner
            if (entrance.y === node.room.b - 1) {
                if (node.layout[idx + width]) {
                    node.layout[idx + width] = BaseImageOrientation.TOP_LEFT_CORNER; //╔;  
                }
                else {
                    node.layout[idx + width] = sampleOfList<BaseImageOrientation>(horizontal_wall_choices);
                }
                node.layout[idx - width] = BaseImageOrientation.TOP_BOTTOM_LEFT_CORNER; //╚
                return;
            }
            //regular case
            node.layout[idx - width] = BaseImageOrientation.TOP_BOTTOM_LEFT_CORNER; //╚
            node.layout[idx + width] = BaseImageOrientation.TOP_LEFT_CORNER; //╔;
            return;
        }
        //bottom wall
        if (y === height - 1) {
            //bottom left corner
            if (x === 1) {
                if (node.layout[idx - 1]) {
                    node.layout[idx - 1] = BaseImageOrientation.TOP_RIGHT_CORNER; //╗
                }
                else {
                    node.layout[idx - 1] = sampleOfList<BaseImageOrientation>(vertical_wall_choices);
                }
                node.layout[idx + 1] = BaseImageOrientation.TOP_LEFT_CORNER; //╔
                return;
            }
            //bottom right corner
            if (entrance.x === node.room.r - 1) {
                if (node.layout[idx + 1]) {
                    node.layout[idx + 1] = BaseImageOrientation.TOP_LEFT_CORNER; //╔;  
                }
                else {
                    node.layout[idx + 1] = sampleOfList<BaseImageOrientation>(vertical_wall_choices);
                }
                node.layout[idx - 1] = BaseImageOrientation.TOP_RIGHT_CORNER; //╗
                return;
            }
            //regular case
            node.layout[idx - 1] = BaseImageOrientation.TOP_RIGHT_CORNER; //╗
            node.layout[idx + 1] = BaseImageOrientation.TOP_LEFT_CORNER; //╔;
            return;
        }
        throw new Error('Internal Error:Unreachable code');
    });
    //get all the wall corners that werent handled
    node.layout[0] = node.layout[0] || BaseImageOrientation.TOP_LEFT_CORNER;
    node.layout[width - 1] = node.layout[width - 1] || BaseImageOrientation.TOP_RIGHT_CORNER;
    node.layout[node.layout.length - width] = node.layout[node.layout.length - width]
        || BaseImageOrientation.TOP_BOTTOM_LEFT_CORNER;
    node.layout[node.layout.length - 1] = node.layout[node.layout.length - 1]
        || BaseImageOrientation.TOP_BOTTOM_RIGHT_CORNER;

    //get the entrances
    node.entrance.forEach((itm: Door) => {
        let ry = itm.y - node.room.t;
        let rx = itm.x - node.room.l;
        node.layout[ry * width + rx] = sampleOfList<BaseImageOrientation>(floor_asymetric_choices);
    });

    for (let x = 0; x < width; x++) {
        node.layout[x] = node.layout[x]
            || sampleOfList<BaseImageOrientation>(horizontal_wall_asymetric_choices);
        node.layout[x + width * (height - 1)] = node.layout[x + width * (height - 1)]
            || sampleOfList<BaseImageOrientation>(horizontal_wall_asymetric_choices);
    }
    //right and left wall
    for (let y = 0; y < height; y++) {
        node.layout[y * width] = node.layout[y * width]
            || sampleOfList<BaseImageOrientation>(vertical_wall_asymmetric_choices);
        node.layout[y * width + width - 1] = node.layout[y * width + width - 1]
            || sampleOfList<BaseImageOrientation>(vertical_wall_asymmetric_choices);
    }

}//end of formatWalls

function formatRoom(room: Room): void {
    initRoom(room);
    formatWalls(room);
    //leftovers get to be floors
    for (let i = 0; i < room.layout.length; i++) {
        room.layout[i] = room.layout[i]
            || sampleOfList<BaseImageOrientation>(floor_asymetric_choices);
    }
}

function decorateRoom(room: Room): void {
    let width = room.room.r - room.room.l + 1;
    let height = room.room.b - room.room.t + 1;

    //keep doorways clear from decorations like skulls, and cobwebs
    for (let door of room.entrance) {
        let idx = (door.x - room.room.l) + (door.y - room.room.t) * width;
        //right wall?
        if (door.x === room.room.r) {
            room.decorations[idx - 1] = -1; // position unavailable   
        }
        if (door.x === room.room.l) {
            room.decorations[idx + 1] = -1; // position unavailable  
        }
        if (door.y === room.room.t) {
            room.decorations[idx + width] = -1;
        }
        if (door.y === room.room.b) {
            room.decorations[idx - width] = -1;
        }
    }

    for (let x = 0; x < width; x++) {
        room.decorations[x] = -1;
        room.decorations[x + (height - 1) * width] = -1;
    }
    for (let y = 0; y < height; y++) {
        room.decorations[y * width] = -1;
        room.decorations[(width - 1) + y * width] = -1;
    }
    const upper_left_corner = width + 1;
    const upper_right_corner = width + (width - 2);
    const lower_right_corner = (width - 2) + (height - 2) * width;
    const lower_left_corner = 1 + (height - 2) * (width);

    //cobwebs in corners section
    let cobweb_choices: Sample<number>[] =
        [
            upper_left_corner,
            upper_right_corner,
            lower_right_corner,
            lower_left_corner
        ]
            .filter((v) => { return room.decorations[v] !== -1; })
            .map((v) => {
                return { probability: 1, payload: v };
            });

    //Baysian style conditional probability: room has cobwebs? yes /no    
    if (multinomial_random_sample([6 / 26, 20 / 26]) === 1) {
        //cobwebs
        let max_cobwebs = multinomial_random_sample(normalize([7, 10, 3])) + 1;
        let cursor: { selected: number, next: Sample<number>[] } = { selected: 0, next: cobweb_choices };
        console.log('max_cobwebs');
        while (max_cobwebs > 0 && cursor.next.length > 0) {
            cursor = sampleOfListNoReplacement(cursor.next);
            //what kind of cobweb did we pick
            switch (cursor.selected) {
                case upper_left_corner:
                    room.decorations[upper_left_corner] = BaseImageOrientation.SPIDER_WEB_UPPER_LEFT;
                    break;
                case upper_right_corner:
                    room.decorations[upper_right_corner] = BaseImageOrientation.SPIDER_WEB_UPPER_RIGHT;
                    break;
                case lower_right_corner:
                    room.decorations[lower_right_corner] = BaseImageOrientation.SPIDER_WEB_LOWER_RIGHT;
                    break;
                case lower_left_corner:
                    room.decorations[lower_left_corner] = BaseImageOrientation.SPIDER_WEB_LOWER_LEFT;
                    break;
                default: throw new Error('Wrong corner index:' + cursor.selected);
            }
            max_cobwebs--;
        }
    }
    //place skulls on the floors
    //collect the -1's and random place skulls
    let collect: number[] = room.decorations.reduce((p, v, i) => {
        if (v === 0) {
            p.push(i);
        }
        return p;
    }, [] as number[]);
    let samples: Sample<number>[] = collect.map((v) => {
        return { probability: 1, payload: v } as Sample<number>;
    });
    console.log('---ROOOM----');
    while (
        multinomial_random_sample([0.625, 1 - 0.625]) === 0 //geometric distribution effect
        &&
        samples.length > 0
    ) {
        let cursor = sampleOfListNoReplacement(samples);
        let skull_type = BaseImageOrientation.SKELETON_REMAINS_BONES_SKULL + multinomial_random_sample(
            normalize([23, 21, 15, 15, 15, 15, 15])
        );
        room.decorations[cursor.selected] = skull_type;
        //console.log(samples);
        console.log(cursor.selected);
    }
    console.log('----END----');
}



export function sizeCanvas(rootCell: Cell, cellSize: number): { width: number, height: number } {
    console.log('rootcell:', rootCell);
    let width = (rootCell.r - rootCell.l + 1) * cellSize + 2;
    let height = (rootCell.b - rootCell.t + 1) * cellSize + 2;
    return { width, height };
}

export function renderRooms(ctx: CanvasRenderingContext2D, root: Room, cellSize: number) {

    let rooms = flatMapRooms(root).sort(sortRooms);
    let dungeon_rooms_media = crypt_floor(root.dungeon_sprites);
    let docor_rooms_media = crypt_decorations(root.decorator_sprites);
    for (let room of rooms) {
        //console.log("----ROOM---", room);
        renderRoom(ctx, room, dungeon_rooms_media, cellSize);
        renderDecor(ctx, room, docor_rooms_media, cellSize);
    }
}

export function renderRoom(
    ctx: CanvasRenderingContext2D,
    node: Room,
    sprites: ImageSprites,
    cellSize: number) {

    let ox = node.room.l * cellSize + 1;
    let oy = node.room.t * cellSize + 1;
    let width = node.room.r - node.room.l + 1;

    for (let i = 0; i < node.layout.length; i++) {
        let rx = i % width;
        let ry = Math.round((i - rx) / width);

        let ax = ox + rx * cellSize;
        let ay = oy + ry * cellSize;

        let sprite = sprites.select(node.layout[i]);
        //console.log('ox:[%d], oy:[%d], rx:[%d], ry:[%d] , ax:[%d], ay:[%d]',
        //    ox, oy, rx, ry, ax, ay, sprite);
        if (!sprite) {
            continue;
        }
        ctx.drawImage(sprites.img,
            sprite.x * SPRITE_WIDTH,
            sprite.y * SPRITE_HEIGHT,
            sprite.w * SPRITE_WIDTH,
            sprite.h * SPRITE_HEIGHT,
            ax, ay, cellSize, cellSize);

    }
}

export function renderDecor(
    ctx: CanvasRenderingContext2D,
    node: Room,
    sprites: ImageSprites,
    cellSize: number) {

    let ox = node.room.l * cellSize + 1;
    let oy = node.room.t * cellSize + 1;
    let width = node.room.r - node.room.l + 1;

    for (let i = 0; i < node.decorations.length; i++) {
        let rx = i % width;
        let ry = Math.round((i - rx) / width);

        let ax = ox + rx * cellSize;
        let ay = oy + ry * cellSize;

        let sprite = sprites.select(node.decorations[i]);
        if (!sprite) {
            continue;
        }
        //console.log('ox:[%d], oy:[%d], rx:[%d], ry:[%d] , ax:[%d], ay:[%d]',
        //    ox, oy, rx, ry, ax, ay, sprite);
        ctx.drawImage(sprites.img,
            sprite.x * SPRITE_WIDTH,
            sprite.y * SPRITE_HEIGHT,
            sprite.w * SPRITE_WIDTH,
            sprite.h * SPRITE_HEIGHT,
            ax, ay, cellSize, cellSize);

    }
}
