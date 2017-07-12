import { Entity, EntityProperties } from './Entity';

export interface TelePortProperties extends EntityProperties {
    telePortTo: TelePort;
}

export class TelePort extends Entity {

    constructor(options: TelePortProperties) {
        super(options);
        this.walkOnTop = undefined;
    }

}
