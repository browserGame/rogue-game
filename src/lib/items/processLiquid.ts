'use strict';
import { floorExtrusion, IGFragment, IItem, Room } from '~items';

import { IVector } from '~math';

import { IAllLiquids } from '~symbols';

import { coordsNoExtrusions } from '~utils';

export interface IItemLiquid extends IItem {
  br: IVector;
}

export function processLiquid(
  _matrix: string[],
  _width: number,
  room: Room,
  coords: IVector[],
  si: IAllLiquids
) {
  const { isValid, first, last } = coordsNoExtrusions(coords);

  if (!isValid) {
    console.log(
      `room: ${room.pk} has an invalid liquid (${first.x},${first.y})->(${last.x},${last.y}) ${JSON.stringify(
        coords
      )}`
    );

    return; // Do nothing
  }

  const NS = {
    '$': 'liquid_acid',
    '(': 'liquid_lava',
    'O': 'liquid_water',
    '£': 'liquid_swamp'
  };

  const gui: IGFragment = {
    auxClassNames: [NS[si.e]],
    left: 0,
    size: ['pccs3', 'fsc3'],
    top: 0,
    zIndex: 0
  };

  const itm: IItemLiquid = { tag: si.e, p: first, br: last, gui };
  console.log({ liquid: itm });
  floorExtrusion(room, itm);
  const liquid = room.getNameSpace('liquid');
  liquid.push(itm);
}
