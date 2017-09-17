import { ILayout, Room } from '~items';

import { parseLayout } from '~utils';

import {
  IAcid,
  IBat,
  IBearTrap,
  IBeerBarrel,
  IBoots,
  IBoss,
  IBottleMilk,
  IBottleWater,
  ICarpet,
  ICheese,
  IChickenBone,
  ICloset,
  ICoffin,
  ICoin,
  ICrossTombStone,
  IDoorBottom,
  IDoorLeft,
  IDoorRight,
  IDoorUp,
  IElixer,
  IFish,
  IGoblin,
  IGreenWizard,
  ILevelStairs,
  IMace,
  IMagicPotion,
  IMagicSpellBook,
  IMana,
  IPants,
  IQuestRing,
  IRat,
  IRedPentagram,
  ISecretPlate,
  IShield,
  ISkeleton,
  IStone,
  ITable,
  ITelePortal,
  ITombStone,
  ITreasureChest,
  ITwirlStone,
  IVase,
  IWizardStatue
} from '~symbols';

export interface IDungeonData {
  [index: number]: ILayout[];
}

// tslint:disable:no-object-literal-type-assertion
// tslint:disable:object-literal-sort-keys
export const mockDungeon: IDungeonData = {
  0: [
    {
      symbols: [
        <IChickenBone> { e: 'r', addHp: 12 },
        <ICheese> { e: 'q', addHp: 5 },
        <ISecretPlate> {
          e: 'C',
          has: [
            <ICheese> { e: 'q', addHp: 15, poisen: { add: 7, release: 1 } },
            <ICoin> { e: 'M', color: 'gray', credit: 1 }
          ]
        },
        <IDoorRight> { e: '>', toRoom: 2 },
        <IWizardStatue> {
          e: 'B',
          has: [<ICoin> { e: 'M', credit: 4, color: 'gold' }]
        },
        <IGoblin> {
          e: 'E',
          hp: 10,
          xp: 10,
          has: [<ICoin> { e: 'M', credit: 3, color: 'gold' }]
        },
        <ITelePortal> { e: 'X', toRoom: 28, portal: 'X' }
      ],
      id: 1,
      room: [
        `
#########
#....q..#
#..A..A.#
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
#..r....#
#.......#
#.......#
#...l...#
#########
`
      ]
    },
    {
      symbols: [
        <IRat> { m: '1', e: 'G', xp: 10, hp: 10 },
        <IBat> {
          e: 'F',
          has: [<ICoin> { e: 'M', credit: 3, color: 'gold' }],
          hp: 10,
          xp: 3
        },
        <IBat> {
          m: '3',
          e: 'F',
          hp: 10,
          xp: 3,
          level: 1,
          has: [<ICoin> { e: 'M', color: 'gold', credit: 4 }]
        },
        <IBat> { m: '4', e: 'F', xp: 10, hp: 10 },
        <IBat> {
          m: '2',
          e: 'F',
          xp: 10,
          hp: 10,
          has: [<IStone> { e: 'L', color: 'gray', credit: 1 }]
        },
        <IVase> {
          e: 'J',
          color: 'gold',
          has: [<IStone> { e: 'L', color: 'white', credit: 2 }]
        },
        <IDoorRight> { e: '>', toRoom: 3 },
        <IDoorLeft> { e: '<', toRoom: 1, inset: true },
        <ICoffin> {
          m: '5',
          e: 'H',
          has: [<ICoin> { e: 'M', credit: 3, color: 'gray' }]
        },
        <ICoffin> {
          m: '6',
          e: 'H',
          has: [<ICoin> { credit: 3, color: 'gold', e: 'M' }]
        }
      ],
      id: 2,
      room: [
        `
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
      ]
    },
    {
      symbols: [
        <IStone> { e: 'L', color: 'yellow', credit: 1 },
        <IBat> {
          e: 'F',
          has: [<ICoin> { e: 'M', color: 'gold', credit: 4 }]
        },
        <IDoorBottom> { e: 'v', toRoom: 3 }
      ],
      id: 4,
      room: [
        `
########
#......#
#......#
#.L..F.#
####...#
#####v##
`
      ]
    },
    {
      symbols: [
        <ICoin> { m: '1', e: 'M', credit: 2, color: 'gold' },
        <ICoin> { e: 'M', credit: 3, color: 'gold' },
        <IQuestRing> {
          e: 'N',
          credits: 2000,
          vitality: 1030,
          wisdom: 1015,
          agility: 1200
        },
        <IDoorLeft> { e: '<', toRoom: 2, inset: true },
        <IDoorUp> { e: '^', toRoom: 4, inset: true },
        <IDoorBottom> { e: 'v', toRoom: 5 }
      ],
      id: 3,
      room: [
        `
######^######
###......####
<.........M.#
#....###....#
#....#.#....#
#...1###....#
###........##
###N.......##
########v####
`
      ]
    },
    {
      symbols: [
        <IAcid> { m: '1', e: '$' },
        <IAcid> { m: '2', e: '$' },
        <IAcid> { m: '3', e: '$' },
        <IDoorUp> { e: '^', toRoom: 3, inset: true },
        <IDoorBottom> { e: 'v', toRoom: 6 },
        <IBoss> {
          hp: 40,
          xp: 100,
          level: 1,
          e: '%',
          has: [
            <IBoots> { addDp: 10 },
            <IMagicSpellBook> { spell: 'defense' },
            <IMace> { addHp: 40 }
          ]
        }
      ],
      id: 5,
      room: [
        `
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
`
      ]
    },
    {
      symbols: [
        <IDoorUp> { e: '^', toRoom: 5, inset: true },
        <IDoorBottom> { e: 'v', toRoom: 12 },
        <IDoorLeft> { e: '<', toRoom: 7, inset: true },
        <IStone> { e: 'L', color: 'yellow', credit: 5 },
        <IVase> { e: 'J', color: 'green' },
        <IBat> {
          e: 'F',
          has: [<ICoin> { credit: 5, e: 'M', color: 'gold' }]
        },
        <IRat> { e: 'G', has: [<ICoin> { credit: 4, e: 'M', color: 'gold' }] },
        <IVase> { m: '1', e: 'J', color: 'red' },
        <IRat> {
          m: '2',
          e: 'G',
          has: [
            <IStone> { e: 'L', credit: 1, color: 'yellow' },
            <ICoin> { credit: 2, color: 'gray' }
          ]
        },
        <IBearTrap> { m: '4', e: 'S', delHp: 10 },
        <IBearTrap> { m: '5', e: 'S', delHp: 15 }
      ],
      id: 6,
      room: [
        `
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
`
      ]
    },
    {
      symbols: [
        <IDoorUp> { e: '^', toRoom: 8, inset: true },
        <IDoorBottom> { e: 'v', toRoom: 9, inset: true },
        <IDoorRight> { e: '>', toRoom: 6 },
        <ISkeleton> {
          m: '1',
          e: 'T',
          has: [<IStone> { e: 'L', color: 'yellow', credit: 4 }]
        },
        <IShield> { e: 'Z', addDp: 20 },
        <ISkeleton> { e: 'T' },
        <IVase> { e: 'J', color: 'blue' },
        <IRat> { e: 'G', has: [<ICoin> { credit: 5, color: 'gold' }] }
      ],
      id: 7,
      room: [
        `
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
      ]
    },
    {
      symbols: [
        <IDoorBottom> { e: 'v', toRoom: 7 },
        <IBat> {
          e: 'F',
          has: [
            <ICoin> { e: 'M', credit: 4, color: 'gold' },
            <ICoin> { e: 'M', credit: 5, color: 'gray' }
          ]
        },
        <IBat> {
          m: '1',
          e: 'F',
          has: [
            <ICoin> { e: 'M', credit: 6, color: 'gray' },
            <ICoin> { e: 'M', credit: 3, color: 'gold' }
          ]
        },
        <IBat> {
          m: '2',
          e: 'F',
          has: [<IStone> { e: 'L', color: 'green', credit: 4 }]
        },
        <IWizardStatue> { e: 'B' },
        <IVase> { e: 'J', color: 'blue' },
        <IRat> {
          e: 'G',
          has: [<ICoin> { credit: 5, color: 'gold' }]
        },
        <IQuestRing> {
          e: 'N',
          credits: 1000,
          vitality: 1050,
          wisdom: 300,
          agility: 450
        }
      ],
      id: 8,
      room: [
        `
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
`
      ]
    },
    {
      symbols: [
        <IDoorUp> { e: '^', toRoom: 7 },
        <IDoorLeft> { e: '<', toRoom: 10, inset: true },
        <ITreasureChest> {
          e: '&',
          has: [
            <ICoin> { e: 'M', credit: 70 },
            <IMagicSpellBook> { e: 'u', spell: 'mace-apprentice' },
            <IElixer> { e: 'i', addMana: 40, addHp: 100 }
          ]
        },
        <ICoin> { e: 'M', credit: 2, color: 'gold' },
        <IVase> {
          e: 'J',
          color: 'gold',
          has: [
            <ICoin> { e: 'M', credit: 4, color: 'gold' },
            <IStone> { e: 'L', credit: 1, color: 'green' }
          ]
        },
        <IBat> {
          e: 'F',
          has: [<ICoin> { e: 'M', credit: 3 }]
        },
        <IBat> {
          m: '2',
          e: 'F',
          has: [<ICoin> { credit: 4, e: 'M', color: 'gold' }]
        },
        <ICarpet> { e: 'é', color: 'blue' }
      ],
      id: 9,
      room: [
        `
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
`,
        `
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
`
      ]
    },
    {
      symbols: [
        <IDoorUp> {
          e: '^',
          toRoom: 11,
          inset: true
        },
        <IDoorRight> { e: '>', toRoom: 9 },
        <IBat> {
          m: '1',
          e: 'F',
          has: [<ICoin> { credit: 2, color: 'gold' }, <IBottleWater> { addHp: 10 }]
        },
        <ILevelStairs> { e: 'µ', toRoom: 99, stairs: 'µ', level: 2 },
        <IBat> {
          m: '3',
          e: 'F',
          has: [<ICoin> { credit: 2, e: 'M', color: 'gold' }]
        },
        <IVase> {
          e: 'J',
          color: 'red'
        },
        <ISkeleton> {
          e: 'T',
          triggeredBy: 'J',
          xp: 10,
          hp: 10,
          has: [
            <IStone> { e: 'L', color: 'gray', credit: 10 },
            <IBottleWater> { e: 's', addHp: 10 }
          ]
        },
        <IRat> {
          e: 'G',
          hp: 10,
          xp: 10,
          has: [<ICoin> { e: 'M', credit: 1, color: 'gold' }]
        },
        <IGoblin> {
          e: 'E',
          hp: 10,
          xp: 10,
          has: [<ICoin> { e: 'M', credit: 3, color: 'gold' }]
        },
        <IBat> {
          m: '2',
          e: 'F',
          xp: 10,
          hp: 10,
          has: [<ICoin> { e: 'M', credit: 3, color: 'gold' }]
        }
      ],
      id: 10,
      room: [
        `
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
      ]
    },
    {
      symbols: [
        <IDoorBottom> { e: 'v', toRoom: 10 },
        <IVase> {
          e: 'J',
          color: 'red',
          has: [<ICoin> { e: 'M', credit: 1, color: 'gray' }]
        },
        <IBeerBarrel> {
          e: '{',
          has: [
            <ICoin> { e: 'M', credit: 3, color: 'gold' },
            <IStone> { e: 'L', credit: 4, color: 'yellow' }
          ]
        }
      ],
      id: 11,
      room: [
        `
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
`
      ]
    },
    {
      symbols: [
        <IDoorUp> { e: '^', toRoom: 6, inset: true },
        <IDoorRight> { e: '>', toRoom: 21, inset: true },
        <IDoorBottom> { e: 'v', toRoom: 13, inset: true },
        <IVase> { e: 'J', color: 'green' },
        <ITombStone> {
          e: 'V',
          has: [<ICoin> { credit: 1, color: 'gold', e: 'M' }]
        },
        <ICarpet> { e: 'é', color: 'red' },
        <ICrossTombStone> { e: 'Y' }
      ],
      id: 12,
      room: [
        `
#^#########
#.........>
#...ééé...#
#.A.ééé.V.#
#.J.ééé...#
#K........#
#####v#####
`,
        `
###########
#.........#
#...."....#
#....²....#
#.........#
#......Y..#
###########
`
      ]
    },
    {
      symbols: [
        <IDoorUp> { e: '^', toRoom: 12 },
        <IDoorBottom> { e: 'v', toRoom: 14, inset: true }
      ],
      id: 13,
      room: [
        `
####^###
#......#
#......#
#K.....#
####...#
####v###
`
      ]
    },
    {
      symbols: [
        <IDoorUp> { e: '^', toRoom: 13 },
        <IDoorBottom> { e: 'v', toRoom: 20, inset: true },
        <IDoorLeft> { e: '<', toRoom: 15, inset: true }
      ],
      id: 14,
      room: [
        `
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
      ]
    },
    {
      symbols: [<IDoorUp> { e: '^', toRoom: 14 }],
      id: 20,
      room: [
        `
###^####
#......#
#......#
#......#
#K..####
########
`
      ]
    },
    {
      symbols: [
        <IDoorUp> { e: '^', toRoom: 16, inset: true },
        <IDoorLeft> { e: '<', toRoom: 18, inset: true },
        <IDoorRight> { e: '>', toRoom: 14 },
        <IDoorBottom> { e: 'v', toRoom: 17, inset: true },
        <ILevelStairs> { e: 'µ', toRoom: 99, stairs: 'µ', level: 2 },
        <IBat> { m: '1', e: 'F', xp: 10, hp: 10 },
        <ICoin> { e: 'M', credit: 2, color: 'gold' },
        <IStone> { e: 'L', color: 'white', credit: 4 },
        <IVase> {
          e: 'J',
          color: 'green',
          has: [<ICoin> { e: 'M', credit: 1 }, <IBottleMilk> { e: 'p', addHp: 20 }]
        },
        <ITombStone> {
          e: 'V',
          has: [<ICoin> { e: 'M', credit: 1, color: 'gold' }]
        },
        <ICoin> { m: '2', e: 'M', credit: 3, color: 'gold' }
      ],
      id: 15,
      room: [
        `
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
      ]
    },
    {
      symbols: [<IDoorBottom> { e: 'v', toRoom: 15 }],
      id: 16,
      room: [
        `
########
#......#
#..B...#
#......#
#...####
##v#####
`
      ]
    },
    {
      symbols: [
        <IDoorUp> { e: '^', toRoom: 15 },
        <ICarpet> { e: 'é', color: 'blue' },
        <IStone> { e: 'L', color: 'green', credit: 2 }
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
        <IDoorUp> { e: '^', toRoom: 19, inset: true },
        <IDoorRight> { e: '>', toRoom: 15 },
        <IRat> { e: 'G', has: [<ICoin> { e: 'M', credit: 1, color: 'gold' }] },
        <IGreenWizard> {
          m: '2',
          e: '@',
          xp: 30,
          hp: 10,
          level: 1,
          has: [<IBoots> { e: 'x', addDp: 10, addXp: 10 }]
        },
        <IGreenWizard> {
          e: '@',
          has: [<ICoin> { e: 'M', credit: 1, color: 'gold' }]
        },
        <ITelePortal> { e: 'X', toRoom: 23, portal: 'X' }
      ],
      id: 18,
      room: [
        `
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
`
      ]
    },
    {
      symbols: [
        <IDoorBottom> { e: 'v', toRoom: 18 },
        <ITombStone> {
          e: 'V',
          has: [<ICoin> { e: 'M', credit: 2, color: 'gold' }]
        }
      ],
      id: 19,
      room: [
        `
########
#......#
#.A....#
#....V.#
####...#
#####v##
`
      ]
    },
    {
      symbols: [
        <IDoorUp> { e: '^', toRoom: 22, inset: true },
        <IDoorBottom> { e: 'v', toRoom: 26, inset: true },
        <IDoorLeft> { e: '<', toRoom: 12 },
        <IDoorRight> { e: '>', toRoom: 25, inset: true },
        <IVase> { e: 'J', color: 'blue' },
        <IBat> {
          e: 'F',
          has: [<ICoin> { e: 'M', color: 'gold', credit: 4 }]
        },
        <ICoin> { e: 'M', credit: 1, color: 'gold' }
      ],
      id: 21,
      room: [
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
      ]
    },
    {
      symbols: [
        <IDoorUp> { e: '^', toRoom: 23, inset: true },
        <IDoorBottom> { e: 'v', toRoom: 21 },
        <IVase> {
          e: 'J',
          color: 'blue',
          has: [<ICoin> { e: 'M', credit: 1, color: 'gold' }]
        },
        <IRat> {
          e: 'G',
          has: [<ICoin> { e: 'M', credit: 1, color: 'gold' }]
        },
        <ITombStone> {
          e: 'V',
          has: [<IBottleMilk> { e: 'p', addHp: 20 }]
        },
        <ICloset> {
          e: 'z',
          has: [<IChickenBone> { e: 'r', addHp: 10 }]
        },
        <IBat> {
          e: 'F',
          has: [<IStone> { color: 'yellow', credit: 4, e: 'L' }]
        }
      ],
      id: 22,
      room: [
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
      ]
    },
    {
      symbols: [
        <IDoorUp> { e: '^', toRoom: 24, inset: true },
        <IDoorBottom> { e: 'v', toRoom: 22 },
        <IDoorRight> { e: '>', toRoom: 32, inset: true },
        <IStone> { e: 'L', color: 'yellow', credit: 4 },
        <IBeerBarrel> {
          e: '{',
          has: [<ICoin> { e: 'M', credit: 1, color: 'gold' }]
        },
        <ITelePortal> { e: 'X', toRoom: 18, portal: 'X' }
      ],
      id: 23,
      room: [
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
      ]
    },
    {
      symbols: [
        <IDoorBottom> { e: 'v', toRoom: 23 },
        <IBat> {
          e: 'F',
          xp: 10,
          hp: 10,
          has: [<ICoin> { e: 'M', credit: 1, color: 'gold' }]
        },
        <IStone> { e: 'L', color: 'green', credit: 3 }
      ],
      id: 24,
      room: [
        `
########
#......#
#......#
#.F..L.#
####...#
#####v##
`
      ]
    },
    {
      symbols: [
        <IDoorLeft> { e: '<', toRoom: 21 },
        <IVase> { m: '1', e: 'J', color: 'gray' },
        <IRat> { e: 'G', has: [<ICheese> { e: 'q', addHp: 10 }] },
        <IRat> { m: '2', e: 'G', triggeredBy: 'I' },
        <IVase> { e: 'J', color: 'green' },
        <IRedPentagram> { e: 'I' }
      ],
      id: 25,
      room: [
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
      ]
    },
    {
      symbols: [
        <IDoorUp> { e: '^', toRoom: 21 },
        <IDoorBottom> { e: 'v', toRoom: 27, inset: true },
        <IRat> { e: 'G', has: [<ICoin> { credit: 5, color: 'gray', e: 'M' }] },
        <ITombStone> {
          e: 'V',
          has: [
            <IFish> { e: ';', addHp: 15 },
            <IMana> { e: '§', addMana: 14 },
            <ICoin> { e: 'M', credit: 1, color: 'gray' }
          ]
        }
      ],
      id: 26,
      room: [
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
      ]
    },
    {
      symbols: [
        <IDoorUp> { e: '^', toRoom: 26 },
        <IDoorRight> { e: '>', toRoom: 28, inset: true },
        <ICoin> { e: 'M', credit: 3, color: 'gold' },
        <IStone> { m: '1', e: 'L', color: 'yellow', credit: 3 },
        <IStone> { m: '2', e: 'L', color: 'green', credit: 4 }
      ],
      id: 27,
      room: [
        `
###^####
#......#
#.M.1..>
#..2...#
#...####
########
`
      ]
    },
    {
      symbols: [
        <IDoorUp> { e: '^', toRoom: 29, inset: true },
        <IDoorLeft> { e: '<', toRoom: 27 },
        <ICoin> { e: 'M', credit: 2, color: 'gold' },
        <IBat> { e: 'F', has: [<ICoin> { e: 'M', credit: 1, color: 'gold' }] },
        <IVase> {
          e: 'J',
          has: [<ICoin> { e: 'M', credit: 3, color: 'gold' }],
          color: 'red'
        },
        <IBat> {
          m: '1',
          e: 'F',
          has: [<ICoin> { e: 'M', credit: 4, color: 'gray' }]
        },
        <IBat> {
          m: '2',
          e: 'F',
          xp: 10,
          hp: 3,
          level: 1,
          has: [<IPants> { e: 'ç', addHp: 10 }]
        },
        <ITelePortal> { e: 'X', toRoom: 1, portal: 'X' },
        <ITable> { e: '*', has: [] }
      ],
      id: 28,
      room: [
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
      ]
    },
    {
      symbols: [
        <IDoorUp> { e: '^', toRoom: 30, inset: true },
        <IDoorBottom> { e: 'v', toRoom: 28 },
        <IVase> { e: 'J', color: 'gold' },
        <ITable> { e: '*', has: [<ICoin> { e: 'M', credit: 3 }] },
        <IStone> { e: 'L', color: 'white', credit: 4 },
        <ICoin> { e: 'M', credit: 1, color: 'gold' },
        <ICloset> { e: 'z', has: [<ICoin> { e: 'M', credit: 5, color: 'gold' }] },
        <ICoffin> { e: 'H', has: [<ICoin> { e: 'M', credit: 1, color: 'gray' }] },
        <IRat> { m: '2', e: 'G', xp: 10, hp: 10 },
        <IBat> { m: '1', e: 'F', xp: 10, hp: 10 }
      ],
      id: 29,
      room: [
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
      ]
    },
    {
      symbols: [
        <IDoorUp> { e: '^', toRoom: 31, inset: true },
        <IDoorBottom> { e: 'v', toRoom: 29 }
      ],
      id: 30,
      room: [
        `
##^#####
#......#
#...@..#
#......#
#...####
##v#####
`
      ]
    },
    {
      symbols: [
        <IDoorBottom> { e: 'v', toRoom: 30 },
        <ICoin> { e: 'M', credit: 15, color: 'gold' },
        <IVase> {
          e: 'J',
          color: 'green',
          has: [<ICoin> { e: 'M', color: 'gold', credit: 5 }]
        },
        <IRat> {
          e: 'G',
          has: [<ICoin> { e: 'M', credit: 4, color: 'gold' }]
        }
      ],
      id: 31,
      room: [
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
      ]
    },
    {
      symbols: [
        <IDoorBottom> { e: 'v', toRoom: 33, inset: true },
        <IDoorLeft> { e: '<', toRoom: 23 },
        <IDoorUp> { e: '^', toRoom: 34, inset: true },
        <IRat> {
          m: '1',
          e: 'G',
          has: [<IFish> { e: ';', addHp: 25 }]
        },
        <IBat> {
          m: '2',
          e: 'F',
          xp: 10,
          hp: 10,
          has: [<ICoin> { e: 'M', credit: 2, color: 'gold' }]
        },
        <ITwirlStone> {
          e: 'P',
          has: [<IBottleMilk> { e: 'p', addHp: 25 }]
        },
        <IStone> { m: '3', e: 'L', color: 'yellow', credit: 4 },
        <IStone> { m: '4', e: 'L', color: 'white', credit: 3 },
        <IBat> {
          m: '5',
          e: 'F',
          xp: 10,
          hp: 10,
          has: [<ICoin> { e: 'M', credit: 4, color: 'gray' }]
        },
        <IStone> { m: '6', e: 'L', color: 'yellow', credit: 2 },
        <IVase> {
          m: '7',
          e: 'J',
          color: 'blue',
          has: [
            <IMagicSpellBook> { e: 'u', spell: 'earthquake' },
            <IMace> { e: 't', addHp: 100 }
          ]
        },
        <IRat> { m: '8', e: 'G', xp: 10, hp: 10 },
        <IRat> {
          m: '9',
          e: 'G',
          xp: 10,
          hp: 10,
          has: [
            <ICoin> { e: 'M', color: 'gold', credit: 1 },
            <ICoin> { e: 'M', color: 'gray', credit: 1 }
          ]
        },
        <IBat> { m: 'a', e: 'F', xp: 10, hp: 10 },
        <IStone> { m: 'b', e: 'L', color: 'yellow', credit: 4 },
        <IBat> {
          m: 'c',
          e: 'F',
          xp: 10,
          hp: 10,
          has: [
            <IFish> { e: ';', addHp: 25, poisen: { add: 10, release: 2 } },
            <ICoin> { e: 'M', credit: 2, color: 'gold' }
          ]
        }
      ],
      id: 32,
      room: [
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
      ]
    },
    {
      symbols: [
        <IDoorUp> { e: '^', toRoom: 32 },
        <IStone> { m: '1', e: 'L', color: 'green', credit: 4 },
        <IStone> { m: '2', e: 'L', color: 'white', credit: 7 },
        <ITreasureChest> {
          m: '3',
          e: '&',
          has: [
            <IMace> { e: 't', addXp: 100 },
            <ICoin> { e: 'M', credit: 4, color: 'gold' },
            <IStone> { e: 'L', credit: 3, color: 'gray' }
          ]
        },
        <ITreasureChest> {
          m: '4',
          e: '&',
          has: [<IMagicPotion> { e: 'l', addHp: 60 }]
        },
        <IRat> {
          e: 'G',
          has: [<ICoin> { e: 'M', credit: 5, color: 'gold' }]
        },
        <IVase> { e: 'J', color: 'green' },
        <IStone> { m: '6', e: 'L', color: 'yellow', credit: 4 },
        <ICarpet> { e: 'é', color: 'red' }
      ],
      id: 33,
      room: [
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
      ]
    },
    {
      symbols: [
        <IDoorBottom> { e: 'v', toRoom: 32 },
        <IStone> { e: 'L', color: 'white', credit: 4 },
        <IGreenWizard> {
          e: '@',
          xp: 10,
          hp: 40,
          level: 1,
          has: [<IPants> { e: 'ç', addDp: 15 }]
        }
      ],
      id: 34,
      room: [
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
      ]
    }
  ]
};

// tslint:enable:no-object-literal-type-assertion
// tslint:enable:object-literal-sort-keys

export interface IDungeonGameModel {
  [index: number]: {
    width: number;
    height: number;
    rooms: Map<number, Room>;
  };
}

export const gGame: IDungeonGameModel = {};

export function compileDungeon(): IDungeonGameModel {
  // For each level
  for (const level in mockDungeon) {
    const rooms = mockDungeon[level].map(parseLayout);

    const roomsDone = new Map<number, Room>();
    const roomsToDo = new Map<number, Room>();

    rooms.forEach(r => roomsToDo.set(r.pk, r));

    function formatRooms(room: Room) {
      if (roomsDone.has(room.pk)) {
        return;
      }
      // Let _doors = <$ItemDoor[]>getNameSpace(room, 'doors');
      const door = room.doors.find(d => roomsDone.has(d.to));

      if (!door) {
        throw new Error(
          `room ${room.pk} cannot be formatted, not connected to a formatted reference`
        );
      }

      const fr = <Room> roomsDone.get(door.to);

      const myId = room.pk;
      const toId = fr.pk;
      const counterDoor = fr.doors.find(d => d.to === myId);

      if (!counterDoor) {
        throw new Error(`room ${myId} has no counterpart in room ${toId}`);
      }

      if (counterDoor.p.x > 0 && counterDoor.p.y === 0) {
        room.top = fr.top - room.height;
        room.left = fr.left + counterDoor.p.x - door.p.x;
      }

      if (counterDoor.p.x > 0 && counterDoor.p.y === fr.height - 1) {
        room.top = fr.top + fr.height;
        room.left = fr.left + counterDoor.p.x - door.p.x;
      }

      if (
        counterDoor.p.x > 0 &&
        counterDoor.p.y > 0 &&
        counterDoor.p.y < fr.height - 1
      ) {
        room.left = fr.left + fr.width;
        room.top = fr.top + counterDoor.p.y - door.p.y;
      }

      if (counterDoor.p.x === 0) {
        room.left = fr.left - room.width;
        room.top = fr.top + counterDoor.p.y - door.p.y;
      }

      roomsDone.set(room.pk, room);
      roomsToDo.delete(room.pk);

      for (const d of room.doors) {
        const r = roomsToDo.get(d.to);
        if (r) formatRooms(r);
      }
    }

    //
    // Let gWidth = 0;
    //

    const initRoom = <Room> rooms.shift();
    roomsToDo.delete(initRoom.pk);
    roomsDone.set(initRoom.pk, initRoom);

    initRoom.doors.forEach(d => {
      const r = roomsToDo.get(d.to);
      if (r) {
        formatRooms(r);
      }
    });

    let totalWidth = 0;
    let totalHeight = 0;

    let minTop = 0;
    let minLeft = 0;

    roomsDone.forEach((v: Room) => {
      minTop = Math.min(v.top, minTop);
      minLeft = Math.min(v.left, minLeft);
    });

    roomsDone.forEach((v: Room) => {
      v.top -= minTop;
      v.left -= minLeft;
    });

    roomsDone.forEach((v: Room) => {
      totalWidth = Math.max(v.left + v.width, totalWidth);
      totalHeight = Math.max(v.top + v.height, totalHeight);
    });

    gGame[level] = {
      height: totalHeight,
      rooms: roomsDone,
      width: totalWidth
    };
  }

  return gGame;
}
