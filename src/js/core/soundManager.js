export class SoundManager {
  constructor() {
    this.sounds = {
      eat: new Audio('assets/sound/crunch.wav'),
      gameOver: new Audio('assets/sound/game-over.wav'),
      jump: new Audio('assets/sound/jump.wav'),
      hit: new Audio('assets/sound/obstacle-hit.wav'),
    };
  }

  play(sound) {
    if (this.sounds[sound]) {
      this.sounds[sound].currentTime = 0;
      this.sounds[sound].play();
    }
  }
}
