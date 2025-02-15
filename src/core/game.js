import { Character } from '../objects/character.js';
import { Coin } from '../objects/coin.js';
import { Obstacle } from '../objects/obstacle.js';
import { ObjectSpawner } from './objectSpawner.js';
import { GameUI } from '../ui/gameUI.js';
import { SoundManager } from './soundManager.js';

export class Game {
  constructor() {
    this.container = document.querySelector('.main__container');
    this.soundManager = new SoundManager();
    this.ui = new GameUI(this.soundManager);
    this.character = null;
    this.objects = [];
    this.punctuation = 0;
    this.lives = 3;
    this.maxCoins = 20;
    this.totalCoinsSpawned = 0;
    this.totalCoinsCollected = 0;
    this.isGameOver = false;
    this.isGameStarted = false;
    this.isGameLoopOn = false;

    this.ui.hideGameOverScreen();
    this.ui.showStartScreen();

    this.createScenario();
    this.spawner = new ObjectSpawner(this);

    if (this.ui.playButton) {
      this.ui.playButton.addEventListener('click', () => {
        this.startGame();
      });
    }

    this.handleKeyDown = (e) => {
      if (this.character) {
        if (e.key === 'ArrowUp' || e.key === ' ') {
          this.character.handleJump();
        } else {
          this.character.move(e);
        }
      }
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleRestart = this.restartGame.bind(this);
  }

  startGame() {
    this.isGameStarted = true;
    this.ui.hideStartScreen();
    if (this.soundManager) {
      this.soundManager.startGame();
    }
    this.spawner.start();
    this.addEvents();
    this.gameLoop();
  }

  gameOver() {
    this.isGameOver = true;
    this.spawner.stop();
    if (this.soundManager) {
      this.soundManager.gameOver();
    }

    this.removeEvents();

    this.objects.forEach((obj) => this.removeObjectFromDOM(obj));
    this.objects = [];

    this.ui.showGameOverScreen(
      this.punctuation,
      this.lives,
      this.totalCoinsCollected
    );
  }

  restartGame() {
    this.isGameOver = false;
    this.isGameStarted = true;
    this.ui.hideGameOverScreen();
    this.punctuation = 0;
    this.totalCoinsSpawned = 0;
    this.totalCoinsCollected = 0;
    this.lives = 3;
    this.ui.updateLives(this.lives);
    this.ui.updateScore(0);

    this.objects.forEach((object) => this.removeObjectFromDOM(object));
    this.objects = [];

    if (this.character && this.character.element) {
      this.container.removeChild(this.character.element);
    }
    this.character = new Character();
    this.container.appendChild(this.character.element);

    this.spawner.start();
    if (this.soundManager) {
      this.soundManager.startGame();
    }
    this.addEvents();
    this.gameLoop();
  }

  createScenario() {
    this.character = new Character();
    this.container.appendChild(this.character.element);
  }

  addEvents() {
    this.removeEvents();
    window.addEventListener('keydown', this.handleKeyDown);
    this.ui.addRestartListener(this.handleRestart);
  }

  removeEvents() {
    window.removeEventListener('keydown', this.handleKeyDown);
    this.ui.removeRestartListener(this.handleRestart);
  }

  gameLoop() {
    if (this.isGameOver) return;

    this.character.applyGravity();
    this.checkCollisions();

    if (!this.isGameOver) {
      requestAnimationFrame(() => this.gameLoop());
    }
  }

  checkCollisions() {
    if (this.isGameOver) return;

    for (let i = this.objects.length - 1; i >= 0; i--) {
      const object = this.objects[i];
      if (!object || !object.element) continue;

      if (this.character.collideWith(object)) {
        if (object instanceof Coin) {
          this.handleCoinCollision(object, i);
        } else if (object instanceof Obstacle) {
          this.handleObstacleCollision(i);
        }
      }
    }

    if (
      this.totalCoinsSpawned >= this.maxCoins &&
      this.objects.filter((obj) => obj instanceof Coin).length === 0
    ) {
      this.gameOver();
    }
  }

  handleCoinCollision(coin, index) {
    if (this.soundManager) {
      this.soundManager.play('eat');
    }
    this.removeObjectFromDOM(coin);
    this.objects.splice(index, 1);
    this.punctuation++;
    this.totalCoinsCollected++;
    this.ui.updateScore(this.punctuation);

    this.createCollisionAnimation(coin.x, coin.y, '+1', 'white');
  }

  createCollisionAnimation(x, y, text, color) {
  console.log('Creating collision animation at:', x, y); // Debugging
  const animationElement = document.createElement('div');
  animationElement.classList.add('collision-animation');
  animationElement.style.left = `${x + this.character.width / 2}px`;
  animationElement.style.top = `${y + this.character.height / 2}px`;
  animationElement.style.color = color;
  animationElement.textContent = text;
  this.container.appendChild(animationElement);

  // Remove the element after the animation
  setTimeout(() => {
    if (this.container.contains(animationElement)) {
      this.container.removeChild(animationElement);
    }
  }, 1000);
}

  handleObstacleCollision(index) {
    this.lives--;
    if (this.soundManager) {
      this.soundManager.play('hit');
    }
    this.ui.updateLives(this.lives);

    if (this.lives <= 0) {
      if (this.soundManager) {
        this.soundManager.play('gameOver');
      }
      this.gameOver();
    }

    const obstacle = this.objects[index];
    this.createCollisionAnimation(obstacle.x, obstacle.y, '💔', 'white');

    this.removeObjectFromDOM(this.objects[index]);
    this.objects.splice(index, 1);
  }

  removeObjectFromDOM(object) {
    if (object && object.element && this.container.contains(object.element)) {
      this.container.removeChild(object.element);
    }
  }
}