import { IResize } from '~actions';


export function reducerWindowResize(state = { height: -1, width: -1 }, action: IResize) {
  switch (action.type === 'EVENT_RESIZE') {
    case true:
      return { height: action.height, width: action.width };
    default:
      return state;
  }
}
