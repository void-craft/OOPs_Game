import { Character } from '../components/character.js';
import { Coin } from '../objects/coin.js';
import { Obstacle } from '../components/obstacle.js';
import { GameUI } from '../ui/gameUI.js';
import { ObjectSpawner } from './objectSpawner.js';

export class Game {
  constructor() {
    this.container = document.querySelector('.main__container');
    this.ui = new GameUI();
    this.character = null;
    this.objects = [];
    this.punctuation = 0;
    this.lives = 3;
    this.eatSound = new Audio('assets/sounds/crunch.wav');
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

    this.objects.forEach((object, index) => {
      if (!object || !object.element) return;

      if (this.character.collideWith(object)) {
        if (object instanceof Coin) {
          this.eatSound.currentTime = 0;
          this.eatSound.play();

          if (this.container.contains(object.element)) {
            this.container.removeChild(object.element);
          }

          this.objects.splice(index, 1);
          this.punctuation++;
          this.totalCoinsCollected++;
          this.ui.updateScore(this.punctuation);
        } else if (object instanceof Obstacle) {
          this.lives--;
          if (this.lives <= 0) this.gameOver();
          this.objects.splice(index, 1);
        }
      }
    });

    if (
      this.totalCoinsSpawned >= this.maxCoins &&
      this.objects.filter((obj) => obj instanceof Coin).length === 0
    ) {
      this.gameOver();
    }
  }

  gameOver() {
    this.isGameOver = true;
    this.spawner.stop();

    this.objects.forEach((obj) => {
      if (obj.element && this.container.contains(obj.element)) {
        this.container.removeChild(obj.element);
      }
    });

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

    this.objects.forEach((object) => {
      if (this.container.contains(object.element)) {
        this.container.removeChild(object.element);
      }
    });
    this.objects = [];

    this.container.removeChild(this.character.element);
    this.character = new Character();
    this.container.appendChild(this.character.element);

    this.spawner.start();
  }

  gameLoop() {
    if (!this.isGameOver) {
      this.character.applyGravity();
      this.checkCollisions();
      requestAnimationFrame(() => this.gameLoop());
    }
  }
}
