import { IResolver } from './IResolver';

export function createCSSClassMapper(scssResource: { [index: string]: string; }): IResolver {

  const self = scssResource;

  return function classList(...rest: string[]): string {
    const arr = rest.map(c => self[c]);

    return arr.join(' ');
  };
}
