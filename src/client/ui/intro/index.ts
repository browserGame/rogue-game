export * from './IntroPane';
export * from './HeroesAndMonsters';
export * from './Intro';

import { createCSSClassMapper, IResolver } from '~css-tools';

export const cssMap: { [index: string]: IResolver; } =
(function initMap() {
    const css: { [index: string]: string; } = {
        heroesAndMonsters: 'heroes-and-monsters',
        introPane: 'intro-pane'
    };
    const rc: { [index: string]: IResolver; } = {};
    for (const propName in css) {
        rc[propName] = createCSSClassMapper(require(`./${css[propName]}.scss`));
        console.log('xxx:', propName, rc[propName]);
    }

    return rc;
})();
