

import * as clone from 'clone';

export function dotPath<T>(a: any, path: string): T {

        function _dotp(b: any, ammo: string[]): any {
            if (b === undefined) {
                return clone(b); // Object.assign({}, { ...b });
            }
            if (!ammo.length) {
                return {...b};
            }
            if (!(b instanceof Object)) {
                return undefined;
            }
            const key = ammo.shift() || '';
            const bn = b[key];

            return _dotp(bn, ammo);
        }

        return _dotp(a, (path || '').split('.'));
    }
