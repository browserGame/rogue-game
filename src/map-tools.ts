import { BaseImageOrientation, Sprite, ImageSprites, crypt_floor, SPRITE_WIDTH, SPRITE_HEIGHT } from "./media";

export interface NumberProps {
    [propname: string]: number;
}

export interface fn_Profiler {
    (N: number): number[];
}

interface fn_profilerFactory {
    (name: string, options: NumberProps): fn_Profiler;
}

export interface Door {
    x: number;
    y: number;
    hasDoor: number;
    connectingRoom: number;
    [index: string]: number;
}

export interface Cell {
    t: number;//top
    r: number;//right
    l: number;//left
    b: number;//bottom
    [index: string]: number;
}

export interface Room {
    parent: Room | null;
    dungeon_sprites: HTMLImageElement,
    room: Cell;
    level: number;// count down to zero
    id_room: number;
    upDown?: Room[];
    leftRight?: Room[];
    entrance?: Door[];
    decorations?: number[];//extra decorations untop of the floor, lights, spiderwebs, etc
    layout?: number[]; //base scaffolding, floor, walls
    dungeonObjects?: number[];//state changeble objects (doors, chest, bookshelves) belong to this class
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

export interface Sample<T> {
    probablility: number;
    payload: T;
}

export function sampleOfList<T>(sSpace: Sample<T>[]): T {
    let probabilities: number[] = sSpace.map((itm: Sample<T>) => {
        return itm.probablility;
    });
    let idx = multinomial_random_sample(normalize(probabilities));
    return sSpace[idx].payload;
}


function cloneRoom(r: Room) {
    let rc: Room = {
        dungeon_sprites: r.dungeon_sprites,
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
    let root: Room = {
        parent: null,
        id_room: 10,
        room: {
            t: 0,
            l: 0,
            r: width,
            b: height
        } as Cell,
        level: level,
        dungeon_sprites: document.getElementById("floor_crypt") as HTMLImageElement
    };
    createDungeonRooms(root, prob);
    createDoors(root);
    let rooms = flatMapRooms(root).sort(sortRooms);
    let media_base_layout = crypt_floor(root.dungeon_sprites);
    for (let room of rooms) {
        formatRoom(room);
    }
    return root;
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

function createIntersectProcessor(direction: string, roomGroups: Room[][]): Function {

    let propsScan: string[];
    let propsCut: string[];
    let doorCoords: string[];
    switch (direction) {
        case "horizontal":
            propsScan = ["l", "r"];
            propsCut = ["t", "b"];
            doorCoords = ["x", "y"];
            break;
        case "vertical":
            propsScan = ["t", "b"];
            propsCut = ["l", "r"];
            doorCoords = ["y", "x"];
            break;
        default:
            throw new Error("Wrong direction value:" + direction);
    }

    function sort_func(a: Room, b: Room): number {
        return a.room[propsScan[0]] - b.room[propsScan[0]];
    }

    return function () {
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
        for (let i = 0; i < length_uniform_prop; i++) { arr[i] = 1; };
        let door_position = intersects[selected].region.start + multinomial_random_sample(normalize(arr));
        //shortcuts
        let firstRoom = intersects[selected].f;
        let secondRoom = intersects[selected].s;
        firstRoom.entrance = firstRoom.entrance || [];
        secondRoom.entrance = secondRoom.entrance || [];

        // the door shall be placed in the wall of either the first or the secon, choose 50/50 
        let flipcoin = (multinomial_random_sample([0.5, 0.5]) == 1);
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

        console.log("entrace will be created here:", { intersect: intersects[selected], door_position, arr: normalize(arr) });
    }

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
        console.log('Entrance object detected bailing out')
        return;
    }
    //no doors defined in this room
    let childRooms = root.upDown || root.leftRight;
    createDoors(childRooms[0]);
    createDoors(childRooms[1]);
    let rooms: Room[];
    let intersectProcessor;
    //console.log('roomid', root.id_room);
    if (root.upDown) {
        let horizontalWallBottom = root.upDown[0].room.b;
        let roomsTopSide = collectRoomsSharingBottomWall(root.upDown[0], horizontalWallBottom);
        let roomsBottomSide = collectRoomsSharingTopWall(root.upDown[1], horizontalWallBottom + 1);
        //console.log('updown', horizontalWallBottom, roomsTopSide, roomsBottomSide);
        intersectProcessor = createIntersectProcessor('horizontal', [roomsTopSide, roomsBottomSide]);
    }
    if (root.leftRight) {
        let verticalWallRight = root.leftRight[0].room.r;
        let roomsLeftSide = collectRoomsSharingRightWall(root.leftRight[0], verticalWallRight);
        let roomsRightSide = collectRoomsSharingLeftWall(root.leftRight[1], verticalWallRight + 1);
        //console.log('leftright', verticalWallRight, roomsLeftSide, roomsRightSide);
        intersectProcessor = createIntersectProcessor('vertical', [roomsLeftSide, roomsRightSide]);
    }
    intersectProcessor();
    return;
}

//
//flatMapRooms
//
//all romms in an arry sorted in ascending order of l,t coordinates
//formatDungeon, actually format 50x50 tiles with information about icons etc 
//create Layers
//

function flatMapRooms(root: Room): Room[] {
    let rc: Room[] = [];

    function collect(node: Room) {
        if (!node.leftRight && !node.upDown) {
            rc.push(node);
            return;
        }
        let children = node.leftRight || node.upDown;
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

function sortSprites(a: Sprite, b: Sprite) {
    return a.id - b.id;
}

function fillArr(arr: number[], v: number) {
    for (let k = 0; k < arr.length; k++) {
        arr[k] = v;
    }
}

function formatRoom(room: Room): void {

    let width = room.room.r - room.room.l + 1;
    let height = room.room.b - room.room.t + 1;
    //wall random probablities
    let horizontal_wall_choices: Sample<BaseImageOrientation>[] = [{
        payload: BaseImageOrientation.WALL_HORIZONTAL_CRACKED,
        probablility: 1
    }, {
        payload: BaseImageOrientation.WALL_HORIZONTAL_CRYPT,
        probablility: 1
    }];


    let vertical_wall_choices: Sample<BaseImageOrientation>[] = [{
        payload: BaseImageOrientation.WALL_VERT_CRACKED,
        probablility: 1
    }, {
        payload: BaseImageOrientation.WALL_VERT_NORMAL,
        probablility: 1
    }];

    let horizontal_wall_asymetric_choices: Sample<BaseImageOrientation>[] = [{
        payload: BaseImageOrientation.WALL_HORIZONTAL_CRACKED,
        probablility: 1
    }, {
        payload: BaseImageOrientation.WALL_HORIZONTAL_CRYPT,
        probablility: 3 // 3x higher chance to select this option
    }];


    let vertical_wall_asymmetric_choices: Sample<BaseImageOrientation>[] = [{
        payload: BaseImageOrientation.WALL_VERT_CRACKED,
        probablility: 1
    }, {
        payload: BaseImageOrientation.WALL_VERT_NORMAL,
        probablility: 3 // 3x higher chance to select this option
    }];

    let floor_asymetric_choices: Sample<BaseImageOrientation>[] = [{
        payload: BaseImageOrientation.NORMAL_FLOOR,
        probablility: 4 // 4/7 chance of being selected
    }, {
        payload: BaseImageOrientation.CRACKED_FLOOR,
        probablility: 1 // 1/7 chance of being selected
    }, {
        payload: BaseImageOrientation.CIRCLE_FLOOR,
        probablility: 1 // 1/7 chance of being selected
    }, {
        payload: BaseImageOrientation.HALF_CIRCLE_FLOOR,
        probablility: 1 // 1/7 chance of being selected
    }
    ];


    function formatWalls(node: Room) {

        let x, y;

        node.entrance.forEach((entrance: Door) => {
            x = entrance.x - node.room.l;
            y = entrance.y - node.room.t;
            let idx = x + y * width;
            //left-wall
            if (x == 0) {
                //handle Room-corner cases in case you are next a door on the bottom wall or top wall
                if (y == 1) {
                    if (node.layout[idx - width]) {
                        node.layout[idx - width] = BaseImageOrientation.TOP_BOTTOM_RIGHT_CORNER;//╝
                    }
                    else {
                        node.layout[idx - width] = sampleOfList<BaseImageOrientation>(horizontal_wall_choices);
                    }
                    node.layout[idx + width] = BaseImageOrientation.TOP_RIGHT_CORNER;//╗
                    return;
                }
                //handle Corner case left-bottom corner 
                if (entrance.y == node.room.b - 1) {
                    if (node.layout[idx + width]) {
                        node.layout[idx + width] = BaseImageOrientation.TOP_RIGHT_CORNER;//╗
                    }
                    else {
                        node.layout[idx + width] = sampleOfList<BaseImageOrientation>(horizontal_wall_choices);
                    }
                    node.layout[idx - width] = BaseImageOrientation.TOP_BOTTOM_RIGHT_CORNER;//╗
                    return;
                }
                //regular case
                node.layout[idx - width] = BaseImageOrientation.TOP_BOTTOM_RIGHT_CORNER;//╝
                node.layout[idx + width] = BaseImageOrientation.TOP_RIGHT_CORNER;//╗
                return;
            }
            //top wall
            if (y == 0) {
                //handle Room-corner cases in case you are next a door on the bottom wall or top wall
                //top left corner
                if (x == 1) {
                    if (node.layout[idx - 1]) {
                        node.layout[idx - 1] = BaseImageOrientation.TOP_BOTTOM_RIGHT_CORNER;//╝
                    }
                    else {
                        node.layout[idx - 1] = sampleOfList<BaseImageOrientation>(vertical_wall_choices);
                    }
                    node.layout[idx + 1] = BaseImageOrientation.TOP_BOTTOM_LEFT_CORNER;//╚
                    return;
                }
                //handle Corner case top-right corner 
                if (entrance.x == node.room.r - 1) {
                    if (node.layout[idx + 1]) {
                        node.layout[idx + 1] = BaseImageOrientation.TOP_BOTTOM_LEFT_CORNER;//╚
                    }
                    else {
                        node.layout[idx + 1] = sampleOfList<BaseImageOrientation>(vertical_wall_choices);
                    }
                    node.layout[idx - 1] = BaseImageOrientation.TOP_BOTTOM_RIGHT_CORNER;//╝
                    return;
                }
                //regular case
                node.layout[idx + 1] = BaseImageOrientation.TOP_BOTTOM_LEFT_CORNER;//╚
                node.layout[idx - 1] = BaseImageOrientation.TOP_BOTTOM_RIGHT_CORNER;//╝
                return;
            }
            //right wall
            if (x == width - 1) {
                //top right corner
                if (y == 1) {
                    if (node.layout[idx - width]) {
                        node.layout[idx - width] = BaseImageOrientation.TOP_BOTTOM_LEFT_CORNER;//╚ 
                    }
                    else {
                        node.layout[idx - width] = sampleOfList<BaseImageOrientation>(horizontal_wall_choices);
                    }
                    node.layout[idx + width] = BaseImageOrientation.TOP_LEFT_CORNER;//╔
                    return;
                }
                //bottom right corner
                if (entrance.y == node.room.b - 1) {
                    if (node.layout[idx + width]) {
                        node.layout[idx + width] = BaseImageOrientation.TOP_LEFT_CORNER;//╔;  
                    }
                    else {
                        node.layout[idx + width] = sampleOfList<BaseImageOrientation>(horizontal_wall_choices);
                    }
                    node.layout[idx - width] = BaseImageOrientation.TOP_BOTTOM_LEFT_CORNER;//╚
                    return;
                }
                //regular case
                node.layout[idx - width] = BaseImageOrientation.TOP_BOTTOM_LEFT_CORNER;//╚
                node.layout[idx + width] = BaseImageOrientation.TOP_LEFT_CORNER;//╔;
                return;
            }
            //bottom wall
            if (y == height - 1) {
                //bottom left corner
                if (x == 1) {
                    if (node.layout[idx - 1]) {
                        node.layout[idx - 1] = BaseImageOrientation.TOP_RIGHT_CORNER;//╗
                    }
                    else {
                        node.layout[idx - 1] = sampleOfList<BaseImageOrientation>(vertical_wall_choices);
                    }
                    node.layout[idx + 1] = BaseImageOrientation.TOP_LEFT_CORNER;//╔
                    return;
                }
                //bottom right corner
                if (entrance.x == node.room.r - 1) {
                    if (node.layout[idx + 1]) {
                        node.layout[idx + 1] = BaseImageOrientation.TOP_LEFT_CORNER;//╔;  
                    }
                    else {
                        node.layout[idx + 1] = sampleOfList<BaseImageOrientation>(vertical_wall_choices);
                    }
                    node.layout[idx - 1] = BaseImageOrientation.TOP_RIGHT_CORNER;//╗
                    return;
                }
                //regular case
                node.layout[idx - 1] = BaseImageOrientation.TOP_RIGHT_CORNER;//╗
                node.layout[idx + 1] = BaseImageOrientation.TOP_LEFT_CORNER;//╔;
                return;
            }
            throw new Error("Internal Error:Unreachable code");
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
            let ry = itm.y-node.room.t;
            let rx = itm.x-node.room.l;
            node.layout[ry * width + rx] = sampleOfList<BaseImageOrientation>(floor_asymetric_choices);
        });

        for (let x = 0; x < width; x++) {
            node.layout[x] = node.layout[x]
                || sampleOfList<BaseImageOrientation>(horizontal_wall_asymetric_choices);
            node.layout[x + width * (height-1)] = node.layout[x + width *(height-1)]
                || sampleOfList<BaseImageOrientation>(horizontal_wall_asymetric_choices);
        }
        //right and left wall
        for (let y = 0; y < height; y++) {
            node.layout[y * width] = node.layout[y * width]
                || sampleOfList<BaseImageOrientation>(vertical_wall_asymmetric_choices);
            node.layout[y * width + width-1] = node.layout[y * width + width-1]
                || sampleOfList<BaseImageOrientation>(vertical_wall_asymmetric_choices);
        }

    }//end of formatWalls

    room.layout = new Array(width * height);
    room.decorations = new Array(width * height);
    room.dungeonObjects = new Array(width * height);

    fillArr(room.layout, 0);
    fillArr(room.decorations, 0);
    fillArr(room.dungeonObjects, 0);

    formatWalls(room);
    //leftovers get to be floors
    for (let i = 0; i < room.layout.length; i++) {
        room.layout[i] = room.layout[i]
            || sampleOfList<BaseImageOrientation>(floor_asymetric_choices);
    }
}

/**
 * drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
Given an image, this function takes the area of the source image specified by 
the rectangle whose top-left corner is (sx, sy) 
and whose width and height are sWidth and sHeight 
and draws it into the canvas, placing it on the canvas at (dx, dy) and scaling it to the size specified by dWidth and dHeight.
 */

export function sizeCanvas(rootCell: Cell, cellSize: number): { width: number, height: number } {
    console.log('rootcell:', rootCell);
    let width = (rootCell.r - rootCell.l + 1) * cellSize + 2;
    let height = (rootCell.b - rootCell.t + 1) * cellSize + 2;
    return { width, height };
}

export function renderRooms(ctx: CanvasRenderingContext2D, root: Room, cellSize: number) {

    let rooms = flatMapRooms(root).sort(sortRooms);
    let dungeon_rooms_media = crypt_floor(root.dungeon_sprites);
    for (let room of rooms) {
        console.log("----ROOM---", room);
        renderRoom(ctx, room, dungeon_rooms_media, cellSize);
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
        console.log('ox:[%d], oy:[%d], rx:[%d], ry:[%d] , ax:[%d], ay:[%d]',
            ox, oy, rx, ry, ax, ay, sprite);
        ctx.drawImage(sprites.img,
            sprite.x * SPRITE_WIDTH,
            sprite.y * SPRITE_HEIGHT,
            sprite.w * SPRITE_WIDTH,
            sprite.h * SPRITE_HEIGHT,
            ax, ay, cellSize, cellSize);
        /*ox + rx * cellSize,
        oy + ry * cellSize,
        cellSize, cellSize);*/
    }
}
