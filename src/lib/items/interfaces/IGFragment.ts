
import { IGUISizeTypeKeys } from './IGUISizeType';

export interface IGFragment {
    size: IGUISizeTypeKeys[];
    auxClassNames: string[];
    left: number;
    top: number;
    zIndex: number;
    hasShadow?: boolean;
}
