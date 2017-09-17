'use strict';
// tslint:disable:object-literal-key-quotes
import { IGFragment, IItem, Room } from '~items';
import { IVector } from '~math';
import { ISpecialtyItems } from '~symbols';

export interface IItemSpecial extends IItem {
  context: any;
}

export function processSpecial(
  _matrix: string[],
  _width: number,
  room: Room,
  coords: IVector[],
  si: ISpecialtyItems
) {
  const cssSheet = {
    '!': 'common_floor_objects',
    '"': 'common_floor_objects',
    Q: 'common_floor_objects',
    U: 'heroes'
  };

  const select = {
    '!': 'candles',
    '"': 'sign',
    Q: 'quest_stone',
    U: 'shopkeeper_idle'
  };

  const selectContext = {
    '!': undefined,
    '"': undefined,
    Q: { enabled: true },
    U: undefined
  };

  const gui: IGFragment = {
    auxClassNames: ['shadow3s30', cssSheet[si.e], select[si.e] ],
    hasShadow: true,
    left: 0,
    size: ['pxcb3s30', 'fsc3'],
    top: 0,
    zIndex: 0
  };

  if (coords.length !== 1 && 'U"'.indexOf(si.e) >= 0) {
    console.log(
      '%c %s',
      'color:red',
      `room:${room.pk} has wrong number of coords for ${si.e}`
    );

    return;
  }
  //
  //
  const itms = coords.map(c => {
    const itm: IItemSpecial = {
        context: selectContext[si.e],
        gui,
        p: c,
        tag: si.e
    };

    return itm;
  });

  const special = room.getNameSpace('specials');
  special.push(...itms);
  console.log('specials', JSON.stringify(itms));

  return;
}
