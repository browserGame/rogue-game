const gCache = new Map<string, SpriteSheet>();

const CELLSIZE = 24;
//const NORMAL = 3;
//const BOSS = NORMAL * 2.5 / 2;
//const SUPER = NORMAL * (7 / 2);


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
    //private _rootName: string;
    //private _ext: string;
    //private _attrs: string[];

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
        //let attrs: string;
        //[, this._rootName, , attrs, this._ext] = Array.from(this.name.match(/^([^_]+)(_|_(.*)_)([^_]+)$/) || []);
        //this._attrs = attrs && attrs.split('_').filter((f) => f) || [];
    }
    /**
     * 
     */
    /*get attributes(): string[] {
        return this._attrs;
    }*/
    /*
        get rootName(): string {
            return this._rootName;
        }
    */
    /*get ext(): string {
        return this._ext;
    }*/

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
        return (
            `    ${this.cssHeight(scale)}; 
    ${this.cssWidth(scale)};`);
    }
    get name(): string {
        return this._name;
    }
    get fullCSS(): string {
        return `
.${this._name} > div:first-child {
   ${this.cssBackgroundPosition};
   ${this.cssWidth()};
   ${this.cssHeight()};
}
`;
    }
}

export interface ScaleItem {
    scale: number;
    items?: string[];
}

export interface ScaledItemPerc {
    scale: { s: number; perc: number; };
    items?: string[];
}


export interface SpriteSheetPropertyBase {
    fsc?: ScaleItem[];
    plts?: ScaleItem[];
    pccs?: ScaleItem[];
    pxcb?: ScaledItemPerc[];
    shadow?: ScaledItemPerc[];
    /*lookRight?: Scalednumber[];*/
    smooth?: boolean;
}

export interface SpriteSheetProperties extends SpriteSheetPropertyBase {
    actualUrl: string; //mangled
    sprites: SpriteData[];
    options: SpriteSheetPropertyBase;
}

export class SpriteSheet {

    private _name: string;
    private _actualUrl: string;
    //private _originalUrl: string; //this could also be a base64 data uri
    private sprites: Map<string, Sprite>;
    private _o: SpriteSheetPropertyBase;

    constructor({ actualUrl, sprites, options }: SpriteSheetProperties) {

        this._o = Object.assign<SpriteSheetPropertyBase, SpriteSheetPropertyBase>({}, options);
        Object.freeze(this._o);

        this._name = (actualUrl.match(/(.*)\.png$/i) || [])[1];
        if (!this._name) {
            throw new Error(`pngUrl argument has an invalide name , must be '*.png', but is ${actualUrl}`);
        }

        this._actualUrl = actualUrl;
        //this._originalUrl = originalUrl;

        this.sprites = new Map<string, Sprite>(
            sprites.map((m) => {
                m.textture = actualUrl;
                return [m.name, new Sprite(m)] as [string, Sprite];
            })
        );
        gCache.set(this._actualUrl, this);
    }

    public toString() {
        return JSON.stringify(Array.from(this.sprites.values()));
    }

    public getSprite(spriteName: string) {
        return this.sprites.get(spriteName);
    }

    public get pngUrl() {
        return this._actualUrl;
    }

    public get name() {

        return this._name;
    }



    public renderCommentHeader() {
        return `
/*  
   Computer Generated CSS, 
   See README.md on how to (re)-generate 
*/
`;
    }


    public renderPNGSource() {
        return `
.${this._name} > div:first-child {
   background: url('./${this._name}.png');
   background-origin: border-box;
   image-rendering: pixelated;
   z-index: 1;
}
`;
    }

    public renderCommentGeneralSizing() {
        return `
/* 
general sizing 
general sizing 
general sizing 
*/
    `;
    }


    /**
     * 
     * Generates [f]ixed [s]ize [c]ontainer [s]cale [n] = (n * 24 )px fixed width and height container cell
     * @param scale multipliction scale x CELLSIZE (24px)
     *  @returns CSS snippet  
     */

    public renderFixedSizeContainer(scale: number = 1) {
        return `
/* 
fix container size scale ${scale} 
*/    
.fsc${scale} {
    height: ${CELLSIZE * scale}px !important;
    width: ${CELLSIZE * scale}px !important;
}        
`;
    }

    public renderExpandedSize(sizeName: string, si: ScaleItem) {
        if (!si.items) {
            return;
        }
        let spriteNames = si.items;
        let sprites = <Sprite[]>spriteNames.map((name) => this.getSprite(name)).filter((f) => !!f);
        let spriteSizesScaled = sprites.map((s: Sprite) => s.cssWidthHeight(si.scale));
        // invert
        let inverted: { [index: string]: string[]; } = {};
        spriteSizesScaled.reduce((prev, key, idx) => {
            prev[key] = prev[key] || [];
            prev[key].push(`.${sizeName}.${sprites[idx].name}`);
            return prev;
        }, inverted);
        // inversion complete , render blender
        let css = [];
        for (let key in inverted) {
            let names = inverted[key].join(',\n');
            css.push(`
${names} {
${key}
}
`);
        }
        return css.join('\n');

    }

    /**
     * Generates pltsn = [p]osition [l]eft [t]op, [s]cale n
     *  @param scale multipliction scale x CELLSIZE (24px)
     *  @returns CSS snippet  
     */

    public renderPositionLeftTop(scale: number = 1) {

        return `
/* 
plts${scale} = [p]osition [l]eft [t]op, [s]cale ${scale} 
*/
.plts${scale} > div:first-child {
   transform-origin: 0 0;
   transform: scale(${scale});
   position: absolute;
   left: 0;
   top: 0;
}
`;
    }


    /**
     * Generates pccs[n] = [p]osition [c]enterx [c]entery, [s]cale n
     *  @param scale multipliction scale x CELLSIZE (24px)
     *  @returns CSS snippet  
     */

    public renderPositionCenterCenter(scale: number = 1) {

        return `
/* 
 pccs  =[p]osition [c]enter [c]enter, [s]cale  
*/

.pccs${scale} > div:first-child {
    transform-origin: 50% 50%;
    transform: translateX(-50%) translateY(-50%) scale(${scale});
    position: absolute;
    left: 50%;
    top: 50%;
}
`;
    }

    /**
    * Generates pxcb<bottom>ps<n> = [p]osition [xc]enter [b]ottom[<bottom>p]ercent [s]cale[n]
    *  @param scale multipliction scale x CELLSIZE (24px)
    *  @param bottom percentage from bottom line
    *  @returns CSS snippet  
    */

    public renderPositionCenterBottom(scale: number = 1, bottom: number = 30) {

        const b = `${bottom}`.replace('.', 'p');
        return `
/* 
 xcbXsY = [p]osition [xc]enter [b]ottom[Xp]ercent, [s]cale [Y] 
*/

.pxcb${scale}s${b} > div:first-child {
    transform-origin: 50% 100%;
    transform: translateX(-50%) translateY(0) scale(${scale});
    position: absolute;
    left: 50%;
    bottom: ${bottom}%;
}
`;
    }

    private renderShadow(scale: number = 1, bottom = 12.5) {
        const _s = `${bottom}`.replace('.', 'p');
        const _sc = `${scale}`.replace('.', 'p');

        return `
.shadow${_sc}s${_s} > div:last-child {
    background: url('./shadow.png');
    background-origin: border-box;
    background-position: -0px -0px;
    /* */
    transform-origin: 50% 50%;
    transform: translateX(-50%) translateY(0) scale(${scale});
    /* */
    width: 24px;
    height: 10px;
    left: 50%;
    bottom: ${bottom - 5}%;
    /* */
    image-rendering: pixelated;
    position: absolute;
    z-index: 0;
    opacity: 0.5;
}
`;
    }

    public renderCommentStaticSprites() {
        return `
/* 
Static Sprites
Static Sprites 
Static Sprites 
*/        
`;
    }

    public renderCommentExpandedSizes() {
        return `
/* 
Expanded sizes
Expanded sizes
Expanded sizes 
*/      
`;
    }


    public renderCSSparts(exclusion?: string[]) {

        const allSnippets: string[] = [
            this.renderCommentHeader(),
            this.renderPNGSource()
        ];

        let fsc = this._o.fsc && this._o.fsc.map((m) => this.renderFixedSizeContainer(m.scale));
        let plts = this._o.plts && this._o.plts.map((m) => this.renderPositionLeftTop(m.scale));
        let pccs = this._o.pccs && this._o.pccs.map((m) => this.renderPositionCenterCenter(m.scale));
        let pxcb = this._o.pxcb && this._o.pxcb.map((m) => this.renderPositionCenterBottom(m.scale.s, m.scale.perc));
        let shadow = this._o.shadow && this._o.shadow.map((m) => this.renderShadow(m.scale.s, m.scale.perc));

        const select = {
            fsc,
            plts,
            pccs,
            pxcb,
            shadow
        };

        for (let css in select) {
            if ((select as any)[css]) {
                (select as any)[css].forEach((d: string) => allSnippets.push(d));
            }
        }

        let exclusionObj: { [index: string]: string } = {};

        if (exclusion) {
            exclusion.reduce((c, str) => {
                c[str] = '';
                return c;
            }, exclusionObj);
        }
        let sprites: Sprite[] = Array.from(this.sprites.values()).filter((f) => !(f.name in exclusionObj));

        let spriteList = sprites.map((m) => m.fullCSS).join('\n');

        allSnippets.push(
            this.renderCommentStaticSprites(),
            spriteList,
            this.renderCommentExpandedSizes()
        );

        // get cross product scale and sprite dimensions
        let fscExpanded = this._o.fsc && this._o.fsc.map((m) => this.renderExpandedSize(`fsc${m.scale}`, m));
        let pltsExpanded = this._o.plts && this._o.plts.map((m) => this.renderExpandedSize(`plts${m.scale}`, m));
        let pccsExpanded = this._o.pccs && this._o.pccs.map((m) => this.renderExpandedSize(`pccs${m.scale}`, m));
        let pxcbExpanded = this._o.pxcb && this._o.pxcb.map((m) => {
            let _p = `${m.scale.perc}`.replace('.', 'p');
            return this.renderExpandedSize(`pxcb${m.scale.s}s${_p}`, { scale: m.scale.s, items: m.items });
        });

        let selectExpanded = {
            fscExpanded,
            pltsExpanded,
            pccsExpanded,
            pxcbExpanded
        };

        for (let css in selectExpanded) {
            if ((selectExpanded as any)[css]) {
                (selectExpanded as any)[css].forEach((d: string) => allSnippets.push(d));
            }
        }

        return allSnippets.join('\n');

    }


}
