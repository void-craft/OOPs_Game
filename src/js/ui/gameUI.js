export class GameUI {
  constructor() {
    this.scoreboard = document.querySelector('.main__scoreboard');
    this.overlay = document.querySelector('.game-over');
    this.restartButton = document.querySelector('.game-over__restart-button');
    this.finalScore = document.querySelector('.game-over__final-score');
    this.finalLives = document.querySelector('.game-over__final-lives');
    this.finalCoins = document.querySelector('.game-over__final-coins');
  }

  updateScore(score) {
    this.scoreboard.textContent = `Score: ${score}`;
    console.log(`Score updated: ${score}`);
  }

  showGameOverScreen(score, lives, coins) {
    this.overlay.style.display = 'flex';
    if (this.finalScore) this.finalScore.textContent = `Final Score: ${score}`;
    if (this.finalLives) this.finalLives.textContent = `Lives Left: ${lives}`;
    if (this.finalCoins) this.finalCoins.textContent = `Coins Collected: ${coins}`;
    
    console.log(`Game Over! Score: ${score}, Lives: ${lives}, Coins: ${coins}`);
  }

  hideGameOverScreen() {
    this.overlay.style.display = 'none';
    console.log("Game Over screen hidden.");
  }

  addRestartListener(callback) {
    this.restartButton.addEventListener('click', () => {
      console.log("Restart button clicked.");
      callback();
    });
  }
}
