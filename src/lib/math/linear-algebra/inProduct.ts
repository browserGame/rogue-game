export function inProduct(v1: number[], v2: number[]): number {

    const len = Math.min(v1.length, v2.length);
    let rc: number = 0;
    for (let i = 0; i < len; i++) {
        rc += v1[i] * v2[i];
    }

    return rc;
}

