import { IDoor } from './IDoor';
import { IItem } from './IItem';

export interface IRoomProperties {
    pk: number;
    top: number;
    left: number;
    width: number;
    height: number;
    doors: IDoor[];
    body: Map<string, IItem[]>;
    base: string[];
}
