import { IAllSpells } from '../IAllSpells';
import { IMagicSpellBook } from '../IMagicSpellBook';


export function isSpell(sp: IMagicSpellBook): sp is IAllSpells {
    return !!sp && !!sp.spell && sp.e === 'u';
}
