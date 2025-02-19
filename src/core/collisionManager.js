import { Coin } from '../objects/coin.js';
import { Obstacle } from '../objects/obstacle.js';
export class CollisionManager {
  constructor(game) {
    this.game = game;
  }

  checkCollisions() {
    if (this.game.isGameOver) return;
    for (let i = this.game.objects.length - 1; i >= 0; i--) {
      const object = this.game.objects[i];
      if (!object || !object.element) continue;
      if (this.game.character.collideWith(object)) {
        if (object instanceof Coin) {
          this.handleCoinCollision(object, i);
        } else if (object instanceof Obstacle) {
          this.handleObstacleCollision(i);
        }
      }
    }
    if (
      this.game.totalCoinsSpawned >= this.game.maxCoins &&
      this.game.objects.filter((obj) => obj instanceof Coin).length === 0
    ) {
      this.game.gameOver();
    }
  }
  
  handleCoinCollision(coin, index) {
    this.game.soundManager.play('eat');
 
    const coinRect = coin.element.getBoundingClientRect();
    const containerRect = this.game.container.getBoundingClientRect();
    
    this.game.removeObjectFromDOM(coin);
    this.game.objects.splice(index, 1);
    this.game.punctuation++;
    this.game.totalCoinsCollected++;
    this.game.ui.updateScore(this.game.punctuation);

    const animationElement = document.createElement('div');
    animationElement.classList.add('point-icon');

    const relativeLeft = coinRect.left - containerRect.left + coinRect.width / 2 - 12.5;
    const relativeTop = coinRect.top - containerRect.top - 30;
    
    animationElement.style.left = `${relativeLeft}px`;
    animationElement.style.top = `${relativeTop}px`;
    
    this.game.container.appendChild(animationElement);
    
    setTimeout(() => {
      if (this.game.container.contains(animationElement)) {
        this.game.container.removeChild(animationElement);
      }
    }, 1000);
  }
  
  handleObstacleCollision(index) {
    const obstacle = this.game.objects[index];
    if (!obstacle) return;
    
    const obstacleRect = obstacle.element.getBoundingClientRect();
    const containerRect = this.game.container.getBoundingClientRect();
    
    this.game.lives--;
    this.game.lifeManager.updateLives(this.game.lives);
    this.game.soundManager.play('hit');
    
    if (this.game.character && this.game.character.element) {
      const charRect = this.game.character.element.getBoundingClientRect();
      const animationElement = document.createElement('div');
      animationElement.classList.add('broken-heart-icon');
      
      const relativeLeft = obstacleRect.left - containerRect.left + obstacleRect.width / 2 - 12.5;
      const relativeTop = obstacleRect.top - containerRect.top - 30;
      
      animationElement.style.left = `${relativeLeft}px`;
      animationElement.style.top = `${relativeTop}px`;
      
      this.game.container.appendChild(animationElement);
      
      setTimeout(() => {
        if (this.game.container.contains(animationElement)) {
          this.game.container.removeChild(animationElement);
        }
      }, 1000);
      
      this.game.character.element.classList.add('red-flash');
      setTimeout(() => {
        this.game.character.element.classList.remove('red-flash');
      }, 500);
    }
    
    if (this.game.lives <= 0) {
      this.game.soundManager.play('gameOver');
      this.game.gameOver();
    }
    
    this.game.removeObjectFromDOM(obstacle);
    this.game.objects.splice(index, 1);
  }
}