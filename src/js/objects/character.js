import { Bubble } from './bubble.js';

export class Character {
  constructor() {
    this.x = 50;
    this.y = 300;
    this.width = 80;
    this.height = 80;
    this.velocity = 10;
    this.yVelocity = 0;
    this.gravity = 0.5;
    this.isJumping = false;
    this.jumpCount = 0;
    this.element = document.createElement('div');
    this.element.classList.add('character');
    document.querySelector('.main__container').appendChild(this.element);
    this.updatePosition();
    this.bubbleInterval = null;
  }

  move(event) {
    const container = document.querySelector('.main__container');
    const containerWidth = container.offsetWidth;

    let moved = false;

    if (event.key === 'ArrowRight') {
      this.x = Math.min(this.x + this.velocity, containerWidth - this.width - 15);
      moved = true;
    } else if (event.key === 'ArrowLeft') {
      this.x = Math.max(this.x - this.velocity, 0);
      moved = true;
    } else if (event.key === 'ArrowUp') {
      this.jump();
    }

    this.updatePosition();
  }

  jump() {
    if (this.jumpCount < 3) {
      this.yVelocity = this.jumpCount === 2 ? -20 : -10;
      this.isJumping = true;
      this.jumpCount++;
      
      const bubbleX = this.x + this.width / 2 - 10;
      const bubbleY = this.y + this.height - 10;
      
      for (let i = 0; i < 3; i++) {
        let randomX = bubbleX + Math.random() * 30 - 15;
        let randomY = bubbleY + Math.random() * 30 - 15;

        new Bubble(randomX, randomY);
      }
    }
  }

  applyGravity() {
    this.yVelocity += this.gravity;
    this.y += this.yVelocity;

    const container = document.querySelector('.main__container');
    const groundLevel = container.offsetHeight - this.height - 15;

    if (this.y < 0) {
      this.y = 0;
      this.yVelocity = 0;
    }

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
