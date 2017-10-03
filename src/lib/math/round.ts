export const round = (s: number, p: number) => Math.round(s * Math.pow(10, p)) / Math.pow(10, p);
export const round0 = (s: number) => round(s, 0);
export const trunc = Math.trunc;

