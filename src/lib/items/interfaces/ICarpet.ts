import { IDungeonFloorCover } from '~symbols/IDungeonFloorCover';

export interface ICarpet extends IDungeonFloorCover<'K'> {
    color: 'red' | 'blue';
}
