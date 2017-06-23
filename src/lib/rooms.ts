
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
            { m: 'v', door: '6' },
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
#####v####
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
<....R....#
#..A......#
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
            { e: '^', door: '14' },
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
            { e: '^', has: 'inset:23' },
            { e: 'v', has: '21' },
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
            { e: '>', has: 'inset:32' },
            { e: 'v', has: '21' },
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
            { e: '^', door: 'inset:31' },
            { e: 'v', has: '29' },
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
#..J.....>
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
            { e: 'v', door: '33' },
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
