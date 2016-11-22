import { profilerFactory } from "./map-tools";

console.log('hello');

let prob = profilerFactory('gaussian',{sigma:4});

let ans = prob(15);

console.log(ans);