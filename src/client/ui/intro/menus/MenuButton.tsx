'use strict';

import * as React from 'react';
// Import * as ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import { css as cssMain } from '~client';
import { css as cssDungeon } from '~ui-dungeon';
// Import { IMouseCoords, mouseCoordsToProps } from '~ui-utils';

export class MenuButton extends React.PureComponent<{}> {
  public constructor(props: any) {
    super(props);
  }

  public shouldComponentUpdate(np: any) {
    const op = this.props;

    return false;
  }

  public render() {
    const css = cssDungeon['main_menu'];
    const menuNormal = css('main_menu', 'main_menu_selection_btn', 'plts1');
    const style: React.CSSProperties = {
      'align-items': 'center',
      'display': 'flex',
      'justify-content': 'center',
      'position': 'relative'
    };

    return (
      <div style={style} className={menuNormal} >
        <div />
        {this.props.children}
      </div>
    );
  }
}

// Export const CCursor = connect(mouseCoordsToProps)(Cursor);
