import { ISample, sampleFromList } from './';

export function sampleFromListEqualProb<T>(sample: T[]) {
    const samples: ISample<T>[] = sample.map(m =>
        ({ payload: m, probability: (1 / sample.length) }));

    return sampleFromList<T>(samples);
}
