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
    this.maxCoins = 50;
    this.totalCoinsSpawned = 0;
    this.totalCoinsCollected = 0;
    this.isGameOver = false;

    this.ui.hideGameOverScreen();
    this.createScenario();
    this.addEvents();
    this.spawner = new ObjectSpawner(this);
    this.spawner.start();
    this.gameLoop();

    this.soundManager = new SoundManager();
    this.soundManager.play('background');
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
    @param {Coin} coin
    @param {number} index - The index of the coin in the objects array.
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
    this.soundManager.play('hit');
    this.removeObjectFromDOM(this.objects[index]);
    this.objects.splice(index, 1);

    if (this.lives <= 0) {
      this.gameOver();
    }
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
    this.soundManager.play('gameOver');
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
    this.ui.hideGameOverScreen();
    this.punctuation = 0;
    this.totalCoinsSpawned = 0;
    this.totalCoinsCollected = 0;
    this.lives = 3;
    this.ui.updateScore(0);

    this.objects.forEach((object) => this.removeObjectFromDOM(object));
    this.objects = [];

    this.container.removeChild(this.character.element);
    this.character = new Character();
    this.container.appendChild(this.character.element);

    this.spawner.start();
    this.soundManager.play('background');
  }

  gameLoop() {
    if (this.isGameOver) return;

    this.character.applyGravity();
    this.checkCollisions();
    requestAnimationFrame(() => this.gameLoop());
  }
}