
import { normalize } from '~math';
import { IFnProfiler, INumberProps } from './';

export function distributionEnvelopeFactory(name: string, options: INumberProps): IFnProfiler {
    switch (name) {
        case 'gaussian':
            return function profiler(N: number) {
                const rc: number[] = [];
                if (!N) {
                    throw new Error('Invalid Argument, N must be at least >= 2');
                }
                const σ = N / (options['sigma'] || 4);
                const µ = (N - 1) / 2;
                for (let i = 0; i < N; i++) {
                    const t2 = Math.pow((i - µ) / (σ), 2);
                    const ans = Math.exp(- t2 * 0.5);
                    rc.push(ans);
                }

                return normalize(rc);
            };
        default:
        case 'uniform':
            return function uniform(N: number) {
                const rc = new Array(N);
                rc.fill(1);

                return normalize(rc);
            };
    }
    throw new Error('Invalid profiler used');
}
