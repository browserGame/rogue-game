import { cos, DEG2RAD, sin  } from '~math';

export class Matrix {
  private m: number[];
  private _cols: number;
  private _rows: number;


  public get [Symbol.toStringTag]() {
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
      throw new TypeError(
        `set data, Dimensions of matrix data dont match c:${c}, r:${r}, numCells:${m.length}`
      );
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
    const rc = new Array(this._cols).fill(0);
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
      throw new TypeError(
        `matrices cannot be multiplied m1.cols:${this._cols} !== m2.rows:${m2.rows}.`
      );
    }

    const rc = new Array(this._rows * m2.cols).fill(0);

    for (let i = 0; i < this._rows; i++) {
      for (let j = 0; j < m2.cols; j++) {
        for (let k = 0; k < this._cols; k++) {
          rc[i * m2.cols + j] +=
            this.m[this._cols * i + k] * m2.m[m2.rows * j + k];
        }
      }
    }

    this.m = rc;
    this._cols = m2.cols;

    return this;
  }

  public contructor(matrix?: Matrix) {
    this.init(matrix);
  }

  public rotateY(p: number) {
    const rc = new Matrix();
    const sp = sin(p);
    const cp = cos(p);
    rc.data = {
      c: 4,
      m: [cp, 0, sp, 0, 0, 1, 0, 0, -sp, 0, cp, 0, 0, 0, 0, 1],
      r: 4
    };

    return rc.mul(this);
  }
  public rotateYd(p: number) {
    return this.rotateY(p * DEG2RAD);
  }
  public rotateZ(p: number) {
    const rc = new Matrix();
    const sp = sin(p);
    const cp = cos(p);
    rc.data = {
      c: 4,
      m: [cp, -sp, 0, 0, sp, cp, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      r: 4

    };

    return rc.mul(this);
  }

  public rotateZd(p: number) {
    return this.rotateZ(p * DEG2RAD);
  }

  public rotateX(p: number) {
    const rc = new Matrix();
    const sp = sin(p);
    const cp = cos(p);
    rc.data = {
      c: 4,
      m: [1, 0, 0, 0, 0, cp, -sp, 0, 0, sp, cp, 0, 0, 0, 0, 1],
      r: 4

    };

    return rc.mul(rc);
  }
  public rotateXd(p: number) {
    return this.rotateX(p * DEG2RAD);
  }

  private init(matrix?: Matrix) {
    if (matrix) {
      this.m = matrix.m.slice(0);
      this._cols = matrix.cols;
      this._rows = matrix.rows;

      return;
    }
    this.identity(0);
  }

}
