import { IVector } from '~math/IVector';

export function perspective(lensFocus: number, v: IVector): IVector {

    if (!v.z) {
        return v;
    }

    const z = 1 / lensFocus - 1 / v.z;
    const x = z / v.z * v.x;
    const y = z / v.z * v.y ;

    return ({ x, y, z, n: 1 });
}

