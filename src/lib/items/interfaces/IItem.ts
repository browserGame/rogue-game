
import { IVector } from '~linear-algebra';
import { IGFragment } from './IGFragment';

export interface IItem {
    namespace?: string;
    tag: string;
    p: IVector;
    br?: IVector;
    gui: IGFragment;
}
