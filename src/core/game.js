import { Character } from '../objects/character.js';
import { Coin } from '../objects/coin.js';
import { Obstacle } from '../objects/obstacle.js';
import { ObjectSpawner } from './objectSpawner.js';
import { GameUI } from '../ui/gameUI.js';
import { SoundManager } from './soundManager.js';
import { LifeManager } from '../ui/lifeManager.js';
import { CollisionManager } from './collisionManager.js';

export class Game {
  constructor() {
    this.container = document.querySelector('.main__container');
    this.soundManager = new SoundManager();

    const livesElement = document.querySelector('.main__scoreboard__lives');
    this.lifeManager = new LifeManager(livesElement);

    this.ui = new GameUI(this.soundManager, this.lifeManager);
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

    this.lifeManager.updateLives(this.lives);

    this.createScenario();
    this.spawner = new ObjectSpawner(this);

    // Initialize CollisionManager
    this.collisionManager = new CollisionManager(this);

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
    console.log('Game started!');
    this.isGameStarted = true;
    this.ui.hideStartScreen(); // Hide start screen
    if (this.soundManager) {
      this.soundManager.startGame();
    }
    this.spawner.start();
    this.addEvents();
    this.isGameLoopOn = true;
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

    this.ui.showGameOverScreen( // Show game over screen
      this.punctuation,
      this.lives,
      this.totalCoinsCollected
    );
  }

  restartGame() {
    this.isGameOver = false;
    this.isGameStarted = false;
    this.isGameLoopOn = false;
    this.ui.hideGameOverScreen(); // Hide game over screen

    this.punctuation = 0;
    this.lives = 3;
    this.totalCoinsSpawned = 0;
    this.totalCoinsCollected = 0;
    this.lifeManager.updateLives(this.lives);
    this.ui.updateScore(0);

    this.objects.forEach((object) => this.removeObjectFromDOM(object));
    this.objects = [];

    if (this.character && this.character.element) {
      this.container.removeChild(this.character.element);
    }
    this.character = new Character();
    this.container.appendChild(this.character.element);

    this.startGame();
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
    if (this.isGameOver || !this.isGameLoopOn) return;

    this.character.applyGravity();
    this.collisionManager.checkCollisions(); // Delegate collision handling to CollisionManager

    if (!this.isGameOver && this.isGameLoopOn) {
      requestAnimationFrame(() => this.gameLoop());
    }
  }

  removeObjectFromDOM(object) {
    if (object && object.element && this.container.contains(object.element)) {
      this.container.removeChild(object.element);
    }
  }
}