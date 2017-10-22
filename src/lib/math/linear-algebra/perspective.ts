import { IVector } from '~math';

/**
 * Using ideal lens model to calculate perspective.
 * Make sure the 3d z coordinate is bigger then the lensfocus
 * 3d coordinate system origin is the center of the lens,
 *  with the positve z axes moving away from the lens
 * @param lensFocus lens focal point distance
 * @param the 3D vector that needs to be projected
 * @return the 2D projected coordinates (z property contains depth information for ordering)
 */
export function perspective(lensFocus: number, v: IVector): IVector {

    if (!v.z) {
        throw TypeError('Illegal Argument [v], vector does not have "z" property');
    }

    const z = 1 / (1 / lensFocus - 1 / v.z);
    const x = z / v.z * v.x;
    const y = z / v.z * v.y ;
    const w = v.w ? z / v.z * v.w : undefined;
    const h = v.h ? z / v.z * v.y : undefined;

    return ({ x, y, z, w, h, n: 1 });
}

