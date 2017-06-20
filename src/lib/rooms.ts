
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
    'P': 1; //tourch
    'Q': 1; //quest regenerator
    'R': 1; //pentagram
    'S': 1; //bear trap
    'T': 1; //skelton-enemy
    'U': 1; //red carpet
    'V': 1; //grave-stone
    'X': 1; //teleport
    'Y': 1; //cross tombstone
    '^': 1; //door north
    '>': 1; //door east
    '<': 1; //door west
    'v': 1; //door south
}

export interface Symbol {
    m?: string;
    e?: keyof CodedItems;
    to?: keyof CodedItems | (keyof CodedItems)[];
    door?: string;
    has?: string;
    color?: string;
    init?: string;
}

export interface Layout {
    room: string | string[];
    id: string;
    symbols: Symbol[];
}

export const dungeon: Layout[] = [
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
            { e: '<', door: '1:inset' },
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
            { m: 'v', door: '3' }
        ],
        id: '4',
        room: `
########
#......#
#......#
#.L..B.#
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
            { e: '^', door: 'inset:3' },
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
########L####
`   },
    {
        symbols: [
            { e: 'O', color: 'green' },
            { e: '^', door: 'inset:3' },
            { m: 'v', door: '6' },
        ],
        id: '5',
        room: `
####^######
##........#
#.!.....!.#
#..OO.....#
#..OO.....#
#.....OO..#
#.....OO..#
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
            { e: 'v', door: '8' },
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
    }
];
