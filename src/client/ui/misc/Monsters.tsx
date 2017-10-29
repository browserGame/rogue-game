'use strict';

import * as React from 'react';
import { css as cssMain } from '~client';
import { css as cssDungeon } from '~ui-dungeon';

export class Monsters extends React.PureComponent {

  public constructor(props: any) {
    super(props);
  }

  public shouldComponentUpdate(np: any) {
    return false;
  }

  public render() {

    const css = cssDungeon['main_menu_background'];

    const logo = [
      css('main_menu_background', 'monsters', 'pccs2'),
      cssMain('zI1', 'rel')
    ].join(' ');


    return (
      <div style={{background: 'white' }} className={logo}>
        <div />
      </div>
    );
  }

}
// Export const CCursor = connect(mouseCoordsToProps)(Cursor);
