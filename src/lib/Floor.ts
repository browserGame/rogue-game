import {

    $Room,
    $Item,
    getNameSpace,
    getContentAt,
    $GFragment

} from './Room';

import {

    Sample,
    sampleFromList,
    /*profilerFactory*/

} from './statistics';

import {
    Vector, addV
} from './math';


type FloorTypes = 'floor_0' | 'floor_1' | 'floor_2' | 'floor_3';


export function getRandomFloor(): $GFragment {

    let samples = [100 - 15 - 10 - 3, 15, 10, 3].map((c, idx) => {
        let rc = {
            probability: c,
            payload: `floor_${idx}`
        } as Sample<FloorTypes>;
        return rc;
    });
    let s = sampleFromList(samples);

    return {
        size: ['normal'],
        auxClassNames: ['floor_crypt', s],
        left: 0,
        top: 0,
        zIndex: 0
    };

}


export function processFloor(matrix: string[], width: number, room: $Room) {

    let height = matrix.length / width;

    let st = <Vector>room.doors[0].p;

    const isObstructable = (v: Vector) => {
        let walls = getContentAt(room, v, '#┗┓┛┏┃━(O$é');
        return !!walls;
        // [#] wall (done)
        // [(]lava
        // [O] water
        // [$] acid bath

    };

    let done: Vector[] = [];

    const isDone = (v: Vector) => {
        let f = done.find((i) => i.x === v.x && i.y === v.y);
        return !!f;
    };


    let toDo: Vector[] = [];
    toDo.push(st);

    for (let p = toDo.pop(); p !== undefined; p = toDo.pop()) {
        if (isObstructable(p) || isDone(p)) {
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
            points.map((i) => addV(<Vector>p, i)).filter((i) => !(isObstructable(i) || isDone(i)) && i.x >= 0 && i.x < width && i.y >= 0 && i.y < height)
        );
    }
    let floor = getNameSpace(room, 'floor');
    floor.splice(0, floor.length, ...done.map((p) => <$Item>{ tag: '.', p, gui: getRandomFloor() }).sort((a, b) => a.p.y - b.p.y || a.p.x - b.p.x));

}

export function floorExtrusion(room: $Room, i: $Item): void {

    let floor = getNameSpace(room, 'floor');

    let copy = floor.filter((f) => {

        if (i.br) {
            let rc = f.p.y <= i.br.y && f.p.x <= i.br.x && f.p.x >= i.p.x && f.p.y >= i.p.y;
            return !rc;
        }
        return !(f.p.x === i.p.x && f.p.y === i.p.y);

    });

    if (floor.length !== copy.length) {
        console.log(` number of floor types reduced: ${floor.length - copy.length}`);
    }

    floor.splice(0, floor.length, ...copy);

}
