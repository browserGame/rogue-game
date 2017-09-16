import { IBat } from './IBat';
import { IBoss } from './IBoss';
import { IGoblin } from './IGoblin';
import { IGreenWizard } from './IGreenWizard';
import { IRat } from './IRat';
import { ISkeleton } from './ISkeleton';


export type IAllEnemies = ISkeleton | IBoss | IGoblin | IBat | IRat | IGreenWizard;
