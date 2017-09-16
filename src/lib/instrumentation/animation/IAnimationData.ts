import { IAnimationFrameData } from './IAnimationFrameData';

export interface IAnimationData {
    name: string;
    spriteSheetName: string;
    playMode: 'play_once' | 'ping_pong';
    loop: string; // Boolean "true" or "false"
    frame: IAnimationFrameData[];
}
