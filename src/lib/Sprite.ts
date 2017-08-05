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
        /**
         * documentation for regexp
         * "assassin01_some_attr_01".match(/^([^_]+)(_|_(.*)_)([^_]+)$/)
                 [
                     "assassin01_some_attr_01", 
                     "assassin01", 
                     "_some_attr_", 
                     "some_attr", 
                     "01", 
                     index: 0, 
                     input: "assassin01_some_attr_01"
                 ]
            "assassin01_01".match(/^([^_]+)(_|_(.*)_)([^_]+)$/)
                 [
                     "assassin01_01", 
                     "assassin01", 
                     "_", 
                     undefined, 
                     "01", 
                     index: 0, 
                     input: "assassin01_01"
                 ]
         */
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
    get name(): string {
        return this._name;
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

    public renderCSSparts() {
        return `.${this._name} > div {
            background: url('./${this._name}.png');
            background-origin: border-box;
            image-rendering: pixelated;
        }`;
    }


}

  /*
  

type SpriteCollector = { [index: string]: { [index: string]: Sprite; } };

function collectSprites(sprites: Sprite[]): SpriteCollector {
    let c: SpriteCollector = {};
    sprites.reduce((collector, itm) => {
        let [_, rootName, index] = Array.from(itm.name.match(/^([^\_]+)_(\d{2})$/) || []);
        _;
        if (!rootName) {
            rootName = itm.name;
            index = '01';
        }
        //console.log({ _, rootName, index });
        let sprite: Sprite = {
            name: rootName,
            textture: '',
            ox: Number.parseInt(itm.ox as any),
            oy: Number.parseInt(itm.oy as any),
            x: Number.parseInt(itm.x as any),
            y: Number.parseInt(itm.y as any),
            width: Number.parseInt(itm.width as any),
            height: Number.parseInt(itm.height as any)
        };
        collector[rootName] = collector[rootName] || {};
        collector[rootName][index] = sprite;

        return collector;
    }, c);
    return c;
}

  
  let dStyle = document.createElement('style');
            let attTextCss = document.createAttribute('type');
            attTextCss.value = 'text/css';
            dStyle.setAttributeNode(attTextCss);

            document.head.appendChild(dStyle);
            const sheet: CSSStyleSheet = dStyle.sheet as any;
            // now we insert rules 

              let i = 0;
            sheet.insertRule(` 
            .enemy-spritemap { 
                background: url('${enemySprites}'); 
                background-origin: border-box; 
                image-rendering: pixelated;         
                animation-timing-function: steps(1);
                animation-delay: 0ms;
                animation-iteration-count: infinite;
            }`, i++);


            */



