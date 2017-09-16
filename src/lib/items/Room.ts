import { IDoor , IItem , IRoomProperties } from '~items';
import { IVector } from '~linear-algebra';
import { flattenMerge } from '~utils';

export class Room {

    public pk: number;
    public top: number;
    public left: number;
    public width: number;
    public height: number;

    public body: Map<string, IItem[]>;
    public base: string[];

    private _doors: IDoor[] = [];


    public constructor(c: IRoomProperties) {
        this.pk = c.pk;
        this.top = c.top;
        this.left = c.left;
        this.width = c.width;
        this.height = c.height;
        this._doors = [];
        this.body = new Map();
    }

    public static isRoom(r: any): r is Room {

                let arr: (keyof Room)[];
                arr = ['pk', 'top', 'left', 'width', 'height'];

                return arr.filter(f =>
                    !(typeof r[f] === 'number')).length === 0;
    }

    public getNameSpace(key: string): IItem[] {
        let ns = this.body.get(key);
        if (!ns) {
            ns = [];
            this.body.set(key, ns);
        }

        return ns;
    }

    public get doors(): IDoor[] {
        return this.getNameSpace('doors') as IDoor[];
    }

    public contentNS(p: IVector, select: string = ''): IItem[] | undefined {
        const all = flattenMerge(Array.from(this.body.values())) as IItem[];
        let rc = all.filter(i => {
            if (i.p.x === p.x && i.p.y === p.y) {
                return true;
            }
            if (i.br) {
                if (p.x <= i.br.x && p.x >= p.x && p.y >= i.p.y && p.y <= i.br.y) {
                    return true;
                }
            }

            return false;
        });

        if (select) {
            rc = rc.filter(j => select.split('').indexOf(j.tag) >= 0);
        }

        if (rc.length) {
            return rc;
        }

        return undefined;
    }

    public getContentAt(p: IVector, select: string = ''): IItem[] | undefined {
        const all = flattenMerge(Array.from(this.body.values())) as IItem[];
        let rc = all.filter(i => {
            if (i.p.x === p.x && i.p.y === p.y) {
                return true;
            }
            if (i.br) {
                if (p.x <= i.br.x && p.x >= p.x && p.y >= i.p.y && p.y <= i.br.y) {
                    return true;
                }
            }

            return false;
        });

        if (select) {
            rc = rc.filter(j => select.split('').indexOf(j.tag) >= 0);
        }

        if (rc.length) {
            return rc;
        }

        return undefined;
    }


}

