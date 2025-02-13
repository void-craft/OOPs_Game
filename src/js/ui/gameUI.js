export class GameUI {
  constructor(soundManager) {
    // Initialize DOM elements
    this.scoreboard = document.querySelector('.main__scoreboard__score'); // Ensure this is the correct selector
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

    // Initialize sound manager
    this.soundManager = soundManager;

    // Add event listeners if elements exist
    if (this.muteBackgroundButton) {
      this.muteBackgroundButton.addEventListener('click', () => this.toggleMuteBackground());
    } else {
      console.error('Mute background button not found.');
    }

    if (this.volumeBackgroundSlider) {
      this.volumeBackgroundSlider.addEventListener('input', (e) => this.adjustVolumeBackground(e));
    } else {
      console.error('Volume background slider not found.');
    }

    if (this.muteEffectsButton) {
      this.muteEffectsButton.addEventListener('click', () => this.toggleMuteEffects());
    } else {
      console.error('Mute effects button not found.');
    }

    if (this.volumeEffectsSlider) {
      this.volumeEffectsSlider.addEventListener('input', (e) => this.adjustVolumeEffects(e));
    } else {
      console.error('Volume effects slider not found.');
    }
  }

  /**
   * Toggles the mute state of background music.
   */
  toggleMuteBackground() {
    this.soundManager.muteBg();
    // Change button appearance based on mute state
    if (this.soundManager.bgMuted) {
      this.muteBackgroundButton.classList.add('muted');
    } else {
      this.muteBackgroundButton.classList.remove('muted');
    }
  }

  /**
   * Toggles the mute state of sound effects.
   */
  toggleMuteEffects() {
    this.soundManager.muteEffects();
    // Change button appearance based on mute state
    if (this.soundManager.effectsMuted) {
      this.muteEffectsButton.classList.add('muted');
    } else {
      this.muteEffectsButton.classList.remove('muted');
    }
  }

  /**
   * Adjusts the volume of background music.
   * @param {Event} e - The input event from the volume slider.
   */
  adjustVolumeBackground(e) {
    const volume = parseFloat(e.target.value);
    this.soundManager.setBgVolume(volume);
  }

  /**
   * Adjusts the volume of sound effects.
   * @param {Event} e - The input event from the volume slider.
   */
  adjustVolumeEffects(e) {
    const volume = parseFloat(e.target.value);
    this.soundManager.setEffectsVolume(volume);
  }

  /**
   * Updates the score displayed on the scoreboard.
   * @param {number} score - The new score to display.
   */
  updateScore(score) {
    if (this.scoreboard) {
      this.scoreboard.textContent = `Score: ${score}`;
    } else {
      console.error('Scoreboard element not found.');
    }
  }

  /**
   * Displays the game over screen with final stats.
   * @param {number} score - The final score.
   * @param {number} lives - The remaining lives.
   * @param {number} coins - The total coins collected.
   */
  showGameOverScreen(score, lives, coins) {
    if (this.overlay) {
      this.overlay.style.display = 'flex';
      if (this.finalScore) this.finalScore.textContent = `Final Score: ${score}`;
      if (this.finalLives) this.finalLives.textContent = `Lives Left: ${lives}`;
      if (this.finalCoins) this.finalCoins.textContent = `Coins Collected: ${coins}`;
    } else {
      console.error('Game over overlay not found.');
    }
  }

  /**
   * Hides the game over screen.
   */
  hideGameOverScreen() {
    if (this.overlay) {
      this.overlay.style.display = 'none';
    } else {
      console.error('Game over overlay not found.');
    }
  }

  /**
   * Adds a click event listener to the restart button.
   * @param {Function} callback - The function to call when the restart button is clicked.
   */
  addRestartListener(callback) {
    if (this.restartButton) {
      this.restartButton.addEventListener('click', () => {
        callback();
      });
    } else {
      console.error('Restart button not found.');
    }
  }
}