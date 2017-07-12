import * as clone from 'clone';
import { Vector } from './math';

//structure map 
const stMap: { [index: string]: EType | EType[] | undefined } = {
    Door: undefined,
    Water: undefined,
    Lava: undefined,
    Acid: undefined,
    Chest: undefined,
    Secret: undefined,
    Carpet: [
        'Bones',
        'Chest',
        'Gold'
    ],
    Bones: ['Chest', 'Lantarn', 'Gold'],
    Gold: undefined,
};

export interface EntityProperties {
    type: EType;
    topLeft: Vector;
    bottomRight: Vector;
    
}



export type EType = 'Gold' | 'Lantarn' | 'Floor' | 'Water' | 'Acid' | 'Lava' | 'Bones' | 'Door' | 'Chest' | 'Carpet';



export abstract class Entity {

    private type: EType;
    private topLeft: Vector;
    private bottomRight: Vector;
    private itemsOnTop?: Entity[];
    
    protected walkOnTop?: 'BloodAbove' | 'BloodBelow';
    protected options: EntityProperties;
    
    private isPermissable(e: Entity): boolean {
        if (!(this.type in stMap)) {
            throw new Error(`No Items placeable above this: ${this.type}`);
        }
        let possible: EType[] = <EType[]>(stMap[this.type] instanceof Array ? stMap[this.type] : [stMap[this.type]]);
        //
        // Seperated because debugging
        //
        let rc = (possible || false) && possible.indexOf(e.type) >= 0;
        
        return rc;
    }

    constructor(options: EntityProperties) {
        this.type = options.type;
        this.topLeft = clone(options.topLeft);
        this.bottomRight = clone(options.bottomRight);
        this.options = clone(options);
        this.itemsOnTop = undefined;
        this.walkOnTop = 'BloodAbove';
    }

    public addChild(e: Entity) {
        let cnt = e.IsIntersected(this);
        if (cnt < 4) { //partial overlap or not at all placed
            if (cnt > 0){
                throw new Error('Partial Overlap!');
            }
            throw new Error('Cannot be placed on top');
        }
        if (!this.isPermissable(e)) {
            throw new Error(`Item ${e.toString()}  is not allowed to be placed ontop of  ${this.type}`);
        }
        this.itemsOnTop = this.itemsOnTop || [];
        this.itemsOnTop.push(e); //added
    }

    public get tl() {
        return this.topLeft;
    }

    public get br() {
        return this.bottomRight;
    }

    public IsIntersected(e: Entity): number {

        let ent = [this, e];
        let rc = ent.map((i, idx, arr) => {
            let cp = arr[idx ? 0 : 1];
            let points = [
                [cp.tl.x, cp.tl.y],
                [cp.br.x, cp.tl.y],
                [cp.br.x, cp.br.y],
                [cp.tl.x, cp.br.y]
            ];
            //cp.find
            let p = points.reduce((ac, p) => {
                let x = p[0];
                let y = p[1];
                if (i.tl.x <= x && i.br.x <= x && i.tl.y <= y && i.br.y >= y){
                    ac++;
                }
                return ac;
            }, 0);
            return p;
        });
        return (rc[0] > 0 ? rc[0] : rc[1]);
        
    }

    public get is() {
        return this.type;
    }
}
