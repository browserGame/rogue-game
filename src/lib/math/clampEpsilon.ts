export function clampEpsilon(target: number, v: number) {
    if (Math.abs(target - v) < Number.EPSILON) {
        return target;
    }

    return v;
}
