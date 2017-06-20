
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
    'Z': 1; //shield
    '^': 1; //door north
    '>': 1; //door east
    '<': 1; //door west
    'v': 1; //door south
    'é': 1; //carpet
    '&': 1; //treasure chest
    'µ': 1; //stairs change level
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
#####^#####
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
            { e: 'v', door: 'inset:9' },
            { e: '>', door: '6' },
            { m: '1', e: 'T', has: 'stone:1:yellow' },
            { e: 'T' },
            { e: 'J', color: 'cyan' },
            { e: 'G', has: 'gold:5' },
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
#####v####
`
    },
    {
        symbols: [
            { e: '^', door: '7' },
            { e: '<', door: 'inset:10' },
            { e: '&', has: 'elixer,spellbook,gold:70' },
            { e: 'T' },
            { e: 'J', color: 'gold', has: 'gold:4,stone:green' },
            { e: 'F', has: 'gold:3' },
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
#....F....#
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
            { e: 'J', color: 'red', has: 'trap-trigger:1' },
            { e: 'T', has: 'gold:5' },
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
];

/*

*/


