'use strict';
// tslint:disable:object-literal-key-quotes

/* I tried using an index.ts that re-export all the classes/types from ../items but it doesnt work for processSymbolTable
 * I think that it has to do how webpack creates this structure at init time
 *
 */

import {
  forbiddenProcess,
  IDungeonParser,
  noopProcess,
  processBreakable,
  processCarpet,
  processCobWeb,
  processDoor,
  processEdible,
  processEnemies,
  processFloor,
  processFloorGlyphs,
  processKnowable,
  processLiquid,
  processOpenable,
  processPortal,
  processSkullAndBones,
  processSpecial,
  processStairs,
  processTraps,
  processValuable,
  processWalls,
  processWeapons
} from '~items';

import { IAllSymbols } from '~symbols';

/**
 *
 * I have to wrap it into a function because if it is a "module global" object, then
 * the webpack will not initiate the object properly if it import uses an tsconfig path alias
 *
 * Yes this was tested to be so
 *
 */

export function symbolProcessTable(key: keyof IAllSymbols<IDungeonParser>) {
  const _symbolProcessTable: IAllSymbols<IDungeonParser> = {
    // tslint:disable:object-literal-sort-keys
    '#': processWalls, // Xx wall
    '.': processFloor, // Xx floor
    //
    // Quest reults
    N: noopProcess, // Treasure quest-result
    //
    // Dungeon floor coverings
    //
    K: processCobWeb, // Xx cobweb, same as carpet, everything above
    A: processSkullAndBones, // Xx skull , floor or carper below, blood seeps below
    é: processCarpet, // Xx carpet, like a floor nothing more, nothing below this
    '=': forbiddenProcess, // "(blood) seeps to floor or carpet",
    '²': processFloorGlyphs,
    //
    // Doorways and portals
    //
    '^': processDoor, // Xx door north ,top
    '>': processDoor, // Xx door east  ,top
    '<': processDoor, // Xx door west  ,top
    v: processDoor, // Xx door south   ,top
    X: processPortal, // Teleport, exclusive
    µ: processStairs, // Stairs change level , exclusive
    //
    // Obstructables
    //
    '"': processSpecial, // Xx death-totum
    '(': processLiquid, // Xx lava
    '!': processSpecial, // Xx tourch
    U: processSpecial, // Xx trader
    Q: processSpecial, // Xx quest regenerator

    O: processLiquid, // Xx water
    $: processLiquid, // Acid bath
    '£': processLiquid,
    //
    // Discoverables via unlocking / open
    //
    z: processOpenable, // Xx closet
    '&': processOpenable, // Xx treasure chest
    H: processOpenable, // Xx coffin
    '*': processOpenable, // Xx table
    //
    // Activatable plating
    //
    I: processFloorGlyphs, // Xx red pentagram trap
    m: processFloorGlyphs, // Xx half moon trap
    R: processFloorGlyphs, // Xx pentagram
    C: noopProcess, // Xx secret pressure plate
    //
    // Claws, spikes
    //
    w: processTraps, // Xx spikes
    S: processTraps, // Xx bear trap
    //
    // Discoverables via breaking
    //
    P: processBreakable, // Xx twirl-stone, looks like dna helix#
    '{': processBreakable, // Xx beer barrel
    Y: processBreakable, // Xx cross tombstone
    V: processBreakable, // Xxx tombstone
    J: processBreakable, // Xx vase
    B: processBreakable, // Xx statue wizard
    //
    // Enemies
    //
    T: processEnemies, // Xxx skeleton-enemy
    '%': processEnemies, // Xx boss
    E: processEnemies, // Xx goblin
    F: processEnemies, // Xx bat
    G: processEnemies, // Xx rat
    '@': processEnemies, // Xx green wizard shaman throws fire
    //
    // Learnables
    //
    u: processKnowable, // ... magic spellbook (earth-quake, defense, warrior shout)
    //
    // Arsanal
    //
    Z: processWeapons, // ... shield
    t: processWeapons, // ... mace
    x: processWeapons, // ... boots
    ç: processWeapons, // ... pants

    //
    // Valuables
    //
    L: processValuable, // ... stone
    M: processValuable, // ... coin, gold
    //
    // Edibales
    //
    s: processEdible, //   Bottle water
    p: processEdible, //   Bottle milk
    r: processEdible, //   Chicken-bone
    q: processEdible, //   Cheese
    i: processEdible, //   Elixer
    ';': processEdible, //   Fish
    '§': processEdible, //   Mana
    l: processEdible //   Magic-potion
    // tslint:enable:object-literal-sort-keys
  };

  return _symbolProcessTable[key];
}
