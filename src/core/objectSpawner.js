import { Coin } from '../objects/coin.js';
import { Obstacle } from '../objects/obstacle.js';

export class ObjectSpawner {
  constructor(game) {
    this.game = game;
    this.container = game.container; // Ensure this is a valid DOM element
    this.coinSpawner = null;
    this.obstacleSpawner = null;
  }

  start() {
    this.stop(); // Clear existing intervals
    this.coinSpawner = setInterval(() => this.spawnCoin(), 2000); // Spawn coins every 2 seconds
    this.obstacleSpawner = setInterval(() => this.spawnObstacle(), 7000); // Spawn obstacles every 7 seconds
  }

  stop() {
    clearInterval(this.coinSpawner);
    clearInterval(this.obstacleSpawner);
  }

  spawnCoin() {
    if (this.game.isGameOver || this.game.totalCoinsSpawned >= this.game.maxCoins) return;

    console.log('Spawning coin in container:', this.container); // Debugging
    const coin = new Coin(this.container); // Pass only the container
    this.game.totalCoinsSpawned++;
    this.game.objects.push(coin);

    // Remove coin after 5 seconds
    setTimeout(() => {
      if (this.game.objects.includes(coin)) {
        this.game.removeObjectFromDOM(coin);
        this.game.objects.splice(this.game.objects.indexOf(coin), 1);
      }
    }, 5000);
  }

  spawnObstacle() {
    if (this.game.isGameOver) return;

    console.log('Spawning obstacle in container:', this.container); // Debugging
    const obstacle = new Obstacle(this.container); // Pass only the container
    this.game.objects.push(obstacle);

    // Remove obstacle after 7 seconds
    setTimeout(() => {
      if (this.game.objects.includes(obstacle)) {
        this.game.removeObjectFromDOM(obstacle);
        this.game.objects.splice(this.game.objects.indexOf(obstacle), 1);
      }
    }, 7000);
  }
}