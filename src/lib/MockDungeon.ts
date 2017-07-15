import {
    Layout,
    //    $Room 
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
    BootsDamaged,
    Bat,
    Rat,
    Boss,
    Stone,
    Vase,
    Coffin,
    QuestRing,
    Acid,
    MagicSpellBook,
    MaceCracked,
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
    BootsRed,
    ChickenBone,
    Closet,
    RedPentagram,
    Mana,
    Fish,
    Table,
    PantsRed,
    TwirlStone,
    PantsGreen,
    Mace
} from './Symbols';

export const mockDungeon: Layout[] = [
    {
        symbols: [
            <SecretPlate>{
                e: 'C', has: [
                    <Cheese>{ e: 'q', hp: 15 },
                    <Coin>{ e: 'M', color: 'gray', credit: 1 }
                ]
            },
            <DoorRight>{ e: '>', toRoom: 2 },
            <WizardStatue>{
                e: 'B',
                initBroken: false,
                has: [
                    <Coin>{ e: 'M', credit: 4, color: 'gold' }
                ]
            }, //statue wizard
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
#.......#
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
                e: 'J', initBroken: false, color: 'gold',
                has: [<Stone>{ e: 'L', color: 'white', credit: 2 }]
            },
            <DoorRight>{ e: '>', toRoom: 3 },
            <DoorLeft>{ e: '<', toRoom: 1, inset: true },
            <Coffin>{
                m: '5', e: 'H',
                has: [<Coin>{ e: 'M', credit: 3, color: 'gray' }],
                initOpen: false
            },
            <Coffin>{
                m: '6', e: 'H',
                has: [<Coin>{ credit: 3, color: 'gold', e: 'M' }],
                initOpen: false
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
            <Stone>{ e: 'L', color: 'gold', credit: 1 },
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
`]   },
    {
        symbols: [
            <Acid>{ e: '$' },
            <DoorUp>{ e: '^', toRoom: 3, inset: true },
            <DoorBottom>{ e: 'v', toRoom: 6 },
            <Boss>{
                e: '%', has: [
                    <BootsDamaged>{ addDp: 10 },
                    <MagicSpellBook>{ spell: 'defense' },
                    <MaceCracked>{ addHp: 40 },
                ] // 'damaged-boots,magic-spell:defense,cracked-mace'
            }
        ],
        id: 5,
        room: [`
####^######
##........#
#.!.....!.#
#.$$......#
#.$$......#
#.....$$..#
#....%$$..#
#..$$.....#
#..$$.....#
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
            <Stone>{ e: 'L', color: 'gold', credit: 5 },
            <Vase>{ e: 'J', color: 'green', initBroken: false },
            <Bat>{
                e: 'F', has: [<Coin>{ credit: 5, e: 'M', color: 'gold' }] //'gold:5' 
            },
            <Rat>{ e: 'G', has: [<Coin>{ credit: 4, e: 'M', color: 'gold' }] },
            <Vase>{ m: '1', e: 'J', color: 'red' },
            <Rat>{
                m: '2', e: 'G', has: [
                    <Stone>{ credit: 1, color: 'gold' },
                    <Coin>{ credit: 2, color: 'gray' }
                ]
            }
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
#..SA......#
#.S........#
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
                    <Stone>{ color: 'gold', credit: 4 },
                ]
            },
            <Skeleton>{ e: 'T' },
            <Vase>{ e: 'J', color: 'cyan' },
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
                ] // 'gold:4,gold:5'
            },
            <Bat>{
                m: '1', e: 'F', has: [
                    <Coin>{ e: 'M', credit: 6, color: 'gray' },
                    <Coin>{ e: 'M', credit: 3, color: 'gold' }
                ]
                // 'gold:6,gold:3' 
            },
            <Bat>{
                m: '2', e: 'F', has: [
                    <Stone>{ color: 'green', credit: 4 },
                ]
                // 'stone:green' 
            },
            <WizardStatue>{ e: 'B' },
            <Vase>{ e: 'J', color: 'cyan' },
            <Rat>{
                e: 'G', has: [
                    <Coin>{ credit: 5, color: 'gold' }
                ]
                // 'gold:5' 
            },
            <QuestRing>{
                e: 'N',
                credits: 1000,
                vitality: 1050,
                wisdom: 300,
                agility: 450
            }//N find crown of souls
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
                ] //'elixer,spellbook,gold:70' 
            },
            <Coin>{ e: 'M', credit: 2, color: 'gold' },
            <Vase>{
                e: 'J', color: 'gold', has: [
                    <Coin>{ e: 'M', credit: 4, color: 'gold' },
                    <Stone>{ e: 'L', credit: 1, color: 'green' }
                ] //'gold:4,stone:green'
            },
            <Bat>{
                e: 'F', has: [
                    <Coin>{ e: 'M', credit: 3 }
                ] //'gold:3' 
            },
            <Bat>{
                m: '2', e: 'F', has: [
                    <Coin>{ credit: 4, e: 'M', color: 'gold' }
                ]
                // 'gold:4'
            }
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
                e: '^', toRoom: 11, inset: true //'inset:11' 
            },
            <DoorRight>{ e: '>', toRoom: 9 },
            <Bat>{
                m: '1', e: 'F', has: [
                    <Coin>{ credit: 2, color: 'gold' },
                    <BottleWater>{ addHp: 10 }
                ]
                // 'gold:2,bottle:water' 
            },
            <LevelStairs>{ e: 'µ', toRoom: 99, stairs: 'µ', level: 2 },
            <Bat>{
                m: '3', e: 'F', has: [
                    <Coin>{ credit: 2, e: 'M', color: 'gold' }
                ] // 'gold:2'
            },
            <Vase>{
                e: 'J', initBroken: false, color: 'red'
                // 'trap-trigger:1,T'
            },
            <Skeleton>{
                e: 'T', triggeredBy: 'J', xp: 10, hp: 10, has: [
                    <Stone>{ e: 'L', color: 'gray', credit: 10 },
                    <BottleWater>{ e: 's', addHp: 10 }
                ]
                //'stone:grey,bottle:hp'
            },
            <Rat>{
                e: 'G', hp: 10, xp: 10, has: [<Coin>{ e: 'M', credit: 1, color: 'gold' }]// 'gold:1' 
            },
            <Goblin>{
                e: 'E', hp: 10, xp: 10, has: [<Coin>{ e: 'M', credit: 3, color: 'gold' }] // 'gold:3'
            },
            <Bat>{
                m: '2', e: 'F', xp: 10, hp: 10, has: [
                    <Coin>{ e: 'M', credit: 3, color: 'gold' }
                ] // 'gold:3'
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
                e: 'J', initBroken: false, color: 'red', has: [] // 'gold:1' 
            },
            <BeerBarrel>{
                initBroken: false, e: '{', has: [
                    <Coin>{ e: 'M', credit: 3, color: 'gold' },
                    <Stone>{ e: 'L', credit: 4, color: 'gold' }
                ]
            }, // 'gold:3,stone:gold' },
           
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
                ] // 'gold:1' 
            },
            <Carpet>{ e: 'é', type: 'blue' }
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
#.........#
#.........#
#.........#
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
        room:[ `
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
                ] // 'coin:1,bottle:milk:1' 
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
            <Carpet>{ e: 'é', type: 'blue' },
            <Stone>{ e: 'L', color: 'green', credit: 2 }
        ],
        id: 17,
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
            <DoorUp>{ e: '^', toRoom: 19, inset: true },
            <DoorRight>{ e: '>', toRoom: 15 },
            <Rat>{ e: 'G', has: [<Coin>{ e: 'M', credit: 1, color: 'gold' }] },
            <GreenWizard>{
                m: '2', e: '@', has: [
                    <BootsRed>{ e: 'à', addDp: 10, addXp: 10 }
                ] // 'boots:red' 
            },
            <GreenWizard>{
                e: '@', has: [<Coin>{ e: 'M', credit: 1, color: 'gold' }] //'coin:1'
            },
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
#.....Y....#
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

                ] /*'gold:2'*/
            },
        ],
        id: 19,
        room:
       [ `
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

                ] /*'gold:4'*/
            },
            <Coin>{ e: 'M', credit: 1, color: 'gold' }
        ],
        id: 21,
        room:
       [ `
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
                ] /*'gold:1'*/
            },
            <Rat>{
                e: 'G', has: [
                    <Coin>{ e: 'M', credit: 1, color: 'gold' }
                ] /*'gold:1'*/
            },
            <TombStone>{
                e: 'V', initBroken: false, has: [
                    <BottleMilk>{ e: 'p', addHp: 20 }
                ] /* 'milk'*/
            },
            <Closet>{
                e: 'z', initOpen: false, has: [
                    <ChickenBone>{ e: 'r', addHp: 10 }
                ] /*'chicken-bone:1'*/
            },
            <Bat>{
                e: 'F', has: [
                    <Stone>{ color: 'gold', credit: 4, e: 'L' }
                ] /*'stone:1:gold'*/
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
            <DoorUp>{ e: '^', toRoom: 24, inset: true /*door: 'inset:24'*/ },
            <DoorBottom>{ e: 'v', toRoom: 22 },
            <DoorRight>{ e: '>', toRoom: 32, inset: true },
            <Stone>{ e: 'L', color: 'gold', credit: 4 },
            <BeerBarrel>{
                e: '{', has: [
                    <Coin>{ e: 'M', credit: 1, color: 'gold' }
                ] /*'gold:1'*/
            },
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
                ] /*'gold:2'*/
            },
            <Stone>{ e: 'L', color: 'green', credit: 3 }
        ],
        id: 24,
        room:
       [ `
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
            <Rat>{ e: 'G', has: [<Cheese>{ e: 'q', addHp: 10 }] /*'cheese'*/ },
            <Rat>{ m: '2', e: 'G', triggeredBy: 'I' },
            <Vase>{ e: 'J', color: 'green' },
            <RedPentagram>{ e: 'I', initOpen: false }
        ],
        id: 25,
        room:
       [ `
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
            <Rat>{ e: 'G', has: [<Coin>{ credit: 5, color: 'grey', e: 'M' }] /*'gold:5'*/ },
            <TombStone>{
                e: 'V', initBroken: false, has: [
                    <Fish>{ e: ';', addHp: 15 },
                    <Mana>{ e: '§', addMana: 14 },
                    <Coin>{ e: 'M', credit: 1, color: 'grey' }
                ] /*'fish,mana,gold:1'*/
            },
        ],
        id: 26,
        room:
       [ `
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
            <Stone>{ m: '1', e: 'L', color: 'gold', credit: 3 },
            <Stone>{ m: '2', e: 'L', color: 'green', credit: 4 },
        ],
        id: 27,
        room:
       [ `
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
            <Coin>{ e: 'M', credit: 2, color: 'gold' } /*'gold:2'*/,
            <Bat>{ e: 'F', has: [<Coin>{ e: 'M', credit: 1, color: 'gold' }] /*'gold:1'*/ },
            <Vase>{ e: 'J', has: [<Coin>{ e: 'M', credit: 3, color: 'gold' }], color: 'red' },
            <Bat>{ m: '1', e: 'F', has: [<Coin>{ e: 'M', credit: 4, color: 'gray' }] /*'gold:4'*/ },
            <Bat>{ m: '2', e: 'F', has: [<PantsRed>{ e: '~', addHp: 10 }] /*'red-pants'*/ },
            <TelePortal>{ e: 'X', toRoom: 1, portal: 'X' },
            <Table>{ e: '*', initOpen: false, context: 'with-paper' },
        ],
        id: 28,
        room:
       [ `
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
            <Table>{ e: '*', has: [<Coin>{ e: 'M', credit: 3 }] /*'gold:3'*/ },
            <Stone>{ e: 'L', color: 'white', credit: 4 },
            <Coin>{ e: 'M', credit: 1, color: 'gold' } /*'gold:1'*/,
            <Closet>{ e: 'z', has: [<Coin>{ e: 'M', credit: 5, color: 'gold' }] /* 'gold:5'*/ },
            <Coffin>{ e: 'H', has: [<Coin>{ e: 'M', credit: 1, color: 'gray' }] /*'gold:1'*/ },
            <Rat>{ m: '2', e: 'G', xp: 10, hp: 10 },
            <Bat>{ m: '1', e: 'F', xp: 10, hp: 10 },
        ],
        id: 29,
        room:
       [ `
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
            <DoorUp>{ e: '^', toRoom: 31, inset: true /*'inset:31'*/ },
            <DoorBottom>{ e: 'v', toRoom: 29 },
        ],
        id: 30,
        room:
       [ `
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
                ] /*'gold:6'*/
            },
            <Rat>{
                e: 'G', has: [
                    <Coin>{ e: 'M', credit: 4, color: 'gold' }
                ] /*'gold:4'*/
            }
        ],
        id: 31,
        room:
       [ `
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
                ] /*'fish'*/
            },
            <Bat>{
                m: '2', e: 'F', xp: 10, hp: 10, has: [
                    <Coin>{ e: 'M', credit: 2, color: 'gold' }
                ] /* 'gold:2'*/
            },
            <TwirlStone>{
                e: 'P', initBroken: false, has: [
                    <BottleMilk>{ e: 'p', addHp: 25 }
                ] /*'milk,gold:1'*/
            },
            <Stone>{ m: '3', e: 'L', color: 'gold', credit: 4 },
            <Stone>{ m: '4', e: 'L', color: 'white', credit: 3 },
            <Bat>{
                m: '5', e: 'F', xp: 10, hp: 10, has: [
                    <Coin>{ e: 'M', credit: 4, color: 'gray' }
                ] /*'gold:4'*/
            },
            <Stone>{ m: '6', e: 'L', color: 'gold', credit: 2 },
            <Vase>{
                m: '7', e: 'J', initBroken: false, color: 'blue', has: [
                    <MagicSpellBook>{ e: 'u', spell: 'earthquake' },
                    <Mace>{ e: 't', addHp: 100 }
                ]
                /* 'book-spell:earthquake,mace'*/
            },
            <Rat>{ m: '8', e: 'G', xp: 10, hp: 10 },
            <Rat>{
                m: '9', e: 'G', xp: 10, hp: 10, has: [
                    <Coin>{ e: 'M', color: 'gold', credit: 1 },
                    <Coin>{ e: 'M', color: 'silver', credit: 1 }
                ] /* 'gold:1,silver:1'*/
            },
            <Bat>{ m: 'a', e: 'F', xp: 10, hp: 10 },
            <Stone>{ m: 'b', e: 'L', color: 'gold', credit: 4 },
            <Bat>{
                m: 'c', e: 'F', xp: 10, hp: 10, has: [
                    <Fish>{ e: ';', addHp: 25, poisen: { add: 10, release: 2 } },
                    <Coin>{ e: 'M', credit: 2, color: 'gold' }
                ] /* 'fish:gold:2'*/
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
            /*  { e: '^', door: '32' },
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
  */
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
                e: '@', has: [
                    <PantsGreen>{ e: 'ç', addDp: 15 }
                ] /*'pants-green'*/
            }
        ],
        id: 34,
        room:
       [ `
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
];


export function compileDungeon(): string {


    for (let layout of mockDungeon) {
        parseLayout(layout);
    }

    /*  let finalRooms = new Map<number, Room>();
      let formattingTodo = new Map<number, Room>();
  
      let rooms = mockDungeon.map((roomData) => {
          return new Room(roomData);
      });
  
      return 'meh';
  
      rooms.forEach((r) => formattingTodo.set(r.id, r));
  
  
      function formatRooms(room: $Room) {
  
          let RoomsTodo: number[] = [];
          let RoomsDone: number = [];
  
          if (finalRooms.has(room.id)) {
              return;
          }
  
          let doors = room.doors;
          doors.forEach((d) => {
              if (finalRooms.has(d.to)) {
                  RoomsDone.push(d);
              }
              else {
                  RoomsTodo.push(d);
              }
          });
  
          if (!RoomsDone.length) {
              throw new Error(`room ${room.id} cannot be formatted, not connected to a reference`);
          }
  
  
          let fr = <Room>finalRooms.get(RoomsDone[0].to);
          let door = RoomsDone[0];
          let myId = room.id;
          let toId = fr.id;
          let counterDoor = fr.doors.filter((d) => d.to === myId)[0];
  
          if (!counterDoor) {
              throw new Error(`room ${myId} has no counterpart in room ${toId}`);
          }
  
          if (counterDoor.p.x > 0 && counterDoor.p.y === 0) {
              room.t = fr.t - room.h;
              room.l = fr.l + counterDoor.p.x - door.p.x;
          }
  
          if (counterDoor.p.x > 0 && counterDoor.p.y === (fr.h - 1)) {
              room.t = fr.t + fr.h;
              room.l = fr.l + counterDoor.p.x - door.p.x;
          }
  
          if (counterDoor.p.x > 0 && counterDoor.p.y > 0 && counterDoor.p.y < (fr.h - 1)) {
              room.l = fr.l + fr.w;
              room.t = fr.t + counterDoor.p.y - door.p.y;
          }
  
          if (counterDoor.p.x === 0) {
              room.l = fr.l - room.w;
              room.t = fr.t + counterDoor.p.y - door.p.y;
          }
  
          finalRooms.set(room.id, room);
          formattingTodo.delete(room.id);
  
          for (let d of RoomsTodo) {
              let r = formattingTodo.get(d.to);
              if (!r) {
                  throw new Error(`Room ${d.to} is not found in todo`);
              }
              formattingTodo.delete(r.id);
              formatRooms(r);
          }
      }
  
      //
      // let gWidth = 0;
      //
  
      let initRoom = <Room>rooms.shift();
  
      formattingTodo.delete(initRoom.id);
  
      finalRooms.set(initRoom.id, initRoom);
  
      initRoom.doors.forEach((d) => {
          let r = formattingTodo.get(d.to);
          if (r) {
              formatRooms(r);
          }
      });
  
      console.log(`${JSON.stringify({ nrDone: finalRooms.size, nrTodo: formattingTodo.size })}`);
  
  
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
      */
    return '';

}
