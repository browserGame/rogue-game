
export function multinomialRandomSample(multinomialArr: number[]): number {

        let sum = 0;

        const cdf: number[]  = [];
        multinomialArr.reduce((aggr, v: number) => {
            sum += v;
            aggr.push(sum);

            return aggr;
        },                    cdf);

        const sample = Math.random();

        for (let i = 0; i < cdf.length; i++) {
            const left = cdf[i - 1] || 0;
            const right = cdf[i];
            if (sample >= left && sample < right) {
                return i;
            }
        }
        // Should never happen
        throw new Error('Propability uniform multinomial Mapping error');
    }

