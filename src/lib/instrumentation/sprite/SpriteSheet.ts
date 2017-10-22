import {
  IScaleItem,
  ISpriteSheetProperties,
  ISpriteSheetPropertyBase,
  Sprite
} from './';

const gCache = new Map<string, SpriteSheet>();

const CELLSIZE = 24;
// NORMAL = 3;
// BOSS = NORMAL * 2.5 / 2;
// SUPER = NORMAL * (7 / 2);

export function getSpriteSheetByName(url: string) {
  return gCache.get(url);
}

export function removeSpriteSheetByName(url: string) {
  return gCache.delete(url);
}

export class SpriteSheet {
  private _name: string;
  private _actualUrl: string;
  // Private _originalUrl: string; //this could also be a base64 data uri
  private sprites: Map<string, Sprite>;
  private _o: ISpriteSheetPropertyBase;

  public constructor({ actualUrl, sprites, options }: ISpriteSheetProperties) {
    this._o = { ...options };
    Object.freeze(this._o);

    this._name = (actualUrl.match(/(.*)\.png$/i) || [])[1];
    if (!this._name) {
      throw new Error(
        `pngUrl argument has an invalide name , must be '*.png', but is ${actualUrl}`
      );
    }

    this._actualUrl = actualUrl;
    // This._originalUrl = originalUrl;

    this.sprites = new Map<string, Sprite>(
      sprites.map(m => {
        m.textture = actualUrl;

        return [m.name, new Sprite(m)] as [string, Sprite];
      })
    );
    gCache.set(this._actualUrl, this);
  }

  public toString() {
    return JSON.stringify(Array.from(this.sprites.values()));
  }

  public getSprite(spriteName: string) {
    return this.sprites.get(spriteName);
  }

  public get pngUrl() {
    return this._actualUrl;
  }

  public get name() {
    return this._name;
  }

  public renderCommentHeader() {
    return `
/*
   Computer Generated CSS,
   See README.md on how to (re)-generate
*/
`;
  }

  public renderPNGSource() {
    return `
.${this._name} > div:first-child {
   background: url('./${this._name}.png');
   background-origin: border-box;
   image-rendering: pixelated;
   z-index: 1;
}
`;
  }

  public renderCommentGeneralSizing() {
    return `
/*
general sizing
general sizing
general sizing
*/
    `;
  }

  /**
   *
   * Generates [f]ixed [s]ize [c]ontainer [s]cale [n] = (n * 24 )px fixed width and height container cell
   * @param scale multipliction scale x CELLSIZE (24px)
   *  @returns CSS snippet
   */

  public renderFixedSizeContainer(scale: number = 1) {
    return `
/*
fix container size scale ${scale}
*/
.fsc${scale} {
    height: ${CELLSIZE * scale}px !important;
    width: ${CELLSIZE * scale}px !important;
}
`;
  }

  public renderExpandedSize(sizeName: string, si: IScaleItem) {

    if (!si.items) {
      return undefined;
    }
    const _name = sizeName.replace('.', 'p');
    const spriteNames = si.items;
    const sprites = <Sprite[]> spriteNames
      .map(name => this.getSprite(name))
      .filter(f => !!f);
    const spriteSizesScaled = sprites.map((s: Sprite) =>
      s.cssWidthHeight(si.scale)
    );
    // Invert
    const inverted: { [index: string]: string[] } = {};
    spriteSizesScaled.reduce((prev, key, idx) => {
      prev[key] = prev[key] || [];
      prev[key].push(`.${_name}.${sprites[idx].name}`);

      return prev;
    },                       inverted);
    // Inversion complete , render blender
    const css = [];
    for (const key in inverted) {
      const names = inverted[key].join(',\n');
      css.push(`
${names} {
${key}
}
`);
    }

    return css.join('\n');
  }

  /*
   * Generates pltsn = [p]osition [l]eft [t]op, [s]cale n
   *  @param scale multipliction scale x CELLSIZE (24px)
   *  @returns CSS snippet
   */

  public renderPositionLeftTop(scale: number = 1) {
    return `
/*
plts${scale} = [p]osition [l]eft [t]op, [s]cale ${scale}
*/
.plts${scale} > div:first-child {
   transform-origin: 0 0;
   transform: scale(${scale});
   position: absolute;
   left: 0;
   top: 0;
}
`;
  }

  /*
   * Generates pccs[n] = [p]osition [c]enterx [c]entery, [s]cale n
   *  @param scale multipliction scale x CELLSIZE (24px)
   *  @returns CSS snippet
   */

  public renderPositionCenterCenter(scale: number = 1) {
    const _s = `${scale}`.replace('.', 'p');

    return `
/*
 pccs  =[p]osition [c]enter [c]enter, [s]cale
*/

.pccs${_s} > div:first-child {
    transform-origin: 50% 50%;
    transform: translateX(-50%) translateY(-50%) scale(${scale});
    position: absolute;
    left: 50%;
    top: 50%;
}
`;
  }

  /**
   * Generates pxcb<bottom>ps<n> = [p]osition [xc]enter [b]ottom[<bottom>p]ercent [s]cale[n]
   *  @param scale multipliction scale x CELLSIZE (24px)
   *  @param bottom percentage from bottom line
   *  @returns CSS snippet
   */

  public renderPositionCenterBottom(
    scale: number = 1,
    bottom: number = 30,
    hasRightLooking: boolean = false
  ) {
    const b = `${bottom}`.replace('.', 'p');
    const s = `${scale}`.replace('.', 'p');
    const snips = [];
    snips.push(`
/*
 xcbXsY = [p]osition [xc]enter [b]ottom[Xp]ercent, [s]cale [Y]
*/

.pxcb${s}s${b} > div:first-child {
    transform-origin: 50% 100%;
    transform: translateX(-50%) translateY(0) scale(${scale});
    position: absolute;
    left: 50%;
    bottom: ${bottom}%;
}
`);
    hasRightLooking &&
      snips.push(`
.pxcb${s}s${b}.right > div:first-child {
    transform: translateX(-50%) translateY(0) scaleX(-1) scale(${scale});
}
`);

    return snips.join('\n');
  }

  public renderCommentStaticSprites() {
    return `
/*
Static Sprites
Static Sprites
Static Sprites
*/
`;
  }

  public renderCommentExpandedSizes() {
    return `
/*
Expanded sizes
Expanded sizes
Expanded sizes
*/
`;
  }

  public renderCSSparts(exclusion?: string[]) {
    const allSnippets: string[] = [
      this.renderCommentHeader(),
      this.renderPNGSource()
    ];

    const fsc =
      this._o.fsc &&
      this._o.fsc.map(m => this.renderFixedSizeContainer(m.scale));
    const plts =
      this._o.plts &&
      this._o.plts.map(m => this.renderPositionLeftTop(m.scale));
    const pccs =
      this._o.pccs &&
      this._o.pccs.map(m => this.renderPositionCenterCenter(m.scale));
    const pxcb =
      this._o.pxcb &&
      this._o.pxcb.map(m =>
        this.renderPositionCenterBottom(
          m.scale.s,
          m.scale.perc,
          m.lookToTheRight
        )
      );
    const shadow =
      this._o.shadow &&
      this._o.shadow.map(m => this.renderShadow(m.scale.s, m.scale.perc));

    const select = { fsc, plts, pccs, pxcb, shadow };

    for (const css in select) {
      if ((select as any)[css]) {
        (select as any)[css].forEach((d: string) => allSnippets.push(d));
      }
    }

    const exclusionObj: { [index: string]: string } = {};

    if (exclusion) {
      exclusion.reduce((c, str) => {
        c[str] = '';

        return c;
      },               exclusionObj);
    }
    const sprites: Sprite[] = Array.from(this.sprites.values()).filter(
      f => !(f.name in exclusionObj)
    );

    const spriteList = sprites.map(m => m.fullCSS).join('\n');

    allSnippets.push(
      this.renderCommentStaticSprites(),
      spriteList,
      this.renderCommentExpandedSizes()
    );

    // Get cross product scale and sprite dimensions

    /*const fscExpanded =
      this._o.fsc &&
      this._o.fsc.map(m => this.renderExpandedSize(`fsc${m.scale}`, m));*/
    const pltsExpanded =
      this._o.plts &&
      this._o.plts.map(m => this.renderExpandedSize(`plts${m.scale}`, m));
    const pccsExpanded =
      this._o.pccs &&
      this._o.pccs.map(m => this.renderExpandedSize(`pccs${m.scale}`, m));
    const pxcbExpanded =
      this._o.pxcb &&
      this._o.pxcb.map(m => {
        const _p = `${m.scale.perc}`.replace('.', 'p');

        return this.renderExpandedSize(`pxcb${m.scale.s}s${_p}`, {
          items: m.items,
          scale: m.scale.s
        });
      });

    const selectExpanded = {
      /* fscExpanded, */
      pccsExpanded,
      pltsExpanded,
      pxcbExpanded
    };

    for (const css in selectExpanded) {
      if ((selectExpanded as any)[css]) {
        (selectExpanded as any)[css].forEach((d: string) =>
          allSnippets.push(d)
        );
      }
    }

    return allSnippets.join('\n');
  }


  private renderShadow(scale: number = 1, bottom = 12.5) {
    const _s = `${bottom}`.replace('.', 'p');
    const _sc = `${scale}`.replace('.', 'p');

    return `
.shadow${_sc}s${_s} > div:last-child {
    background: url('./shadow.png');
    background-origin: border-box;
    background-position: -0px -0px;
    /* */
    transform-origin: 50% 50%;
    transform: translateX(-50%) translateY(0) scale(${scale});
    /* */
    width: 24px;
    height: 10px;
    left: 50%;
    bottom: ${bottom - 5}%;
    /* */
    image-rendering: pixelated;
    position: absolute;
    z-index: 0;
    opacity: 0.5;
}
`;
  }

}
