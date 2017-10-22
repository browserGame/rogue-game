import { IEntities } from './';

export const fixture: IEntities = {
  // Animations
  // tslint:disable:object-literal-sort-keys
  'common_floor_objects.anim': {
    asset: require('~assets/common_floor_objects.anim'),
    props: {
      fsc: [{ scale: 3 }],
      pccs: [{ scale: 3 }],
      plts: [
        {
          items: [
            'carpet_red',
            'carpet_blue',
            'carpet_red_horizontal',
            'carpet_blue_horizontal',
            'carpet_red_square',
            'carpet_blue_square',
            'hazard_spikes',
            'hazard_trap'
          ],
          scale: 3
        }
      ],
      pxcb: [{ scale: { s: 3, perc: 30 } }],
      shadow: [{ scale: { s: 3, perc: 30 } }]
    }
  },
  'common_floor_objects.sheet': {
    asset: require('~assets/common_floor_objects.sheet'),
    props: {} // Copy from anim
  },
  'dungeon_objects.anim': {
    asset: require('~assets/dungeon_objects.anim'),
    props: {
      fsc: [{ scale: 3 }],
      pccs: [{ scale: 3 }],
      plts: [{ scale: 3 }],
      pxcb: [{ scale: { s: 3, perc: 30 } }],
      shadow: [{ scale: { s: 3, perc: 30 } }]
    }
  },
  'dungeon_objects.sheet': {
    asset: require('~assets/dungeon_objects.sheet'),
    props: {}
  },
  'enemies.anim': {
    asset: require('~assets/enemies.anim'),
    props: {
      fsc: [{ scale: 3 }],
      pxcb: [
        { scale: { s: 3, perc: 30 }, lookToTheRight: true },
        { scale: { s: 3.75, perc: 30 }, lookToTheRight: true },
        { scale: { s: 10.5, perc: 30 }, lookToTheRight: true }
      ],
      shadow: [
        { scale: { s: 3, perc: 30 } },
        { scale: { s: 3.75, perc: 30 } },
        { scale: { s: 10.5, perc: 30 } }
      ]
    }
  },
  'enemies.sheet': {
    asset: require('~assets/enemies.sheet'),
    props: {}
  },
  'heroes.anim': {
    asset: require('~assets/heroes.anim'),
    props: {
      fsc: [{ scale: 3 }],
      pxcb: [
        { scale: { s: 3, perc: 30 }, lookToTheRight: true },
        { scale: { s: 3.75, perc: 30 }, lookToTheRight: true },
        { scale: { s: 10.5, perc: 30 }, lookToTheRight: true }
      ],
      shadow: [{ scale: { s: 3, perc: 30 } }]
    }
  },
  'heroes.sheet': { asset: require('~assets/heroes.sheet'), props: {} },

  'liquid_acid.anim': {
    asset: require('~assets/liquid_acid.anim'),
    props: {
      fsc: [{ scale: 3 }],
      pccs: [{ scale: 3 }]
    }
  },
  'liquid_acid.sheet': {
    asset: require('~assets/liquid_acid.sheet'),
    props: {}
  },
  'liquid_lava.anim': {
    asset: require('~assets/liquid_lava.anim'),
    props: {
      fsc: [{ scale: 3 }],
      pccs: [{ scale: 3 }]
    }
  },
  'liquid_lava.sheet': {
    asset: require('~assets/liquid_lava.sheet'),
    props: {}
  },
  'liquid_swamp.anim': {
    asset: require('~assets/liquid_swamp.anim'),
    props: {
      fsc: [{ scale: 3 }],
      pccs: [{ scale: 3 }]
    }
  },
  'liquid_swamp.sheet': {
    asset: require('~assets/liquid_swamp.sheet'),
    props: {}
  },
  'liquid_water.anim': {
    asset: require('~assets/liquid_water.anim'),
    props: {
      fsc: [{ scale: 3 }],
      pccs: [{ scale: 3 }]
    }
  },
  'liquid_water.sheet': {
    asset: require('~assets/liquid_water.sheet'),
    props: {}
  },
  //
  // Not anims...
  //

  'common_items.sheet': {
    asset: require('~assets/common_items.sheet'),
    props: {
      fsc: [{ scale: 3 }],
      pccs: [{ scale: 3 }],
      plts: [{ scale: 3 }],
      pxcb: [{ scale: { s: 3, perc: 30 } }],
      shadow: [{ scale: { s: 2.5, perc: 20 } }]
    }
  },
  'dungeon_decor_props.sheet': {
    asset: require('~assets/dungeon_decor_props.sheet'),
    props: {
      fsc: [{ scale: 3 }],
      pccs: [{ scale: 3 }]
    }
  },
  'equipment.sheet': {
    asset: require('~assets/equipment.sheet'),
    props: {
      fsc: [{ scale: 3 }],
      pxcb: [{ scale: { s: 3, perc: 30 } }],
      shadow: [{ scale: { s: 2.5, perc: 20 } }]
    }
  },
  'floor_crypt.sheet': {
    asset: require('~assets/floor_crypt.sheet'),
    props: {
      fsc: [{ scale: 3 }],
      plts: [{ scale: 3 }]
    }
  },
  'main_menu_background.sheet': {
    asset: require('~assets/main_menu_background.sheet'),
    props: {
      fsc: [{ scale: 3 }, { scale: 2 }, { scale: 1 }],
      pccs: [
        {
          items: ['shaman', 'assassin', 'warrior', 'wizard'],
          scale: 3
        },
        {
          items: ['shaman', 'assassin', 'warrior', 'wizard'],
          scale: 2
        },
        {
          items: ['shaman', 'assassin', 'warrior', 'wizard'],
          scale: 1
        },
        {
          items: ['shaman', 'assassin', 'warrior', 'wizard'],
          scale: 0.6
        }
      ]
    }
  },
  'main_menu_background_3ds.sheet': {
    asset: require('~assets/main_menu_background_3ds.sheet'),
    props: {
      fsc: [{ scale: 3 }, { scale: 1 }],
      pccs: [{ scale: 3 }, { scale: 1 }]
    }
  },
  'main_menu_background_compact.sheet': {
    asset: require('~assets/main_menu_background_compact.sheet'),
    props: {
      fsc: [{ scale: 3 }, { scale: 2 }, { scale: 1 }],
      pccs: [
        {
          items: ['shaman', 'assassin', 'warrior', 'wizard'],
          scale: 3
        },
        {
          items: ['shaman', 'assassin', 'warrior', 'wizard'],
          scale: 2
        },
        {
          items: ['shaman', 'assassin', 'warrior', 'wizard'],
          scale: 1
        },
        {
          items: ['shaman', 'assassin', 'warrior', 'wizard'],
          scale: 0.6
        }
      ]
    }
  },
  'cursor.sheet': {
    asset: require('~assets/cursor.sheet'),
    props: {
      fsc: [{ scale: 3 }, { scale: 1 }],
      plts: [
        { scale: 3, items: ['cursor', 'cursor_click', 'cursor_attack'] },
        { scale: 1, items: ['cursor', 'cursor_click', 'cursor_attack'] }
      ]
      // X  pccs: [{ scale: 3 }, { scale: 1 }]
    }
  },
  'alert_icons.sheet': {
    asset: require('~assets/alert_icons.sheet'),
    props: {
      fsc: [{ scale: 3 }, { scale: 1 }],
      pccs: [{ scale: 3 }, { scale: 1 }]
    }
  },
  'game_menus.sheet': {
    asset: require('~assets/game_menus.sheet'),
    props: {
      fsc: [{ scale: 3 }, { scale: 1 }],
      plts: [
        {
          scale: 3,
          items: ['pause_menu_btn_bkg', 'pause_menu_btn_bkg_over']
        },
        {
          scale: 1,
          items: ['pause_menu_btn_bkg', 'pause_menu_btn_bkg_over']
        }
      ]
    }
  }
};

Object.freeze(fixture);
