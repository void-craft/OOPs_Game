import { Character } from '../objects/character.js';
import { Coin } from '../objects/coin.js';
import { Obstacle } from '../objects/obstacle.js';
import { GameUI } from '../ui/gameUI.js';
import { ObjectSpawner } from './objectSpawner.js';
import { SoundManager } from './soundManager.js';

export class Game {
  constructor() {
    this.container = document.querySelector('.main__container');
    this.ui = new GameUI();
    this.character = null;
    this.objects = [];
    this.punctuation = 0;
    this.lives = 3;
    this.maxCoins = 20;
    this.totalCoinsSpawned = 0;
    this.totalCoinsCollected = 0;
    this.isGameOver = false;
    this.isGameStarted = false;

    this.ui.hideGameOverScreen();
    this.ui.showStartScreen();
    this.createScenario();

    this.spawner = new ObjectSpawner(this);
    this.soundManager = new SoundManager();
    this.soundManager.play('background');

    this.ui.playButton.addEventListener('click', () => {
      this.startGame();
    });
  }

  startGame() {
    this.isGameStarted = true;
    this.ui.hideStartScreen();
    this.spawner.start();
    this.addEvents();
    this.gameLoop();
  }

  createScenario() {
    this.character = new Character();
    this.container.appendChild(this.character.element);
  }

  addEvents() {
    window.addEventListener('keydown', (e) => this.character.move(e));
    this.ui.addRestartListener(() => this.restartGame());
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

  /**
   * Handles collision with a coin.
   * @param {Coin} coin - The coin object.
   * @param {number} index - The index of the coin in the objects array.
   */
  handleCoinCollision(coin, index) {
    this.soundManager.play('eat');
    this.removeObjectFromDOM(coin);
    this.objects.splice(index, 1);
    this.punctuation++;
    this.totalCoinsCollected++;
    this.ui.updateScore(this.punctuation);
  }

  /**
   * Handles collision with an obstacle.
   * @param {number} index - The index of the obstacle in the objects array.
   */
  handleObstacleCollision(index) {
    this.lives--;
    this.soundManager.play('hit'); // Play "hit" sound for losing a life

    if (this.lives <= 0) {
      this.soundManager.play('gameOver'); // Play "game over" sound when no lives are left
      this.gameOver();
    } else {
      this.soundManager.play('hit'); // Play "hit" sound if lives are still remaining
    }

    this.removeObjectFromDOM(this.objects[index]);
    this.objects.splice(index, 1);
  }

  /**
   * Removes an object from the DOM.
   * @param {Object} object - The game object to remove.
   */
  removeObjectFromDOM(object) {
    if (object.element && this.container.contains(object.element)) {
      this.container.removeChild(object.element);
    }
  }

  gameOver() {
    this.isGameOver = true;
    this.spawner.stop();
    this.soundManager.stop('background');

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
    this.ui.updateScore(0);

    this.objects.forEach((object) => this.removeObjectFromDOM(object));
    this.objects = [];

    if (this.character && this.character.element) {
      this.container.removeChild(this.character.element);
    }
    this.character = new Character();
    this.container.appendChild(this.character.element);

    this.spawner.start();
    this.soundManager.play('background');
    this.addEvents();
    this.gameLoop();
  }

  gameLoop() {
    if (this.isGameOver) return;

    this.character.applyGravity();
    this.checkCollisions();
    requestAnimationFrame(() => this.gameLoop());
  }
}