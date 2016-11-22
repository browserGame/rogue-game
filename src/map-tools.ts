/// <reference path="../typings/react/react-global.d.ts" />

export interface NumberProps {
    [propname: string]: number;
}

export interface fn_Profiler {
    (N: number): number[];
}

interface fn_profilerFactory {
    (name: string, options: NumberProps): fn_Profiler;
}

function normalize(arr: number[]): number[] {
    let tsum = arr.reduce((rsum, itm) => {
        rsum += itm;
        return rsum;
    }, 0);
    if (!tsum) {
        arr;
    }
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
                let µ = N / 2;
                for (let i = 0; i < N; i++) {
                    let t_2 = Math.pow((i - µ) / (σ), 2);
                    let ans = Math.exp(0.5 * t_2);
                    rc.push(ans);
                }
                return normalize(rc);
            }
        default:
            throw new Error("Invalid profiler used");
    }

}





