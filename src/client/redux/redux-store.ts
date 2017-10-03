import { createStore, Store } from 'redux';
import { composeWithDevTools  } from 'redux-devtools-extension';
import { finalReducer } from '~reducers';


export const  store: Store<{}> = createStore(finalReducer(), composeWithDevTools());
