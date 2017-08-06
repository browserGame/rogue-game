const gCache = new Map<string, SpriteSheet>();

export function getSpriteSheetByName(url: string) {
    return gCache.get(url);
}

export function removeSpriteSheetByName(url: string) {
    return gCache.delete(url);
}

export interface SpriteData {
    name: string;
    textture: string;
    ox: string;
    oy: string;
    x: string;
    y: string;
    width: string;
    height: string;
}

export class Sprite {

    private _name: string;
    private pngUrl: string; // this points to the png resource
    private ox: number;
    private oy: number;
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    //
    private _rootName: string;
    private _ext: string;
    private _attrs: string[];

    constructor(o: SpriteData) {
        this._name = o.name;
        this.pngUrl = o.textture;
        this.ox = Number.parseInt(o.ox);
        this.oy = Number.parseInt(o.oy);
        this.x = Number.parseInt(o.x);
        this.y = Number.parseInt(o.y);
        this.width = Number.parseInt(o.width);
        this.height = Number.parseInt(o.height);
        const iN = Number.isInteger;
        if (!(iN(this.height) && iN(this.width) && iN(this.ox) && iN(this.oy) && iN(this.x) && iN(this.y))) {
            throw new TypeError(`Invalid number in constructor argument: ${JSON.stringify(o)}`);
        }
        let attrs: string;
        [, this._rootName, , attrs, this._ext] = Array.from(this.name.match(/^([^_]+)(_|_(.*)_)([^_]+)$/) || []);
        this._attrs = attrs && attrs.split('_').filter((f) => f) || [];
    }
    /**
     * 
     */
    get attributes(): string[] {
        return this._attrs;
    }

    get rootName(): string {
        return this._rootName;
    }

    get ext(): string {
        return this._ext;
    }

    get cssBackgroundPosition(): string {
        return `background-position: -${this.x}px -${this.y}px`;
    }
    public cssWidth(scale = 1): string {
        return `width: ${this.width * scale}px`;
    }
    public cssHeight(scale = 1): string {
        return `height: ${this.height * scale}px`;
    }
    public cssWidthHeight(scale = 1): string {
        return `${this.cssHeight(scale)}; ${this.cssWidth(scale)};`;
    }
    get name(): string {
        return this._name;
    }
    get fullCSS(): string {
        return `
            .${this._name} > div {
                ${this.cssBackgroundPosition};
                ${this.cssWidth()};
                ${this.cssHeight()};
            }
        `;
    }
}

export interface SpriteSheetProperties {
    actualUrl: string; //mangled
    originalUrl: string;
    sprites: SpriteData[];
}

export class SpriteSheet {

    private _name: string;
    private _actualUrl: string;
    private _originalUrl: string; //this could also be a base64 data uri
    private sprites: Map<string, Sprite>;

    constructor({ actualUrl, originalUrl, sprites }: SpriteSheetProperties) {

        this._name = (originalUrl.match(/(.*)\.png$/i) || [])[1];
        if (!this._name) {
            throw new Error(`pngUrl argument has an invalide name , must be '*.png', but is ${originalUrl}`);
        }

        this._actualUrl = actualUrl;
        this._originalUrl = originalUrl;

        this.sprites = new Map<string, Sprite>(
            sprites.map((m) => {
                m.textture = originalUrl; //correct for webpack transform of the name
                return [m.name, new Sprite(m)] as [string, Sprite];
            })
        );
        gCache.set(this._originalUrl, this);
    }

    public toString() {
        return JSON.stringify(Array.from(this.sprites.values()));
    }

    public get(spriteName: string) {
        return this.sprites.get(spriteName);
    }

    public get pngActual() {
        return this._actualUrl;
    }

    public get pngOriginal() {
        return this._originalUrl;
    }

    public get name() {
        return this._name;
    }

    public renderCSSparts(exclusion?: string[]) {
        let spriteList: string = '';

        let exclusionObj: { [index: string]: string } = {};

        if (exclusion) {
            exclusion.reduce((c, str) => {
                c[str] = '';
                return c;
            }, exclusionObj);
        }
        let sprites: Sprite[] = Array.from(this.sprites.values()).filter((f) => !(f.name in exclusionObj));
        let allSizes = sprites.map((m) => {
            return {
                name: m.name,
                normal: m.cssWidthHeight(2),
                boss: m.cssWidthHeight(2.5),
                super: m.cssWidthHeight(7)
            };
        });

        // invert
        let inverted = allSizes.reduce((inv, itm) => {
            inv[itm.normal] = inv[itm.normal] || [];
            inv[itm.normal].push(`.normal.${itm.name}`);

            inv[itm.boss] = inv[itm.boss] || [];
            inv[itm.boss].push(`.boss.${itm.name}`);

            inv[itm.super] = inv[itm.super] || [];
            inv[itm.super].push(`.boss.super.${itm.name}`);

            return inv;
        }, {} as { [index: string]: string[]; });

        let allSizesStrings = Object.keys(inverted).map((key) => {
            return ` ${inverted[key].join(',\n')} {
                ${key}
            }`;
        }).join('\n');

        spriteList = sprites.map((m) => m.fullCSS).join('\n');



        return `
        
        /* SpriteSheet */
        /* SpriteSheet */
        /* SpriteSheet */
        
        .${this._name} > div {
            background: url('./${this._name}.png');
            background-origin: border-box;
            image-rendering: pixelated;
        }

        /* general sizing */
        /* general sizing */
        /* general sizing */

        .super>div,
        .boss>div,
        .normal>div {
            transform-origin: 0 0;
            position: absolute;
        }

        .normal>div {
            transform: scale(2);
        }

        .boss.super>div {
            transform: scale(7);
        }

        .boss>div {
            transform: scale(2.5);
        }

        .super.boss.look-right>div,
        .normal.look-right>div,
        .boss.look-right>div {
            transform-origin: right top;
        }

        .normal.look-right>div {
            transform: scaleX(-1) translateX(100%) scale(2);
        }

        .boss.look-right>div {
            transform: scaleX(-1) translateX(100%) scale(2.5);
        }

        .super.boss.look-right>div {
            transform: scaleX(-1) translateX(100%) scale(7);
        }

        .smooth,
        .smooth>div {
            transition: all 2s;
        }

        .smooth {
            outline: 2px green dashed;
        }

        .smooth>div {
            outline: 2px red dashed;
        }

             
        
        /* Static Sprites */
        /* Static Sprites */
        /* Static Sprites */
        
        ${spriteList}
        
        /* Static Sprites Sizes */
        /* Static Sprites Sizes */
        /* Static Sprites Sizes */
        
        
        ${allSizesStrings} 


        `;
    }


}
