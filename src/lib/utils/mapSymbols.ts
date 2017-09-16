import { ISymbolBase } from '~symbols/ISymbolBase';


export function mapSymbols(symbols: ISymbolBase<string>[]): Map<string, ISymbolBase<string>> {
    const symbolMap = new Map<string, ISymbolBase<string>>();

    symbols.reduce((map, sym) => {
        const key = sym.m || sym.e;
        if (map.has(key)) {
            console.log(symbols);
            throw new Error(`Double key defined: ${key}`);
        }
        map.set(key, sym);

        return map;
    },             symbolMap);

    return symbolMap;
}
