import {
    $Room,
    $Item
} from './Room';

import {
    Vector, addV
} from './math';

export function processFloor(matrix: string[], width: number, room: $Room) {

    let height = matrix.length / width;

    let st = <Vector>room.doors[0].p;

    const isWall = (v: Vector) => {
        let f = room.walls.find((i) => {
            return i.p.x === v.x && i.p.y === v.y && '#┗┓┛┏┃━'.indexOf(i.tag) >= 0;
        });
        return !!f;
    };

    let done: Vector[] = [];

    const isDone = (v: Vector) => {
        let f = done.find((i) => i.x === v.x && i.y === v.y);
        return !!f;
    };

    let toDo: Vector[] = [];
    toDo.push(st);

    for (let p = toDo.pop(); p !== undefined; p = toDo.pop()) {
        if (isWall(p) || isDone(p)) {
            continue;
        }
        done.push(p);
        let points: Vector[] = [
            { x: 1, y: 0 }, //left
            { x: -1, y: 0 }, //right
            { x: 0, y: -1 }, //up,
            { x: 0, y: 1 } //down
        ];
        toDo.push.apply(toDo,
            points.map((i) => addV(<Vector>p, i)).filter((i) => !(isWall(i) || isDone(i)) && i.x >= 0 && i.x < width && i.y >= 0 && i.y < height)
        );
    }

    room.floor = done.map((p) => <$Item>{ tag: '.', p }).sort((a, b) => a.p.y - b.p.y || a.p.x - b.p.x);
   
}



