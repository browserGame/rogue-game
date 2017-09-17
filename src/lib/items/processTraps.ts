// [w] spikes
// [S] bear trap

'use strict';
import { IGFragment, IItem, Room } from '~items';

import { IVector } from '~math';

import { IAllTraps } from '~symbols';

export interface IItemTrap extends IItem {
  delHp: number;
}

export function processTraps(
  _matrix: string[],
  _width: number,
  room: Room,
  coords: IVector[],
  si: IAllTraps
) {
  const select = {
    S: 'hazard_trap', // Beartrap
    w: 'hazard_spikes' // Spikes
  };

  const gui: IGFragment = {
    auxClassNames: ['common_floor_objects', select[si.e]],
    hasShadow: false,
    left: 0,
    size: ['pccs3', 'fsc3'],
    top: 0,
    zIndex: 0
  };

  const itms: IItemTrap[] = coords.map(m => ({
      delHp: si.delHp || 10,
      gui,
      p: m,
      tag: si.e
    }) // Default 10 points lost if not specified
  );
  //
  const err = itms.filter(f => {
    const other = room.getContentAt(f.p, '.'); // Must be on a floor (carpets etc extrude objects anyway)

    return !other ? true : false;
  });

  // Show errors
  console.log({ 'error-traps': JSON.stringify(err) });
  //
  if (err.length === 0) {
    const traps = room.getNameSpace('traps');
    traps.push(...itms);
    console.log({ traps: itms });
  }
}
