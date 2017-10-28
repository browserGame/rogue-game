import * as React from 'react';
import { connect } from 'react-redux';


import { createCSSClassMapper } from '~css-tools';
import { PI, round, trunc } from '~math';
// I import { resolverMap } from '~ui-dungeon';
import {
  debounce,
  IMouseCoords,
  IScreenSize,
  mouseCoordsToProps,
  screenSizeToProps
} from '~ui-utils';
import { createMouseMoveResponse } from './createMouseMoveResponse';

const css = createCSSClassMapper(
  require('./heroesAndMonsters.scss')
);

function mapStateToProps(state: any) {
   return {...mouseCoordsToProps(state), ...screenSizeToProps(state)};
}

class HeroesAndMonsters extends React.PureComponent<IMouseCoords & IScreenSize> {
  private clientWidth: number;
  private clientHeight: number;
  private html: HTMLDivElement;

  public constructor(props: IMouseCoords & IScreenSize) {
    super(props);
  }

  public render() {


    return (
      <div
        ref={elt => {
          if (elt) this.html = elt;
        }}
        className={css('main')}
      >
      {this.props.children}
      </div>
    );
  }

  public componentDidMount() {
    this.getClientRectDim();
  }

  private getClientRectDim() {
    this.clientWidth = 0;
    this.clientHeight = 0;
    if (this.html) {
      const cR = this.html.getBoundingClientRect();
      this.clientWidth = cR.width;
      this.clientHeight = cR.height;
    }
  }
}

export const CHeroesAndMonsters = connect(mapStateToProps)(
  HeroesAndMonsters
);
