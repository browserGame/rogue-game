'use strict';

import {
    SpriteSheet,
    SpriteData,
} from '../lib/Sprite';

import {
    AnimationData,
    AnimationSheet,
    AnimationFrameData,
} from '../lib/Animation';

import * as fs from 'fs';
import * as path from 'path';



const entities: { [index: string]: string; } = {
    //Animations
    'enemies.anim': require('../client/dungeon/enemies.anim'),
    'enemies.sheet': require('../client/dungeon/enemies.sheet'),
    'heroes.anim': require('../client/dungeon/heroes.anim'),
    'heroes.sheet': require('../client/dungeon/heroes.sheet'),
    'common_floor_objects.anim': require('../client/dungeon/common_floor_objects.anim'),
    'common_floor_objects.sheet': require('../client/dungeon/common_floor_objects.sheet'),
    'dungeon_objects.anim': require('../client/dungeon/dungeon_objects.anim'),
    'dungeon_objects.sheet': require('../client/dungeon/dungeon_objects.sheet'),
    'liquid_acid.anim': require('../client/dungeon/liquid_acid.anim'),
    'liquid_acid.sheet': require('../client/dungeon/liquid_acid.sheet'),
    'liquid_lava.anim': require('../client/dungeon/liquid_lava.anim'),
    'liquid_lava.sheet': require('../client/dungeon/liquid_lava.sheet'),
    'liquid_swamp.anim': require('../client/dungeon/liquid_swamp.anim'),
    'liquid_swamp.sheet': require('../client/dungeon/liquid_swamp.sheet'),
    'liquid_water.anim': require('../client/dungeon/liquid_water.anim'),
    'liquid_water.sheet': require('../client/dungeon/liquid_water.sheet'),
    //
    // not anims
    //
    'floor_crypt.sheet': require('../client/dungeon/floor_crypt.sheet'),
    'dungeon_decor_props.sheet': require('../client/dungeon/dungeon_decor_props.sheet'),
    'shadow.sheet': require('../client/dungeon/shadow.sheet'),
    'alert_icons.sheet': require('../client/dungeon/alert_icons.sheet'),
    'cursor.sheet': require('../client/dungeon/cursor.sheet'),
    'game_menus.sheet':require('../client/dungeon/game_menus.sheet') 
};


function createSpriteSheet(name: string, xmlSheet: any): SpriteSheet {

    const png = `${name}.png`;

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
    const spSheet = new SpriteSheet({
        originalUrl: png,
        actualUrl: png,
        sprites: spriteData
    });
    return spSheet;
}


export function createStyleSheets(): Promise<any> {

    if (typeof process.env.CSSDIR !== 'string') {
        return Promise.reject('process.env.CSSDIR is not defined, please check your webpack config');
    }

    let anims: { [index: string]: any } = {};
    let singleSheets: { [index: string]: any } = {};
    let animKeys: string[] = [];
    let sheetKeys: string[] = [];
    Object.keys(entities).filter((f) => /\.anim$/.test(f)).reduce((c, m) => {
        animKeys.push(m.replace(/\.anim$/, ''));
        c[m] = entities[m];
        let sheet = m.replace(/\.anim$/, '.sheet');
        c[sheet] = entities[sheet];
        //c[m.replace(/\.anim$/, '.png')] = '';
        return c;
    }, anims);

    Object.keys(entities).filter((f) => !(f in anims)).reduce((c, m) => {
        sheetKeys.push(m.replace(/\.sheet$/, ''));
        c[m] = entities[m];
        return c;
    }, singleSheets);


    animKeys.forEach((anim) => {
        const png = `${anim}.png`;
        const sheetKey = `${anim}.sheet`;
        const animKey = `${anim}.anim`;

        const xmlAnim = anims[animKey];
        const xmlSheet = anims[sheetKey];

        createSpriteSheet(anim, xmlSheet);

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
        fs.writeFileSync(
            path.join(process.env.CSSDIR, `${anim}.scss`),
            animations.CSSAscii(spriteNames),
            'utf-8');
    });

    sheetKeys.forEach((sheet) => {

        const sheetKey = `${sheet}.sheet`;
        const xmlSheet = singleSheets[sheetKey];

        const spSheet = createSpriteSheet(sheet, xmlSheet);

        fs.writeFileSync(
            path.join(process.env.CSSDIR, `${sheet}.scss`),
            spSheet.renderCSSparts(),
            'utf-8');

    });


    return Promise.resolve(true);
}

