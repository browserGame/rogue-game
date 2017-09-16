export function epsilon2Zero(v: number) {
    if (Math.abs(v) < Number.EPSILON) {
        return 0;
    }

    return v;
}
