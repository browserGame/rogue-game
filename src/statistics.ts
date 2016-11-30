
export interface Sample<T> {
    probability: number;
    payload: T;
}

export function sampleOfList<T>(sSpace: Sample<T>[]): T {
    let probabilities: number[] = sSpace.map((itm: Sample<T>) => {
        return itm.probability;
    });
    let idx = multinomial_random_sample(normalize(probabilities));
    return sSpace[idx].payload;
}

export function sampleOfListNoReplacement<T>(sSpace: Sample<T>[]): { selected: T, next: Sample<T>[] } {
    let rc: Sample<T>;
    let probabilities: number[] = sSpace.map((itm: Sample<T>) => {
        return itm.probability;
    });
    let cursor = multinomial_random_sample(normalize(probabilities));
    rc = sSpace[cursor];
    sSpace.splice(cursor, 1);
    return { selected: rc.payload, next: sSpace };
}

export interface NumberProps {
    [propname: string]: number;
}

export interface fn_Profiler {
    (N: number): number[];
}

interface fn_profilerFactory {
    (name: string, options: NumberProps): fn_Profiler;
}


export function normalize(arr: number[], scale: number = 1): number[] {
    let tsum = arr.reduce((rsum, itm) => {
        rsum += itm;
        return rsum;
    }, 0);
    if (!tsum) {
        return arr;
    }
    tsum *= scale;
    return arr.map((n) => {
        return n / tsum;
    });
}

export function profilerFactory(name: string, options: NumberProps): fn_Profiler {
    switch (name) {
        case "gaussian":
            return function (N: number) {
                let rc: number[] = [];
                if (!N) {
                    throw new Error('Invalid Argument, N must be at least >= 2');
                }
                let σ = N / (options['sigma'] || 4);
                let µ = (N - 1) / 2;
                for (let i = 0; i < N; i++) {
                    let t_2 = Math.pow((i - µ) / (σ), 2);
                    let ans = Math.exp(-0.5 * t_2);
                    rc.push(ans);
                }
                return normalize(rc);
            }
        default:
            throw new Error("Invalid profiler used");
    }
}

export function multinomial_random_sample(multinomial_arr: number[]): number {


    let cdf = multinomial_arr.reduce((aggr, v: number) => {
        aggr.sum += v;
        aggr.arr.push(aggr.sum);
        return aggr;
    }, { sum: 0 as number, arr: [] as number[] })
        .arr;

    let sample = Math.random();

    for (let i = 0; i < cdf.length; i++) {
        let left = cdf[i - 1] || 0;
        let right = cdf[i];
        if (sample >= left && sample < right) {
            return i;
        }
    }
    throw new Error('Propability uniform multinomial Mapping error');
}