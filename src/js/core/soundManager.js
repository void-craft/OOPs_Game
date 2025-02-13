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

    // Enable looping for background music
    this.sounds.background.loop = true;

    // Initialize states
    this.bgMuted = false;
    this.effectsMuted = false;
    this.bgVolume = 1;
    this.effectsVolume = 1;

    // Set initial volumes
    this.sounds.background.volume = this.bgVolume;
    Object.values(this.sounds).forEach(sound => {
      if (sound !== this.sounds.background) {
        sound.volume = this.effectsVolume;
      }
    });

    // Bind methods and set up audio unlock
    this.unlockAudio = this.unlockAudio.bind(this);
    document.addEventListener("click", this.unlockAudio, { once: true });
    document.addEventListener("keydown", this.unlockAudio, { once: true });
  }

  /**
   * Unlocks audio playback on user interaction.
   */
  unlockAudio() {
    this.sounds.background.play()
      .then(() => console.log("Audio Unlocked!"))
      .catch(e => console.warn("Audio Unlock Failed:", e));
  }

  /**
   * Plays a sound.
   * @param {string} sound - The key of the sound to play.
   */
  play(sound) {
    if (!this.sounds[sound]) {
      console.warn(`Sound "${sound}" not found.`);
      return;
    }

    // Skip playback if muted
    if ((sound === 'background' && this.bgMuted) || (sound !== 'background' && this.effectsMuted)) {
      return;
    }

    // Reset playback and play
    this.sounds[sound].currentTime = 0;
    this.sounds[sound].play().catch(e => console.warn(`Playback error for "${sound}":`, e));
  }

  /**
   * Stops a sound.
   * @param {string} sound - The key of the sound to stop.
   */
  stop(sound) {
    if (this.sounds[sound]) {
      this.sounds[sound].pause();
      this.sounds[sound].currentTime = 0;
    }
  }

  /**
   * Sets the volume for background music.
   * @param {number} volume - The volume level (0 to 1).
   */
  setBgVolume(volume) {
    this.bgVolume = volume;
    this.sounds.background.volume = volume;
  }

  /**
   * Sets the volume for sound effects.
   * @param {number} volume - The volume level (0 to 1).
   */
  setEffectsVolume(volume) {
    this.effectsVolume = volume;
    Object.values(this.sounds).forEach(sound => {
      if (sound !== this.sounds.background) {
        sound.volume = volume;
      }
    });
  }

  /**
   * Toggles muting for background music.
   */
  muteBg() {
    this.bgMuted = !this.bgMuted;
    if (this.bgMuted) {
      this.sounds.background.pause();
    } else {
      this.sounds.background.play().catch(e => console.warn("Background music playback failed:", e));
    }
  }

  /**
   * Toggles muting for sound effects.
   */
  muteEffects() {
    this.effectsMuted = !this.effectsMuted;
    Object.values(this.sounds).forEach(sound => {
      if (sound !== this.sounds.background) {
        if (this.effectsMuted) {
          sound.pause();
        } else {
          sound.play().catch(e => console.warn("Sound effect playback failed:", e));
        }
      }
    });
  }
}