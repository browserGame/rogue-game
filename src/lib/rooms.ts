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

export interface Room {
    id: number;
    room: string[];
    w: number;
    h: number;
    l: number; //left position in global coordinates
    t: number; //top position global coordinates
    doors: Door[];
}

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

export function compileDungeon(): string {

    let finalRooms = new Map<number, Room>();
    let formattingTodo = new Map<number, Room>();


    let rooms = mockDungeon.map((room) => {

        let firstLayer = room.room instanceof Array ? room.room[0] : room.room;

        //cleaned
        let cRoom = firstLayer.split(/[\n\r]+/).filter((line) => line.length > 0);
        let id = Number.parseInt(room.id);
        let nr: Room = { id, room: [], w: 0, h: 0, l: 0, t: 0, doors: [] };


        function createDoor(dir: string, rx: number, ry: number): Door {
            if ('^v><'.indexOf(dir) === -1) {
                throw new Error('not a door signature');
            }

            let selected = room.symbols.filter((d) => d.e === dir)[0];

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
        }


        cRoom.reduce((prev, line, idx, arr) => {
            if (line.length === 0) {
                throw new TypeError(`room:${id} scanline has width 0, ${arr}`);
            }
            if (prev.w === 0) prev.w = line.length;
            if (prev.w !== line.length) {
                throw new TypeError(`room:${id} is not perfectly square, ${arr}`);
            }
            //scan for doors
            ['^', 'v', '<', '>'].forEach((dir) => {
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
        }, nr);
        return nr;
    });



    rooms.forEach((r) => formattingTodo.set(r.id, r));

    finalRooms.clear();

    function formatRooms(room: Room) {
        //already formatted?
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
    // let gWidth = 0;
    let room = <Room>rooms.shift();
    formattingTodo.delete(room.id);
    finalRooms.set(room.id, room);
    room.doors.forEach((d) => {
        //kickoff formatting
        let r = <Room>formattingTodo.get(d.toRoom);
        formatRooms(r);
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


    function plotRoom(r: Room) {

        for (let k = 0; k < r.h; k++) {
            let s = r.t * totalWidth + r.l + k * totalWidth;
            switch (true) {
                case (k === 0):
                case (k === (r.h - 1)):
                    matrix.fill('#', s, s + r.w);
                    break;
                default:
                    matrix.fill('.', s + 1, s + r.w - 1);
                    matrix[s] = '#';
                    matrix[s + r.w - 1] = '#';

            }
            //matrix.fill('.', s, s + w);
        }
    }

    function stampRoomId(r: Room) {
        let s = (r.t + 1) * totalWidth + r.l + 1;
        let str = `${r.id}`;
        matrix.splice(s, str.length, ...str.split(''));
    }

    function plotDoors(r: Room) {

        r.doors.forEach((d) => {

            let s = (r.t + d.ry) * totalWidth + r.l + d.rx;
            let c = '';
            if (d.ry === 0) {
                c = '^';
            }
            if (d.rx === 0) {
                c = '<';
            }
            if (d.ry === (r.h - 1)) {
                c = 'v';
            }
            if (d.rx === (r.w - 1)) {
                c = '>';
            }
            matrix[s] = c;
        });

    }



    for (let i = 1; i <= 35; i++) {
        let room = <Room>finalRooms.get(i);
        if (room) {
            plotRoom(room);
            stampRoomId(room);
            plotDoors(room);
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
