

function createCSSClassMapper(scssResource: string) {

    return function classList(...rest: string[]): string {

        let self = require(`./dungeon/${scssResource}.scss`);

        let arr = rest.map((c) => self[c]);

        return arr.join(' ');
    };
}

export const cssFn = {
    enemy: createCSSClassMapper('enemies'),
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
    game_menus: createCSSClassMapper('game_menus')
};

/*
Design decisions for ReactJS,
All DungeonElements will be (mostly) div tags with a size of 24x24 pixels wide,and (position)absoluutly placed

Although visually the div elements are placed anyware ( absolute ) they still have DOM insertion order 
and even with unique "key" attribute on the React component 
If you generate the tags in different order React will adjust the position anyway even if they have the same key.

TO avoid this:
 The DOM will be generated like this

  <div> 
     { static content here, 
        floor tiles, 
        walls, 
        carpets, 
        lanterns, 
        skullsbones (on floor tiles), 
        traps, 
        other static unchangeble obstructions,
        portals,
    }
    {
       objects that change this but put enemies and monsters atthe end of this list so a large part of the generation
       remains static.  pickup items at the end of the child node list.

       ts , these can change, (openable, breakable, blood).
       coffins, 
       closets, 
       breakable table, 
       port, 
       treasure chest
        monsters that move, the hero, animated effects, game-fog (black area you cant see)
        pickup items
    }
</div>
*/


import { DungeonGameModel } from '../lib/MockDungeon';

/**
 * Enrich the DungeonGame model with, gui information needed for rendering 
 */

export function InitDungeonGUI(compiled: DungeonGameModel) {
    
    //processing order
    const palette = [''];
    palette;
    
    compiled.rooms.forEach((room) => {
        room;
    });
}
