//CIRSwm  [c] secret pressure plate, [I] red pentagram, [R] pentagram, [S]  bear trap, [w] spikes, [m] half moon trap
// [BJPY{V] [B] Statue wizard, [J] vase, [P] twirl stone, [Y] Cross tombstone, [{] Beer barrel, [V] Tomb Stone    
// [EFGT@%]  [E] Goblin, [F] bat, [G] rat, [T] skeleton enemy, [@] green shaman [%] Boss    
// [H&*zQU"] [H] Coffin, [&] Treasure, [*] Table, [z]  Closet
// [LMZxut]


export interface CodedItems {
    '#': 1; //xx wall
    '.': 1; //xx floor
    'A': 1; //xx skull
    'B': 1; //xx statue wizard
    'C': 1; //xx secret pressure plate
    //'D': 1; //portal
    'E': 1; //xx goblin
    'F': 1; //xx bat
    'G': 1; //xx rat
    'H': 1; //xx coffin
    'I': 1; //xx red pentagram trap
    'J': 1; //xx vase 
    'K': 1; //xx cobweb
    'L': 1; //... stone
    'M': 1; //... coin, gold
    'N': 1; //quest-result
    'O': 1; //xx water
    'P': 1; //xx twirl-stone, looks like dna helix#
    'Q': 1; //xx quest regenerator
    'R': 1; //xx pentagram
    'S': 1; //xx bear trap
    'T': 1; //xxx skelton-enemy
    'U': 1; //xx trader
    'V': 1; //xxx tombstone
    'X': 1; //teleport
    'Y': 1; //xx cross tombstone
    'Z': 1; //... shield
    '^': 1; //xx door north
    '>': 1; //xx door east
    '<': 1; //xx door west
    'v': 1; //xx door south
    'é': 1; //xx carpet
    '&': 1; //xx treasure chest
    'µ': 1; //stairs change level
    '{': 1; //xx beer barrel
    '"': 1; //xx death-totum
    '(': 1; //xx lava
    '@': 1; //xx green wizard shaman throws fire
    '*': 1; //xx table
    'w': 1; //xx spikes
    'z': 1; //xx closet 
    '!': 1; //xx tourch
    'm': 1; //xx half moon trap
    '%': 1; //xx boss 
    'x': 1; //... damaged boots
    'klmnopqrstu': 1; //
    'u': 1; //... magic spell
    't': 1; //... mace
    's': 1; //bottle
    'r': 1; //chicken-bone
    'q': 1; //cheese
}



export interface SymbolBase {
    m?: string;
    e: keyof CodedItems;
}

export interface Coin {
    amount: number;
}

export interface TelePort extends SymbolBase {
    toRoomId: number;
    toTelePort: string;
}

export interface SkullBones extends SymbolBase {
    e: 'A';
}

export interface Breakable extends SymbolBase {
    e: 'B' | 'J' | 'P' | 'Y' | '{' | 'V';
    initBroken: boolean;
    has: SymbolBase[];
}

export type DItem = TelePort | SkullBones | Breakable;

export interface Symbol extends SymbolBase {
    to?: keyof CodedItems | (keyof CodedItems)[];
    door?: string;
    has?: string;
    color?: string;
    init?: string;
    fromTrap?: string;
}
