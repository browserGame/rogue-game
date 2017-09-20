import * as React from 'react';
import { resolverMap } from '~ui-dungeon';
import { cssMap } from '~ui-intro';

function createMouseMoveResponse(p0: number, percentage: number) {
  if (!(percentage > 0 && percentage < 1)) {
    throw new Error(`[percentage] must be in range (0,1) it is: ${percentage}`);
  }

  const alpha = Math.log(percentage);

  if (!Number.isFinite(alpha)) {
    throw new Error(
      'percentage could not be transferred to [exponent alpha] i.e. ln(percentage)'
    );
  }

  return function response(p: number) {
    return Math.sign(p) * (1 - Math.exp(alpha * p));
  };
}

export interface IHeroesAndMonstersProps {
  mx?: number;
  my?: number;
}

export class HeroesAndMonsters extends React.Component<IHeroesAndMonstersProps> {
  private nr: number;
  private width: number;
  private height: number;
  private html: HTMLDivElement | null;

  public constructor(props: any) {
    super(props);
    this.nr = 0;
  }

  public render() {
    this.nr++;
    const { heroesAndMonsters } = cssMap;
    const { cursor, gameMenus: gMenu } = resolverMap;
    console.log(this.clientRect());

    return (
      <div
        ref={r => {
          this.html = r;
        }}
        className={heroesAndMonsters('main')}
      >
        {this.nr}, mx:{this.props.mx},my:{this.props.my}
      </div>
    );
  }

  private clientRect() {
    this.width = 0;
    this.height = 0;
    if (this.html) {
      const cR = this.html.getBoundingClientRect();
      this.width = cR.width;
      this.height = cR.height;

      return cR;
    }
  }
}
