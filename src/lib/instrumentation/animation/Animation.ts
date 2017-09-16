import {
    AnimationFrame,
    getSpriteSheetByName,
    IAnimationData,
    SpriteSheet
} from '~instrumentation';


export class Animation {
    private animationName: string;
    private _spriteSheet: SpriteSheet;
    private loop: boolean;
    private playMode: 'play_once' | 'ping_pong';
    private frames: AnimationFrame[];

    public constructor(a: IAnimationData) {
        this.animationName = a.name;
        const _sheet = getSpriteSheetByName(a.spriteSheetName);
        if (!_sheet) {
            throw new Error(`Could not find spriteSheet ${a.spriteSheetName} in global cache`);
        }
        this._spriteSheet = _sheet;
        this.loop = JSON.parse(a.loop);
        this.playMode = a.playMode;
        this.frames = a.frame.map(m => {
            const _sprite = this.spriteSheet.getSprite(m.spriteName);
            const duration = Number.parseFloat(m.duration);

            return new AnimationFrame({ ref: _sprite, duration });
        });
    }
    /* will generate css sheet ascii*/
    public toString() {
        return `Animation[${this.animationName}]`;
    }

    public hasValidFrames() {
        return !this.frames.find(itm => itm.sprite === undefined);
    }

    public asCSSStyleSheetSnippets() {

        // If this animation doesnt have valid frames then no-go
        if (!this.hasValidFrames()) {
            return ''; // Empty string nothning here
        }

        // Collect totall time of all frames
        const cummulants = this.frames.reduce((cummulative, fr) => {
            const next = cummulative[cummulative.length - 1] + fr.duration;
            cummulative.push(next);

            return cummulative;
        },                                    [0]);

        const totalTime = cummulants.pop() || 1;
        const percentages = cummulants.map(m =>
            `${Math.round(m * 100 / totalTime)}%`);

        const keyFrames = percentages.map((m, idx) => {
            const sprite = this.frames[idx].sprite;
            if (!sprite) {
                throw new Error(`sprite was undefined on frame nr:${idx}, on animation:${this.animationName}`);
            }
            const pText = !idx ? 'from, to' : m;

            return (
                `    ${pText} {
        ${sprite.cssWidth()};
        ${sprite.cssHeight()};
        ${sprite.cssBackgroundPosition};
    }`);
        });

        return `
.${this.animationName} > div:first-child {
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
        const text = this.frames[0].cssWidthHeight(scale);
        if (!text) {
            throw new Error(`not a valid cssHeightWidth for first frame of animation:${this.animationName}`);
        }

        return text;
    }

    public get name() {
        return this.animationName;
    }


}
