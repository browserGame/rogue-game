import { Entity, EntityProperties } from './Entity';

export interface CarpetProperties extends EntityProperties {

}


export class Carpet extends Entity {
    constructor(options: CarpetProperties) {
         super(options);
         this.walkOnTop = 'BloodAbove';
    }
}
