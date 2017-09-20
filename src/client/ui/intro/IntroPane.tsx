import * as React from 'react';
import { cssMap } from '~ui-intro';
import { isNumber , isString } from '~utils';

export class IntroPane extends React.Component {

  private clientX: number;
  private clientY: number;

  public constructor(props: any) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  // Send this client mousemove coords to the children (move)
  public handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    e.persist();
    /*
    const type = e.type;
    const target = e.target;
    const currentTarget = e.currentTarget;
    const eventPhase = e.eventPhase;
    const bubbles = e.bubbles;
    const cancelable = e.cancelable;
    const defaultPrevented = e.defaultPrevented;
    const detail = (e as any).detail;
    const screenX = e.screenX;
    const screenY = e.screenY;
    const pageX = e.pageX;
    const pageY = e.pageY;
    */
    this.clientX = e.clientX;
    this.clientY = e.clientY;


    this.forceUpdate();
  }

  public render() {


    const { introPane: cssPane } = cssMap;

    return (
    <div onMouseMove={this.handleMouseMove}  className={cssPane('intro-pane')}>
        {this.modifyChildren()}
      </div>
    );
  }

  private modifyChildren() {
      return React.Children.map(this.props.children, child => {
      if (isString(child) || isNumber(child)) {
        return child;
      }

      return React.cloneElement(child, {
        mx: this.clientX,
        my: this.clientY
      });
    });
  }
}

