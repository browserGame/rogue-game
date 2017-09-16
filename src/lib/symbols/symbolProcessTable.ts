'use strict';

/* -4 static untraversable, noting above this, generally these are "cut-outs"
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
// SecretPlates ==
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
//.
//98 ineventory items (only on cells 97,0,-1 (except teleport),-3 (except level stairs))
//stackable
//.
//knowable

//.[u] magic speelbook

//weapons

//. [Z] shield
//. [t] mace
//. [ç] pants
//. [x] boots


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
// [!] tourch
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
*/

import { IAllSymbols } from './IAllSymbols';

export const symbolProcessTable: IAllSymbols<DungParser> = {
    //
    // Primary
    //
    '#': processWalls, // Xx wall
    '.': processFloor, // Xx floor
    //
    // Quest reults
    //
    'N': dud, // Treasure quest-result
    //
    // Dungeon floor coverings
    //
    'K': processCobWeb, // Xx cobweb, same as carpet, everything above
    'A': processSkullAndBones, // Xx skull , floor or carper below, blood seeps below
    'é': processCarpet, // Xx carpet, like a floor nothing more, nothing below this
    '=': forbidden, // "(blood) seeps to floor or carpet",
    '²': processGlyphs,
    //
    // Doorways and portals
    //
    '^': processDoor, // Xx door north ,top
    '>': processDoor, // Xx door east  ,top
    '<': processDoor, // Xx door west  ,top
    'v': processDoor, // Xx door south   ,top
    'X': processPortal, // Teleport, exclusive
    'µ': processStairs, // Stairs change level , exclusive
    //
    // Obstructables
    //
    '"': processSpecial, // Xx death-totum
    '(': processLiquid, // Xx lava
    '!': processSpecial, // Xx tourch
    'U': processSpecial, // Xx trader
    'Q': processSpecial, // Xx quest regenerator

    'O': processLiquid, // Xx water
    '$': processLiquid, // Acid bath
    '£': processLiquid,
    //
    // Discoverables via unlocking / open
    //
    'z': processOpenable, // Xx closet
    '&': processOpenable, // Xx treasure chest
    'H': processOpenable, // Xx coffin
    '*': processOpenable, // Xx table
    //
    // Activatable plating
    //
    'I': processGlyphs, // Xx red pentagram trap
    'm': processGlyphs, // Xx half moon trap
    'R': processGlyphs, // Xx pentagram
    'C': processSecret, // Xx secret pressure plate
    //
    // Claws, spikes
    //
    'w': processTraps, // Xx spikes
    'S': processTraps, // Xx bear trap
    //
    // Discoverables via breaking
    //
    'P': processBreakable, // Xx twirl-stone, looks like dna helix#
    '{': processBreakable, // Xx beer barrel
    'Y': processBreakable, // Xx cross tombstone
    'V': processBreakable, // Xxx tombstone
    'J': processBreakable, // Xx vase
    'B': processBreakable, // Xx statue wizard
    //
    // Enemies
    //
    'T': processEnemies, // Xxx skeleton-enemy
    '%': processEnemies, // Xx boss
    'E': processEnemies, // Xx goblin
    'F': processEnemies, // Xx bat
    'G': processEnemies, // Xx rat
    '@': processEnemies, // Xx green wizard shaman throws fire
    //
    // Learnables
    //
    'u': processKnowable, // ... magic spellbook (earth-quake, defense, warrior shout)
    //
    // Arsanal
    //
    'Z': processWeapons, // ... shield
    't': processWeapons, // ... mace
    'x': processWeapons, // ... boots
    'ç': processWeapons, // ... pants

    //
    // Valuables
    //
    'L': processValuable, // ... stone
    'M': processValuable, // ... coin, gold
    //
    // Edibales
    //
    's': processEdible, //   Bottle water
    'p': processEdible, //   Bottle milk
    'r': processEdible, //   Chicken-bone
    'q': processEdible, //   Cheese
    'i': processEdible, //   Elixer
    ';': processEdible, //   Fish
    '§': processEdible, //   Mana
    'l': processEdible //   Magic-potion
};

