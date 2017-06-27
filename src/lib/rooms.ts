import * as util from 'util';

export interface CodedItems {
    '#': 1; //wall
    '.': 1; //floor
    'A': 1; //skull
    'B': 1; //statue wizard
    'C': 1; //secret pressure plate
    'D': 1; //portal
    'E': 1; //goblin
    'F': 1; //bat
    'G': 1; //rat
    'H': 1; //coffin
    'I': 1; //red pentagram trap
    'J': 1; //vase 
    'K': 1; //cobweb
    'L': 1; //stone
    'M': 1; //coin
    'N': 1; //quest-result
    'O': 1; //water
    'P': 1; //twirl-stone, looks like dna helix#
    'Q': 1; //quest regenerator
    'R': 1; //pentagram
    'S': 1; //bear trap
    'T': 1; //skelton-enemy
    'U': 1; //trader
    'V': 1; //tombstone
    'X': 1; //teleport
    'Y': 1; //cross tombstone
    'Z': 1; //shield
    '^': 1; //door north
    '>': 1; //door east
    '<': 1; //door west
    'v': 1; //door south
    'é': 1; //carpet
    '&': 1; //treasure chest
    'µ': 1; //stairs change level
    '{': 1; //beer barrel
    '"': 1; //death-totum
    '(': 1; //lava
    '@': 1; //green wizard shaman throws fire
    '*': 1; //table
    'w': 1; //spikes
    'z': 1; //closet 
    '!': 1; //tourch
    'm': 1; //half moon trap
    '%': 1; //boss 
}

export interface Symbol {
    m?: string;
    e?: keyof CodedItems;
    to?: keyof CodedItems | (keyof CodedItems)[];
    door?: string;
    has?: string;
    color?: string;
    init?: string;
    fromTrap?: string;
}

export interface Layout {
    room: string | string[];
    id: string;
    symbols: Symbol[];
}

export interface Door {
    rx: number;
    ry: number;
    toRoom: number;
    inset: boolean;
}

export interface Vector {
    x: number;
    y: number;
}

export function addV(a: Vector, b: Vector): Vector {
    return { x: a.x + b.x, y: a.y + b.y };
}

export function negV(a: Vector): Vector {
    return { x: -a.x, y: -a.y };
}

/*
export interface Room {
    id: number;
    room: string[];
    w: number;
    h: number;
    l: number; //left position in global coordinates
    t: number; //top position global coordinates
    doors: Door[];
}*/

const mockDungeon: Layout[] = [
    {
        symbols: [
            { e: 'C', has: 'cheese:1,gold:1' },
            { e: '>', door: '2' },
            { e: 'B', has: 'gold:4' },
            { e: 'E', has: 'gold:3' },
        ],
        id: '1',
        room: [
            `
#########
#.......#
#..A....#
#.....A.#
#..C....>
#.F..E..#
#.D.....#
#K.....K#
#########
`,
            `
#########
#.......#
#.......#
#.....B.#
#.......#
#.......#
#.......#
#.......#
#########
`]
    },
    {
        symbols: [
            { m: '1', to: 'G' },
            { e: 'F', has: 'gold:3' },
            { m: '3', to: 'F', has: 'gold:4' },
            { m: '2', to: 'F', has: 'stone:1:grey' },
            { e: 'J', has: 'stone:1:white', color: 'gold' },
            { e: '>', door: '3' },
            { e: '<', door: 'inset:1' },
            { m: '5', e: 'H', has: 'gold:3', init: 'half-open' },
            { m: '6', e: 'H', has: 'gold:3', init: 'closed' },
        ],
        id: '2',
        room: `
##############
#K...........#
#...1.F......#
#..........3.#
#.......2...4#
#............#
#......J.....>
#............#
#............#
<...5..6.....#
#A...........#
##############
`
    },
    {
        symbols: [
            { e: 'L', color: 'gold' },
            { e: 'F', has: 'gold:4' },
            { e: 'v', door: '3' }
        ],
        id: '4',
        room: `
########
#......#
#......#
#.L..F.#
####...#
#####v##
`
    },
    {
        symbols: [
            { m: '1', to: 'M', has: 'gold:2' },
            { e: 'M', has: 'gold:3' },
            { m: 'N', has: 'ring,points:2000,vitality:1030,wisdom:1015,agility' },
            { e: '<', door: 'inset:2' },
            { e: '^', door: 'inset:4' },
            { e: 'v', door: '5' },
        ],
        id: '3',
        room: `
######^######
###......####
<.........M.#
#....###....#
#....#.#....#
#...1###....#
###........##
###N.......##
########v####
`   },
    {
        symbols: [
            { e: 'O', color: 'green' },
            { e: '^', door: 'inset:3' },
            { e: 'v', door: '6' },
            { e: '%', has: 'damaged-boots,magic-spell:defense,cracked-mace' }
        ],
        id: '5',
        room: `
####^######
##........#
#.!.....!.#
#..OO.....#
#..OO.....#
#.....OO..#
#....%OO..#
#..OO.....#
#..OO.....#
#.!.....!.#
##.......##
#####v#####
`
    },
    {
        symbols: [
            { e: '^', door: 'inset:5' },
            { e: 'v', door: '12' },
            { e: '<', door: 'inset:7' },
            { e: 'L', color: 'gold' },
            { e: 'J', color: 'green' },
            { e: 'F', has: 'gold:5' },
            { e: 'G', has: 'gold:4' },
            { m: '1', e: 'J', color: 'red' },
            { m: '2', e: 'G', has: 'stone:1,gold:2' }
        ],
        id: '6',
        room: `
######^#####
#K........K#
#..........#
<..........#
#....A.A...#
#.......Q.L#
#F..J.A....#
#.I.A......#
#..........#
#....A.....#
#....G.....#
#.2...1....#
#..SA......#
#.S........#
#K........K#
######v#####
`
    },
    {
        symbols: [
            { e: '^', door: 'inset:8' },
            { e: 'v', door: 'inset:9' },
            { e: '>', door: '6' },
            { m: '1', e: 'T', has: 'stone:1:yellow' },
            { e: 'T' },
            { e: 'J', color: 'cyan' },
            { e: 'G', has: 'gold:5' },
        ],
        id: '7',
        room: `
###^#######
#.........#
#.....1Z..#
#A........#
#.......T.>
#.........#
#..J.....G#
#K........#
##v########
`
    },
    {
        symbols: [
            { e: 'v', door: '7' },
            { m: 'F', has: 'gold:4,gold:5' },
            { m: '1', e: 'F', has: 'gold:6,gold:3' },
            { m: '2', e: 'F', has: 'stone:green' },
            { m: '3', e: 'B' },
            { e: 'J', color: 'cyan' },
            { e: 'G', has: 'gold:5' },
            //N find crown of souls
        ],
        id: '8',
        room: `
##########
#.......K#
#......3.#
#........#
#.....12.#
#........#
#....F.N.#
#........#
#........#
#........#
#..A....K#
######v###
`
    },
    {
        symbols: [
            { e: '^', door: '7' },
            { e: '<', door: 'inset:10' },
            { e: '&', has: 'elixer,spellbook,gold:70' },
            { e: 'M', has: 'gold:2' },
            { e: 'J', color: 'gold', has: 'gold:4,stone:green' },
            { e: 'F', has: 'gold:3' },
            { m: '2', e: 'F', has: 'gold:4' }
        ],
        id: '9',
        room: [`
#####^#####
##.......##
#K!.&...!.#
#...ééé...#
#...ééé...#
<...ééé...#
#...J.....#
#.!..F..!M#
##.......##
###########
`, `
###########
##.......##
#.........#
#.........#
#....2....#
#.........#
#.........#
#.........#
##.......##
###########
`,
        ]
    },
    {
        symbols: [
            { e: '^', door: 'inset:11' },
            { e: '>', door: '9' },
            { m: '1', e: 'F', has: 'gold:2,bottle:water' },
            { e: 'µ', door: 'level:2' },
            { m: '3', e: 'F', has: 'gold:2' },
            { e: 'J', color: 'red', has: 'trap-trigger:1,T' },
            { e: 'T', has: 'stone:grey,bottle:hp' },
            { e: 'G', has: 'gold:1' },
            { e: 'E', has: 'gold:3' },
            { m: '2', e: 'F', has: 'gold:3' }
        ],
        id: '10',
        room: `
####^######
#........K#
#.1.Q.A...#
#...A.A...#
#...µ.....#
#...A...3.#
#.J..A....#
#.........#
#.T..A....>
#.......EG#
#.........#
#.........#
#........2#
#.........#
#K........#
###########
`
    },
    {
        symbols: [
            { e: 'v', door: '10' },
            { e: 'J', color: 'red', has: 'gold:1' },
            { m: '1', e: '{', has: 'gold:3,stone:gold' },
            { e: 'J', color: 'red', has: 'trap-trigger:1' },
        ],
        id: '11',
        room: `
###########
#.1....A..#
#..A......#
#...OOO...#
#...OOO...#
#.J.OOO...#
#.........#
#....F.{..#
#.........#
#####v#####
`
    },
    {
        symbols: [
            { e: '^', door: 'inset:6' },
            { e: '>', door: 'inset:21' },
            { e: 'v', door: 'inset:13' },
            { e: 'J', color: 'green' },
            { e: 'V', has: 'gold:1' },
            { e: 'é', color: 'blue' }
        ],
        id: '12',
        room: [`
#^#########
#.........>
#...ééé...#
#.A.ééé.V.#
#.J.ééé...#
#K........#
#####v#####
`, `
###########
#.........#
#...."....#
#.........#
#.........#
#.........#
###########
`]
    }
    ,
    {
        symbols: [
            { e: '^', door: '12' },
            { e: 'v', door: 'inset:14' },
        ],
        id: '13',
        room: `
####^###
#......#
#......#
#K.....#
####...#
####v###
`
    },
    {
        symbols: [
            { e: '^', door: '13' },
            { e: 'v', door: 'inset:20' },
            { e: '<', door: 'inset:15' },
        ],
        id: '14',
        room: `
#####^#####
#KA.......#
#....R....#
<..A......#
#..((.OO..#
#..((.OO..#
#..((.OO..#
#.........#
#K........#
#########v#
`
    },
    {
        symbols: [
            { e: '^', door: '14' },
        ],
        id: '20',
        room: `
###^####
#......#
#......#
#......#
#K..####
########
`
    },
    {
        symbols: [
            { e: '^', door: 'inset:16' },
            { e: '<', door: 'inset:18' },
            { e: '>', door: '14' },
            { e: 'v', door: 'inset:17' },
            { e: 'µ', door: 'level:2' },
            { m: '1', e: 'F', },
            { e: 'M', has: 'gold:2' },
            { e: 'L', color: 'white' },
            { e: 'J', color: 'green', has: 'coin:1,milk:1' },
            { e: 'V', has: 'gold:1' },
            { m: '2', e: 'M', has: 'gold:3' },
        ],
        id: '15',
        room: `
########^#####
#............#
#....µ.....1.#
#.........M..#
#....J.......#
#............>
#..L.........#
<....V...2...#
#............#
#............#
##########v###
`
    }
    ,
    {
        symbols: [
            { e: 'v', door: '15' },
        ],
        id: '16',
        room: `
########
#......#
#..B...#
#......#
#...####
##v#####
`
    },
    {
        symbols: [
            { e: '^', door: '15' },
            { e: 'é', color: 'blue' },
            { e: 'L', color: 'green' }
        ],
        id: '17',
        room: [
            `
###^###
#A....#
#.....#
#L....#
#.....#
#.....#
#######
`,
            `
#######
#.....#
#.ééé.#
#.ééé.#
#.....#
#.....#
#######
`,
            `
#######
#.....#
#.!U!.#
#..A..#
#.....#
#.....#
#######
`
        ]

    },
    {
        symbols: [
            { e: '^', door: 'inset:19' },
            { e: '>', door: '15' },
            { e: 'G', has: 'gold:1' },
            { m: '2', e: '@', has: 'boots:red' },
            { e: '@', has: 'coin:1' },
        ],
        id: '18',
        room:
        `
#####^######
#K........K#
#..2....GV.#
#..........#
#..........#
#..........#
#....@.....#
#.......X.1>
#..........#
#.........A#
#.....Y....#
#..........#
#..........#
#...A......#
############
`
    },
    {
        symbols: [
            { e: 'v', door: '18' },
            { e: 'V', has: 'gold:2' },
        ],
        id: '19',
        room:
        `
########
#......#
#.A....#
#....V.#
####...#
#####v##
`
    }
    ,
    {
        symbols: [
            { e: '^', door: 'inset:22' },
            { e: 'v', door: 'inset:26' },
            { e: '<', door: '12' },
            { e: '>', door: 'inset:25' },
            { e: 'J', color: 'blue' },
            { e: 'F', has: 'gold:4' },
            { e: 'M', has: 'gold:1' }
        ],
        id: '21',
        room:
        `
###^#######
#......M..#
#.........#
#.........>
#.w.......#
#...{.....#
#F........#
#..S......#
<......*..#
#.........#
#.........#
#.......J.#
#.........#
#..A......#
#.........#
#######v###
`
    },
    {
        symbols: [
            { e: '^', door: 'inset:23' },
            { e: 'v', door: '21' },
            { e: 'J', color: 'blueish', has: 'gold:1' },
            { e: 'G', has: 'gold:1' },
            { e: 'V', has: 'milk' },
            { e: 'z', has: 'chicken-bone:1' },
            { e: 'F', has: 'stone:1:gold' },
        ],
        id: '22',
        room:
        `
#######^###
#........K#
#.........#
#.........#
#.........#
#.........#
#........A#
#.....J...#
#...A.....#
#.G.......#
#.........#
#......AV.#
#..z......#
#.........#
#K...AFA.K#
#####v#####
`
    },
    {
        symbols: [
            { e: '^', door: 'inset:24' },
            { e: 'v', door: '22' },
            { e: '>', door: 'inset:32' },
            { e: 'L', color: 'gold' },
            { e: '{', has: 'gold:1' },
        ],
        id: '23',
        room:
        `
#^#######
#......K#
#.......#
#.......#
#.X....L#
#.......#
#.....A.#
#.......#
#.......#
#.......>
#.......#
#.{.....#
#.......#
#.......#
#K......#
####v####
`
    },
    {
        symbols: [
            { e: 'v', door: '23' },
            { e: 'F', has: 'gold:2' },
            { e: 'L', color: 'green' }
        ],
        id: '24',
        room:
        `
########
#......#
#......#
#.F..L.#
####...#
#####v##
`
    },
    {
        symbols: [
            { e: '<', door: '21' },
            { m: '1', e: 'J', color: 'gray' },
            { e: 'G', has: 'cheese' },
            { m: '2', e: 'G', fromTrap: 'I' },
            { e: 'J', color: 'green' },
        ],
        id: '25',
        room:
        `
###########
#........K#
#..1......#
#..G......#
#.........#
#.........#
<.......A.#
#........2#
#.J...B.I.#
#.........#
#K.......K#
###########
`
    },
    {
        symbols: [
            { e: '^', door: '21' },
            { e: 'v', door: 'inset:27' },
            { e: 'G', has: 'gold:5' },
            { e: 'V', has: 'fish,mana,gold:1' },
        ],
        id: '26',
        room:
        `
#######^#######
#K.........A..#
#......G......#
#......A...A..#
#.............#
#...m......H..#
#.............#
#.............#
#...V.........#
#.............#
#.............#
#K...........A#
#############v#
`
    },
    {
        symbols: [
            { e: '^', door: '26' },
            { e: '>', door: 'inset:28' },
            { e: 'M', has: 'gold:3' },
            { m: '1', e: 'L', color: 'gold' },
            { m: '2', e: 'L', color: 'green' },
        ],
        id: '27',
        room:
        `
###^####
#......#
#.M.1..>
#..2...#
#...####
########
`
    },
    {
        symbols: [
            { e: '^', door: 'inset:29' },
            { e: '<', door: '27' },
            { e: 'M', has: 'gold:2' },
            { e: 'F', has: 'gold:1' },
            { e: 'J', color: 'gold:3' },
            { m: '1', e: 'F', has: 'gold:4' },
            { m: '2', e: 'F', has: 'red-pants' },
            { e: 'X', door: '' },
            { e: '*', init: 'with paper' },

        ],
        id: '28',
        room:
        `
##########^#####
#K............K#
#..A.......M...#
#...AFw.A......#
#..............#
<.J....1....X..#
#2.............#
#............R.#
#.*..........w.#
#K............K#
################
`
    },
    {
        symbols: [
            { e: '^', door: 'inset:30' },
            { e: 'v', door: '28' },
            { e: 'J', color: 'gold' },
            { e: '*', has: 'gold:3' },
            { e: 'L', color: 'white' },
            { e: 'M', has: 'gold:1' },
            { e: 'z', has: 'gold:5' },
            { e: 'H', has: 'gold:1' },
            { m: '2', e: 'G', },
            { m: '1', e: 'F', },
        ],
        id: '29',
        room:
        `
######^#####
#K.......A.#
#..........#
#..........#
#......J...#
#..........#
#..........#
#...*......#
#L.........#
#..M.......#
#..........#
#.......H..#
#....z.....#
#....21....#
#..........#
######v#####
`
    },
    {
        symbols: [
            { e: '^', door: 'inset:31' },
            { e: 'v', door: '29' },
        ],
        id: '30',
        room:
        `
##^#####
#......#
#...@..#
#......#
#...####
##v#####
`
    },
    {
        symbols: [
            { e: 'v', door: '30' },
            { e: 'M', has: 'gold:1' },
            { e: 'J', color: 'green', has: 'gold:6' },
            { e: 'G', has: 'gold:4' }
        ],
        id: '31',
        room:
        `
##########
#........#
#........#
#........#
#.M......#
#........#
#..A.A...#
#..J.....#
#........#
#........#
#........#
#........#
#...G....#
#.......K#
#####v####
`
    },
    {
        symbols: [
            { e: 'v', door: 'inset:33' },
            { e: '<', door: '23' },
            { e: '^', door: 'inset:34' },
            { m: '1', e: 'G', has: 'fish' },
            { m: '2', e: 'F', has: 'gold:2' },
            { e: 'P', has: 'milk,gold:1' },
            { m: '3', e: 'L', color: 'gold' },
            { m: '4', e: 'L', color: 'white' },
            { m: '5', e: 'F', has: 'gold:4' },
            { m: '6', e: 'L', color: 'gold' },
            { m: '7', e: 'J', color: 'blue', has: 'book-spell:earthquake,mace' },
            { m: '8', e: 'G' },
            { m: '9', e: 'G', has: 'gold:1,silver:1' },
            { m: 'a', e: 'F' },
            { m: 'b', e: 'L', color: 'gold' },
            { m: 'c', e: 'F', has: 'fish:gold:2' },

        ],
        id: '32',
        room:
        `
############^###
#..............#
#.......A..1A..#
#....2...P...3.#
#..............#
#..............#
#.456.....z....#
<..A...7...8...#
#..............#
#9........a....#
#.......b.w....#
#.......c......#
#..............#
#######v########
`
    },
    {
        symbols: [
            { e: '^', door: '32' },
            { m: '1', e: 'L', color: 'green' },
            { m: '2', e: 'L', color: 'white' },
            { m: '3', e: '&', has: 'mace,gold:1,stone:gray' },
            {
                m: '4',
                e: '&',
                has: 'magic-potion,leather-boots,gold:4'
            },
            { e: 'G', has: 'gold:5' },
            { e: 'J', color: 'green' },
            { m: '6', e: 'L', color: 'gold' },

        ],
        id: '33',
        room:
        `
#####^#####
#K.A..1F..#
#...2..z..#
#...ééé...#
#..3ééé4..#
#...ééé...#
#..GJ.....#
#.........#
#.......A.#
###########
`
    },
    {
        symbols: [
            { e: 'v', door: '32' },
            { e: 'L', color: 'white' },
            { e: '@', has: 'pants-green' },
        ],
        id: '34',
        room:
        `
###########
#K........#
#.........#
#.........#
#..@......#
#.L....S..#
#...A.....#
#####v#####
`
    }
];

//> String.fromCodePoint(0x2517)
//'┗'

//> String.fromCodePoint(0x2513)
//'┓'

//> String.fromCodePoint(0x251B)
//'┛'

//> String.fromCodePoint(0x250F)
//'┏'

//> String.fromCodePoint(0x2503)
//'┃'

//> String.fromCodePoint(0x2501)
//'━'
/*
export interface WallCursor {
    tx: number;
    ty: number;
    nx: number;
    ny: number;
    tbp: keyof WallCursor;
    tb: number;
    tt: string;
    tn: string;
    nt: string;
    nn: string;
    rx: number;
    ry: number;
}
*/
/*
function createWallCursor(dir: string, d: Door): WallCursor {
    let tx = -1;
    let ty = 0;
    let nx = 0;
    let ny = -1;
    let tbp: keyof WallCursor = 'tx';
    let tb = 0;
    let tt = '━';
    let tn = '┗';
    let nt = '┓';
    let nn = '┃';

    switch (dir) {
        case '>':
            tx = 0;
            ty = 1;
            nx = -1;
            ny = 0;
            tbp = 'ty';
            tb = boundery;
            tt = '┃';
            tn = '┛';
            nt = '┏';
            nn = '━';
            break;
        case '<':
            tx = 0;
            ty = -1;
            nx = 1;
            ny = 0;
            tbp = 'ty';
            tb = 0;
            tt = '┃';
            tn = '┏';
            nt = '┛';
            nn = '━';
            break;
        case '^':
            tx = 1;
            ty = 0;
            nx = -1;
            ny = 0;
            tbp = 'tx';
            tb = boundery;
            tt = '━';
            tn = '┓';
            nt = '┗';
            nn = '━';
            break;
        case 'v':
        default:
            break;
    }
    return {
        tx, ty, nx, ny, tbp, tb, tt, tn, nt, nn, rx, ry
    };
}*/


export class WallCursor {
    private room: Room;

    private t: Vector;
    private n: Vector;
    private tbp: 'ty' | 'tx';
    private tb: number;
    private tt: string;
    private tn: string;
    private nt: string;
    private nn: string;
    private dd: string;
    protected dir: string;

    protected p: Vector;


    private init() {
        let d = this.room.doors[0];
        let dir = '';

        if (d.rx === 0) {
            dir = '<';
        }

        if (d.ry === 0) {
            dir = '^';
        }

        if (d.rx > 0 && d.ry > 0 && d.ry < (this.room.h - 1)) {
            dir = '>';
        }

        if (d.ry === (this.room.h - 1)) {
            dir = 'v';
        }

        if (dir === '') {
            throw new Error(`Could not create a Wall Cursor for Room ${this.room.id}`);
        }
        this.dir = dir;
        this.p = { x: d.rx, y: d.ry };

    }

    protected setCursorParams() {

        switch (this.dir) {
            case '>':
                this.t = { x: 0, y: 1 };
                this.n = { x: -1, y: 0 };
                this.tbp = 'ty';
                this.tb = this.room.h;
                this.tt = '┃';
                this.tn = '┛';
                this.nt = '┏';
                this.nn = '━';
                this.dd = '┗';
                break;
            case '<':
                this.t = { x: 0, y: -1 };
                this.n = { x: 1, y: 0 };
                this.tbp = 'ty';
                this.tb = 0;
                this.tt = '┃';
                this.tn = '┏';
                this.nt = '┛';
                this.nn = '━';
                this.dd = '┓';
                break;
            case '^':
                this.t = { x: 1, y: 0 };
                this.n = { x: 0, y: 1 };
                this.tbp = 'tx';
                this.tb = this.room.w;
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
                this.tbp = 'tx';
                this.tb = 0;
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

export class Room {
    private _id: number;
    public t: number;
    public l: number;
    public doors: Door[];
    public w: number;
    public h: number;
    public room: string[][];

    public get id() {
        return this._id;

    }

    private renderWalls() {
        let cursor = new WallCursor(this);
        cursor.renderWall();
        let fl = this.room[0];
        fl = fl.map((s) => {
            let raw = s.split('');
            let i = 0;
            while (raw[i] === '#') {
                raw[i] = ' ';
                i++;
            }
            i = s.length - 1;
            while (raw[i] === '#') {
                raw[i] = ' ';
                i--;
            }
            return raw.join('');
        });
        this.room[0] = fl;
        try {
            cursor = new InnerWallCursor(this);
            cursor.renderWall();
        }
        catch (e) {
            //no inner wallnothing
        }
    }

    private validateCoords(layer: number, x: number, y: number): string[] | undefined {
        if (x < 0 || x >= this.w || y < 0 || y >= this.h) {
            return undefined;
        }
        let f = this.room[layer];
        if (!f) {
            throw new Error(`This layer ${layer} doesnt exist in room ${this._id}`);
        }
        return f;
    }

    public getToken(layer: number, v: Vector): string | undefined {
        let f = this.validateCoords(layer, v.x, v.y);
        if (!f) {
            return f;
        }
        return f[v.y][v.x];
    }

    public setToken(layer: number, v: Vector, token: string) {
        let f = this.validateCoords(layer, v.x, v.y);
        if (f) {
            let n = f[v.y].split('');
            n[v.x] = token[0];
            f[v.y] = n.join('');
        }
    }

    public stamp(matrix: string[], w: number) {
        let fl = this.room[0];
        fl.forEach((s, k) => {
            let p = w * (this.t + k) + this.l;
            matrix.splice(p, this.w, ...s.split(''));
        });
    }


    public constructor(roomData: Layout) {
        if (!(roomData.room instanceof Array)) {
            roomData.room = [roomData.room];
        }
        this.room = roomData.room.map((layer) => {
            return layer.split(/[\n\r]+/).filter((line) => line.length > 0);
        });
        this._id = Number.parseInt(roomData.id);
        if (!Number.isInteger(this._id)) {
            throw new TypeError(`${roomData.id} is not a valid Room ID`);
        }

        this.l = 0;
        this.t = 0;

        const createDoor = (dir: string, rx: number, ry: number): Door => {
            if ('^v><'.indexOf(dir) === -1) {
                throw new Error('not a door signature');
            }

            let selected = roomData.symbols.filter((d) => d.e === dir)[0];

            if (selected) {

                if (selected.door) {
                    let door = selected.door.toLocaleLowerCase();
                    let rc: Door = {
                        rx,
                        ry,
                        toRoom: Number.parseInt(door.replace(/^inset:/, '')),
                        inset: /^inset:/.test(door)
                    };
                    return rc;
                }
            }
            throw new Error('Could not create door');
        };

        this.room.forEach((layer, i) => {

            let roomInfo: { room: string[], w: number, h: number, doors: Door[] } = { room: [], w: 0, h: 0, doors: [] };

            layer.reduce((prev, line, idx, arr) => {
                if (line.length === 0) {
                    throw new TypeError(`room:${this.id} scanline has width 0, ${arr}`);
                }
                if (prev.w === 0) prev.w = line.length;
                if (prev.w !== line.length) {
                    throw new TypeError(`room:${this.id} is not perfectly square, ${arr}`);
                }

                //scan for doors
                '^v<>'.split('').forEach((dir) => {
                    let x = line.indexOf(dir); // is there a door
                    if (x >= 0) {
                        prev.doors.push(createDoor(dir, x, idx));
                    }
                });
                if (idx === arr.length - 1) {
                    prev.h = arr.length;
                }
                prev.room.push(line);
                return prev;
            }, roomInfo);

            if (i === 0) {
                this.w = roomInfo.w;
                this.h = roomInfo.h;
                this.doors = roomInfo.doors;
                this.renderWalls();
            }
            else {
                if (!(this.w === roomInfo.w && this.h === roomInfo.h)) {
                    throw new TypeError(`layer index ${i} is different size from the base layer`);
                }
            }
        });

    }
}


export function compileDungeon(): string {

    let finalRooms = new Map<number, Room>();
    let formattingTodo = new Map<number, Room>();


    let rooms = mockDungeon.map((roomData) => {
        return new Room(roomData);
    });

    rooms.forEach((r) => formattingTodo.set(r.id, r));


    function formatRooms(room: Room) {
        /// Already formatted?
        let todo: Door[] = [];
        let done: Door[] = [];

        if (finalRooms.has(room.id)) {
            return;
        }

        let doors = room.doors;
        doors.forEach((d) => {
            if (finalRooms.has(d.toRoom)) {
                done.push(d);
            }
            else {
                todo.push(d);
            }
        });

        if (!done.length) {
            throw new Error(`room ${room.id} cannot be formatted, not connected to a reference`);
        }


        let fr = <Room>finalRooms.get(done[0].toRoom);
        let door = done[0];
        let myId = room.id;
        let toId = fr.id;
        let counterDoor = fr.doors.filter((d) => d.toRoom === myId)[0];

        if (!counterDoor) {
            throw new Error(`room ${myId} has no counterpart in room ${toId}`);
        }

        if (counterDoor.rx > 0 && counterDoor.ry === 0) {
            room.t = fr.t - room.h;
            room.l = fr.l + counterDoor.rx - door.rx;
        }

        if (counterDoor.rx > 0 && counterDoor.ry === (fr.h - 1)) {
            room.t = fr.t + fr.h;
            room.l = fr.l + counterDoor.rx - door.rx;
        }

        if (counterDoor.rx > 0 && counterDoor.ry > 0 && counterDoor.ry < (fr.h - 1)) {
            room.l = fr.l + fr.w;
            room.t = fr.t + counterDoor.ry - door.ry;
        }

        if (counterDoor.rx === 0) {
            room.l = fr.l - room.w;
            room.t = fr.t + counterDoor.ry - door.ry;
        }

        finalRooms.set(room.id, room);

        for (let d of todo) {
            let r = formattingTodo.get(d.toRoom);
            if (!r) {
                throw new Error(`Room ${d.toRoom} is not found in todo`);
            }
            formattingTodo.delete(r.id);
            formatRooms(r);
        }
    }
    //
    // let gWidth = 0;
    //
    let room = <Room>rooms.shift();
    formattingTodo.delete(room.id);
    finalRooms.set(room.id, room);
    room.doors.forEach((d) => {
        // kickoff formatting
        let r = <Room>formattingTodo.get(d.toRoom);
        formatRooms(r);
       // console.log(r);
    });

    console.log(util.format('%j',
        { nrDone: finalRooms.size, nrTodo: formattingTodo.size }));

    let totalWidth = 0;
    let totalHeight = 0;

    let minTop = 0;
    let minLeft = 0;

    finalRooms.forEach((v: Room) => {
        minTop = Math.min(v.t, minTop);
        minLeft = Math.min(v.l, minLeft);
    });

    finalRooms.forEach((v: Room) => {
        v.t -= minTop;
        v.l -= minLeft;
    });

    finalRooms.forEach((v: Room) => {
        totalWidth = Math.max(v.l + v.w, totalWidth);
        totalHeight = Math.max(v.t + v.h, totalHeight);
    });

    console.log({ totalWidth, totalHeight });

    // ascii formatting, just for testing

    let matrix = new Array(totalWidth * totalHeight);
    matrix.fill(' ');



    for (let i = 1; i <= 35; i++) {
        let room = <Room>finalRooms.get(i);
        if (room) {
            room.stamp(matrix, totalWidth);
        }
    }

    let rc: string[] = [];

    for (let i = 0; i < totalHeight; i++) {
        let line = matrix.slice(i * totalWidth, (i + 1) * totalWidth).join('');
        rc.push(line);
        console.log('>' + line + '<');
    }
    return rc.join('\n');

}
