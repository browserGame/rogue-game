import { ISpriteData, ISpriteSheetPropertyBase, SpriteSheet } from './sprite';

export function createSpriteSheet(
  name: string,
  xmlSheet: any,
  props: ISpriteSheetPropertyBase = {}
): SpriteSheet {
  const png = `${name}.png`;
  // <sheet name="warrior_idle_01" texture="heroes.png" ox="11" oy="24" x="0" y="0" width="24" height="24" />
  const spriteData: ISpriteData[] = xmlSheet.sheets.sheet
    .filter((f: any) => f.$.name)
    .map((m: any) => {
      const rc: ISpriteData = {
        height: m.$.height,
        name: m.$.name,
        ox: m.$.ox,
        oy: m.$.oy,
        textture: png,
        width: m.$.width,
        x: m.$.x,
        y: m.$.y
      };

      return rc;
    });
  /*
            The animationsheet is registered in a singloton map accessible by the functions
            function getAnimationSheetByName(url: string);
            function removeAnimationSheetByName(url: string);
        */

  const spSheet = new SpriteSheet({
    actualUrl: png,
    options: props,
    sprites: spriteData
  });

  return spSheet;
}
