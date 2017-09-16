import { IVector } from '~math';

export function coordsNoExtrusions(coords: IVector[]): { isValid: boolean; first: IVector; last: IVector } {

        const cp = coords.slice(0);
        cp.sort((a, b) => a.y - b.y || a.x - b.x); // First is top-left, last is bottom right

        const first = cp[0];
        const last = cp[cp.length - 1];

        let isValid = true;
        end:
        for (let x = first.x; x <= last.x; x++) {
            for (let y = first.y; y <= last.y; y++) {
                if (!cp.find(i => i.x === x && i.y === y)) {
                    isValid = false;
                    break end;
                }
            }
        }

        return { isValid, first, last };
    }
