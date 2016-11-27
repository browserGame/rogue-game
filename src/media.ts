


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

/**
   
  
  
  
 */


export function crypt_floor(): any {
    return {
        url: "/vendor/floor_crypt.png",
        items: {
            top_top_left_corner: {
                x: 384,
                y: 0,
                w: 24,
                h: 24
            },
            top_top_right_corner: {
                x: 408,
                y: 0,
                w: 24,
                h: 24
            },
            top_bottom_left_corner: {
                x: 432,
                y: 0,
                w: 24,
                h: 24
            },
            top_bottom_right_corner: {
                x: 456,
                y: 0,
                w: 24,
                h: 24
            },
            wall_side_1: {
                x: 336,
                y: 0,
                w: 24,
                h: 24
            },
            wall_side_2: {
                x: 120,
                y: 24,
                w: 24,
                h: 24
            },
            top_top_2: {
                x: 144,
                y: 24,
                w: 24,
                h: 24
            },
            top_top_1: {
                x: 264,
                y: 24,
                w: 24,
                h: 24
            },
            normal_floor: {
                x: 72,
                y: 0,
                w: 24,
                h: 24
            },
            circle_floor: {
                x: 96,
                y: 0,
                w: 24,
                h: 24
            },
            cracked_floor: {
                x: 120,
                y: 0,
                h: 24,
                w: 24
            },
            half_circle_foor: {
                x: 144,
                y: 0,
                w: 24,
                h: 24
            }
        }
    };
}
