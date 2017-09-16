
import { ISpriteData } from './';

export class Sprite {
    private _name: string;
    private pngUrl: string; // This points to the png resource
    private ox: number;
    private oy: number;
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    //
    // Private _rootName: string;
    // Private _ext: string;
    // Private _attrs: string[];

    public constructor(o: ISpriteData) {
      this._name = o.name;
      this.pngUrl = o.textture;
      this.ox = Number.parseInt(o.ox);
      this.oy = Number.parseInt(o.oy);
      this.x = Number.parseInt(o.x);
      this.y = Number.parseInt(o.y);
      this.width = Number.parseInt(o.width);
      this.height = Number.parseInt(o.height);
      const iN = Number.isInteger;
      if (
        !(
          iN(this.height) &&
          iN(this.width) &&
          iN(this.ox) &&
          iN(this.oy) &&
          iN(this.x) &&
          iN(this.y)
        )
      ) {
        throw new TypeError(
          `Invalid number in constructor argument: ${JSON.stringify(o)}`
        );
      }
    }

    public get cssBackgroundPosition(): string {
      return `background-position: -${this.x}px -${this.y}px`;
    }
    public cssWidth(scale = 1): string {
      return `width: ${this.width * scale}px`;
    }
    public cssHeight(scale = 1): string {
      return `height: ${this.height * scale}px`;
    }
    public cssWidthHeight(scale = 1): string {
      return `    ${this.cssHeight(scale)};
      ${this.cssWidth(scale)};`;
    }
    public get name(): string {
      return this._name;
    }
    public get fullCSS(): string {
      return `
  .${this._name} > div:first-child {
     ${this.cssBackgroundPosition};
     ${this.cssWidth()};
     ${this.cssHeight()};
  }
  `;
    }
  }

