import { GameObject } from './gameObject.js';

export class Coin extends GameObject {
  constructor(container) {
    const maxY = container.offsetHeight * (2 / 3) - 30;
    super(container, null, Math.random() * maxY, 30, 30, 'coin');
  }
}