import { IDungeonFloorCover } from './IDungeonFloorCover';

export interface ICarpet extends IDungeonFloorCover<'é'> {
    color: 'red' | 'blue';
}

