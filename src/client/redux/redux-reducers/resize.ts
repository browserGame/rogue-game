import { IActionResize } from '~actions';


export function reducerWindowResize(state = { height: 0, width: 0 }, action: IActionResize) {
  switch (action.type === 'EVENT_RESIZE') {
    case true:
      return { height: action.height, width: action.width };
    default:
      return state;
  }
}
