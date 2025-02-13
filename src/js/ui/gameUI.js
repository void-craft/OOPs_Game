export class GameUI {
  constructor() {
    this.scoreboard = document.querySelector('.main__scoreboard');
    this.overlay = document.querySelector('.game-over');
    this.restartButton = document.querySelector('.game-over__restart-button');
    this.finalScore = document.querySelector('.game-over__final-score');
    this.finalLives = document.querySelector('.game-over__final-lives');
    this.finalCoins = document.querySelector('.game-over__final-coins');
    
    // Background music and sound effects controls
    this.muteBackgroundButton = document.getElementById('mute-background');
    this.volumeBackgroundSlider = document.getElementById('volume-background');
    this.muteEffectsButton = document.getElementById('mute-effects');
    this.volumeEffectsSlider = document.getElementById('volume-effects');

    // Event Listeners for volume and mute buttons
    this.muteBackgroundButton.addEventListener('click', () => this.toggleMuteBackground());
    this.volumeBackgroundSlider.addEventListener('input', (e) => this.adjustVolumeBackground(e));

    this.muteEffectsButton.addEventListener('click', () => this.toggleMuteEffects());
    this.volumeEffectsSlider.addEventListener('input', (e) => this.adjustVolumeEffects(e));
  }

  toggleMuteBackground() {
    this.soundManager.muteBg();
    // Change button appearance based on mute state (e.g., different icon for muted state)
    if (this.soundManager.bgMuted) {
      this.muteBackgroundButton.classList.add('muted');
    } else {
      this.muteBackgroundButton.classList.remove('muted');
    }
  }

  toggleMuteEffects() {
    this.soundManager.muteEffects();
    // Change button appearance based on mute state (e.g., different icon for muted state)
    if (this.soundManager.effectsMuted) {
      this.muteEffectsButton.classList.add('muted');
    } else {
      this.muteEffectsButton.classList.remove('muted');
    }
  }

  adjustVolumeBackground(e) {
    const volume = e.target.value;
    this.soundManager.setBgVolume(volume);
  }

  adjustVolumeEffects(e) {
    const volume = e.target.value;
    this.soundManager.setEffectsVolume(volume);
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
