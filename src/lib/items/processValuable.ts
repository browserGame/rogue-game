'use strict';
import { IGeneralContainer, IGFragment, IItem, isRoom } from '~items';

import { IVector } from '~math';

import {
  IAllValuebles,
  IColorCoinType,
  IColorStonesType,
  isCoin,
  isStone
} from '~symbols';


export interface IItemValuable extends IItem {
  credit: number;
  color: IColorCoinType | IColorStonesType;
}

export function processValuable(
  _matrix: string[],
  _width: number,
  container: IGeneralContainer,
  coords: IVector[],
  si: IAllValuebles
) {

  const shadow = {
    L: true,
    M: false
  };

  const select = {
    L: {
      blue: 4,
      gray: 1,
      green: 2,
      purple: 7,
      red: 5,
      white: 6,
      yellow: 3
    },
    M: {
      gold: 3,
      gray: 6,
      yellow: 10
    }
  };

  const className = (() => {
    if (isStone(si)) {
      return `treasure_stone_${select.L[si.color]}`;
    }
    if (isCoin(si)) {
      return `gold_${select.M[si.color]}`;
    }
    throw new Error(`wrong valuable type: ${JSON.stringify(si)}`);
  })();

  const gui: IGFragment = {
    auxClassNames: ['common_items', className],
    hasShadow: shadow[si.e],
    left: 0,
    size: ['fsc3', 'pccs3'],
    top: 0,
    zIndex: 0
  };

  if (gui.hasShadow) {
    gui.auxClassNames.push('shadow2p5s20');
  }

  const itm: IItemValuable = {
    color: si.color,
    credit: si.credit,
    gui,
    p: coords[0],
    tag: si.e
  };
  //
  //
  const { x, y } = coords[0];
  //
  //  Not hidden it is on the playboard
  //
  if (x >= 0 && y >= 0 && isRoom(container)) {
    const drops = container.getNameSpace('drops');
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

  console.log(
    'Error, not a valid portal its not positioned on a floor tile:',
    JSON.stringify(itm)
  );
}
