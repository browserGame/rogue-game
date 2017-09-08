function stickyNull(f: Function, ...p: number[]) {
    let rc = f(...p);
    if (Math.abs(rc) < Number.EPSILON) {
        rc = 0;
    }
    return rc;
}

const cos = stickyNull.bind(undefined, Math.cos);
const sin = stickyNull.bind(undefined, Math.sin);
const d2r = Math.PI / 180;

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



export class Matrix {

    private m: number[];
    private _cols: number;
    private _rows: number;

    private init(matrix?: Matrix) {

        if (matrix) {
            this.m = matrix.m.slice(0);
            this._cols = matrix.cols;
            this._rows = matrix.rows;
            return;
        }
        this.identity(0);
    }

    get [Symbol.toStringTag]() {
        return 'Matrix';
    }

    public get cols() {
        return this._cols;
    }

    public get rows() {
        return this._rows;
    }

    public get data() {
        return { c: this._cols, r: this._rows, m: this.m.slice(0) };
    }

    public set data({ c, r, m }) {
        if (m.length !== c * r) {
            throw new TypeError(`set data, Dimensions of matrix data dont match c:${c}, r:${r}, numCells:${m.length}`);
        }
        this._cols = c;
        this._rows = r;
        this.m = !m ? new Array(c * r).fill(0) : m.slice(0);
    }

    public rowd(i: number) {
        if (i >= this._rows) {
            return [];
        }
        return this.m.slice(i * this._cols, this._cols);
    }

    public cold(i: number) {
        if (i >= this._cols) {
            return [];
        }
        let rc = new Array(this._cols).fill(0);
        rc.forEach((_, idx, arr) => arr[idx * this._cols + i]);
        return rc;
    }

    public identity(rank: number) {
        this.m = new Array(rank * rank).fill(0);
        this._cols = rank;
        this._rows = rank;
        for (let i = 0; i < rank; i++) {
            this.m[i * rank + i] = 1;
        }
        return this;
    }

    public mul(m2: Matrix) {

        if (this._cols !== m2.rows) {
            throw new TypeError(`matrices cannot be multiplied m1.cols:${this._cols} !== m2.rows:${m2.rows}.`);
        }

        let rc = new Array(this._rows * m2.cols).fill(0);

        for (let i = 0; i < this._rows; i++) {
            for (let j = 0; j < m2.cols; j++) {
                for (let k = 0; k < this._cols; k++) {
                    rc[i * m2.cols + j] += this.m[this._cols * i + k] * m2.m[m2.rows * j + k];
                }
            }
        }

        this.m = rc;
        this._cols = m2.cols;
        return this;
    }

    contructor(matrix?: Matrix) {
        this.init(matrix);
    }

    public rotateY(p: number) {
        let rc = new Matrix();
        let sp = sin(p);
        let cp = cos(p);
        rc.data = {
            c: 4,
            r: 4,
            m: [
                cp, 0, sp, 0,
                0, 1, 0, 0,
                -sp, 0, cp, 0,
                0, 0, 0, 1
            ]
        };
        return rc.mul(this);
    }
    public rotateYd(p: number) {
        return this.rotateY(p * d2r);
    }
    public rotateZ(p: number) {
        let rc = new Matrix();
        let sp = sin(p);
        let cp = cos(p);
        rc.data = {
            c: 4,
            r: 4,
            m: [
                cp, -sp, 0, 0,
                sp, cp, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ]
        };
        return rc.mul(this);
    }

    public rotateZd(p: number) {
        return this.rotateZ(p * d2r);
    }

    public rotateX(p: number) {
        let rc = new Matrix();
        let sp = sin(p);
        let cp = cos(p);
        rc.data = {
            c: 4,
            r: 4,
            m: [
                1, 0, 0, 0,
                0, cp, -sp, 0,
                0, sp, cp, 0,
                0, 0, 0, 1
            ]
        };
        return rc.mul(rc);
    }
    public rotateXd(p: number) {
        return this.rotateX(p * d2r);
    }

}

