import { Entity, EntityProperties } from './Entity';


export interface GoldProperties extends EntityProperties {
    amount: number;

}


export class Gold extends Entity {
    private amount: number;    
    constructor(options: GoldProperties) {
        super(options);
        this.walkOnTop = 'BloodBelow';
        this.amount = options.amount;
    }
}
