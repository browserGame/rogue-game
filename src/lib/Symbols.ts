// 
// CIRSwm  [c] secret pressure plate, [I] red pentagram, [R] pentagram, [S]  bear trap, [w] spikes, [m] half moon trap
// [BJPY{V] [B] Statue wizard, [J] vase, [P] twirl stone, [Y] Cross tombstone, [{] Beer barrel, [V] Tomb Stone    
// [EFGT@%]  [E] Goblin, [F] bat, [G] rat, [T] skeleton enemy, [@] green shaman [%] Boss    
// [H&*zQU"] [H] Coffin, [&] Treasure, [*] Table, [z]  Closet
// [LMZxut]
// 



export const processors = {
    doorWays: function doorWays(layer: string[], w: number, x: number, y: number, tag: string,   ) {
        if ('>v<^'.indexOf(tag) >= 0) {
            
        }
        layer;
        w;
        x;
        y;
    }
};

export interface CPU {
    [index: string]: Function| 0;
}

export const codedItems: CPU = {
    //
    // primary
    //
    '#': Function, //xx wall
    '.': 0, //xx floor
    //
    //quest reults
    //
    N: 0, //treasure quest-result
    //
    //dungeon floor coverings
    //
    K: 0, //xx cobweb
    A: 0, //xx skull
    é: 0, //xx carpet
    //
    // doorways and portals
    //
    '^': processors.doorWays, //xx door north
    '>': processors.doorWays, //xx door east
    '<': processors.doorWays, //xx door west
    v: processors.doorWays, //xx door south
    X: 0, //teleport
    µ: 0, //stairs change level
    //
    //obstructables
    //
    '"': 0, //xx death-totum
    '(': 0, //xx lava
    '!': 0, //xx tourch
    U: 0, //xx trader
    Q: 0, //xx quest regenerator
    O: 0, //xx water
    $: 0, //acid bath
    //
    // discoverables via unlocking / open
    //
    z: 0, //xx closet
    '&': 0, //xx treasure chest
    H: 0, //xx coffin
    '*': 0, //xx table
    //
    // activatable plating
    //
    I: 0, //xx red pentagram trap
    m: 0, //xx half moon trap
    R: 0, //xx pentagram
    C: 0, //xx secret pressure plate
    //
    // claws, spikes
    //
    w: 0, //xx spikes
    S: 0, //xx bear trap
    //
    //discoverables via breaking
    //
    P: 0, //xx twirl-stone, looks like dna helix#
    '{': 0, //xx beer barrel
    Y: 0, //xx cross tombstone
    V: 0, //xxx tombstone
    J: 0, //xx vase 
    B: 0, //xx statue wizard
    //
    //enemies
    //
    T: 0, //xxx skelton-enemy
    '%': 0, //xx boss 
    E: 0, //xx goblin
    F: 0, //xx bat
    G: 0, //xx rat
    '@': 0, //xx green wizard shaman throws fire
    //
    //learnables
    //
    u: 0, //... magic spellbook (earth-quake, defense, warrior shout)
    //
    //arsanal
    //
    Z: 0, //... shield
    t: 0, //... mace
    x: 0, //... damaged boots
    à: 0, //... boots
    '+': 0, //... cracked-mace
    '~': 0, //... red-pants
    ç: 0, //... green-pants
    ù: 0, //... leather-boots
    //
    //valuables
    //
    L: 0, //... stone
    M: 0, //... coin, gold
    //
    // edibales
    //
    s: 0, //   bottle water
    p: 0, //   bottle milk
    r: 0, //   chicken-bone
    q: 0, //   cheese
    i: 0, //   elixer
    ';': 0, //   fish
    '§': 0, //   mana
    l: 0 //   magic-potion
};


export type Indirection = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'i';

export interface SymbolBase<T> {
    m?: Indirection;
    e: T;
}
//
//quest reults
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
export type ObstructableType = '"' | '(' | '!' | 'U' | 'Q' | 'O' | '$';
export interface Obstructable<T extends ObstructableType> extends SymbolBase<T> {
}

export type DeathTotem = Obstructable<'"'>;
export type Lava = Obstructable<'('>;
export type Torch = Obstructable<'!'>;
export type Trader = Obstructable<'U'>;
export type QuestGenerator = Obstructable<'Q'>;
export type Water = Obstructable<'O'>;
export type Acid = Obstructable<'$'>;
//
// Discovarable
//
export type DiscoverableType = 'z' | '&' | 'H' |
    '*';  // xx table // must avoid
export interface Discoverable<T extends DiscoverableType> extends SymbolBase<T> {
    initOpen: boolean;
    has: (Edible<any> | Valuable<any> | Arsanal<any>)[];
    context?: string;
}
export type Closet = Discoverable<'z'>;
export type TreasureChest = Discoverable<'&'>;
export type Coffin = Discoverable<'H'>;
export type Table = Discoverable<'*'>;
//
// actiatable plating
//
export type ActivatePlatingType = 'I' | 'm' | 'R' | 'C';

export interface Activatable<T extends ActivatePlatingType> extends SymbolBase<T> {
}

export type RedPentagram = Activatable<'I'>;
export type HalfMoonTrap = Activatable<'m'>;
export type Pentagram = Activatable<'R'>;
export type SecretPlate = Activatable<'C'>;
//
// claw and spikes
//
export type ClawSpikesTypes = 'w' | 'S';
export interface ClawSpikes<T extends ClawSpikesTypes> extends SymbolBase<T> {
}
export type Spikes = ClawSpikes<'w'>;
export type BearTrap = ClawSpikes<'S'>;
//
// discoverable and walkable when opened
//
export type WalkOpenableTypes =
    'P' | // xx twirl stone, looks like dna helix# 
    '{' | //xx beer barrel
    'Y' | //xx cross tombstone
    'V' | //xxx tombstone
    'J' | //xx vase 
    'B'; //xx statue wizard
export interface WalkOpenable<T extends WalkOpenableTypes> extends SymbolBase<T> {
    initBroken: boolean;
    has?: (Edible<any> | Valuable<any> | Arsanal<any>)[];
    color?: string;
}
export type TwirlStone = WalkOpenable<'P'>;
export type BeerBarrel = WalkOpenable<'{'>;
export type CrossTombStone = WalkOpenable<'Y'>;
export type TombStone = WalkOpenable<'V'>;
export type Vase = WalkOpenable<'J'>;
export type WizardStatue = WalkOpenable<'B'>;
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
    triggeredBy?: Indirection | WalkOpenableTypes | ActivatePlatingType;
    hp: number;
    xp: number;
    //dp: number;
    has?: (Edible<any> | Valuable<any>)[];
}

export type Skeleton = Enemy<'T'>;
export type Boss = Enemy<'%'>;
export type Goblin = Enemy<'E'>;
export type Bat = Enemy<'F'>;
export type Rat = Enemy<'G'>;
export type GreenWizard = Enemy<'@'>;
//
//learnables
//
export type LearnableType = 'u';
export interface MagicSpellBook extends SymbolBase<'u'> {
    spell: string;
}
//
//arsanal
//
export type ArsanalType =
    'Z' |  //... shield
    't' | //... mace
    'x' | //... damaged boots
    'à' | //... boots-red
    '+' | //... cracked-mace
    '~' | //... red-pants
    'ç' | //... green-pants
    'ù'; //... leather-boots

export interface Arsanal<T extends ArsanalType> extends SymbolBase<T> {
    addHp?: number;
    addXp?: number;
    addDp?: number;
}

export type Shield = Arsanal<'Z'>;
export type Mace = Arsanal<'t'>;
export type BootsRed = Arsanal<'à'>;
export type BootsDamaged = Arsanal<'x'>;
export type MaceCracked = Arsanal<'+'>;
export type PantsRed = Arsanal<'~'>;
export type PantsGreen = Arsanal<'ç'>;
export type BootsLeather = Arsanal<'ù'>;
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
export type Stone = Valuable<'L'>;
export type Coin = Valuable<'M'>;
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
