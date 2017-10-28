import * as React from 'react';
import { css as cssDungeon } from '~ui-dungeon';

import { css as cssMain } from '~client';


export class VText extends React.PureComponent<{}> {
    public constructor(props: any) {
      super(props);
    }

/*    public shouldComponentUpdate(np: any) {
//      Const op = this.props;
      return false;
    }
*/
    public render() {
      const css = cssDungeon['visitorFonts'];
      const className = [css('f2'), cssMain('s24', 'gray', 'zI1')].join(' ');


      return (
        <span className={className} >{this.props.children}</span>
      );
    }
  }

  // Export const CCursor = connect(mouseCoordsToProps)(Cursor);

