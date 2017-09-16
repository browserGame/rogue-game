import { Room } from '~items';

export function isRoom(r: any): r is Room {

        let arr: (keyof Room)[];
        arr = ['pk', 'top', 'left', 'width', 'height'];

        return arr.filter(f =>
            !(typeof r[f] === 'number')).length === 0;
    }

