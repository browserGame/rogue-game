import {
    Animation,
    IAnimationData,
    SpriteSheet
} from '~instrumentation';

const gCache = new Map<string, AnimationSheet>();

export function getAnimationSheetByName(url: string) {
    return gCache.get(url);
  }

export function removeAnimationSheetByName(url: string) {
    return gCache.delete(url);
  }

export class AnimationSheet {
  private _name: string;
  private animations: Map<string, Animation>;

  public constructor(sheetName: string, anims: IAnimationData[]) {
    this._name = sheetName;
    this.animations = new Map(
      anims.map(a => [a.name, new Animation(a)] as [string, Animation])
    );
    gCache.set(sheetName, this);
  }

  public CSSAscii(exclusion?: string[]): string {
    if (!this.animations.size) {
      return `
    /* no sprite sheet detected for this animation sheet */
    `;
    }
    // Generate all sprite sheet headers
    const set = new Set<SpriteSheet>();
    const allAnims = Array.from(this.animations.values()).filter(f =>
      f.hasValidFrames()
    );

    allAnims.reduce((collector, anim) => {
      collector.add(anim.spriteSheet);

      return collector;
    },              set);

    const cssSpriteSheets = Array.from(set.values())
      .map(h => h.renderCSSparts(exclusion))
      .join('\n');

    const cssAnims = allAnims.map(m => m.asCSSStyleSheetSnippets()).join('\n');

    // Here we put it all together
    return `
    ${cssSpriteSheets}

    /*
    Animations part
    Animations part
    Animations part
    */

    ${cssAnims}
    `;

    // Console.log({ headers, cssAnims, allSizes, allSizesStrings });
    // Return '';
  }

  public get(animName: string) {
    return this.animations.get(animName);
  }
}
