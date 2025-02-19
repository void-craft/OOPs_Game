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
    this.stop();
    this.coinSpawner = setInterval(() => this.spawnCoin(), 2000);
    this.obstacleSpawner = setInterval(() => this.spawnObstacle(), 7000);
  }

  stop() {
    clearInterval(this.coinSpawner);
    clearInterval(this.obstacleSpawner);
  }

  spawnCoin() {
    if (this.game.isGameOver || this.game.totalCoinsSpawned >= this.game.maxCoins) return;
    const coin = new Coin(this.container);
    this.game.totalCoinsSpawned++;
    this.game.objects.push(coin);

    setTimeout(() => {
      if (this.game.objects.includes(coin)) {
        this.game.removeObjectFromDOM(coin);
        this.game.objects.splice(this.game.objects.indexOf(coin), 1);
      }
    }, 5000);
  }

  spawnObstacle() {
    if (this.game.isGameOver) return;
    const obstacle = new Obstacle(this.container); 
    this.game.objects.push(obstacle);

    setTimeout(() => {
      if (this.game.objects.includes(obstacle)) {
        this.game.removeObjectFromDOM(obstacle);
        this.game.objects.splice(this.game.objects.indexOf(obstacle), 1);
      }
    }, 7000);
  }
}