import { Coin } from '../objects/coin.js';
import { Obstacle } from '../objects/obstacle.js';

export class ObjectSpawner {
  constructor(body) {
    this.body = body;
    this.container = body.container;
    this.coinSpawner = null;
    this.obstacleSpawner = null;
  }

  start() {
    this.stop();
    this.coinSpawner = setInterval(() => {
      if (
        this.body.isGameOver ||
        this.body.totalCoinsSpawned >= this.body.maxCoins
      ) {
        clearInterval(this.coinSpawner);
        return;
      }
      this.spawnCoin();
    }, 2000);

    this.obstacleSpawner = setInterval(() => {
      if (this.body.isGameOver) {
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
    const coin = new Coin(this.body, this.container);
    this.body.totalCoinsSpawned++;
    this.addObjectToGame(coin, 5000);
  }

  spawnObstacle() {
    const obstacle = new Obstacle(this.body, this.container);
    this.addObjectToGame(obstacle, 7000);
  }

  addObjectToGame(object, lifespan) {
    if (object && object.element) {
      this.container.appendChild(object.element);
      this.body.objects.push(object);

      setTimeout(() => {
        if (this.body.isGameOver) return;
        if (this.body.objects.includes(object)) {
          if (object.element && this.container.contains(object.element)) {
            this.container.removeChild(object.element);
          }
          this.body.objects.splice(this.body.objects.indexOf(object), 1);
        }
      }, lifespan);
    }
  }
}