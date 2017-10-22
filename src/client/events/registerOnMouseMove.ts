import { Store } from 'redux';
import { actionMouseMove } from '~actions';
import { debounce } from '~ui-utils';

export function registerOnMouseMove(store: Store<any>): void {
    window.addEventListener('mousemove', debounce(function he(e: MouseEvent) {
        store.dispatch(actionMouseMove(e.clientX, e.clientY));
     }),                    true);
}

