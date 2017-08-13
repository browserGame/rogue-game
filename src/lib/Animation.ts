import {
    Sprite,
    SpriteSheet,
    getSpriteSheetByName
} from './Sprite';

const gCache = new Map<string, AnimationSheet>();

const NORMAL = JSON.parse(process.env.NORMAL);
const BOSS = JSON.parse(process.env.BOSS);
const SUPER = JSON.parse(process.env.SUPER);

export function getAnimationSheetByName(url: string) {
    return gCache.get(url);
}

export function removeAnimationSheetByName(url: string) {
    return gCache.delete(url);
}



export interface AnimationFrameData {
    spriteName: string;
    duration: string;
}

export class AnimationFrame {

    private _sprite?: Sprite;
    private _duration: number;

    constructor({ ref, duration }: { ref?: Sprite; duration: number; }) {
        this._sprite = ref;
        this._duration = duration;
    }

    public cssWidthHeight(scale: number = 1) {
        if (!this._sprite) {
            return undefined;
        }
        return this._sprite.cssWidthHeight(scale);
    }

    public get duration() {
        return this._duration;
    }

    public get sprite() {
        return this._sprite;
    }
}

export interface AnimationData {
    name: string;
    spriteSheetName: string;
    playMode: 'play_once' | 'ping_pong';
    loop: string; //boolean "true" or "false"
    frame: AnimationFrameData[];
}

export class Animation {
    private animationName: string;
    private _spriteSheet: SpriteSheet;
    private loop: boolean;
    private playMode: 'play_once' | 'ping_pong';
    private frames: AnimationFrame[];

    constructor(a: AnimationData) {
        this.animationName = a.name;
        let _sheet = getSpriteSheetByName(a.spriteSheetName);
        if (!_sheet) {
            throw new Error(`Could not find spriteSheet ${a.spriteSheetName} in global cache`);
        }
        this._spriteSheet = _sheet;
        this.loop = JSON.parse(a.loop);
        this.playMode = a.playMode;
        this.frames = a.frame.map((m) => {
            let _sprite = this.spriteSheet.get(m.spriteName);
            let duration = Number.parseFloat(m.duration);
            return new AnimationFrame({ ref: _sprite, duration });
        });
    }
    /* will generate css sheet ascii*/
    public toString() {
        return `Animation[${this.animationName}]`;
    }

    public hasValidFrames() {
        return !this.frames.find((itm) => itm.sprite === undefined);
    }

    public asCSSStyleSheetSnippets() {

        // if this animation doesnt have valid frames then no-go 
        if (!this.hasValidFrames()) {
            return ''; //empty string nothning here
        }

        // Collect totall time of all frames
        let cummulants = this.frames.reduce((cummulative, fr) => {
            let next = cummulative[cummulative.length - 1] + fr.duration;
            cummulative.push(next);
            return cummulative;
        }, [0]);

        let totalTime = cummulants.pop() || 1;
        let percentages = cummulants.map((m) => {
            return `${Math.round(m * 100 / totalTime)}%`;
        });

        let keyFrames = percentages.map((m, idx) => {
            let sprite = this.frames[idx].sprite;
            if (!sprite) {
                throw new Error(`sprite was undefined on frame nr:${idx}, on animation:${this.animationName}`);
            }
            let pText = !idx ? 'from, to' : m;
            return ` 
                ${pText} {
                    ${sprite.cssWidth()};
                    ${sprite.cssHeight()};
                    ${sprite.cssBackgroundPosition};
                }
                `;
        });

        return ` .${this.animationName} > div {
                    animation-name: ${this.animationName};
                    animation-duration: ${totalTime}ms;
                    animation-delay: 0ms;
                    animation-timing-function: steps(1);
                    animation-iteration-count: infinite;
                }
                @keyframes ${this.animationName} {
                    ${keyFrames.join('\n')}
                }
            `;

    }

    public get spriteSheet() {
        return this._spriteSheet;
    }

    public firstFrameWidthHeight(scale: number = 1) {
        let text = this.frames[0].cssWidthHeight(scale);
        if (!text) {
            throw new Error(`not a valid cssHeightWidth for first frame of animation:${this.animationName}`);
        }
        return text;
    }

    public get name() {
        return this.animationName;
    }


}



export class AnimationSheet {

    private _name: string;
    private animations: Map<string, Animation>;


    constructor(sheetName: string, anims: AnimationData[]) {
        this._name = sheetName;
        this.animations = new Map(anims.map((a) => {
            return [a.name, new Animation(a)] as [string, Animation];
        }));
        gCache.set(sheetName, this);
    }

    public CSSAscii(exclusion?: string[]): string {

        if (!this.animations.size) {
            return `/* no sprite sheet detected for this animation sheet */`;
        }
        // generate all sprite sheet headers
        let set = new Set<SpriteSheet>();
        let allAnims = Array.from(this.animations.values()).filter((f) => f.hasValidFrames());

        allAnims.reduce((collector, anim) => {
            collector.add(anim.spriteSheet);
            return collector;
        }, set);

        let headers = Array.from(set.values()).map((h) => {
            return h.renderCSSparts(exclusion);
        }).join('\n');

        let cssAnims = allAnims.map((m) => m.asCSSStyleSheetSnippets()).join('\n');

        let allSizes = allAnims.map((m) => {
            return {
                name: m.name,
                normal: m.firstFrameWidthHeight(NORMAL),
                boss: m.firstFrameWidthHeight(BOSS),
                super: m.firstFrameWidthHeight(SUPER)
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
        });
        //here we put it all together
        return `
            /*  Computer Generated CSS, */
            
            ${headers}
            
            /* Animations */
            /* Animations */
            /* Animations */
            
            ${cssAnims}
            
            /* Animation Sizes */
            /* Animation Sizes */
            /* Animation Sizes */
            
            ${allSizesStrings.join('\n\n')}
        `;

        //console.log({ headers, cssAnims, allSizes, allSizesStrings });
        //return '';
    }

    public get(animName: string) {
        return this.animations.get(animName);
    }


}

