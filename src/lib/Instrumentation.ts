'use strict';

import {
    SpriteSheet,
    SpriteData,
    SpriteSheetPropertyBase
} from '../lib/Sprite';

import {
    AnimationData,
    AnimationSheet,
    AnimationFrameData,
} from '../lib/Animation';

import * as fs from 'fs';
import * as path from 'path';

export interface AssetEntity {
    asset: string;
    props: SpriteSheetPropertyBase;
}


export interface Entities {

    'enemies.anim': AssetEntity;
    'enemies.sheet': AssetEntity;
    'heroes.anim': AssetEntity;
    'heroes.sheet': AssetEntity;
    'common_floor_objects.anim': AssetEntity;
    'common_floor_objects.sheet': AssetEntity;
    'dungeon_objects.anim': AssetEntity;
    'dungeon_objects.sheet': AssetEntity;
    'liquid_acid.anim': AssetEntity;
    'liquid_acid.sheet': AssetEntity;
    'liquid_lava.anim': AssetEntity;
    'liquid_lava.sheet': AssetEntity;
    'liquid_swamp.anim': AssetEntity;
    'liquid_swamp.sheet': AssetEntity;
    'liquid_water.anim': AssetEntity;
    'liquid_water.sheet': AssetEntity;
    //
    'equipment.sheet': AssetEntity;
    'common_items.sheet': AssetEntity;
    'floor_crypt.sheet': AssetEntity;
    'dungeon_decor_props.sheet': AssetEntity;
    'main_menu_background_3ds.sheet': AssetEntity;
    'main_menu_background_compact.sheet': AssetEntity;
    'main_menu_background.sheet': AssetEntity;
    //'alert_icons.sheet': AssetEntity;
    //'cursor.sheet': AssetEntity;
    //'game_menus.sheet': AssetEntity;*/

}

const entities: Entities = {
    //Animations
    'enemies.anim': {
        asset: require('../client/dungeon/enemies.anim'),
        props: {
            fsc: [{ scale: 3 }],
            pxcb: [
                { scale: { s: 3, perc: 30 }, lookToTheRight: true },
                { scale: { s: 3.75, perc: 30 }, lookToTheRight: true },
                { scale: { s: 10.5, perc: 30 }, lookToTheRight: true }],
            shadow: [
                { scale: { s: 3, perc: 30 } },
                { scale: { s: 3.75, perc: 30 } },
                { scale: { s: 10.5, perc: 30 } }
            ]
        }
    },
    'enemies.sheet': {
        asset: require('../client/dungeon/enemies.sheet'),
        props: {}
    },
    'heroes.anim': {
        asset: require('../client/dungeon/heroes.anim'), props: {
            fsc: [{ scale: 3 }],
            pxcb: [
                { scale: { s: 3, perc: 30 }, lookToTheRight: true },
                { scale: { s: 3.75, perc: 30 }, lookToTheRight: true },
                { scale: { s: 10.5, perc: 30 }, lookToTheRight: true }],
            shadow: [
                { scale: { s: 3, perc: 30 } }
            ]
        }
    },
    'heroes.sheet': { asset: require('../client/dungeon/heroes.sheet'), props: {} },
    'common_floor_objects.anim': {
        asset: require('../client/dungeon/common_floor_objects.anim'),
        props: {
            fsc: [{ scale: 3 }],
            plts: [{
                scale: 3, items: [
                    'carpet_red',
                    'carpet_blue',
                    'carpet_red_horizontal',
                    'carpet_blue_horizontal',
                    'carpet_red_square',
                    'carpet_blue_square',
                    'hazard_spikes',
                    'hazard_trap'
                ]
            },
            ],
            pccs: [{ scale: 3 }],
            pxcb: [{ scale: { s: 3, perc: 30 } }],
            shadow: [{ scale: { s: 3, perc: 30 } }]
        },
    },
    'common_floor_objects.sheet': {
        asset: require('../client/dungeon/common_floor_objects.sheet'), props: {} //copy from anim
    },
    'dungeon_objects.anim': {
        asset: require('../client/dungeon/dungeon_objects.anim'),
        props: {
            fsc: [{ scale: 3 }],
            plts: [{ scale: 3 }],
            pccs: [{ scale: 3 }],
            pxcb: [{ scale: { s: 3, perc: 30 } }],
            shadow: [{ scale: { s: 3, perc: 30 } }]
        }
    },
    'dungeon_objects.sheet': {
        asset: require('../client/dungeon/dungeon_objects.sheet'),
        props: {

        }
    },

    'liquid_acid.anim': {
        asset: require('../client/dungeon/liquid_acid.anim'),
        props: {
            pccs: [{ scale: 3 }],
            fsc: [{ scale: 3 }],
        }
    },
    'liquid_acid.sheet': {
        asset: require('../client/dungeon/liquid_acid.sheet'),
        props: {

        }
    },
    'liquid_lava.anim': {
        asset: require('../client/dungeon/liquid_lava.anim'),
        props: {
            pccs: [{ scale: 3 }],
            fsc: [{ scale: 3 }],
        }
    },
    'liquid_lava.sheet': {
        asset: require('../client/dungeon/liquid_lava.sheet'),
        props: {
        }
    },
    'liquid_swamp.anim': {
        asset: require('../client/dungeon/liquid_swamp.anim'),
        props: {
            pccs: [{ scale: 3 }],
            fsc: [{ scale: 3 }],

        }
    },
    'liquid_swamp.sheet': {
        asset: require('../client/dungeon/liquid_swamp.sheet'),
        props: {
        }
    },
    'liquid_water.anim': {
        asset: require('../client/dungeon/liquid_water.anim'),
        props: {
            pccs: [{ scale: 3 }],
            fsc: [{ scale: 3 }],
        }
    },
    'liquid_water.sheet': {
        asset: require('../client/dungeon/liquid_water.sheet'),
        props: {
        }
    },
    //
    // not anims...
    //

    'common_items.sheet': {
        asset: require('../client/dungeon/common_items.sheet'),
        props: {
            fsc: [{ scale: 3 }],
            plts: [{ scale: 3 }],
            pccs: [{ scale: 3 }],
            pxcb: [{ scale: { s: 3, perc: 30 } }],
            shadow: [{ scale: { s: 2.5, perc: 20 } }]
        }
    },
    'equipment.sheet': {
        asset: require('../client/dungeon/equipment.sheet'),
        props: {
            fsc: [{ scale: 3 }],
            pxcb: [{ scale: { s: 3, perc: 30 } }],
            shadow: [{ scale: { s: 2.5, perc: 20 } }]
        }
    },
    'floor_crypt.sheet': {
        asset: require('../client/dungeon/floor_crypt.sheet'),
        props: {
            fsc: [{ scale: 3 }],
            plts: [{ scale: 3 }]
        }
    },
    'dungeon_decor_props.sheet': {
        asset: require('../client/dungeon/dungeon_decor_props.sheet'),
        props: {
            fsc: [{ scale: 3 }],
            pccs: [{ scale: 3 }]

        }
    },
    'main_menu_background_3ds.sheet': {
        asset: require('../client/dungeon/main_menu_background_3ds.sheet'),
        props: {
            fsc: [{ scale: 3 }, { scale: 1 }],
            pccs: [{ scale: 3 }, { scale: 1 }]
        }
    },
    'main_menu_background_compact.sheet': {
        asset: require('../client/dungeon/main_menu_background_compact.sheet'),
        props: {
            fsc: [{ scale: 3 }, { scale: 2 }, { scale: 1 }],
            pccs: [
                {
                    scale: 3, items: [
                        'shaman',
                        'assassin',
                        'warrior',
                        'wizard'
                    ]
                },
                {
                    scale: 2, items: [
                        'shaman',
                        'assassin',
                        'warrior',
                        'wizard'
                    ]
                }, {
                    scale: 1, items: [
                        'shaman',
                        'assassin',
                        'warrior',
                        'wizard'
                    ]
                }, {
                    scale: 0.6, items: [
                        'shaman',
                        'assassin',
                        'warrior',
                        'wizard'
                    ]
                }
            ]
        }
    },
    'main_menu_background.sheet': {
        asset: require('../client/dungeon/main_menu_background.sheet'),
        props: {
            fsc: [{ scale: 3 }, { scale: 2 }, { scale: 1 }],
            pccs: [
                {
                    scale: 3, items: [
                        'shaman',
                        'assassin',
                        'warrior',
                        'wizard'
                    ]
                },
                {
                    scale: 2, items: [
                        'shaman',
                        'assassin',
                        'warrior',
                        'wizard'
                    ]
                }, {
                    scale: 1, items: [
                        'shaman',
                        'assassin',
                        'warrior',
                        'wizard'
                    ]
                }, {
                    scale: 0.6, items: [
                        'shaman',
                        'assassin',
                        'warrior',
                        'wizard'
                    ]
                }
            ]
        }
    }


};


function createSpriteSheet(name: string, xmlSheet: any, props: SpriteSheetPropertyBase = {}): SpriteSheet {


    const png = `${name}.png`;
    // <sheet name="warrior_idle_01" texture="heroes.png" ox="11" oy="24" x="0" y="0" width="24" height="24" />
    const spriteData: SpriteData[] = xmlSheet.sheets.sheet.filter((f: any) => f.$.name)
        .map((m: any) => {
            let rc: SpriteData = {
                name: m.$.name,
                textture: png,
                ox: m.$.ox,
                oy: m.$.oy,
                x: m.$.x,
                y: m.$.y,
                width: m.$.width,
                height: m.$.height
            };
            return rc;
        });
    /* 
        The animationsheet is registered in a singloton map accessible by the functions
        function getAnimationSheetByName(url: string);
        function removeAnimationSheetByName(url: string);
    */

    const spSheet = new SpriteSheet({
        actualUrl: png,
        sprites: spriteData,
        options: props
    });
    return spSheet;
}


export function createStyleSheets(createFiles: boolean = true): Promise<any> {

    if (typeof process.env.CSSDIR !== 'string') {
        return Promise.reject('process.env.CSSDIR is not defined, please check your webpack config');
    }

    let anims: { [index: string]: any } = {}; // will hold xml data of .anim files 
    let singleSheets: { [index: string]: any } = {}; //will hold xml data of .sheet files 
    let animKeys: string[] = [];
    let sheetKeys: (keyof Entities)[] = [];
    Object.keys(entities).filter((f: keyof Entities) => /\.anim$/.test(f)).reduce((c, m: keyof Entities) => {
        animKeys.push(m.replace(/\.anim$/, ''));
        c[m] = entities[m];
        let sheet: keyof Entities = m.replace(/\.anim$/, '.sheet') as (keyof Entities);
        c[sheet] = entities[sheet];
        return c;
    }, anims);

    Object.keys(entities).filter((f) => !(f in anims)).reduce((c, m) => {
        sheetKeys.push(m.replace(/\.sheet$/, '') as any);
        c[m] = entities[(m as keyof Entities)];
        return c;
    }, singleSheets);


    animKeys.forEach((anim) => {
        const png = `${anim}.png`;
        const sheetKey = `${anim}.sheet`;
        const animKey = `${anim}.anim`;

        const xmlAnim = anims[animKey].asset;
        const xmlSheet = anims[sheetKey].asset;
        const props = anims[animKey].props;

        createSpriteSheet(anim, xmlSheet, props);

        let spriteNames: string[] = [];

        let animData: AnimationData[] = xmlAnim.anims.anim.map((m: any) => {
            let rc: AnimationData = {
                name: m.$.name,
                spriteSheetName: m.$['sprite_sheet'] + '.png',
                playMode: m.$.play_mode,
                loop: m.$.loop,
                frame: (function im() {
                    let frames = !(m.frame instanceof Array) ? [m.frame] : m.frame;
                    let frameData: AnimationFrameData[] = frames.map((fr: any) => {
                        let rc: AnimationFrameData = {
                            spriteName: fr._,
                            duration: fr.$.duration,
                        };
                        return rc;
                    });
                    return frameData;
                })()
            };
            spriteNames.push(...rc.frame.map((fr) => fr.spriteName));
            return rc;
        });

        let animations = new AnimationSheet(png, animData);
        //console.log({ spriteNames });
        //console.log({ animations });
        //console.log({ enemySprites });
        //console.log({ spriteNames });
        //console.log(animations.CSSAscii(spriteNames));
        if (createFiles) {
            fs.writeFileSync(
                path.join(process.env.CSSDIR, `${anim}.scss`),
                animations.CSSAscii(spriteNames),
                'utf-8');
        }
    });

    sheetKeys.forEach((sheet) => {

        const sheetKey = `${sheet}.sheet`;
        const xmlSheet = singleSheets[sheetKey].asset;
        const props = singleSheets[sheetKey].props;

        const spSheet = createSpriteSheet(sheet, xmlSheet, props);
        if (createFiles) {
            fs.writeFileSync(
                path.join(process.env.CSSDIR, `${sheet}.scss`),
                spSheet.renderCSSparts(),
                'utf-8');
        }

    });
    return Promise.resolve(true);
}

