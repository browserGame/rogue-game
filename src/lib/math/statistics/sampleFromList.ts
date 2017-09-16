import { normalize } from '~math';

import { ISample, multinomialRandomSample } from './';

export function sampleFromList<T>(sSpace: ISample<T>[]): T {
    const probabilities: number[] = sSpace.map((itm: ISample<T>) =>
        itm.probability);
    const idx = multinomialRandomSample(normalize(probabilities));

    return sSpace[idx].payload;
}
