'use strict';



/*

        .enemies {
            background: url('images/enemies.png');
            background-origin: border-box;
            background-size: 1024px 512px; //normal size 48px 48px
            background-size: 1280px 640px; //boss size  60px 60px
            image-rendering: pixelated;

            animation-duration: 1s;
            animation-timing-function: steps(1);
            animation-delay: 0ms;
            animation-iteration-count:infinite;
        }

        .blackBat {
            width: 48px;
            height: 48px;
            border: 1px solid grey;
            animation-name: blackBat;
        }

        @keyframes blackBat {
            from {
                background-position: -48px -48px;
            }
            50% {
                background-position: 0px -48px;
            }
        }

        h2 {

            background-repeat: no-repeat;
            background-clip: border-box;
            background-size: 200% auto;

            image-rendering: pixelated;

            color: white;
            font-weight: bold;
            font-size: 360%;
            height: calc( 100% - 20px);
            line-height: 1;
            padding: 25px;
            text-shadow: 0 0 1px black;
            border: 4px dashed green;
        }
    
css image-rendering: pixelated;

<?xml version="1.0" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
     width="420px" height="420px">

      <circle cx="200" cy="200" r="75"  />

      <path  
            d="
            M 200, 200
            m -75, 0
            a 75,75 0 0,1 150,0.00001
           
            "
      />

</svg>

circle, path {
    fill: none;
    stroke-width: 5;
    stroke-opacity: 0.5;
}

circle {
    stroke: red;
}

path {
    stroke: blue;
    stroke-opacity: 1;
}
*/

import {
    loadXMLAsset
} from '../lib/tools';

//{"name":"elf03_01","texture":"enemies.png","ox":"12","oy":"24","x":"144","y":"72","width":"24","height":"24"}

/*
export interface Asset {
    pk: string;
    url: string;
    mime: string;
    size: number; // -1 is unknown
    progress: number;
    error?: Error;
    data: any;
}*/

interface Sprite {
    name: string;
    textture: string;
    ox: number;
    oy: number;
    x: number;
    y: number;
    width: number;
    height: number;
}

const rogue = require('./rogue');

console.log(rogue); // just testing


const entities: { [index: string]: string; } = {

    'enemies.anim': require('./entities/enemies.anim'),
    'enemies.png': require('./entities/enemies.png'),
    'enemies.sheet': require('./entities/enemies.sheet'),
    'heroes.anim': require('./entities/heroes.anim'),
    'heroes.png': require('./entities/heroes.png'),
    'heroes.sheet': require('./entities/heroes.sheet'),
    'shadow.sheet': require('./entities/shadow.sheet'),
    'shadow.png': require('./entities/shadow.png'),
    'shopkeeper.sheet': require('./entities/shopkeeper.sheet'),
    'shopkeeper.anim': require('./entities/shopkeeper.anim'),

};



const dungeon: { [index: string]: string; } = {
    'common_floor_objects.anim': require('./dungeon/common_floor_objects.anim'),
    'common_floor_objects.png': require('./dungeon/common_floor_objects.png'),
    'common_floor_objects.sheet': require('./dungeon/common_floor_objects.sheet'),
    'dungeon_decor_props.png': require('./dungeon/dungeon_decor_props.png'),
    'dungeon_decor_props.sheet': require('./dungeon/dungeon_decor_props.sheet'),
    'dungeon_objects.anim': require('./dungeon/dungeon_objects.anim'),
    'dungeon_objects.png': require('./dungeon/dungeon_objects.png'),
    'dungeon_objects.sheet': require('./dungeon/dungeon_objects.sheet'),

    'floor_crypt.png': require('./dungeon/floor_crypt.png'),
    'floor_crypt.sheet': require('./dungeon/floor_crypt.png'),

    'liquid_acid.anim': require('./dungeon/liquid_acid.anim'),
    'liquid_acid.png': require('./dungeon/liquid_acid.png'),
    'liquid_acid.sheet': require('./dungeon/liquid_acid.sheet'),
    'liquid_lava.anim': require('./dungeon/liquid_lava.anim'),
    'liquid_lava.png': require('./dungeon/liquid_lava.png'),
    'liquid_lava.sheet': require('./dungeon/liquid_lava.sheet'),
    'liquid_swamp.anim': require('./dungeon/liquid_swamp.anim'),
    'liquid_swamp.png': require('./dungeon/liquid_swamp.png'),
    'liquid_swamp.sheet': require('./dungeon/liquid_swamp.sheet'),
    'liquid_water.anim': require('./dungeon/liquid_water.anim'),
    'liquid_water.png': require('./dungeon/liquid_water.png'),
    'liquid_water.sheet': require('./dungeon/liquid_water.sheet'),
};

dungeon;


//create stylesheets

export function createStyleSheets(): Promise<any> {
    const xmlEnemies = Object.keys(entities).filter((f) => /\.(anim|sheet)$/.test(f)).reduce((coll, x) => {
        coll[x] = {
            url: x,
            promise: loadXMLAsset('GET', entities[x]),
            data: null
        };
        return coll;
    }, {} as { [index: string]: { url: string; promise: Promise<any>; data: any; } });

    return Promise.all(Object.keys(xmlEnemies).map((m) => xmlEnemies[m].promise))
        .then(() => {
            for (let key in xmlEnemies) {
                // enemies, all promises resolved so thenables are executed immediatly
                xmlEnemies[key].promise.then((data) => xmlEnemies[key].data = data);
            }
            return xmlEnemies;
        })
        .then(() => {
            //everything loaded
            //create enemy stylesheet
            const enemySprites = entities['enemies.png'];
            const enemySheet = xmlEnemies['enemies.sheet'];
            //const enemyAnimations = xmlEnemies['enemies.anim'];

            let dStyle = document.createElement('style');
            let attTextCss = document.createAttribute('type');
            attTextCss.value = 'text/css';
            dStyle.setAttributeNode(attTextCss);

            // need to add the style to the document otherwise dsStyle.sheet will be "null"
            document.head.appendChild(dStyle);
            const sheet: CSSStyleSheet = dStyle.sheet as any;
            // now we insert rules 
            //
            // 1 insert basic size 48x48 and boss 60x60 (25% bigger, as measured by "Gump")
            let i = 0;
            console.log('creating rules');
            sheet.insertRule(` 
            .enemy-spritemap { 
                background: url('${enemySprites}'); 
                background-origin: border-box; 
                background-size: 1024px 512px; 
                image-rendering: pixelated;
                animation-duration: 900ms;
                animation-timing-function: steps(1);
                animation-delay: 0ms;
                animation-iteration-count:infinite;
            }`, i++);

            sheet.insertRule(` 
            .enemy-spritemap.boss { 
                background-size: 1280px 640px; 
            }`, i++);

            sheet.insertRule(`
            .normal {
                width: 48px;
                height: 48px;    
            }    
            `, i++);
            sheet.insertRule(`
            .boss {
                width: 60px;
                height: 60px;    
            }    
            `, i++);

            sheet.insertRule(`
            .right {
                transform: scaleX(-1);
             }    
            `, i++);


            //{"name":"elf03_01","texture":"enemies.png","ox":"12","oy":"24","x":"144","y":"72","width":"24","height":"24"}
            let c: { [index: string]: { f: Sprite; s: Sprite; } } = {};
            (enemySheet.data.sheets.sheet as Sprite[]).reduce((collector, itm) => {
                let [_, rootName, index] = Array.from(itm.name.match(/^([^\_]+)_(\d{2})$/) || []);
                _;
                if (!rootName) {
                    rootName = itm.name;
                    index = '01';
                }
                //console.log({ _, rootName, index });
                let sprite: Sprite = {
                    name: rootName,
                    textture: '',
                    ox: Number.parseInt(itm.ox as any),
                    oy: Number.parseInt(itm.oy as any),
                    x: Number.parseInt(itm.x as any),
                    y: Number.parseInt(itm.y as any),
                    width: Number.parseInt(itm.width as any),
                    height: Number.parseInt(itm.height as any)
                };
                collector[rootName] = collector[rootName] || {};
                collector[rootName][index === '01' ? 'f' : 's'] = sprite;

                return collector;
            }, c);
            //create 
            for (let duo in c) {
                let { x, y } = c[duo].f;
                let { x: x2, y: y2 } = c[duo].s || c[duo].f;

                sheet.insertRule(`
                    .${duo} {
                        animation-name: ${duo};
                    }                
                `, i++);

                sheet.insertRule(`
                    @keyframes ${duo} {
                        from {
                            background-position: -${x * 2}px -${y * 2}px;
                        }
                        50% {
                            background-position: -${x2 * 2}px -${y2 * 2}px;
                        }
                    }                
                `, i++);
                sheet.insertRule(`
                    .${duo}.boss {
                        animation-name: ${duo}-boss;
                    }                
                `, i++);

                sheet.insertRule(`
                    @keyframes ${duo}-boss {
                        from {
                            background-position: -${x * 2.5}px -${y * 2.5}px;
                        }
                        50% {
                            background-position: -${x2 * 2.5}px -${y2 * 2.5}px;
                        }
                    }                
                `, i++);


            }
            console.log({ c });




        })
        .catch(() => {
            //error stuff
        });

}
