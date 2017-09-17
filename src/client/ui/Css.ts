import { IAllSymbols } from '~symbols';


export type Resolver = (...rest: string[]) => string | never;

function createCSSClassMapper(scssResource: string): Resolver {

    const self = require(`~assets/${scssResource}.scss`);

    return function classList(...rest: string[]): string {
        const arr = rest.map(c => self[c]);

        return arr.join(' ');
    };
}

export const css = {
    enemies: createCSSClassMapper('enemies'),
    hero: createCSSClassMapper('heroes'), //
    // tslint:disable-next-line:object-literal-sort-keys
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
    general: (...rest: string[]) => rest.map(r => require('../rogue')[r]).join(' ')
};

function forbidden(..._rest: string[]): never {
    throw new Error('this symbol has no resolver resolveris forbidden');
}


export const resolverMap: IAllSymbols<Resolver> = Object.freeze({
    //
    // Primary
    //
    '#': css.floor_crypt, // Xx wall
    '.': css.floor_crypt,  // Xx floor
    //
    // Quest reults
    //
    N: css.common_itm, // Treasure quest-result
    //
    // Dungeon floor coverings
    //
    // tslint:disable-next-line:object-literal-sort-keys
    K: css.dungeon_decor_props, // Xx cobweb, same as carpet, everything above
    A: css.dungeon_decor_props, // Xx skull , floor or carper below, blood seeps below
    é: css.common_fo, // Xx carpet, like a floor nothing more, nothing below this
    '=': css.dungeon_decor_props, // "(blood) seeps to floor or carpet",
    '²': css.common_fo,
    //
    // Doorways and portals
    //
    '^': css.floor_crypt,  // Xx door north ,top
    '>': css.floor_crypt,  // Xx door east  ,top
    '<': css.floor_crypt,  // Xx door west  ,top
    v: css.floor_crypt,  // Xx door south   ,top
    X: css.common_fo, // Teleport, exclusive
    µ: css.floor_crypt,  // Stairs change level , exclusive
    //
    // Obstructables
    //
    '"': css.common_fo, // Xx death-totum
    '!': css.common_fo, // Xx tourch
    U: css.hero, // Xx trader
    Q: css.common_fo, // Xx quest regenerator

    O: css.liquid_water, // Xx water
    $: css.liquid_acid, // Acid bath
    '£': css.liquid_swamp, // Swamp
    '(': css.liquid_lava, // Xx lava
    //
    // Discoverables via unlocking / open
    //
    z: css.dungeon_o, // Xx closet
    '&': css.common_fo, // Xx treasure chest
    H: css.dungeon_o, // Xx coffin
    '*': css.dungeon_o, // Xx table
    //
    // Activatable plating
    //
    I: css.common_fo, // Xx red pentagram trap
    m: css.common_fo, // Xx half moon trap
    R: css.common_fo, // Xx pentagram
    // Below will never be procesed coz, its a secret
    C: forbidden, // Xx secret pressure plate
    //
    // Claws, spikes
    //
    w: css.common_fo, // Xx spikes
    S: css.common_fo, // Xx bear trap
    //
    // Discoverables via breaking
    //
    P: css.dungeon_o, // Xx twirl-stone, looks like dna helix#
    '{': css.dungeon_o, // Xx beer barrel
    Y: css.dungeon_o, // Xx cross tombstone
    V: css.dungeon_o, // Xxx tombstone
    J: css.dungeon_o, // Xx vase
    B: css.dungeon_o, // Xx statue wizard
    //
    // Enemies
    //
    T: css.enemies, // Xxx skeleton-enemy
    '%': css.enemies, // Xx boss
    E: css.enemies, // Xx goblin
    F: css.enemies, // Xx bat
    G: css.enemies, // Xx rat
    '@': css.enemies, // Xx green wizard shaman throws fire
    //
    // Learnables
    //
    u: css.common_itm, // ... magic spellbook (earth-quake, defense, warrior shout)
    //
    // Arsanal
    //
    Z: css.equipment, // ... shield
    t: css.equipment, // ... mace
    x: css.equipment, // ... boots
    ç: css.equipment, // ... pants

    //
    // Valuables
    //
    L: css.common_itm, // ... stone
    M: css.common_itm, // ... coin, gold
    //
    // Edibales
    //
    s: css.common_itm, //   Bottle water
    p: css.common_itm, //   Bottle milk
    r: css.common_itm, //   Chicken-bone
    q: css.common_itm, //   Cheese
    i: css.common_itm, //   Elixer
    ';': css.common_itm, //   Fish
    '§': css.common_itm, //   Mana
    l: css.common_itm //   Magic-potion
});

