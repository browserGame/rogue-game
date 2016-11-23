import { profilerFactory, multinomial_random_sample } from "./map-tools";

console.log('003');


let prob = profilerFactory('gaussian',{sigma:4});

let ans = prob(11);

let picker = multinomial_random_sample(ans);

console.log(picker);