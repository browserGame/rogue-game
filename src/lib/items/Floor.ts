'use strict';
import { IGFragment, IItem, Room } from '~items';

import { addV, ISample, IVector, sampleFromList } from '~math';

export function processFloor(matrix: string[], width: number, room: Room) {
  const height = matrix.length / width;

  const st = <IVector> room.doors[0].p;

  const isObstructable = (v: IVector) => {
    const walls = room.getContentAt(v, '#┗┓┛┏┃━(O$é');

    return !!walls;
  };

  const done: IVector[] = [];

  const isDone = (v: IVector) => {
    const f = done.find(i => i.x === v.x && i.y === v.y);

    return !!f;
  };

  const toDo: IVector[] = [];
  toDo.push(st);

  for (let p = toDo.pop(); p !== undefined; p = toDo.pop()) {
    if (isObstructable(p) || isDone(p)) {
      continue;
    }
    done.push(p);
    const points: IVector[] = [
      { x: 1, y: 0 }, // Left
      { x: -1, y: 0 }, // Right
      { x: 0, y: -1 }, // Up,
      { x: 0, y: 1 } // Down
    ];
    toDo.push.apply(
      toDo,
      points
        .map(i => addV(<IVector> p, i))
        .filter(
          i =>
            !(isObstructable(i) || isDone(i)) &&
            i.x >= 0 &&
            i.x < width &&
            i.y >= 0 &&
            i.y < height
        )
    );
  }
  const floor = room.getNameSpace('floor');
  floor.splice(
    0,
    floor.length,
    ...done
      .map(p => {
        const rc: IItem = {
          gui: getRandomFloor(),
          p,
          tag: '.'
        };

        return rc;
      })
      .sort((a, b) => a.p.y - b.p.y || a.p.x - b.p.x)
  );
}

export function floorExtrusion(room: Room, i: IItem): void {
  const floor = room.getNameSpace('floor');

  const copy = floor.filter(f => {
    if (i.br) {
      const rc =
        f.p.y <= i.br.y && f.p.x <= i.br.x && f.p.x >= i.p.x && f.p.y >= i.p.y;

      return !rc;
    }

    return !(f.p.x === i.p.x && f.p.y === i.p.y);
  });

  if (floor.length !== copy.length) {
    console.log(
      ` number of floor types reduced: ${floor.length - copy.length}`
    );
  }

  floor.splice(0, floor.length, ...copy);
}

export function getRandomFloor(): IGFragment {
  // These names come from the .sheet files
  const floorTypes = ['floor_0', 'floor_1', 'floor_2', 'floor_3'];
  const probabilities = [100 - 15 - 10 - 3, 15, 10, 3];

  const samples = floorTypes.map((c, idx) => {
    const rc: ISample<string> = {
      payload: c,
      probability: probabilities[idx]
    };

    return rc;
  });

  const s = sampleFromList(samples);

  return {
    auxClassNames: ['floor_crypt', s],
    left: 0,
    size: ['plts3', 'fsc3'],
    top: 0,
    zIndex: 0
  };
}
