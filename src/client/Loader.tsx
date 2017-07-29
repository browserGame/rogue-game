'use strict';

import xml = require('pixl-xml');
/*<?xml version="1.0" standalone="no"?>
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

export interface Asset {
    pk: string;
    url: string;
    mime: string;
    size: number; // -1 is unknown
    progress: number;
    error?: Error;
    data: any;
}

const entities = {

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

const dungeon = {
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

console.log(entities);
console.log(dungeon);


const xhr = new XMLHttpRequest();

xhr.overrideMimeType('application/xml');

xhr.onreadystatechange = function orsc(e) {
    console.log('READYSTATE:', xhr.readyState, e);

};

xhr.open('GET', entities['enemies.sheet'], true);
console.log('OPENED', xhr.readyState); // readyState will be 1

xhr.onprogress = function op(e) {
    // readystatet will be 3
    console.log(`LOADING, state: ${xhr.readyState} , can compute lenght:${e.lengthComputable} length:${e.total}, progress:${e.loaded}`);
};

xhr.onloadend = function ole(e) {
    console.log('DONE', xhr.readyState, e); // readyState will be 4
    //console.log(xhr.response);
    console.log(xml.parse(xhr.response));

};

xhr.send(null);
