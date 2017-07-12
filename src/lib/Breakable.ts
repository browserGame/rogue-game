
import { Entity, EntityProperties } from './Entity';

export interface BreakableProperties extends EntityProperties {
    isBroken: boolean;
}


export class Breakable extends Entity {
    constructor(options: BreakableProperties) {
         super(options);
         (<BreakableProperties>(this.options)).isBroken = options.isBroken;
         this.walkOnTop = 'BloodBelow';
    }
}
