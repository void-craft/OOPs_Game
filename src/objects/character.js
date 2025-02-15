import { Bubble } from './bubble.js';

export class Character {
  constructor() {
    console.log('=== Character Constructor Called ===');
    this.reset();
    this.element = document.createElement('div');
    this.element.classList.add('character');
    document.querySelector('.main__container').appendChild(this.element);
    this.updatePosition();
    this.maxJumps = 3;
    this.bubbleInterval = null;
    this.jumpNumber = 0;
  }

  reset() {
    console.log('=== Reset Called ===');
    this.x = 50;
    this.y = 300;
    this.width = 80;
    this.height = 80;
    this.velocity = 10;
    this.yVelocity = 0;
    this.gravity = 0.5;
    this.isJumping = false;
    this.jumpCount = 0;
    this.jumpVelocity = -10;
    
    console.log({
      yVelocity: this.yVelocity,
      jumpVelocity: this.jumpVelocity,
      jumpCount: this.jumpCount,
      isJumping: this.isJumping
    });
  }

  move(event) {
    const container = document.querySelector('.main__container');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    switch(event.key) {
      case 'ArrowRight':
        this.x = Math.min(this.x + this.velocity, containerWidth - this.width - 15);
        break;
      case 'ArrowLeft':
        this.x = Math.max(this.x - this.velocity, 0);
        break;
    }
    
    this.x = Math.max(0, Math.min(this.x, containerWidth - this.width));
    this.y = Math.max(0, Math.min(this.y, containerHeight - this.height));

    this.updatePosition();
  }

  handleJump() {
    if (this.jumpCount < this.maxJumps) {
      this.jump();
    }
  }
  
  jump() {
    this.jumpNumber++;
    console.log('=== Jump Called ===');
    console.log('Jump number:', this.jumpNumber);
    
    this.jumpCount++;
    this.isJumping = true;
    this.yVelocity = this.jumpVelocity;

    console.log('After jump:', {
      yVelocity: this.yVelocity,
      gravity: this.gravity
    });

    const bubbleX = this.x + this.width / 2 - 10;
    const bubbleY = this.y + this.height - 10;
    let randomX = bubbleX + Math.random() * 30 - 15;
    let randomY = bubbleY + Math.random() * 30 - 15;
    
    new Bubble(randomX, randomY);
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
    if (this.element) {
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;
    }
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