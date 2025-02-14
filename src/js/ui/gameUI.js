export class GameUI {
  constructor(soundManager) {

    this.startScreen = document.querySelector('.start-screen');
    this.playButton = document.querySelector('.start-screen .start-screen__play-button');

    this.scoreboard = document.querySelector('.main__scoreboard__score');
    this.livesElement = document.querySelector('.main__scoreboard__lives');
    this.overlay = document.querySelector('.game-over:not(.start-screen)');
    this.restartButton = document.querySelector(
      '.game-over:not(.start-screen) .game-over__restart-button'
    );
    this.finalScore = document.querySelector('.game-over__final-score');
    this.finalLives = document.querySelector('.game-over__final-lives');
    this.finalCoins = document.querySelector('.game-over__final-coins');

    this.muteBackgroundButton = document.getElementById('mute-background');
    this.volumeBackgroundSlider = document.getElementById('volume-background');
    this.muteEffectsButton = document.getElementById('mute-effects');
    this.volumeEffectsSlider = document.getElementById('volume-effects');

    this.soundManager = soundManager;

    // Add event listeners if elements exist
    if (this.muteBackgroundButton) {
      this.muteBackgroundButton.addEventListener('click', () =>
        this.toggleMuteBackground()
      );
    } else {
      console.error('Mute background button not found.');
    }

    if (this.volumeBackgroundSlider) {
      this.volumeBackgroundSlider.addEventListener('input', (e) =>
        this.adjustVolumeBackground(e)
      );
    } else {
      console.error('Volume background slider not found.');
    }

    if (this.muteEffectsButton) {
      this.muteEffectsButton.addEventListener('click', () =>
        this.toggleMuteEffects()
      );
    } else {
      console.error('Mute effects button not found.');
    }

    if (this.volumeEffectsSlider) {
      this.volumeEffectsSlider.addEventListener('input', (e) =>
        this.adjustVolumeEffects(e)
      );
    } else {
      console.error('Volume effects slider not found.');
    }

    if (this.playButton) {
      this.playButton.addEventListener('click', () => {
        this.hideStartScreen();
        this.soundManager.stop('wait');
        this.soundManager.play('background');
      });
    } else {
      console.error('Play button not found.');
    }
  }

  toggleMuteBackground() {
    this.soundManager.muteBg();
    if (this.soundManager.bgMuted) {
      this.muteBackgroundButton.classList.add('muted');
    } else {
      this.muteBackgroundButton.classList.remove('muted');
    }
  }

  toggleMuteEffects() {
    this.soundManager.muteEffects();
    if (this.soundManager.effectsMuted) {
      this.muteEffectsButton.classList.add('muted');
    } else {
      this.muteEffectsButton.classList.remove('muted');
    }
  }

  adjustVolumeBackground(e) {
    const volume = parseFloat(e.target.value);
    this.soundManager.setBgVolume(volume);
  }

  adjustVolumeEffects(e) {
    const volume = parseFloat(e.target.value);
    this.soundManager.setEffectsVolume(volume);
  }

  updateScore(score) {
    if (this.scoreboard) {
      this.scoreboard.textContent = `Score: ${score}`;
    } else {
      console.error('Scoreboard element not found.');
    }
  }

  updateLives(lives) {
    if (this.livesElement) {
      this.livesElement.textContent = `Lives: ${lives}`;
    } else {
      console.error('Lives element not found.');
    }
  }

  showStartScreen() {
    if (this.startScreen) {
      this.startScreen.style.display = 'flex';
    } else {
      console.error('Start screen overlay not found.');
    }
  }

  hideStartScreen() {
    if (this.startScreen) {
      this.startScreen.style.display = 'none';
    } else {
      console.error('Start screen overlay not found.');
    }
  }

  showGameOverScreen(score, lives, coins) {
    if (this.overlay) {
      this.overlay.style.display = 'flex';
      if (this.finalScore)
        this.finalScore.textContent = `Final Score: ${score}`;
      if (this.finalLives) this.finalLives.textContent = `Lives Left: ${lives}`;
      if (this.finalCoins)
        this.finalCoins.textContent = `Coins Collected: ${coins}`;
    } else {
      console.error('Game over overlay not found.');
    }
  }

  hideGameOverScreen() {
    if (this.overlay) {
      this.overlay.style.display = 'none';
    } else {
      console.error('Game over overlay not found.');
    }
  }

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
