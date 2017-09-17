'use strict';

import * as clone from 'clone';
import { IVector } from '~math';


export function addV(a: IVector, b: IVector): IVector {

    const ans: IVector = clone(a);

    ans.x += b.x;
    ans.y += b.y;

    if (a.z || b.z) ans.z = (ans.z || 0) + (b.z || 0);

    ans.n = 1;

    return ans;
}
