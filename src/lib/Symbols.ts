//CIRSwm  [c] secret pressure plate, [I] red pentagram, [R] pentagram, [S]  bear trap, [w] spikes, [m] half moon trap
export interface CodedItems {
    '#': 1; //xx wall
    '.': 1; //xx floor
    'A': 1; //xx skull
    'B': 1; //statue wizard
    'C': 1; //..secret pressure plate
    'D': 1; //portal
    'E': 1; //goblin
    'F': 1; //bat
    'G': 1; //rat
    'H': 1; //coffin
    'I': 1; //..red pentagram trap
    'J': 1; //vase 
    'K': 1; //xx cobweb
    'L': 1; //stone
    'M': 1; //coin
    'N': 1; //quest-result
    'O': 1; //xx water
    'P': 1; //twirl-stone, looks like dna helix#
    'Q': 1; //quest regenerator
    'R': 1; //..pentagram
    'S': 1; //..bear trap
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
    'é': 1; //xx carpet
    '&': 1; //treasure chest
    'µ': 1; //stairs change level
    '{': 1; //beer barrel
    '"': 1; //death-totum
    '(': 1; //xx lava
    '@': 1; //green wizard shaman throws fire
    '*': 1; //table
    'w': 1; //.. spikes
    'z': 1; //closet 
    '!': 1; //xx tourch
    'm': 1; //.. half moon trap
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
