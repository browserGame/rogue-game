
import {
    $Room
} from './Room';

import {
    $ItemSecret
} from './Secret';

import {
    $ItemEnemy
} from './Enemy';

import {
    $ItemBreakable
} from './Breakable';

import {
    $ItemOpenable
} from './Openable';


export type GeneralContainer = $Room | $ItemSecret | $ItemEnemy | $ItemBreakable | $ItemOpenable;

