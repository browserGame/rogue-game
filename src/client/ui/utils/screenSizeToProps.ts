import * as dotProp from 'dot-prop';
import { IScreenSize } from './IScreenSize';

export function screenSizeToProps(state: any): IScreenSize {
  const c = dotProp.get(state, 'ui.global.screen.dim');

  return {
    height: c.height,
    width: c.width
  };
}
