import { Coin } from '../objects/coin.js';
import { Obstacle } from '../objects/obstacle.js';

export class ObjectSpawner {
  constructor(game) {
    this.game = game;
    this.container = game.container;
    this.coinSpawner = null;
    this.obstacleSpawner = null;
  }

  start() {
    this.coinSpawner = setInterval(() => {
      if (
        this.game.isGameOver ||
        this.game.totalCoinsSpawned >= this.game.maxCoins
      ) {
        clearInterval(this.coinSpawner);
        return;
      }
      this.spawnCoin();
    }, 2000);

    this.obstacleSpawner = setInterval(() => {
      if (this.game.isGameOver) {
        clearInterval(this.obstacleSpawner);
        return;
      }
      this.spawnObstacle();
    }, 7000);
  }

  stop() {
    clearInterval(this.coinSpawner);
    clearInterval(this.obstacleSpawner);
  }

  spawnCoin() {
    const coin = new Coin(this.game, this.container);
    this.game.totalCoinsSpawned++;
    this.addObjectToGame(coin, 5000);
  }

  spawnObstacle() {
    const obstacle = new Obstacle(this.game, this.container);
    this.addObjectToGame(obstacle, 7000);
  }

  addObjectToGame(object, lifespan) {
    if (object && object.element) {
      this.container.appendChild(object.element);
      this.game.objects.push(object);
    }

    setTimeout(() => {
      if (this.game.isGameOver) return;
      if (this.game.objects.includes(object)) {
        if (object.element && this.container.contains(object.element)) {
          this.container.removeChild(object.element);
        }
        this.game.objects.splice(this.game.objects.indexOf(object), 1);
      }
    }, lifespan);
  }
}
