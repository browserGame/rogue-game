import {
    Layout,
    $Room,
} from './Room';

import {
    parseLayout
} from './tools';

import {
    SecretPlate,
    Cheese,
    Coin,
    DoorLeft,
    DoorRight,
    DoorBottom,
    DoorUp,
    WizardStatue,
    Goblin,
    TelePortal,
    Boots,
    Pants,
    Bat,
    Rat,
    Boss,
    Stone,
    Vase,
    Coffin,
    QuestRing,
    Acid,
    MagicSpellBook,
    Mace,
    Skeleton,
    Elixer,
    TreasureChest,
    LevelStairs,
    BottleWater,
    BeerBarrel,
    TombStone,
    Carpet,
    BottleMilk,
    GreenWizard,
    ChickenBone,
    Closet,
    RedPentagram,
    Mana,
    Fish,
    Table,
    TwirlStone,
    MagicPotion,
    BearTrap,
    Shield,
    CrossTombStone
} from './Symbols';

export interface DungeonData {
    [index: number]: Layout[];
}


export const mockDungeon: DungeonData = {
    0: [{
        symbols: [
            <Cheese>{ e: 'q', addHp: 5 },
            <SecretPlate>{
                e: 'C', has: [
                    <Cheese>{ e: 'q', addHp: 15, poisen: { add: 7, release: 1 } },
                    <Coin>{ e: 'M', color: 'gray', credit: 1 }
                ]
            },
            <DoorRight>{ e: '>', toRoom: 2 },
            <WizardStatue>{
                e: 'B',
                has: [
                    <Coin>{ e: 'M', credit: 4, color: 'gold' }
                ]
            },
            <Goblin>{
                e: 'E',
                hp: 10,
                xp: 10,
                has: [
                    <Coin>{ e: 'M', credit: 3, color: 'gold' }
                ]
            },
            <TelePortal>{ e: 'X', toRoom: 28, portal: 'X' },
        ], id: 1,
        room: [
            `
#########
#....q..#
#..A....#
#.....A.#
#..C....>
#.F..E..#
#.X.....#
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
            <Rat>{ m: '1', e: 'G', xp: 10, hp: 10 },
            <Bat>{
                e: 'F', has: [
                    <Coin>{ e: 'M', credit: 3, color: 'gold' }
                ], hp: 10, xp: 3
            },
            <Bat>{
                m: '3', e: 'F', hp: 10, xp: 3, level: 1,
                has: [<Coin>{ e: 'M', color: 'gold', credit: 4 }]
            },
            <Bat>{ m: '4', e: 'F', xp: 10, hp: 10 },
            <Bat>{
                m: '2', e: 'F', xp: 10, hp: 10,
                has: [<Stone>{ e: 'L', color: 'gray', credit: 1 }]
            },
            <Vase>{
                e: 'J', color: 'gold',
                has: [<Stone>{ e: 'L', color: 'white', credit: 2 }]
            },
            <DoorRight>{ e: '>', toRoom: 3 },
            <DoorLeft>{ e: '<', toRoom: 1, inset: true },
            <Coffin>{
                m: '5', e: 'H',
                has: [<Coin>{ e: 'M', credit: 3, color: 'gray' }],

            },
            <Coffin>{
                m: '6', e: 'H',
                has: [<Coin>{ credit: 3, color: 'gold', e: 'M' }],

            },
        ],
        id: 2,
        room: [`
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
`]
    },
    {
        symbols: [
            <Stone>{ e: 'L', color: 'yellow', credit: 1 },
            <Bat>{
                e: 'F', has: [
                    <Coin>{ e: 'M', color: 'gold', credit: 4 }
                ]
            },
            <DoorBottom>{ e: 'v', toRoom: 3 }
        ],
        id: 4,
        room: [`
########
#......#
#......#
#.L..F.#
####...#
#####v##
`]
    },
    {
        symbols: [
            <Coin>{ m: '1', e: 'M', credit: 2, color: 'gold' },
            <Coin>{ e: 'M', credit: 3, color: 'gold' },
            <QuestRing>{ e: 'N', credits: 2000, vitality: 1030, wisdom: 1015, agility: 1200 },
            <DoorLeft>{ e: '<', toRoom: 2, inset: true },
            <DoorUp>{ e: '^', toRoom: 4, inset: true },
            <DoorBottom>{ e: 'v', toRoom: 5 },
        ],
        id: 3,
        room: [`
######^######
###......####
<.........M.#
#....###....#
#....#.#....#
#...1###....#
###........##
###N.......##
########v####
`]
    },
    {
        symbols: [
            <Acid>{ m: '1', e: '$' },
            <Acid>{ m: '2', e: '$' },
            <Acid>{ m: '3', e: '$' },
            <DoorUp>{ e: '^', toRoom: 3, inset: true },
            <DoorBottom>{ e: 'v', toRoom: 6 },
            <Boss>{
                hp: 40,
                xp: 100,
                level: 1,
                e: '%', has: [
                    <Boots>{ addDp: 10 },
                    <MagicSpellBook>{ spell: 'defense' },
                    <Mace>{ addHp: 40 },
                ]
            }
        ],
        id: 5,
        room: [`
####^######
##........#
#.!.....!.#
#..11.....#
#..11.....#
#.....22..#
#....%22..#
#..33.....#
#..33.....#
#.!.....!.#
##.......##
#####v#####
`]
    },
    {
        symbols: [
            <DoorUp>{ e: '^', toRoom: 5, inset: true },
            <DoorBottom>{ e: 'v', toRoom: 12 },
            <DoorLeft>{ e: '<', toRoom: 7, inset: true },
            <Stone>{ e: 'L', color: 'yellow', credit: 5 },
            <Vase>{ e: 'J', color: 'green' },
            <Bat>{
                e: 'F', has: [<Coin>{ credit: 5, e: 'M', color: 'gold' }]
            },
            <Rat>{ e: 'G', has: [<Coin>{ credit: 4, e: 'M', color: 'gold' }] },
            <Vase>{ m: '1', e: 'J', color: 'red' },
            <Rat>{
                m: '2', e: 'G', has: [
                    <Stone>{ e: 'L', credit: 1, color: 'yellow' },
                    <Coin>{ credit: 2, color: 'gray' }
                ]
            },
            <BearTrap>{ m: '4', e: 'S', delHp: 10 },
            <BearTrap>{ m: '5', e: 'S', delHp: 15 }
        ],
        id: 6,
        room: [`
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
#..5A......#
#.4........#
#K........K#
######v#####
`]
    },
    {
        symbols: [
            <DoorUp>{ e: '^', toRoom: 8, inset: true },
            <DoorBottom>{ e: 'v', toRoom: 9, inset: true },
            <DoorRight>{ e: '>', toRoom: 6 },
            <Skeleton>{
                m: '1', e: 'T', has: [
                    <Stone>{ e: 'L', color: 'yellow', credit: 4 },
                ]
            },
            <Shield>{ e: 'Z', addDp: 20 },
            <Skeleton>{ e: 'T' },
            <Vase>{ e: 'J', color: 'blue' },
            <Rat>{ e: 'G', has: [<Coin>{ credit: 5, color: 'gold' }] },
        ],
        id: 7,
        room: [`
###^#######
#.........#
#.....1Z..#
#A........#
#.......T.>
#.........#
#..J.....G#
#K........#
##v########
`]
    },
    {
        symbols: [
            <DoorBottom>{ e: 'v', toRoom: 7 },
            <Bat>{
                e: 'F', has: [
                    <Coin>{ e: 'M', credit: 4, color: 'gold' },
                    <Coin>{ e: 'M', credit: 5, color: 'gray' }
                ]
            },
            <Bat>{
                m: '1', e: 'F', has: [
                    <Coin>{ e: 'M', credit: 6, color: 'gray' },
                    <Coin>{ e: 'M', credit: 3, color: 'gold' }
                ]

            },
            <Bat>{
                m: '2', e: 'F', has: [
                    <Stone>{ e: 'L', color: 'green', credit: 4 },
                ]

            },
            <WizardStatue>{ e: 'B' },
            <Vase>{ e: 'J', color: 'blue' },
            <Rat>{
                e: 'G', has: [
                    <Coin>{ credit: 5, color: 'gold' }
                ]

            },
            <QuestRing>{
                e: 'N',
                credits: 1000,
                vitality: 1050,
                wisdom: 300,
                agility: 450
            }
        ],
        id: 8,
        room: [`
##########
#.......K#
#......B.#
#........#
#.....12.#
#........#
#....F.N.#
#........#
#........#
#........#
#..A....K#
######v###
`]
    },
    {
        symbols: [
            <DoorUp>{ e: '^', toRoom: 7 },
            <DoorLeft>{ e: '<', toRoom: 10, inset: true },
            <TreasureChest>{
                e: '&', has: [
                    <Coin>{ e: 'M', credit: 70 },
                    <MagicSpellBook>{ e: 'u', spell: 'mace-apprentice' },
                    <Elixer>{ e: 'i', addMana: 40, addHp: 100 }
                ]
            },
            <Coin>{ e: 'M', credit: 2, color: 'gold' },
            <Vase>{
                e: 'J', color: 'gold', has: [
                    <Coin>{ e: 'M', credit: 4, color: 'gold' },
                    <Stone>{ e: 'L', credit: 1, color: 'green' }
                ]
            },
            <Bat>{
                e: 'F', has: [
                    <Coin>{ e: 'M', credit: 3 }
                ]
            },
            <Bat>{
                m: '2', e: 'F', has: [
                    <Coin>{ credit: 4, e: 'M', color: 'gold' }
                ]

            },
            <Carpet>{ e: 'é', color: 'blue' }
        ],
        id: 9,
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
            <DoorUp>{
                e: '^', toRoom: 11, inset: true
            },
            <DoorRight>{ e: '>', toRoom: 9 },
            <Bat>{
                m: '1', e: 'F', has: [
                    <Coin>{ credit: 2, color: 'gold' },
                    <BottleWater>{ addHp: 10 }
                ]

            },
            <LevelStairs>{ e: 'µ', toRoom: 99, stairs: 'µ', level: 2 },
            <Bat>{
                m: '3', e: 'F', has: [
                    <Coin>{ credit: 2, e: 'M', color: 'gold' }
                ]
            },
            <Vase>{
                e: 'J', color: 'red'

            },
            <Skeleton>{
                e: 'T', triggeredBy: 'J', xp: 10, hp: 10, has: [
                    <Stone>{ e: 'L', color: 'gray', credit: 10 },
                    <BottleWater>{ e: 's', addHp: 10 }
                ]
            },
            <Rat>{
                e: 'G', hp: 10, xp: 10, has: [<Coin>{ e: 'M', credit: 1, color: 'gold' }]
            },
            <Goblin>{
                e: 'E', hp: 10, xp: 10, has: [<Coin>{ e: 'M', credit: 3, color: 'gold' }]
            },
            <Bat>{
                m: '2', e: 'F', xp: 10, hp: 10, has: [
                    <Coin>{ e: 'M', credit: 3, color: 'gold' }
                ]
            }
        ],
        id: 10,
        room: [`
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
`]
    },
    {
        symbols: [
            <DoorBottom>{ e: 'v', toRoom: 10 },
            <Vase>{
                e: 'J', color: 'red', has: [<Coin>{ e: 'M', credit: 1, color: 'gray' }]
            },
            <BeerBarrel>{
                e: '{', has: [
                    <Coin>{ e: 'M', credit: 3, color: 'gold' },
                    <Stone>{ e: 'L', credit: 4, color: 'yellow' }
                ]
            },

        ],
        id: 11,
        room: [`
###########
#.!....A..#
#..A......#
#...OOO...#
#...OOO...#
#.J.OOO...#
#.........#
#....F.{..#
#.........#
#####v#####
`]
    },
    {
        symbols: [
            <DoorUp>{ e: '^', toRoom: 6, inset: true },
            <DoorRight>{ e: '>', toRoom: 21, inset: true },
            <DoorBottom>{ e: 'v', toRoom: 13, inset: true },
            <Vase>{ e: 'J', color: 'green' },
            <TombStone>{
                e: 'V', has: [
                    <Coin>{ credit: 1, color: 'gold', e: 'M' }
                ]
            },
            <Carpet>{ e: 'é', color: 'red' },
            <CrossTombStone>{ e: 'Y' }
        ],
        id: 12,
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
#....²....#
#.........#
#......Y..#
###########
`]
    }
        ,
    {
        symbols: [
            <DoorUp>{ e: '^', toRoom: 12 },
            <DoorBottom>{ e: 'v', toRoom: 14, inset: true },
        ],
        id: 13,
        room: [`
####^###
#......#
#......#
#K.....#
####...#
####v###
`]
    },
    {
        symbols: [
            <DoorUp>{ e: '^', toRoom: 13 },
            <DoorBottom>{ e: 'v', toRoom: 20, inset: true },
            <DoorLeft>{ e: '<', toRoom: 15, inset: true },
        ],
        id: 14,
        room: [`
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
`]
    },
    {
        symbols: [
            <DoorUp>{ e: '^', toRoom: 14 },
        ],
        id: 20,
        room: [`
###^####
#......#
#......#
#......#
#K..####
########
`]
    },
    {
        symbols: [
            <DoorUp>{ e: '^', toRoom: 16, inset: true },
            <DoorLeft>{ e: '<', toRoom: 18, inset: true },
            <DoorRight>{ e: '>', toRoom: 14 },
            <DoorBottom>{ e: 'v', toRoom: 17, inset: true },
            <LevelStairs>{ e: 'µ', toRoom: 99, stairs: 'µ', level: 2 },
            <Bat>{ m: '1', e: 'F', xp: 10, hp: 10 },
            <Coin>{ e: 'M', credit: 2, color: 'gold' },
            <Stone>{ e: 'L', color: 'white', credit: 4 },
            <Vase>{
                e: 'J', color: 'green', has: [
                    <Coin>{ e: 'M', credit: 1 },
                    <BottleMilk>{ e: 'p', addHp: 20 }
                ]
            },
            <TombStone>{
                e: 'V', has: [
                    <Coin>{ e: 'M', credit: 1, color: 'gold' }
                ]
            },
            <Coin>{ m: '2', e: 'M', credit: 3, color: 'gold' },
        ],
        id: 15,
        room: [`
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
`]
    }
        ,
    {
        symbols: [
            <DoorBottom>{ e: 'v', toRoom: 15 },
        ],
        id: 16,
        room: [`
########
#......#
#..B...#
#......#
#...####
##v#####
`]
    },
    {
        symbols: [
            <DoorUp>{ e: '^', toRoom: 15 },
            <Carpet>{ e: 'é', color: 'blue' },
            <Stone>{ e: 'L', color: 'green', credit: 2 }
        ],
        id: 17,
        room: [
            `
###^###
#A....#
#.ééé.#
#Lééé.#
#.....#
#.....#
#######
`, `
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
            <DoorUp>{ e: '^', toRoom: 19, inset: true },
            <DoorRight>{ e: '>', toRoom: 15 },
            <Rat>{ e: 'G', has: [<Coin>{ e: 'M', credit: 1, color: 'gold' }] },
            <GreenWizard>{
                m: '2',
                e: '@',
                xp: 30,
                hp: 10,
                level: 1,
                has: [
                    <Boots>{ e: 'x', addDp: 10, addXp: 10 }
                ]
            },
            <GreenWizard>{
                e: '@', has: [<Coin>{ e: 'M', credit: 1, color: 'gold' }]
            },
            <TelePortal>{ e: 'X', toRoom: 23, portal: 'X' }
        ],
        id: 18,
        room:
        [`
#####^######
#K........K#
#..2....GV.#
#..........#
#..........#
#..........#
#....@.....#
#.......X..>
#..........#
#.........A#
#..........#
#..........#
#..........#
#...A......#
############
`]
    },
    {
        symbols: [
            <DoorBottom>{ e: 'v', toRoom: 18 },
            <TombStone>{
                e: 'V', has: [
                    <Coin>{ e: 'M', credit: 2, color: 'gold' }

                ]
            },
        ],
        id: 19,
        room:
        [`
########
#......#
#.A....#
#....V.#
####...#
#####v##
`]
    }
        ,
    {
        symbols: [
            <DoorUp>{ e: '^', toRoom: 22, inset: true },
            <DoorBottom>{ e: 'v', toRoom: 26, inset: true },
            <DoorLeft>{ e: '<', toRoom: 12 },
            <DoorRight>{ e: '>', toRoom: 25, inset: true },
            <Vase>{ e: 'J', color: 'blue' },
            <Bat>{
                e: 'F', has: [
                    <Coin>{ e: 'M', color: 'gold', credit: 4 },

                ]
            },
            <Coin>{ e: 'M', credit: 1, color: 'gold' }
        ],
        id: 21,
        room:
        [`
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
`]
    },
    {
        symbols: [
            <DoorUp>{ e: '^', toRoom: 23, inset: true },
            <DoorBottom>{ e: 'v', toRoom: 21 },
            <Vase>{
                e: 'J', color: 'blue', has: [
                    <Coin>{ e: 'M', credit: 1, color: 'gold' }
                ]
            },
            <Rat>{
                e: 'G', has: [
                    <Coin>{ e: 'M', credit: 1, color: 'gold' }
                ]
            },
            <TombStone>{
                e: 'V', has: [
                    <BottleMilk>{ e: 'p', addHp: 20 }
                ]
            },
            <Closet>{
                e: 'z', has: [
                    <ChickenBone>{ e: 'r', addHp: 10 }
                ]
            },
            <Bat>{
                e: 'F', has: [
                    <Stone>{ color: 'yellow', credit: 4, e: 'L' }
                ]
            },
        ],
        id: 22,
        room:
        [`
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
`]
    },
    {
        symbols: [
            <DoorUp>{ e: '^', toRoom: 24, inset: true },
            <DoorBottom>{ e: 'v', toRoom: 22 },
            <DoorRight>{ e: '>', toRoom: 32, inset: true },
            <Stone>{ e: 'L', color: 'yellow', credit: 4 },
            <BeerBarrel>{
                e: '{', has: [
                    <Coin>{ e: 'M', credit: 1, color: 'gold' }
                ]
            },
            <TelePortal>{ e: 'X', toRoom: 18, portal: 'X' }
        ],
        id: 23,
        room:
        [`
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
`]
    },
    {
        symbols: [
            <DoorBottom>{ e: 'v', toRoom: 23 },
            <Bat>{
                e: 'F', xp: 10, hp: 10, has: [
                    <Coin>{ e: 'M', credit: 1, color: 'gold' }
                ]
            },
            <Stone>{ e: 'L', color: 'green', credit: 3 }
        ],
        id: 24,
        room:
        [`
########
#......#
#......#
#.F..L.#
####...#
#####v##
`]
    },
    {
        symbols: [
            <DoorLeft>{ e: '<', toRoom: 21 },
            <Vase>{ m: '1', e: 'J', color: 'gray' },
            <Rat>{ e: 'G', has: [<Cheese>{ e: 'q', addHp: 10 }] },
            <Rat>{ m: '2', e: 'G', triggeredBy: 'I' },
            <Vase>{ e: 'J', color: 'green' },
            <RedPentagram>{ e: 'I' }
        ],
        id: 25,
        room:
        [`
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
`]
    },
    {
        symbols: [
            <DoorUp>{ e: '^', toRoom: 21 },
            <DoorBottom>{ e: 'v', toRoom: 27, inset: true },
            <Rat>{ e: 'G', has: [<Coin>{ credit: 5, color: 'gray', e: 'M' }] },
            <TombStone>{
                e: 'V', has: [
                    <Fish>{ e: ';', addHp: 15 },
                    <Mana>{ e: '§', addMana: 14 },
                    <Coin>{ e: 'M', credit: 1, color: 'gray' }
                ]
            },
        ],
        id: 26,
        room:
        [`
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
`]
    },
    {
        symbols: [
            <DoorUp>{ e: '^', toRoom: 26 },
            <DoorRight>{ e: '>', toRoom: 28, inset: true },
            <Coin>{ e: 'M', credit: 3, color: 'gold' },
            <Stone>{ m: '1', e: 'L', color: 'yellow', credit: 3 },
            <Stone>{ m: '2', e: 'L', color: 'green', credit: 4 },
        ],
        id: 27,
        room:
        [`
###^####
#......#
#.M.1..>
#..2...#
#...####
########
`]
    },
    {
        symbols: [
            <DoorUp>{ e: '^', toRoom: 29, inset: true },
            <DoorLeft>{ e: '<', toRoom: 27 },
            <Coin>{ e: 'M', credit: 2, color: 'gold' },
            <Bat>{ e: 'F', has: [<Coin>{ e: 'M', credit: 1, color: 'gold' }] },
            <Vase>{ e: 'J', has: [<Coin>{ e: 'M', credit: 3, color: 'gold' }], color: 'red' },
            <Bat>{ m: '1', e: 'F', has: [<Coin>{ e: 'M', credit: 4, color: 'gray' }] },
            <Bat>{ m: '2', e: 'F', xp: 10, hp: 3, level: 1, has: [<Pants>{ e: 'ç', addHp: 10 }] },
            <TelePortal>{ e: 'X', toRoom: 1, portal: 'X' },
            <Table>{ e: '*', has: [] }
        ],
        id: 28,
        room:
        [`
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
`]
    },
    {
        symbols: [
            <DoorUp>{ e: '^', toRoom: 30, inset: true },
            <DoorBottom>{ e: 'v', toRoom: 28 },
            <Vase>{ e: 'J', color: 'gold' },
            <Table>{ e: '*', has: [<Coin>{ e: 'M', credit: 3 }] },
            <Stone>{ e: 'L', color: 'white', credit: 4 },
            <Coin>{ e: 'M', credit: 1, color: 'gold' },
            <Closet>{ e: 'z', has: [<Coin>{ e: 'M', credit: 5, color: 'gold' }] },
            <Coffin>{ e: 'H', has: [<Coin>{ e: 'M', credit: 1, color: 'gray' }] },
            <Rat>{ m: '2', e: 'G', xp: 10, hp: 10 },
            <Bat>{ m: '1', e: 'F', xp: 10, hp: 10 },
        ],
        id: 29,
        room:
        [`
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
`]
    },
    {
        symbols: [
            <DoorUp>{ e: '^', toRoom: 31, inset: true },
            <DoorBottom>{ e: 'v', toRoom: 29 },
        ],
        id: 30,
        room:
        [`
##^#####
#......#
#...@..#
#......#
#...####
##v#####
`]
    },
    {
        symbols: [
            <DoorBottom>{ e: 'v', toRoom: 30 },
            <Coin>{ e: 'M', credit: 15, color: 'gold' },
            <Vase>{
                e: 'J', color: 'green', has: [
                    <Coin>{ e: 'M', color: 'gold', credit: 5 }
                ]
            },
            <Rat>{
                e: 'G', has: [
                    <Coin>{ e: 'M', credit: 4, color: 'gold' }
                ]
            }
        ],
        id: 31,
        room:
        [`
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
`]
    },
    {
        symbols: [
            <DoorBottom>{ e: 'v', toRoom: 33, inset: true },
            <DoorLeft>{ e: '<', toRoom: 23 },
            <DoorUp>{ e: '^', toRoom: 34, inset: true },
            <Rat>{
                m: '1', e: 'G', has: [
                    <Fish>{ e: ';', addHp: 25 }
                ]
            },
            <Bat>{
                m: '2', e: 'F', xp: 10, hp: 10, has: [
                    <Coin>{ e: 'M', credit: 2, color: 'gold' }
                ]
            },
            <TwirlStone>{
                e: 'P', has: [
                    <BottleMilk>{ e: 'p', addHp: 25 }
                ]
            },
            <Stone>{ m: '3', e: 'L', color: 'yellow', credit: 4 },
            <Stone>{ m: '4', e: 'L', color: 'white', credit: 3 },
            <Bat>{
                m: '5', e: 'F', xp: 10, hp: 10, has: [
                    <Coin>{ e: 'M', credit: 4, color: 'gray' }
                ]
            },
            <Stone>{ m: '6', e: 'L', color: 'yellow', credit: 2 },
            <Vase>{
                m: '7', e: 'J', color: 'blue', has: [
                    <MagicSpellBook>{ e: 'u', spell: 'earthquake' },
                    <Mace>{ e: 't', addHp: 100 }
                ]

            },
            <Rat>{ m: '8', e: 'G', xp: 10, hp: 10 },
            <Rat>{
                m: '9', e: 'G', xp: 10, hp: 10, has: [
                    <Coin>{ e: 'M', color: 'gold', credit: 1 },
                    <Coin>{ e: 'M', color: 'gray', credit: 1 }
                ]
            },
            <Bat>{ m: 'a', e: 'F', xp: 10, hp: 10 },
            <Stone>{ m: 'b', e: 'L', color: 'yellow', credit: 4 },
            <Bat>{
                m: 'c', e: 'F', xp: 10, hp: 10, has: [
                    <Fish>{ e: ';', addHp: 25, poisen: { add: 10, release: 2 } },
                    <Coin>{ e: 'M', credit: 2, color: 'gold' }
                ]
            },

        ],
        id: 32,
        room:
        [`
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
`]
    },
    {
        symbols: [
            <DoorUp>{ e: '^', toRoom: 32 },
            <Stone>{ m: '1', e: 'L', color: 'green', credit: 4 },
            <Stone>{ m: '2', e: 'L', color: 'white', credit: 7 },
            <TreasureChest>{
                m: '3', e: '&', has: [
                    <Mace>{ e: 't', addXp: 100 },
                    <Coin>{ e: 'M', credit: 4, color: 'gold' },
                    <Stone>{ e: 'L', credit: 3, color: 'gray' }
                ]
            },
            <TreasureChest>{
                m: '4',
                e: '&',
                has: [
                    <MagicPotion>{ e: 'l', addHp: 60 }
                ]
            },
            <Rat>{
                e: 'G', has: [
                    <Coin>{ e: 'M', credit: 5, color: 'gold' }
                ]
            },
            <Vase>{ e: 'J', color: 'green' },
            <Stone>{ m: '6', e: 'L', color: 'yellow', credit: 4 },
            <Carpet>{ e: 'é', color: 'red' }
        ],
        id: 33,
        room:
        [`
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
`]
    },
    {
        symbols: [
            <DoorBottom>{ e: 'v', toRoom: 32 },
            <Stone>{ e: 'L', color: 'white', credit: 4 },
            <GreenWizard>{
                e: '@', xp: 10, hp: 40, level: 1, has: [
                    <Pants>{ e: 'ç', addDp: 15 }
                ]
            }
        ],
        id: 34,
        room:
        [`
###########
#K........#
#.........#
#.........#
#..@......#
#.L....S..#
#...A.....#
#####v#####
`]
    }
    ]
};

export interface DungeonGameModel {
    [index: number]: {
        width: number;
        height: number;
        rooms: Map<number, $Room>;
    };
}

export const gGame: DungeonGameModel = {};

export function compileDungeon(): DungeonGameModel {

    // for each level
    for (let level in mockDungeon) {
        let rooms = mockDungeon[level].map((room) => parseLayout(room));

        let roomsDone = new Map<number, $Room>();
        let roomsToDo = new Map<number, $Room>();

        rooms.forEach((r) => roomsToDo.set(r.pk, r));


        function formatRooms(room: $Room) {

            if (roomsDone.has(room.pk)) {
                return;
            }
            //let _doors = <$ItemDoor[]>getNameSpace(room, 'doors');
            let door = room.doors.find((d) => roomsDone.has(d.to));
            
            if (!door) {
                throw new Error(`room ${room.pk} cannot be formatted, not connected to a formatted reference`);
            }


            let fr = <$Room>roomsDone.get(door.to);

            let myId = room.pk;
            let toId = fr.pk;
            let counterDoor = fr.doors.find((d) => d.to === myId);

            if (!counterDoor) {
                throw new Error(`room ${myId} has no counterpart in room ${toId}`);
            }

            if (counterDoor.p.x > 0 && counterDoor.p.y === 0) {
                room.top = fr.top - room.height;
                room.left = fr.left + counterDoor.p.x - door.p.x;
            }

            if (counterDoor.p.x > 0 && counterDoor.p.y === (fr.height - 1)) {
                room.top = fr.top + fr.height;
                room.left = fr.left + counterDoor.p.x - door.p.x;
            }

            if (counterDoor.p.x > 0 && counterDoor.p.y > 0 && counterDoor.p.y < (fr.height - 1)) {
                room.left = fr.left + fr.width;
                room.top = fr.top + counterDoor.p.y - door.p.y;
            }

            if (counterDoor.p.x === 0) {
                room.left = fr.left - room.width;
                room.top = fr.top + counterDoor.p.y - door.p.y;
            }

            roomsDone.set(room.pk, room);
            roomsToDo.delete(room.pk);

            for (let d of room.doors) {
                let r = roomsToDo.get(d.to);
                r && formatRooms(r);
            }
        }

        //
        // let gWidth = 0;
        //

        let initRoom = <$Room>rooms.shift();
        roomsToDo.delete(initRoom.pk);
        roomsDone.set(initRoom.pk, initRoom);

        initRoom.doors.forEach((d) => {
            let r = roomsToDo.get(d.to);
            if (r) {
                formatRooms(r);
            }
        });


        let totalWidth = 0;
        let totalHeight = 0;

        let minTop = 0;
        let minLeft = 0;

        roomsDone.forEach((v: $Room) => {
            minTop = Math.min(v.top, minTop);
            minLeft = Math.min(v.left, minLeft);
        });

        roomsDone.forEach((v: $Room) => {
            v.top -= minTop;
            v.left -= minLeft;
        });

        roomsDone.forEach((v: $Room) => {
            totalWidth = Math.max(v.left + v.width, totalWidth);
            totalHeight = Math.max(v.top + v.height, totalHeight);
        });

        gGame[level] = {
            width: totalWidth,
            height: totalHeight,
            rooms: roomsDone
        };
    }
    return gGame;
}
