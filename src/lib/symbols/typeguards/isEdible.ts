import { IAllEdibles } from '../IAllEdibles';

export function isEdible(ed: any): ed is IAllEdibles {
    return ed && 'sprqi;§l'.indexOf(ed.e) >= 0;
}
