import * as React from 'react';
import { createCSSClassMapper } from '~css-tools';
import { PI, round , trunc } from '~math';
import { resolverMap } from '~ui-dungeon';
import { debounce } from '~ui-utils';

const heroesAndMonsters = createCSSClassMapper(
  require('./heroesAndMonsters.scss')
);


export class HeroesAndMonsters extends React.Component<
  { rotationMapFunction: (x: number, x0: number) => number },
  { mx: number; my: number; gamma: number; phi: number }
> {
  private nr: number;
  private width: number;
  private height: number;
  private oX: number;
  private oY: number;
  private html: HTMLDivElement | null;

  public constructor(props: any) {
    super(props);
    this.nr = 0;
    this.state = { mx: 0, my: 0, gamma: 0, phi: 0 };
    this.handleMouseMove = debounce(this.handleMouseMove.bind(this));
  }

  public handleMouseMove(e: React.MouseEvent<HTMLDivElement>): void {

    this.getClientRectDim();
    console.log(e.bubbles ? 'bubbling' : 'capturing');

    const mx = round(e.clientX - this.oX - this.width / 2, 2);
    const my = round(e.clientY - this.oY - this.height / 2, 2);
    const gamma = this.props.rotationMapFunction(mx, trunc(this.width / 2)) * PI / 2;
    const phi = PI / 16 * (this.props.rotationMapFunction(my, trunc(this.height))) ;
    this.setState({ mx, my, gamma: round(gamma, 4), phi: round(phi, 4) });

  }

  public render() {
    this.nr++;

    return (
      <div
        ref={r => {
          this.html = r;
        }}
        className={heroesAndMonsters('main')}
        onMouseMove={this.handleMouseMove}
      >
        {this.nr}, mx:{this.state.mx},my:{this.state.my}, gamma: {this.state.gamma}, phi: {this.state.phi}
      </div>
    );
  }

  public componentDidMount() {
    this.getClientRectDim(); // Init
  }

  private getClientRectDim() {
    this.width = 0;
    this.height = 0;
    if (this.html) {
      const cR = this.html.getBoundingClientRect();
      this.oX = cR.x || cR.left;
      this.oY = cR.y || cR.top;
      this.width = cR.width;
      this.height = cR.height;
    }
  }
}
