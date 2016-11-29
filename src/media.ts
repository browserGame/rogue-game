


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
    TOP_RIGHT_CORNER,//╗
    TOP_BOTTOM_LEFT_CORNER,//╚
    TOP_BOTTOM_RIGHT_CORNER,////╝ 
    WALL_VERT_NORMAL,//║ //5
    WALL_VERT_CRACKED,//║ //6
    WALL_HORIZONTAL_CRACKED,//═7
    WALL_HORIZONTAL_CRYPT,//═8
    NORMAL_FLOOR,//9
    CIRCLE_FLOOR,//10
    CRACKED_FLOOR,//11
    HALF_CIRCLE_FLOOR//12
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
    select(id:BaseImageOrientation):Sprite|null; 
}


export function crypt_floor(img:HTMLImageElement): ImageSprites {
    return {
        img:img,
        sprites: [{
            id: BaseImageOrientation.TOP_LEFT_CORNER,//╔
            x: 16,
            y: 0,
            w: 1,
            h: 1
        },
        {
            id: BaseImageOrientation.TOP_RIGHT_CORNER,//╗
            x: 17,
            y: 0,
            w: 1,
            h: 1
        },
        {
            id: BaseImageOrientation.TOP_BOTTOM_LEFT_CORNER,//╚
            x: 18,
            y: 0,
            w: 1,
            h: 1
        },
        {
            id: BaseImageOrientation.TOP_BOTTOM_RIGHT_CORNER,//╝  
            x: 19,
            y: 0,
            w: 1,
            h: 1
        },
        {
            id: BaseImageOrientation.WALL_VERT_NORMAL,// ║ 
            x: 14,
            y: 0,
            w: 1,
            h: 1
        },
        {
            id: BaseImageOrientation.WALL_VERT_CRACKED,// ║
            x: 5,
            y: 1,
            w: 1,
            h: 1
        }, {
            id: BaseImageOrientation.WALL_HORIZONTAL_CRACKED,//═
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
        select:function (id:BaseImageOrientation):Sprite|null {
            let value:Sprite = this.sprites.find( (itm:Sprite):boolean =>{
                  return itm.id == id;
            });
            return value;
        }
    };
}
