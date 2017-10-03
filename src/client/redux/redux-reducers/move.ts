import { IMove } from '~actions';


export function reducerMousemove(state = { mx: -1, my: -1 }, action: IMove) {
  switch (action.type === 'EVENT_MOVE') {
    case true:
      return { mx: action.x, my: action.y };
    default:
      return state;
  }
}
