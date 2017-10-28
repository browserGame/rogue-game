'use strict';

import * as React from 'react';
import { css as cssMain } from '~client';
import { css as cssDungeon } from '~ui-dungeon';

export class QuestForDungeonsLogo extends React.PureComponent<{}> {
  public constructor(props: any) {
    super(props);

  }

  public shouldComponentUpdate(np: any) {
    return false;
  }

  public render() {
    const css = cssDungeon['main_menu'];
    const logo = css('main_menu', 'logo', 'plts1');


    return (
      <div className={logo}>
        <div />
      </div>
    );
  }

}

// Export const CCursor = connect(mouseCoordsToProps)(Cursor);
