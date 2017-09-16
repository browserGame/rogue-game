
export function normalize(arr: number[], scale: number = 1): number[] {
    let { totalSum  } = arr.reduce((c, itm) => {
        c.totalSum += itm;

        return c;
    },                             { totalSum: 0});
    if (!totalSum) {
        return arr;
    }
    totalSum *= scale;

    return arr.map(n =>
        n / totalSum);
}
