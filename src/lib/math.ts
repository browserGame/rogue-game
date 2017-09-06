
const sin = Math.sin;
const cos = Math.cos;


export interface Vector {
    x: number;
    y: number;
}

export function addV(a: Vector, b: Vector): Vector {
    return { x: a.x + b.x, y: a.y + b.y };
}

export function negV(a: Vector): Vector {
    return { x: -a.x, y: -a.y };
}

export function isVector(v: any): v is Vector {
    return v && typeof v.x === 'number' && typeof v.y === 'number';
}

export function inProduct(v1: number[], v2: number[]) {
    return v1[0] * v2[0] + v1[1] * v2[0] + v1[2] * v2[2];
}

export function transpose(m2: number[]): number[] {
    return [
        m2[0], m2[4], m2[8], m2[12],
        m2[1], m2[5], m2[9], m2[13],
        m2[2], m2[6], m2[10], m2[14],
        m2[3], m2[7], m2[11], m2[15],
    ];
}


export function matrixMultmatrix(m1: number[], m2: number[]): number[] {
    let v1 = [
        ...matrix4MultVec4(m1, [m2[0], m2[4], m2[8], m2[12]]),
        ...matrix4MultVec4(m1, [m2[1], m2[5], m2[9], m2[13]]),
        ...matrix4MultVec4(m1, [m2[2], m2[6], m2[10], m2[14]]),
        ...matrix4MultVec4(m1, [m2[3], m2[7], m2[11], m2[15]]),
    ];
    return transpose(v1);
}


function matrix4MultVec4(m1: number[], v: number[]): number[] {
    let rc = new Array(4);
    rc.fill(0);
    for (let i = 0; i < 4; i++) {
        rc[i] = inProduct([m1[4 * i], m1[4 * i + 1], m1[4 * i + 2], m1[4 * i + 3]], v);
    }
    return rc;
}


export class Matrix {



    private m: number[];

    private init() {
        this.m = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    }

    contructor() {
        this.init();
    }

    public rotateY(p: number) {
        let rc = [
            -sin(p), 0, cos(p), 0,
            cos(p), 0, sin(p), 0,
            0, 0, 0, 1
        ];
        this.m = matrixMultmatrix(rc, this.m);
        return this;
    }


}
