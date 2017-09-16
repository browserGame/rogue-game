import { ISIGeneralContent } from './ISIGeneralContent';
import { ISymbolBase } from './ISymbolBase';


export interface ISecretPlate extends ISymbolBase<'C'> {
    has: ISIGeneralContent[];
}
