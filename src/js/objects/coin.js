import { GameObject } from '../core/gameObject.js';

export class Coin extends GameObject {
  constructor(game, container) {
    super(game, container, null, null, 30, 30, 'coin');
  }
}
