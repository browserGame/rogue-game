import { addV, IVector, negV, sampleFromList } from '../math';
import { IDoor, IGFragment, IItem, Room } from './';

type HWallType = 'top_top_1' | 'top_top_2';
type VWallType = 'wall_side_1' | 'wall_side_2';
// FloorTypes = 'floor_0' | 'floor_1' | 'floor_2' | 'floor_3';

function getRandomVerticalWall(): VWallType {
  return sampleFromList<VWallType>([
    {
      payload: 'wall_side_1',
      probability: 4
    },
    {
      payload: 'wall_side_2',
      probability: 1
    }
  ]);
}

function getRandomHorizontalWall(): HWallType {
  return sampleFromList<HWallType>([
    {
      payload: 'top_top_1',
      probability: 4
    },
    {
      payload: 'top_top_2',
      probability: 1
    }
  ]);
}

const dudFragment: IGFragment = {
    auxClassNames: [],
    left: 0,
    size: ['normal'],
    top: 0,
    zIndex: 0
};

function mapAsciiToGUIWall(token: string): IGFragment {
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
    auxClassNames: ['floor_crypt', wallName],
    left: 0, // Parameter adjusted for the gui state used by the render
    size: ['fsc3', 'plts3'],
    top: 0,
    zIndex: 0
  };
}

function createCursor(
  coords: IVector[],
  width: number,
  height: number,
  doors: IDoor[],
  pk: number
) {
  let marked = coords.map(vec => {
    const w: IItem = { tag: '#', p: vec, gui: dudFragment };

    return w;
  });

  marked.splice(
    0,
    0,
    ...doors.map(d => {
      const wd: IItem = { tag: d.tag, p: d.p, gui: dudFragment };

      return wd;
    })
  );

  const fidx = (_p: IVector): IItem | undefined => {
    if (_p.x >= 0 && _p.x < width && _p.y >= 0 && _p.y < height) {
      const i = marked.findIndex(itm => _p.x === itm.p.x && _p.y === itm.p.y);

      return i === -1 ? { gui: dudFragment, p: _p, tag: '.' } : marked[i];
    }

    return undefined;
  };

  let t: IVector;
  let n: IVector;

  let tt: string;
  let tn: string;
  let nt: string;
  let nn: string;
  let dd: string;

  let { tag: dir, p } = doors[0];

  const has = (arr: string, i?: IItem) => {
    if (!(i && i.tag)) {
      return false;
    }

    return arr.indexOf(i.tag) >= 0;
  };

  const set = (_p: IVector, mark: string) => {
    let itm = fidx(_p);
    const gui = mapAsciiToGUIWall(mark[0]);
    if (!itm) {
      if (_p.x >= 0 && _p.x < width && _p.y >= 0 && _p.y < height) {
        itm = { gui, p: _p, tag: mark[0] };
        marked.push(itm);
      }
    } else {
      itm.tag = mark[0];
      itm.gui = gui;
    }
  };

  const setCursorParams = () => {
    switch (dir) {
      case '>':
        t = { x: 0, y: 1 };
        n = { x: -1, y: 0 };

        tt = '┃';
        tn = '┛';
        nt = '┏';
        nn = '━';
        dd = '┗';
        break;
      case '<':
        t = { x: 0, y: -1 };
        n = { x: 1, y: 0 };

        tt = '┃';
        tn = '┏';
        nt = '┛';
        nn = '━';
        dd = '┓';
        break;
      case '^':
        t = { x: 1, y: 0 };
        n = { x: 0, y: 1 };

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

        tt = '━';
        tn = '┗';
        nt = '┓';
        nn = '┃';
        dd = '┏';
        break;
    }
  };

  const turnCursor = () => {
    let n2 = '<^>v'.split('').indexOf(dir);
    n2 = n2 === 3 ? 0 : n2 + 1;
    dir = <any> '<^>v'[n2];
    setCursorParams();
  };

  const step = (): boolean => {
    let token = fidx(addV(p, t));
    const normal = fidx(addV(p, n)); // Always yields a result
    if (token === undefined || has('┗┓┛┏┃━#', normal)) {
      turnCursor();
      token = fidx(addV(p, t));
    }
    if (
      !has('┗┓┛┏┃━#', normal) && !has('┗┓┛┏┃━#^>v<', token)
    ) {
      turnCursor(); // 270°
      turnCursor();
      turnCursor();
      token = fidx(addV(p, t));
    }
    if (has('┗┓┛┏┃━', token)) {
      return false;
    }
    p = addV(p, t);

    // Console.log(this.p);

    return true;
  };

  const render = (): boolean => {
    const token = fidx(p);
    if (token === undefined) {
      throw new Error(`x:${p.x}, y:${p.y} are outside confines of room:${pk}`);
    }
    // Its a door?
    if (has('<^>v', token)) {
      return true; // Nothing
    }

    // Already wall?

    if (has('┗┓┛┏┃━', token)) {
      return false; // All done
    }

    // Undrawnwall.

    if (token.tag === '#') {
      const prev = addV(p, negV(t));
      const nextToken = fidx(addV(p, t));
      const tangentToken = fidx(addV(p, n));
      const prevToken = fidx(prev);
      if (prevToken === undefined) {
        // Error
        throw new Error(`prevToken was undefined ${prev.x} , ${prev.y} `);
      }
      if (nextToken === undefined) {
        if (has('^<>v', tangentToken)) {
          set(p, tt);
        } else {
          set(p, tn);
        }

        return true;
      }
      if (!has('┗┓┛┏┃━#', prevToken)) {
        // Only possible if it is a opening for a door
        if (has('┗┓┛┏┃━#', tangentToken)) {
          set(p, nn);
        } else {
          set(p, nt);
        }

        return true;
      }
      if (!has('┗┓┛┏┃━#', tangentToken)) {
        if (!has('┗┓┛┏┃━#', nextToken)) {
          set(p, dd);
        } else {
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
    marked = marked.map(i => {
      i.tag = i.tag.replace(/[\^v<>]/g, ' ');

      return i;
    });
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const token = <IItem> fidx({ x, y });
        if (token.tag === '#') {
          token.tag = ' ';
          continue;
        }
        break;
      }
      for (let x = width - 1; x >= 0; x--) {
        const token = <IItem> fidx({ x, y });
        if (token.tag === '#') {
          token.tag = ' ';
          continue;
        }
        break;
      }
    }
    marked = marked.filter(i => i.tag !== ' ');
  };

  setCursorParams();

  const moveToInnerWall = (): boolean => {
    marked.sort((a, b) => a.p.y - b.p.y || a.p.x - b.p.x);
    const itm = marked.find(i => i.tag === '#');
    if (!itm) {
      return false;
    }
    dir = '<';
    p = addV(itm.p, { x: 0, y: 1 });
    setCursorParams();

    return true;
  };

  return {
    chizzleOutsideWalls,
    moveToInnerWall,
    render,
    result: () => marked.sort((a, b) => a.p.y - b.p.y || a.p.x - b.p.x),
    step
  };
}

export function processWalls(
  matrix: string[],
  width: number,
  room: Room,
  coords: IVector[]
) {
  const height = matrix.length / width;

  const cursor = createCursor(coords, width, height, room.doors, room.pk);

  do {
    cursor.render();
  } while (cursor.step());

  cursor.chizzleOutsideWalls();

  // Draw all inner walls
  while (cursor.moveToInnerWall()) {
    do {
      cursor.render();
    } while (cursor.step());
  }
  const walls = room.getNameSpace('walls');
  walls.splice(0, walls.length, ...cursor.result());
}
