import { IItemBreakable, IItemEnemy , IItemOpenable , IItemSecret , Room } from '~items';

export type IGeneralContainer = Room | IItemSecret | IItemEnemy | IItemBreakable | IItemOpenable;
