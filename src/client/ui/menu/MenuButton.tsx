'use strict';

import * as React from 'react';
// Import * as ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import { css as cssMain } from '~client';
import { css as cssDungeon } from '~ui-dungeon';
import { isNumber, isString } from '~utils';
// Import { IMouseCoords, mouseCoordsToProps } from '~ui-utils';

export class MenuButton extends React.Component<{}> {
  public constructor(props: any) {
    super(props);
    this.decorateText = this.decorateText.bind(this);
  }

  /*public shouldComponentUpdate(np: any) {
    const op = this.props;
    // TODO check children
    return true;
  }*/

  public render() {
    const css = cssDungeon['main_menu'];
    const menuNormal = css('main_menu', 'main_menu_selection_btn', 'plts1');

    const style: React.CSSProperties = {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative'
    };

    return (
      <div style={style} className={menuNormal}>
        <div />
        {this.decorateText()}
      </div>
    );
  }

  private mapTextToVisitor(text: string) {
    const css = cssDungeon['visitorFonts'];
    const className = [css('f1'), cssMain('s22', 'gray', 'zI1')].join(' ');

    return <span className={className}>{text}</span>;
  }

  private decorateText() {
    const css = cssDungeon['visitorFonts'];

    const children = this.props.children;

    if (isString(children) || isNumber(children)) {
      return this.mapTextToVisitor(`${children}`);
    }

    return React.Children.map(children, child => {
      // String
      if (isString(child) || isNumber(child)) {
        return this.mapTextToVisitor(`${child}`);
      }

      if (React.isValidElement(child)) {
         const className: string =
         [(child.props as any).className, css('f1'), cssMain('zI1')].join(' ').trim();

         return React.cloneElement<any, any>(child, { className });
      }
      // Number

      return child;
    });
  }
}

// Export const CCursor = connect(mouseCoordsToProps)(Cursor);
