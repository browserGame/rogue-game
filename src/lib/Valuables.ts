'use strict';
import {
    isRoom,
    getNameSpace,
    $Item,
    $GFragment
} from './Room';

import {
    Vector
} from './math';

import {
    AllValuebles,
    ColorCoinType,
    ColorStonesType,
    isCoin,
    isStone,
    Stone,
    Coin

} from './Symbols';

import {
    GeneralContainer
} from './GeneralContainer';



export interface $ItemValuable extends $Item {
    credit: number;
    color: ColorCoinType | ColorStonesType;
}



export function processValuable(_matrix: string[], _width: number, container: GeneralContainer, coords: Vector[], si: AllValuebles) {


    /**  common_items
     * treasure_stone_1 : gray
     * " 2 green
     * " 3 yellow
     *   4 blue
     *   5 red
     *   6 white
     *   7 purple
     * 
     *  .gold_3 , gold
     *  .gold_6 , gray
     *  .gold_10 , yellow
    */

    const shadow = {
        L: true,
        M: false,
    };

    const select = {
        L: {
            gray: 1,
            green: 2,
            yellow: 3,
            blue: 4,
            red: 5,
            white: 6,
            purple: 7,
            // gold:0
        },
        M: {
            gold: 3,
            gray: 6,
            yellow: 10
        }
    };

    let className = (() => {
        if (isStone(si)) {
            return `treasure_stone_${select.L[(<Stone>si).color]}`;
        }
        if (isCoin(si)) {
            return `gold_${select.M[(<Coin>si).color]}`;
        }
        throw new Error(`wrong valuable type: ${JSON.stringify(si)}`);
    })();

    let gui: $GFragment = {
        size: ['fsc3', 'pxcycs3'],
        auxClassNames: ['common_items', className],
        left: 0,
        top: 0,
        zIndex: 0,
        hasShadow: shadow[si.e]
    };

    let itm: $ItemValuable = {
        tag: si.e,
        p: coords[0],
        credit: si.credit,
        gui,
        color: si.color
    };
    //
    //
    let { x, y } = coords[0];
    //
    //  Not hidden it is on the playboard
    //
    if (x >= 0 && y >= 0 && isRoom(container)) {
        let drops = getNameSpace(container, 'drops');
        drops.push(itm);
        console.log('drops', JSON.stringify(itm));
        return;
    }
    //
    // 
    //
    if (!isRoom(container)) {
        container.has.push(itm);
        return;
    }
    console.log('Error, not a valid portal its not positioned on a floor tile:', JSON.stringify(itm));
}
