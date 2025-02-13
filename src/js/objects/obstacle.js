import { GameObject } from '../core/gameObject.js';

export class Obstacle extends GameObject {
  constructor(game, container) {
    super(game, container, null, null, 50, 50, 'obstacle');
  }
}
