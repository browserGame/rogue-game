import * as dotProp from 'dot-prop';
import { IMouseCoords } from './IMouseCoords';

export function mouseCoordsToProps(state: any): IMouseCoords {
  const c = dotProp.get(state, 'ui.global.mouse.coords');

  return {
    gx: c.mx,
    gy: c.my,
    state: c.state
  };
}
