function createCSSClassMapper(scssResource: string) {
    
    let self = require(`./dungeon/${scssResource}.scss`);

    return function classList(...rest: string[]): string {
        let arr = rest.map((c) => self[c]);
        return arr.join(' ');
    };
}

export const cssFn = {
    enemies: createCSSClassMapper('enemies'),
    hero: createCSSClassMapper('heroes'),
    common_fo: createCSSClassMapper('common_floor_objects'),
    dungeon_o: createCSSClassMapper('dungeon_objects'),
    liquid_acid: createCSSClassMapper('liquid_acid'),
    liquid_lava: createCSSClassMapper('liquid_lava'),
    liquid_swamp: createCSSClassMapper('liquid_swamp'),
    liquid_water: createCSSClassMapper('liquid_water'),
    floor_crypt: createCSSClassMapper('floor_crypt'),
    dungeon_decor_props: createCSSClassMapper('dungeon_decor_props'),
    alert_icons: createCSSClassMapper('alert_icons'),
    cursor: createCSSClassMapper('cursor'),
    game_menus: createCSSClassMapper('game_menus'),
    general: (...rest: string[]) => rest.map((r) => require('./rogue')[r]).join(' ')
};

