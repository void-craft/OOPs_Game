export class SoundManager {
  constructor() {
    this.sounds = {
      eat: new Audio('./assets/sounds/crunch.wav'),
      hit: new Audio('./assets/sounds/life_lost.mp3'),
      gameOver: new Audio('./assets/sounds/game_over.mp3'),
      levelComplete: new Audio('./assets/sounds/level_complete.mp3'),
      background: new Audio('./assets/sounds/loop.mp3'),
      wait: new Audio('./assets/sounds/wait.mp3')
    };

    this.sounds.background.loop = true;
    this.sounds.wait.loop = true;

    this.bgMuted = false;
    this.effectsMuted = false;
    this.bgVolume = 1;
    this.effectsVolume = 1;
    this.sounds.background.volume = this.bgVolume;

    Object.values(this.sounds).forEach(sound => {
      if (sound !== this.sounds.background && sound !== this.sounds.wait) {
        sound.volume = this.effectsVolume;
      }
    });

    this.play('wait');

    this.unlockAudio = this.unlockAudio.bind(this);
    document.addEventListener("click", this.unlockAudio, { once: true });
    document.addEventListener("keydown", this.unlockAudio, { once: true });
  }

  unlockAudio() {
    this.sounds.background.play()
      .then(() => console.log("Audio Unlocked!"))
      .catch(e => console.warn("Audio Unlock Failed:", e));
  }

  play(sound) {
    if (!this.sounds[sound]) {
      console.warn(`Sound "${sound}" not found.`);
      return;
    }

    if ((sound === 'background' && this.bgMuted) || (sound !== 'background' && this.effectsMuted)) {
      return;
    }

    this.sounds[sound].currentTime = 0;
    this.sounds[sound].play().catch(e => console.warn(`Playback error for "${sound}":`, e));
  }

  stop(sound) {
    if (this.sounds[sound]) {
      this.sounds[sound].pause();
      this.sounds[sound].currentTime = 0;
    }
  }

  setBgVolume(volume) {
    this.bgVolume = volume;
    this.sounds.background.volume = volume;
    this.sounds.wait.volume = volume;
  }

  setEffectsVolume(volume) {
    this.effectsVolume = volume;
    Object.values(this.sounds).forEach(sound => {
      if (sound !== this.sounds.background && sound !== this.sounds.wait) {
        sound.volume = volume;
      }
    });
  }

  muteBg() {
    this.bgMuted = !this.bgMuted;
    if (this.bgMuted) {
      this.sounds.background.pause();
      this.sounds.wait.pause();
    } else {
      if (this.sounds.wait.currentTime > 0) {
        this.sounds.wait.play().catch(e => console.warn("Wait sound playback failed:", e));
      } else {
        this.sounds.background.play().catch(e => console.warn("Background music playback failed:", e));
      }
    }  }

  muteEffects() {
    this.effectsMuted = !this.effectsMuted;
    Object.values(this.sounds).forEach(sound => {
      if (sound !== this.sounds.background && sound !== this.sounds.wait) {
        if (this.effectsMuted) {
          sound.pause();
        } else {
          sound.play().catch(e => console.warn("Sound effect playback failed:", e));
        }
      }
    });
  }

  gameOver() {
    this.stop('background');
    this.play('gameOver');
    this.play('wait');
  }

  startGame() {
    this.stop('wait');
    this.play('background');
  }

  maxCoins() {
    this.stop('background');
    this.play('wait');
  }
}