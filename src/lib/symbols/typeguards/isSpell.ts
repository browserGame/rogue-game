import { IAllSpells } from '../IAllSpells';


export function isSpell(sp: any): sp is IAllSpells {
    return !!sp && !!sp.spell && sp.e === 'u';
}
