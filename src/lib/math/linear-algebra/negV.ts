import * as clone from 'clone';
import { IVector } from '~math/IVector';

export function negV(a: IVector): IVector {

    const ans: IVector = clone(a);

    ans.x = -ans.x;
    ans.y = -ans.y;

    if (ans.z) ans.z = -ans.z;

    if (ans.n) ans.n = 1;

    return ans;
}
