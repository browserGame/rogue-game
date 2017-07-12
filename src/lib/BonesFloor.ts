
import { Entity, EntityProperties  } from './Entity';

export interface BonesFloorProperties extends EntityProperties {

}

export class BonesFloor extends Entity {
    
    constructor(options: BonesFloorProperties){
        super(options);
        this.walkOnTop = 'BloodBelow';
    }
}



