import { GameObject } from './gameObject.js';

export class Obstacle extends GameObject {
  constructor(container) {
    const maxY = container.offsetHeight * (2 / 3) - 50;
    super(container, null, Math.random() * maxY, 50, 50, 'obstacle');
  }
}