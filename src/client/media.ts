/*
MIT License

Copyright (c) November 2016, Jacob Kenneth Falodun Bogers

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


//floor_crypt.png  
// ###   top_top_left_corner xx
// #
// #

//
// ###   top_top_right_corner xx
//   #
//   #

//    
// #      top_bottom_left_cornerxx
// #
// ###

// 
//   #    top_bottom_right_cornerxx
//   #
// ###

//  wall_side_1 xx
//  ##
//  ##
//  ##

//  wall_side_2 xx
//  ##
//  ##
//  ##

// top_top_2xx
//  ####
//  ####
//

//  top_top_1xx
//   ####
//   ####
//

//  floor_0, floor_1, floor_2, floor_3
//
//
//

//  door,door_open

export enum BaseImageOrientation {
    TOP_LEFT_CORNER = 1, //╔
    TOP_RIGHT_CORNER, //╗
    TOP_BOTTOM_LEFT_CORNER, //╚
    TOP_BOTTOM_RIGHT_CORNER, ////╝ 
    WALL_VERT_NORMAL, //║ //5
    WALL_VERT_CRACKED, //║ //6
    WALL_HORIZONTAL_CRACKED, //═7
    WALL_HORIZONTAL_CRYPT, //═8
    NORMAL_FLOOR, //9
    CIRCLE_FLOOR, //10
    CRACKED_FLOOR, //11
    HALF_CIRCLE_FLOOR, //12,
    //
    SKELETON_REMAINS_BONES_SKULL = 20, //i see this the most
    SKELETON_REMAINS_SMALL_02,
    SKELETON_REMAINS_SMALL_03,
    SKELETON_REMAINS_SMALL_04,
    SKELETON_REMAINS_BIG_SKULL_ON_BONES,
    SKELETON_REMAINS_SMALL_05,
    SKELETON_REMAINS_BONES_ALOT, //skip this
    SKELETON_REMAINS_LOTS_OF_SKULLS, //never see this
    SPIDER_WEB_UPPER_LEFT = 50,
    SPIDER_WEB_UPPER_RIGHT,
    SPIDER_WEB_LOWER_RIGHT,
    SPIDER_WEB_LOWER_LEFT


}

export const SPRITE_WIDTH: number = 24;
export const SPRITE_HEIGHT: number = 24;


export interface Sprite {
    id: BaseImageOrientation;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface ImageSprites {
    img: HTMLImageElement;
    sprites: Sprite[];
    select(id: BaseImageOrientation): Sprite | null;
}


export function crypt_floor(img: HTMLImageElement): ImageSprites {
    return {
        img: img,
        sprites: [{
            id: BaseImageOrientation.TOP_LEFT_CORNER, //╔
            x: 16,
            y: 0,
            w: 1,
            h: 1
        },
        {
            id: BaseImageOrientation.TOP_RIGHT_CORNER, //╗
            x: 17,
            y: 0,
            w: 1,
            h: 1
        },
        {
            id: BaseImageOrientation.TOP_BOTTOM_LEFT_CORNER, //╚
            x: 18,
            y: 0,
            w: 1,
            h: 1
        },
        {
            id: BaseImageOrientation.TOP_BOTTOM_RIGHT_CORNER, //╝  
            x: 19,
            y: 0,
            w: 1,
            h: 1
        },
        {
            id: BaseImageOrientation.WALL_VERT_NORMAL, // ║ 
            x: 14,
            y: 0,
            w: 1,
            h: 1
        },
        {
            id: BaseImageOrientation.WALL_VERT_CRACKED, // ║
            x: 5,
            y: 1,
            w: 1,
            h: 1
        }, {
            id: BaseImageOrientation.WALL_HORIZONTAL_CRACKED, //═
            x: 6,
            y: 1,
            w: 1,
            h: 1
        },
        {
            id: BaseImageOrientation.WALL_HORIZONTAL_CRYPT,
            x: 11,
            y: 0,
            w: 1,
            h: 1
        },
        {
            id: BaseImageOrientation.NORMAL_FLOOR,
            x: 3,
            y: 0,
            w: 1,
            h: 1
        },
        {
            id: BaseImageOrientation.CIRCLE_FLOOR,
            x: 4,
            y: 0,
            w: 1,
            h: 1
        },
        {
            id: BaseImageOrientation.CRACKED_FLOOR,
            x: 5,
            y: 0,
            h: 1,
            w: 1
        },
        {
            id: BaseImageOrientation.HALF_CIRCLE_FLOOR,
            x: 6,
            y: 0,
            w: 1,
            h: 1
        }],
        select: function select(id: BaseImageOrientation): Sprite {
            let value: Sprite = <Sprite>this.sprites.find((itm: Sprite): boolean => {
                return itm.id === id;
            });
            return value;
        }
    };
}

export function crypt_decorations(img: HTMLImageElement): ImageSprites {
    /*
    export interface ImageSprites {
        img: HTMLImageElement;
        sprites: Sprite[];
        select(id: BaseImageOrientation): Sprite | null;
    }*/
    let rc: ImageSprites = {
        img: img,
        sprites: [{
            id: BaseImageOrientation.SKELETON_REMAINS_BONES_SKULL, //╔
            x: 0,
            y: 0,
            w: 1,
            h: 1
        },
        {
            id: BaseImageOrientation.SKELETON_REMAINS_SMALL_02, //╗
            x: 1,
            y: 0,
            w: 1,
            h: 1
        },
        {
            id: BaseImageOrientation.SKELETON_REMAINS_SMALL_03, //╚
            x: 2,
            y: 0,
            w: 1,
            h: 1
        },
        {
            id: BaseImageOrientation.SKELETON_REMAINS_SMALL_04, //╝  
            x: 3,
            y: 0,
            w: 1,
            h: 1
        },
        {
            id: BaseImageOrientation.SKELETON_REMAINS_BONES_ALOT, // ║ 
            x: 4,
            y: 0,
            w: 1,
            h: 1
        },
        {
            id: BaseImageOrientation.SKELETON_REMAINS_LOTS_OF_SKULLS, // ║
            x: 0,
            y: 1,
            w: 1,
            h: 1
        }, {
            id: BaseImageOrientation.SKELETON_REMAINS_BIG_SKULL_ON_BONES, //═
            x: 1,
            y: 1,
            w: 1,
            h: 1
        },
        {
            id: BaseImageOrientation.SKELETON_REMAINS_SMALL_05,
            x: 5,
            y: 2,
            w: 1,
            h: 1
        },
        {
            id: BaseImageOrientation.SPIDER_WEB_UPPER_LEFT,
            x: 0,
            y: 3,
            w: 1,
            h: 1
        },
        {
            id: BaseImageOrientation.SPIDER_WEB_UPPER_RIGHT,
            x: 1,
            y: 3,
            w: 1,
            h: 1
        },
        {
            id: BaseImageOrientation.SPIDER_WEB_LOWER_LEFT,
            x: 3,
            y: 3,
            h: 1,
            w: 1
        },
        {
            id: BaseImageOrientation.SPIDER_WEB_LOWER_RIGHT,
            x: 2,
            y: 3,
            w: 1,
            h: 1
        }],
        select: function select(id: BaseImageOrientation): Sprite {
            let value: Sprite = <Sprite>this.sprites.find((itm: Sprite): boolean => {
                return itm.id === id;
            });
            return value;
        }
    };
    return rc;
}
