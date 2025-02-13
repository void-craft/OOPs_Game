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
    this.bgMuted = false;
    this.effectsMuted = false;
    this.bgVolume = 1;
    this.effectsVolume = 1;

    this.sounds.background.volume = this.bgVolume;
    Object.values(this.sounds).forEach(sound => {
      if (sound !== this.sounds.background) {
        sound.volume = this.effectsVolume;
      }
    });

    this.unlockAudio = this.unlockAudio.bind(this);
    document.addEventListener("click", this.unlockAudio, { once: true });
    document.addEventListener("keydown", this.unlockAudio, { once: true });
  }

  unlockAudio() {
    this.sounds.background.play().then(() => {
      console.log("Audio Unlocked!");
    }).catch(e => console.warn("Audio Unlock Failed:", e));
  }

  play(sound) {
    if (this.sounds[sound]) {
      this.sounds[sound].currentTime = 0;
      if (sound === 'background' && this.bgMuted) return;
      if (sound !== 'background' && this.effectsMuted) return;
      this.sounds[sound].play().catch(e => console.warn("Playback error:", e));
    }
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
  }

  setEffectsVolume(volume) {
    this.effectsVolume = volume;
    Object.values(this.sounds).forEach(sound => {
      if (sound !== this.sounds.background) {
        sound.volume = volume;
      }
    });
  }

  muteBg() {
    this.bgMuted = !this.bgMuted;
    if (this.bgMuted) {
      this.sounds.background.pause();
    } else {
      this.sounds.background.play();
    }
  }

  muteEffects() {
    this.effectsMuted = !this.effectsMuted;
    Object.values(this.sounds).forEach(sound => {
      if (sound !== this.sounds.background) {
        if (this.effectsMuted) sound.pause();
        else sound.play();
      }
    });
  }
}
