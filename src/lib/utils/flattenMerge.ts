export function flattenMerge(...arr: any[]): any[] {
    const rc = [];
    for (const itm of arr) {
        if (itm instanceof Array) {
            const rc2 = flattenMerge(...itm);
            rc.push(...rc2);
            continue;
        }
        rc.push(itm);
    }

    return rc;
}
