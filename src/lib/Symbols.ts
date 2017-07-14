// 
// CIRSwm  [c] secret pressure plate, [I] red pentagram, [R] pentagram, [S]  bear trap, [w] spikes, [m] half moon trap
// [BJPY{V] [B] Statue wizard, [J] vase, [P] twirl stone, [Y] Cross tombstone, [{] Beer barrel, [V] Tomb Stone    
// [EFGT@%]  [E] Goblin, [F] bat, [G] rat, [T] skeleton enemy, [@] green shaman [%] Boss    
// [H&*zQU"] [H] Coffin, [&] Treasure, [*] Table, [z]  Closet
// [LMZxut]
// 
export interface CodedItems {
    //
    // primary
    //
    '#': 1; //xx wall
    '.': 1; //xx floor
    //
    //quest reults
    //
    'N': 1; //treasure quest-result
    //
    //dungeon floor coverings
    //
    'K': 1; //xx cobweb
    'A': 1; //xx skull
    'é': 1; //xx carpet
    //
    // doorways and portals
    //
    '^': 1; //xx door north
    '>': 1; //xx door east
    '<': 1; //xx door west
    'v': 1; //xx door south
    'X': 1; //teleport
    'µ': 1; //stairs change level
    //
    //obstructables
    //
    '"': 1; //xx death-totum
    '(': 1; //xx lava
    '!': 1; //xx tourch
    'U': 1; //xx trader
    'Q': 1; //xx quest regenerator
    'O': 1; //xx water
    '$': 1; //acid bath
    //
    // discoverables via unlocking / open
    //
    'z': 1; //xx closet
    '&': 1; //xx treasure chest
    'H': 1; //xx coffin
    //
    // activatable plating
    //
    'I': 1; //xx red pentagram trap
    'm': 1; //xx half moon trap
    'R': 1; //xx pentagram
    'C': 1; //xx secret pressure plate
    //
    // claws, spikes
    //
    'w': 1; //xx spikes
    'S': 1; //xx bear trap
    //
    //discoverables via breaking
    //
    'P': 1; //xx twirl-stone, looks like dna helix#
    '*': 1; //xx table
    '{': 1; //xx beer barrel
    'Y': 1; //xx cross tombstone
    'V': 1; //xxx tombstone
    'J': 1; //xx vase 
    'B': 1; //xx statue wizard
    //
    //enemies
    //
    'T': 1; //xxx skelton-enemy
    '%': 1; //xx boss 
    'E': 1; //xx goblin
    'F': 1; //xx bat
    'G': 1; //xx rat
    '@': 1; //xx green wizard shaman throws fire
    //
    //learnables
    //
    'u': 1; //... magic spellbook (earth-quake, defense, warrior shout)
    //
    //arsanal
    //
    'Z': 1; //... shield
    't': 1; //... mace
    'x': 1; //... damaged boots
    'à': 1; //... boots
    '+': 1; //... cracked-mace
    '~': 1; //... red-pants
    'ç': 1; //... green-pants
    'ù': 1; //... leather-boots
    //
    //valuables
    //
    'L': 1; //... stone
    'M': 1; //... coin, gold
    'p': 1; //... treasure ring
    //
    // edibales
    //
    's': 1; //   bottle (water and milk)
    'r': 1; //   chicken-bone
    'q': 1; //   cheese
    'i': 1; //   elixer
    ';': 1; //   fish
    '§': 1; //   mana
    'l': 1; //   magic-potion
}


export interface SymbolBase<TokenType> {
    m?: MapType;
    e: TokenType;
}

/** floor decoration types */

export type DungeonFloorCoverType = 'K' | 'A' | 'é';

export interface DungeonFloorCover<T extends DungeonFloorCoverType> extends SymbolBase<T> {

}

export type Carpet = DungeonFloorCover<'é'>;
export type CobWeb = DungeonFloorCover<'K'>;
export type SkullBones = DungeonFloorCover<'A'>;
//
// doorways and portals
//
export type DoorwayType = '^' | '>' | '<' | 'v' | 'X' | 'µ';


export interface DoorOrPortal<T extends DoorwayType> extends SymbolBase<T> {

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

export type DiscoverableType = 'z' | '&' | 'H';
export interface Discoverable<T extends DiscoverableType> extends SymbolBase<T> {

}

export type Closet = Discoverable<'z'>;
export type TreasureChest = Discoverable<'&'>;
export type Coffin = Discoverable<'H'>;

//
// Activatable plating
//


export type ActivatePlatingType = 'I' | 'm' | 'R' |'C';

export interface Activatable<T extends ActivatePlatingType> extends SymbolBase<T> {

}

export type RedPentagram = Activatable<'I'>;
export type HalfMoonTrap = Activatable<'m'>;
export type Pentagram = Activatable<'R'>;
export type SecretPlate = Activatable<'C'>;



//export type CCariable = Coin | Stone | Cheese;

export interface Doorway extends SymbolBase<'>' | '<' | 'v' | '^'> {
    to: number;
    inset?: boolean;
}

/* Valuables */
export type ValuableType = 'L' | 'M';

export interface Valuable<T extends ValuableType> extends SymbolBase<T> {
    color: 'yellow' | 'green' | 'gold' | 'silver' | 'blue' | 'white' | 'gray';
    credit: number;
}

export interface Coin extends Valuable<'M'> {

}

export interface Stone extends Valuable<'L'> {

}

/*  foods */
/*  foods */
/*  foods */

export type ConsumableType = 'q' | 'r' | 's';

export interface Consumable<T extends ConsumableType> extends SymbolBase<T> {
    hp: number;
    poisen?: number;
}

export interface ChickedBone extends Consumable<'r'> {

}

export interface Cheese extends Consumable<'q'> {

}

export interface Bottle extends Consumable<'s'> {
    type: 'water';
}


export interface Secret extends SymbolBase<'C'> {
    has: (Coin | Cheese | Stone)[];
}


/*  misc */
export interface TelePort extends SymbolBase<'X'> {
    toRoomId: number;
    toTelePort: 'X' | MapType;
}


export interface Breakable<T extends BreakableType> extends SymbolBase<T> {
    initBroken: boolean;
    has: (Coin | Cheese | Stone)[];
}


export interface Vase extends Breakable<'J'> {

}

export interface WizardStatue extends Breakable<'B'> {

}

export interface Openable<T extends OpenableType> extends SymbolBase<T> {
    initOpen: boolean;
    has: (Coin | Cheese | Stone)[];
}



export interface Enemy<T extends EnemyType> extends SymbolBase<T> {
    hp: number;
    xp: number;
    level: number;
    has: (Coin | Cheese | Stone)[];
}

export interface Goblin extends Enemy<'E'> {

}


export interface Bat extends Enemy<'F'> {

}

export interface Rat extends Enemy<'G'> {

}

export type DItem = TelePort | SkullBones | Secret | Cheese | Coin | Doorway | Goblin | Bat | Rat | Stone | WizardStatue | Vase;

export interface Symbol extends SymbolBase<any> {
    to?: keyof CodedItems | (keyof CodedItems)[];
    door?: string;
    has?: string;
    color?: string;
    init?: string;
    fromTrap?: string;
}
