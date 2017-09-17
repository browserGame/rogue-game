'use strict';

import { IGeneralContents, IGFragment, IItem,  processContents, Room  } from '~items';

import { IVector } from '~math';

import { ISecretPlate } from '~symbols';

export interface IItemSecret extends IItem {
  has: IGeneralContents[];
  hidden: boolean;
}

export function processSecret(
  matrix: string[],
  width: number,
  room: Room,
  coords: IVector[],
  si: ISecretPlate
) {
  const fi = room.getContentAt(coords[0], '.');
  if (!fi) {
    console.log('secret plate only possible on a floor tile:', coords[0]);

    return;
  }

  const gui: IGFragment = {
    auxClassNames: [],
    left: 0,
    size: [],
    top: 0,
    zIndex: 0
  };

  const itm: IItemSecret = {
    gui,
    has: [],
    hidden: true,
    p: coords[0],
    tag: si.e
  };

  if (si.has) si.has.forEach(c => processContents(matrix, width, itm, c));

  // Secret has to be on a tile (prolly has checks for carpets)

  const secret = room.getNameSpace('secret');
  secret.push(itm);
  console.log('secret', JSON.stringify(itm));

  return;
}
