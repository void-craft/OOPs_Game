import { Bubble } from './bubble.js';

export class Character {
  constructor() {
    console.log('=== Character Constructor Called ===');
    this.element = document.createElement('div');
    this.element.classList.add('character');
    document.querySelector('.main__container').appendChild(this.element);
    this.updatePosition();
    this.maxJumps = 3;
    this.jumpCount = 0;
    this.x = 50;
    this.y = 300;
    this.width = 80;
    this.height = 80;
    this.velocity = 10;
    this.yVelocity = 0;
    this.gravity = 0.5;
    this.isJumping = false;
    this.jumpVelocity = -10;
  }

  move(event) {
    const container = document.querySelector('.main__container');
    const containerWidth = container.offsetWidth;

    switch (event.key) {
      case 'ArrowRight':
        this.x = Math.min(this.x + this.velocity, containerWidth - this.width + 15);
        break;
      case 'ArrowLeft':
        this.x = Math.max(this.x - this.velocity, 0);
        break;
    }

    this.updatePosition();
  }

  handleJump() {
    if (this.jumpCount < this.maxJumps) {
      this.jump();
    }
  }

  jump() {
    this.jumpCount++;
    this.isJumping = true;
    this.yVelocity = this.jumpVelocity;

    const bubbleX = this.x + this.width / 2 - 10 + (Math.random() * 30 - 15);
    const bubbleY = this.y + this.height - 10 + (Math.random() * 30 - 15);
    new Bubble(bubbleX, bubbleY);
  }

  applyGravity() {
    this.yVelocity += this.gravity;
    this.y += this.yVelocity;

    const container = document.querySelector('.main__container');
    const groundLevel = container.offsetHeight - this.height;

    if (this.y >= groundLevel) {
      this.y = groundLevel;
      this.yVelocity = 0;
      this.isJumping = false;
      this.jumpCount = 0;
    }

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  collideWith(object) {
    const charRect = this.element.getBoundingClientRect();
    const objRect = object.element.getBoundingClientRect();

    return !(
      charRect.right < objRect.left ||
      charRect.left > objRect.right ||
      charRect.bottom < objRect.top ||
      charRect.top > objRect.bottom
    );
  }
}