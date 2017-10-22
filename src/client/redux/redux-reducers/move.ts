import { IActionMove } from '~actions';


export function reducerMousemove(state = { mx: -100, my: -100 }, action: IActionMove) {
  switch (action.type === 'EVENT_MOVE') {
    case true:
      return { mx: action.x, my: action.y };
    default:
      return state;
  }
}
