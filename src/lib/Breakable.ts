
import { Entity, EntityProperties } from './Entity';

export interface BreakableProperties extends EntityProperties {
    isBroken: boolean;
}


export class Breakable extends Entity {
    protected options: BreakableProperties;
    constructor(options: BreakableProperties) {
         super(options);
         this.options.isBroken = options.isBroken;
         this.walkOnTop = 'BloodBelow';
    }
}
