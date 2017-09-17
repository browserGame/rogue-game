import { Sprite } from '~instrumentation/sprite';

export class AnimationFrame {

        private _sprite?: Sprite;
        private _duration: number;

        public constructor({ ref, duration }: { ref?: Sprite; duration: number; }) {
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

