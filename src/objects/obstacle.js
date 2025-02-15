import { GameObject } from './gameObject.js';

export class Obstacle extends GameObject {
  constructor(game, container) {
    const maxY = container.offsetHeight * (2 / 3) - 50;
    super(game, container, null, Math.random() * maxY, 50, 50, 'obstacle');
  }
}