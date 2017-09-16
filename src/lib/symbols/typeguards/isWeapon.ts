import { IAllWeapons } from '../IAllWeapons';

export function isWeapon(w: any): w is IAllWeapons {
    if (!w) {
        return false;
    }
    const c = typeof w.addHp === 'string' || typeof w.addXp === 'string' || typeof w.addDp === 'string';

    return !!c &&  'Ztx~ç'.indexOf(w.e) >= 0;
}
