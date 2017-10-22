'use strict';

import * as React from 'react';
import { connect } from 'react-redux';

import { css as cssMain } from '~client';
import { css } from '~ui-cursor';
import { css as cssDungeon } from '~ui-dungeon';
import { IMouseCoords, mouseCoordsToProps } from '~ui-utils';


export class Cursor extends React.PureComponent<IMouseCoords> {
  public constructor(props: IMouseCoords) {
    super(props);
  }

  public render() {

    const position = {
        left: this.props.gx,
        top:  this.props.gy,
        transform: 'translate( -7px , -20px )'
    };

    const cssCursorSprites = cssDungeon['cursor'];
    const spiteNames  = cssCursorSprites('cursor', 'cursor', 'plts1');


    return <div style={position} className={css('cursor')} >
             <div className={spiteNames}>
                <div></div>
             </div>
             <div style={{top: '20px', left: '7px'}}className={cssMain('red-dot', 's5')} />
          </div>;
  }
}

export const CCursor = connect(
  mouseCoordsToProps
)(Cursor);

