import * as fs from 'fs';
import * as path from 'path';

import {
  AnimationSheet,
  createSpriteSheet,
  fixture,
  IAnimationData,
  IAnimationFrameData,
  IEntities
} from './';

export function createStyleSheets(createFiles: boolean = true): Promise<any> {
  if (typeof process.env.CSSDIR !== 'string') {
    return Promise.reject(
      'process.env.CSSDIR is not defined, please check your webpack config'
    );
  }

  const anims: { [index: string]: any } = {}; // Will hold xml data of .anim files
  const singleSheets: { [index: string]: any } = {}; // Will hold xml data of .sheet files
  const animKeys: string[] = [];
  const sheetKeys: (keyof IEntities)[] = [];
  Object.keys(fixture)
    .filter((f: keyof IEntities) => /\.anim$/.test(f))
    .reduce((c, m: keyof IEntities) => {
      animKeys.push(m.replace(/\.anim$/, ''));
      c[m] = fixture[m];
      const sheet: keyof IEntities = m.replace(
        /\.anim$/,
        '.sheet'
      ) as keyof IEntities;
      c[sheet] = fixture[sheet];

      return c;
    },      anims);

  Object.keys(fixture)
    .filter(f => !(f in anims))
    .reduce((c, m) => {
      sheetKeys.push(m.replace(/\.sheet$/, '') as any);
      c[m] = fixture[m as keyof IEntities];

      return c;
    },      singleSheets);

  animKeys.forEach(anim => {
    const png = `${anim}.png`;
    const sheetKey = `${anim}.sheet`;
    const animKey = `${anim}.anim`;

    const xmlAnim = anims[animKey].asset;
    const xmlSheet = anims[sheetKey].asset;
    const props = anims[animKey].props;

    createSpriteSheet(anim, xmlSheet, props);

    const spriteNames: string[] = [];

    const animData: IAnimationData[] = xmlAnim.anims.anim.map((m: any) => {
      const rc: IAnimationData = {
        frame: (function im() {
          const frames = !(m.frame instanceof Array) ? [m.frame] : m.frame;
          const frameData: IAnimationFrameData[] = frames.map((fr: any) => {
            const afd: IAnimationFrameData = {
              duration: fr.$.duration,
              spriteName: fr._
            };

            return afd;
          });

          return frameData;
        })(),
        loop: m.$.loop,
        name: m.$.name,
        playMode: m.$.play_mode,
        spriteSheetName: `${m.$['sprite_sheet']}.png`
      };
      spriteNames.push(...rc.frame.map(fr => fr.spriteName));

      return rc;
    });

    const animations = new AnimationSheet(png, animData);
    // Console.log({ spriteNames });
    // Console.log({ animations });
    // Console.log({ enemySprites });
    // Console.log({ spriteNames });
    // Console.log(animations.CSSAscii(spriteNames));
    if (createFiles && process.env.CSSDIR) {

      fs.writeFileSync(
          path.join(<string> process.env.CSSDIR, `${anim}.scss`),
          animations.CSSAscii(spriteNames),
          'utf-8'
        );
    }
  });

  sheetKeys.forEach(sheet => {
    const sheetKey = `${sheet}.sheet`;
    const xmlSheet = singleSheets[sheetKey].asset;
    const props = singleSheets[sheetKey].props;

    const spSheet = createSpriteSheet(sheet, xmlSheet, props);
    if (createFiles && process.env.CSSDIR) {
      fs.writeFileSync(
        path.join(<string> process.env.CSSDIR, `${sheet}.scss`),
        spSheet.renderCSSparts(),
        'utf-8'
      );
    }
  });

  return Promise.resolve(true);
}
