'use strict';

// -4 static untraversable, noting above this, generally these are "cut-outs"
//. [#] wall (done)
//. [(] lava (done)  namespace liquid
//. [O] water (done) namespace liquid
//. [$] acid bath (done) namespace liquid
//. [é] carpet (done), exception!!! traversable 

// -3 (nothing below these items, makes sense ,lol can have stuff on top, except level stairs)
//. [.] floor (done)
//. [µ] level stairs (done) (when you just walk out, you seem to "stand on it", monsters move around it)

// -1 nothing below (except for floor) , walkable can do battle on it,  
// FloorGlyphs
//. [I] red pentagram
//. [m] half moon trap
//. [R] pentagram
// SecretPlates 
//. [C] secret pressure plate
// Traps
//. [w] spikes
//. [S] bear trap
//. Teleports
//. [X] teleport (done) (can have battle (me, not other enemies) and blood)

// 0 nothing below, except for floor (walkable can place stuff on it)
//  [=]blood , 
//.  [A] skull-bones, 
//.  [K] cornercobweb
// blood will be on carpet or seep on floor
// anything ranked above 0 can be placed above

// 97 nothing above untill broken, after it broken
//    allow for items above, walkabe or battle 
//.  [P] twirl stone
//.  [{] beer barrel
//.  [Y] cross tombstone
//.  [V] normal tombstone
//.  [J] vase
//.  [B] statue wizard

// 98 ineventory items (only on cells 97,0,-1 (except teleport),-3 (except level stairs))
// stackable  

//knowable

//.[u] magic speelbook

//weapons    

//. [Z] shield
//. [t] mace
//. [x] damage boots
//. [à] boots
//. [+] cracked-mace
//. [~] red-pants
//. [ç] green pants
//. [ù] leather-boots

//valuebles

//. [L] stone
//. [M] coin, gold

//edibles

//. [s] bottle water
//. [p] bottle milk
//. [r] chicken-bone
//. [q] (done so-far) cheese
//. [i] elixer
//. [;] fish
//. [§] mana
//. [l] magic potion

// 99 nothing above (this class mutall excludes) 
// ["] death totum
// [!]tourch
// [U]trader
// [N] quest-result
// .[z] closet
// .[&] treasure chest
// .[H] coffin
// .[*] table

// 99 enemies , nothing above (walkable items)
// .[T] skeleton-warrior
// .[%] boss
// .[E] goblin
// .[F] bat
// .[G] rat
// .[@] green wizard shaman

// 100 doorways always cover because horizontal
// .<^>v

import {
    processWalls
} from './Wall';

import {
    processFloor
} from './Floor';

import {
    processDoor
} from './Door';

import {
    processCobWeb
} from './CobWeb';

import {
    processCarpet
} from './Carpet';

import {
    processSkullAndBones
} from './BonesFloor';

import {
    processLiquid
} from './Liquid';

import {
    processPortal
} from './Portal';

import {
    processStairs
} from './LevelStairs';

import {
    processTraps
} from './Traps';

import {
    processSecret
} from './Secret';

import {
    processEdible
} from './Edible';

import {
    processValuable
} from './Valuables';

import {
    processEnemies
} from './Enemy';


import {
    processWeapons
} from './Weapon';

import {
    processBreakable
} from './Breakable';

import {
    processKnowable
} from './Knowable';

import {
    processOpenable
} from './Openable';

import {
    processSpecial
} from './Special';

import {
    processGlyphs
} from './FloorGlyph';

export interface CPU {
    [index: string]: Function | 0;
}

export const codedItems: CPU = {
    //
    // primary
    //
    '#': processWalls, //xx wall
    '.': processFloor, //xx floor
    //
    //quest reults
    //
    N: 0x0, //treasure quest-result
    //
    //dungeon floor coverings
    //
    K: processCobWeb, //xx cobweb, same as carpet, everything above
    A: processSkullAndBones, //xx skull , floor or carper below, blood seeps below
    é: processCarpet, //xx carpet, like a floor nothing more, nothing below this
    '=': 0x0, //"(bloodà) seeps to floor or carpet"
    //
    // doorways and portals
    //
    '^': processDoor, //xx door north ,top
    '>': processDoor, //xx door east  ,top
    '<': processDoor, //xx door west  ,top
    v: processDoor, //xx door south   ,top
    X: processPortal, //teleport, exclusive
    µ: processStairs, //stairs change level , exclusive  
    //
    //obstructables
    //
    '"': processSpecial, //xx death-totum
    '(': processLiquid, //xx lava
    '!': processSpecial, //xx tourch
    U: processSpecial, //xx trader
    Q: processSpecial, //xx quest regenerator

    O: processLiquid, //xx water
    $: processLiquid, //acid bath
    //
    // discoverables via unlocking / open
    //
    z: processOpenable, //xx closet
    '&': processOpenable, //xx treasure chest
    H: processOpenable, //xx coffin
    '*': processOpenable, //xx table
    //
    // activatable plating
    //
    I: processGlyphs, //xx red pentagram trap
    m: processGlyphs, //xx half moon trap
    R: processGlyphs, //xx pentagram
    C: processSecret, //xx secret pressure plate
    //
    // claws, spikes
    //
    w: processTraps, //xx spikes
    S: processTraps, //xx bear trap
    //
    //discoverables via breaking
    //
    P: processBreakable, //xx twirl-stone, looks like dna helix#
    '{': processBreakable, //xx beer barrel
    Y: processBreakable, //xx cross tombstone
    V: processBreakable, //xxx tombstone
    J: processBreakable, //xx vase 
    B: processBreakable, //xx statue wizard
    //
    //enemies
    //
    T: processEnemies, //xxx skelton-enemy
    '%': processEnemies, //xx boss 
    E: processEnemies, //xx goblin
    F: processEnemies, //xx bat
    G: processEnemies, //xx rat
    '@': processEnemies, //xx green wizard shaman throws fire
    //
    //learnables
    //
    u: processKnowable, //... magic spellbook (earth-quake, defense, warrior shout)
    //
    //arsanal
    //
    Z: processWeapons, //... shield
    t: processWeapons, //... mace
    x: processWeapons, //... damaged boots
    à: processWeapons, //... boots
    '+': processWeapons, //... cracked-mace
    '~': processWeapons, //... red-pants
    ç: processWeapons, //... green-pants
    ù: processWeapons, //... leather-boots
    //
    //valuables
    //
    L: processValuable, //... stone
    M: processValuable, //... coin, gold
    //
    // edibales
    //
    s: processEdible, //   bottle water
    p: processEdible, //   bottle milk
    r: processEdible, //   chicken-bone
    q: processEdible, //   cheese
    i: processEdible, //   elixer
    ';': processEdible, //   fish
    '§': processEdible, //   mana
    l: processEdible //   magic-potion
};


export type Indirection = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'i';

export interface SymbolBase<T> {
    m?: Indirection;
    e: T;
}
//
//quest results
//
export type QuestResultType =
    'N'; //ring treasure quest-result

export interface QuestResult<T extends QuestResultType> extends SymbolBase<T> {
    credits: number;
    vitality: number;
    wisdom: number;
    agility: number;
}

export type QuestRing = QuestResult<'N'>;
//
//dungeon floor coverings
//
export type DungeonFloorCoverType = 'K' | 'A' | 'é';
export interface DungeonFloorCover<T extends DungeonFloorCoverType> extends SymbolBase<T> {
    type: string;
}
export type Carpet = DungeonFloorCover<'é'>;
export type CobWeb = DungeonFloorCover<'K'>;
export type SkullBones = DungeonFloorCover<'A'>;
//
// doorways and portals
//
export type DoorType = '^' | '>' | '<' | 'v';
export type PortalType = 'X';
export type LevelStairsType = 'µ';

export interface DoorWay<T extends DoorType> extends SymbolBase<T> {
    toRoom: number;
    inset?: boolean;
}

export type DoorLeft = DoorWay<'<'>;
export type DoorRight = DoorWay<'>'>;
export type DoorUp = DoorWay<'^'>;
export type DoorBottom = DoorWay<'v'>;

export interface TelePortal extends SymbolBase<'X'> {
    toRoom: number;
    portal: Indirection | 'X';
}

export interface LevelStairs extends SymbolBase<'µ'> {
    toRoom: number;
    stairs: Indirection | 'µ';
    level: number;
}
//
//obstructables
//
// [(]lava
// [O] water
// [$] acid bath
//
export type LiquidType = '$' | '(' | 'O';
export type ObstructableType = '"' | '!' | 'U' | 'Q' | LiquidType;



export interface Obstructable<T extends ObstructableType> extends SymbolBase<T> {
}


export type Lava = Obstructable<'('>;
export type Water = Obstructable<'O'>;
export type Acid = Obstructable<'$'>;
export type AllLiquids = Lava | Water | Acid;

export type Torch = Obstructable<'!'>;
export type Trader = Obstructable<'U'>;
export type QuestGenerator = Obstructable<'Q'>;
export type DeathTotem = Obstructable<'"'>;

export type SpecialtyItems = Torch | Trader | QuestGenerator | DeathTotem;

//
// Discovarable
//
export type DiscoverableType = 'z' | '&' | 'H' | '*';
export interface Discoverable<T extends DiscoverableType> extends SymbolBase<T> {
    has: SIGeneralContent[];

}
export type Closet = Discoverable<'z'>;
export type TreasureChest = Discoverable<'&'>;
export type Coffin = Discoverable<'H'>;
export type Table = Discoverable<'*'>;
export type AllOpenables = Closet | TreasureChest | Coffin | Table;
//
//  FloorSymbols (pentagrams, half moons etc)
//
export type FloorGlyphsType = 'I' | 'm' | 'R'; //[I] red pentagram,  [m] half moon trap, [R] pentagram

export interface FloorGlyphs<I extends FloorGlyphsType> extends SymbolBase<I> {

}

export type RedPentagram = FloorGlyphs<'I'>;
export type HalfMoonTrap = FloorGlyphs<'m'>;
export type Pentagram = FloorGlyphs<'R'>;

export type AllGlyphs = RedPentagram | HalfMoonTrap | Pentagram;

// secretplates

export type SecretPlateType = 'C';
export interface SecretPlate extends SymbolBase<'C'> {
    has: SIGeneralContent[];
}

// claw and spikes

export type ClawSpikesTypes = 'w' | 'S';
export interface ClawSpikes<T extends ClawSpikesTypes> extends SymbolBase<T> {
    delHp: number;
}
export type Spikes = ClawSpikes<'w'>;
export type BearTrap = ClawSpikes<'S'>;

//
// discoverable and walkable when opened
//

export type BreakableTypes =
    'P' | // xx twirl stone, looks like dna helix# 
    '{' | //xx beer barrel
    'Y' | //xx cross tombstone
    'V' | //xxx tombstone
    'J' | //xx vase 
    'B'; //xx statue wizard

export interface Breakable<T extends BreakableTypes> extends SymbolBase<T> {
    has: SIGeneralContent[];
    color?: string;
}

export type TwirlStone = Breakable<'P'>;
export type BeerBarrel = Breakable<'{'>;
export type CrossTombStone = Breakable<'Y'>;
export type TombStone = Breakable<'V'>;
export type Vase = Breakable<'J'>;
export type WizardStatue = Breakable<'B'>;

export type AllBreakables = TwirlStone | BeerBarrel | CrossTombStone | TombStone | Vase | WizardStatue;

//
// enemies
//
export type EnemyTypes = 'T' | //xxx skelton-enemy
    '%' | //xx boss 
    'E' | //xx goblin
    'F' | //xx bat
    'G' | //xx rat
    '@'; //xx green wizard shaman throws fire

export interface Enemy<T extends EnemyTypes> extends SymbolBase<T> {
    triggeredBy?: Indirection | BreakableTypes | FloorGlyphsType;
    hp: number;
    xp: number;
    level: number;
    has: SIGeneralContent[];
}

export type Skeleton = Enemy<'T'>;
export type Boss = Enemy<'%'>;
export type Goblin = Enemy<'E'>;
export type Bat = Enemy<'F'>;
export type Rat = Enemy<'G'>;
export type GreenWizard = Enemy<'@'>;

export type AllEnemies = Skeleton | Boss | Goblin | Bat | Rat | GreenWizard;

//export function isEnemy(en: any): en is AllEnemies {
//    return en && 'T%EFG@'.indexOf(en.e) >= 0 && typeof en.hp === 'number' && en.xp === 'number';
//}


//
//learnables
//
export type LearnableType = 'u';
export interface MagicSpellBook extends SymbolBase<'u'> {
    spell: string;
}
export type AllSpells = MagicSpellBook;

export function isSpell(sp: any): sp is AllSpells {
    return sp && sp.spell;
}

//
//arsanal
//
export type ArsenalType =
    'Z' |  //... shield
    't' | //... mace
    'x' | //... damaged boots
    'à' | //... boots-red
    '+' | //... cracked-mace
    '~' | //... red-pants
    'ç' | //... green-pants
    'ù'; //... leather-boots
//
export interface Arsenal<T extends ArsenalType> extends SymbolBase<T> {
    addHp?: number;
    addXp?: number;
    addDp?: number;
}

export type Shield = Arsenal<'Z'>;
export type Mace = Arsenal<'t'>;
export type BootsRed = Arsenal<'à'>;
export type BootsDamaged = Arsenal<'x'>;
export type MaceCracked = Arsenal<'+'>;
export type PantsRed = Arsenal<'~'>;
export type PantsGreen = Arsenal<'ç'>;
export type BootsLeather = Arsenal<'ù'>;

export type AllWeapons = Shield | Mace | BootsRed | BootsDamaged | MaceCracked | PantsRed | PantsGreen | BootsLeather;

export function isWeapon(w: any): w is AllWeapons {
    if (!w) {
        return false;
    }
    let c = typeof w.addHp === 'string' || typeof w.addXp === 'string' || typeof w.addDp === 'string';
    return c && 'Ztàx+~çù'.indexOf(w.e) >= 0;
}

//
//valuables
//
export type ValuableType =
    'L' | //... stone
    'M'; //... coin, gold

export interface Valuable<T extends ValuableType> extends SymbolBase<T> {
    credit: number;
    color?: string;
}

export function isValuable(v: any): v is Stone | Coin {
    return (typeof v.e === 'string' && 'LM'.indexOf(v.e) >= 0 && typeof v.credit === 'number');
}
//
export type Stone = Valuable<'L'>;
export type Coin = Valuable<'M'>;
//
export type AllValuebles = Stone | Coin;
//
// edibales
//
export type EdibleType =
    's' | //   bottle water
    'p' | // bottle  milk
    'r' | //   chicken-bone
    'q' | //   cheese
    'i' | //   elixer
    ';' | //   fish
    '§' | //   mana
    'l'; //   magic-potion

export interface Edible<T extends EdibleType> extends SymbolBase<T> {
    addMana?: number;
    addHp?: number;
    poisen?: { add: number, release: number };
}

export type BottleWater = Edible<'s'>;
export type BottleMilk = Edible<'p'>;
export type ChickenBone = Edible<'r'>;
export type Cheese = Edible<'q'>;
export type Elixer = Edible<'i'>;
export type Fish = Edible<';'>;
export type Mana = Edible<'§'>;
export type MagicPotion = Edible<'l'>;

export type AllEdibles = BottleWater | BottleMilk | ChickenBone | Cheese | Elixer | Fish | Mana | MagicPotion;

export function isEdible(ed: any): ed is AllEdibles {
    return ed && 'sprqi;§l'.indexOf(ed.e) >= 0;
}


export type SIGeneralContent = AllValuebles | AllEdibles | AllSpells | AllWeapons;

