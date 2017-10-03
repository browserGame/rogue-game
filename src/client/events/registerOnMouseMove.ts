import { Store } from 'redux';
import { mouseMove } from '~actions';
import { debounce } from '~ui-utils';

export function registerOnMouseMove(store: Store<any>): void {
    window.addEventListener('mousemove', debounce(function he(e: MouseEvent) {
        store.dispatch(mouseMove(e.clientX, e.clientY));
     }),                    true);
}

