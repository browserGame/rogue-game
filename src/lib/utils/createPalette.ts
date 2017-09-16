import { IItemPalette } from '~utils';

export function createPalette(raw: string[], w: number, skip: string = ''): IItemPalette {
    const rc: IItemPalette = {};
    raw.reduce((acc, c, idx) => {
        if (skip.indexOf(c) >= 0) {
            return acc;
        }
        const x = idx % w;
        const y = (idx - x) / w;
        acc[c] = acc[c] || [];
        acc[c].push({ x, y });

        return acc;
    },         rc);

    return rc;
}
