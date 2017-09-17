'use strict';
import { IGFragment, IItem, Room } from '~items';
import { IVector } from '~math';

import { IAllFloorGlyphs } from '~symbols';

export interface IItemFloor extends IItem {
  enabled: boolean;
}

export function processFloorGlyphs(
  _matrix: string[],
  _width: number,
  room: Room,
  coords: IVector[],
  si: IAllFloorGlyphs
) {
  /*
   export type RedPentagram = FloorGlyphs<'I'>;
   export type HalfMoonTrap = FloorGlyphs<'m'>;
   export type Pentagram = FloorGlyphs<'R'>;
   export type AllGlyphs = RedPentagram | HalfMoonTrap | Pentagram |DungeonEntrance;
 */
  const select = {
    'I': 'star_block',
    'm': 'moon_block',
    'R': 'shrine',
    '²': 'dungeon_entrance'
  };

  const itms: IItemFloor[] = coords.map(m => {
    const gui: IGFragment = {
        auxClassNames: ['common_floor_objects', select[si.e]],
        hasShadow: false,
        left: 0,
        size: ['pccs3', 'fsc3'],
        top: 0,
        zIndex: 0
   };

    return {
      enabled: false,
      gui,
      p: m,
      tag: si.e
    };


});
  //
  const err = itms.filter(f => {
    const other = room.getContentAt(f.p, '.é'); // Must be on a floor or carpet

    return !other ? true : false;
  });
  //
  //
  console.log({ 'error-traps': JSON.stringify(err) });
  //
  if (err.length === 0) {
    const fglyphs = room.getNameSpace('floor-glyphs');
    fglyphs.push(...itms);
    console.log({ traps: itms });
  }
}
