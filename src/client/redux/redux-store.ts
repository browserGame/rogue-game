import { createStore, Store } from 'redux';
import { finalReducer } from '~reducers';

export const  store: Store<{}> = createStore(finalReducer());
