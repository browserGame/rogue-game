
export class Sprite {
    private w: number;
    private h: number;
    private x: number;
    private y: number;
    private spriteMap: Buffer;
    public stamp(c: HTMLCanvasElement, x: number, y: number) { c; x; y; }
    constructor(spriteMap: Buffer, x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.spriteMap = spriteMap;
    }
}
