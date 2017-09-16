import { IBreakable } from './IBreakable';

export interface IVase extends IBreakable<'J'> {
    color: 'gold' | 'green' | 'red' | 'blue' | 'gray';
  }
