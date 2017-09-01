import { CPU } from '../lib/Symbols';


export type Resolver = (...rest: string[]) => string | never;

function createCSSClassMapper(scssResource: string): Resolver {

    let self = require(`./dungeon/${scssResource}.scss`);

    return function classList(...rest: string[]): string {
        let arr = rest.map((c) => self[c]);
        return arr.join(' ');
    };
}

export const css = {
    enemies: createCSSClassMapper('enemies'),
    hero: createCSSClassMapper('heroes'), //
    common_itm: createCSSClassMapper('common_items'),
    common_fo: createCSSClassMapper('common_floor_objects'),
    dungeon_o: createCSSClassMapper('dungeon_objects'),
    liquid_acid: createCSSClassMapper('liquid_acid'),
    liquid_lava: createCSSClassMapper('liquid_lava'),
    liquid_swamp: createCSSClassMapper('liquid_swamp'),
    liquid_water: createCSSClassMapper('liquid_water'),
    floor_crypt: createCSSClassMapper('floor_crypt'),
    dungeon_decor_props: createCSSClassMapper('dungeon_decor_props'),
    alert_icons: createCSSClassMapper('alert_icons'), //
    cursor: createCSSClassMapper('cursor'), //
    game_menus: createCSSClassMapper('game_menus'), //
    equipment: createCSSClassMapper('equipment'),
    general: (...rest: string[]) => rest.map((r) => require('./rogue')[r]).join(' ')
};

function forbidden(..._rest: string[]): never {
    throw new Error(`this symbol has no resolver resolveris forbidden`);
}


export const resolverMap: CPU<Resolver> = Object.freeze({
    //
    // primary
    //
    '#': css.floor_crypt, //xx wall
    '.': css.floor_crypt,  //xx floor
    //
    //quest reults
    //
    N: css.common_itm, //treasure quest-result
    //
    //dungeon floor coverings
    //
    K: css.dungeon_decor_props, //xx cobweb, same as carpet, everything above
    A: css.dungeon_decor_props, //xx skull , floor or carper below, blood seeps below
    é: css.common_fo, //xx carpet, like a floor nothing more, nothing below this
    '=': css.dungeon_decor_props, //"(blood) seeps to floor or carpet",
    '²': css.common_fo,
    //
    // doorways and portals
    //
    '^': css.floor_crypt,  //xx door north ,top
    '>': css.floor_crypt,  //xx door east  ,top
    '<': css.floor_crypt,  //xx door west  ,top
    v: css.floor_crypt,  //xx door south   ,top
    X: css.common_fo, //teleport, exclusive
    µ: css.floor_crypt,  //stairs change level , exclusive  
    //
    //obstructables
    //
    '"': css.common_fo, //xx death-totum
    '!': css.common_fo, //xx tourch
    U: css.hero, //xx trader
    Q: css.common_fo, //xx quest regenerator

    O: css.liquid_water, //xx water
    $: css.liquid_acid, //acid bath
    '£': css.liquid_swamp, //swamp
    '(': css.liquid_lava, //xx lava
    //
    // discoverables via unlocking / open
    //
    z: css.dungeon_o, //xx closet
    '&': css.common_fo, //xx treasure chest
    H: css.dungeon_o, //xx coffin
    '*': css.dungeon_o, //xx table
    //
    // activatable plating
    //
    I: css.common_fo, //xx red pentagram trap
    m: css.common_fo, //xx half moon trap
    R: css.common_fo, //xx pentagram
    // below will never be procesed coz, its a secret
    C: forbidden, //xx secret pressure plate
    //
    // claws, spikes
    //
    w: css.common_fo, //xx spikes
    S: css.common_fo, //xx bear trap
    //
    //discoverables via breaking
    //
    P: css.dungeon_o, //xx twirl-stone, looks like dna helix#
    '{': css.dungeon_o, //xx beer barrel
    Y: css.dungeon_o, //xx cross tombstone
    V: css.dungeon_o, //xxx tombstone
    J: css.dungeon_o, //xx vase 
    B: css.dungeon_o, //xx statue wizard
    //
    //enemies
    //
    T: css.enemies, //xxx skeleton-enemy
    '%': css.enemies, //xx boss 
    E: css.enemies, //xx goblin
    F: css.enemies, //xx bat
    G: css.enemies, //xx rat
    '@': css.enemies, //xx green wizard shaman throws fire
    //
    //learnables
    //
    u: css.common_itm, //... magic spellbook (earth-quake, defense, warrior shout)
    //
    //arsanal
    //
    Z: css.equipment, //... shield
    t: css.equipment, //... mace
    x: css.equipment, //... boots
    ç: css.equipment, //... pants

    //
    //valuables
    //
    L: css.common_itm, //... stone
    M: css.common_itm, //... coin, gold
    //
    // edibales
    //
    s: css.common_itm, //   bottle water
    p: css.common_itm, //   bottle milk
    r: css.common_itm, //   chicken-bone
    q: css.common_itm, //   cheese
    i: css.common_itm, //   elixer
    ';': css.common_itm, //   fish
    '§': css.common_itm, //   mana
    l: css.common_itm //   magic-potion
});



