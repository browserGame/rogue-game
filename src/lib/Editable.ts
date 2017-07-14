import { Entity, EntityProperties } from './Entity';


export interface EditableProperties extends EntityProperties {
    hp: number;
    poisen?: number;
}


export class Editable extends Entity {
    protected  options: EditableProperties;
        
    constructor(options: EditableProperties) {
        super(options);
        this.walkOnTop = 'BloodBelow';
    }
}
