import { combineReducers, Reducer } from 'redux';
import { reducerMousemove } from './move';
import { reducerWindowResize } from './resize';

export function finalReducer(): Reducer<{}> {
  return combineReducers({
    ui: combineReducers({
      global: combineReducers({
        mouse: combineReducers({
          coords: reducerMousemove
        }),
        screen: combineReducers({
          dim: reducerWindowResize
        })
      })
    })
  });
}
