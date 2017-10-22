import { Store } from 'redux';
import { actionScreenResize } from '~actions';
import { debounce } from '~ui-utils';


export function registerOnResize(store: Store<any>): void {
    window.addEventListener('resize', debounce(function he(e: UIEvent) {
       store.dispatch(actionScreenResize());
    }),                     true);
}
