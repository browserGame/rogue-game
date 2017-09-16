'use strict';

import { floorExtrusion, IGFragment, IItem, Room } from '~items';

import { IVector } from '~math';

import { IIndirection, ILevelStairs, ILevelStairsType } from '~symbols';

export interface IItemStairs extends IItem {
  toRoom: number;
  alias?: IIndirection;
  stairs: IIndirection | ILevelStairsType;
  level: number;
}

export function processStairs(
  _matrix: string[],
  _width: number,
  room: Room,
  coords: IVector[],
  si: ILevelStairs
) {
  const gui: IGFragment = {
    auxClassNames: ['floor_crypt', 'stairs_down'],
    left: 0,
    size: ['plts3', 'fsc3'],
    top: 0,
    zIndex: 0
  };

  const itm: IItemStairs = {
    alias: si.m,
    gui,
    level: si.level,
    p: coords[0],
    stairs: si.stairs,
    tag: si.e,
    toRoom: si.toRoom
  };
  console.log({ stairs: itm });
  const stairs = room.getNameSpace('stairs');
  floorExtrusion(room, itm);
  stairs.push(itm);
}
