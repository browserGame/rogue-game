export function isNumber(s: any): s is  number {
    return Number.isFinite(s);
}
