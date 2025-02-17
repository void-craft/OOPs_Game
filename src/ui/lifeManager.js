export class LifeManager {
  constructor(livesElement) {
    this.livesElement = livesElement;
  }

  updateLives(lives) {
    if (this.livesElement) {
      this.livesElement.innerHTML = '';

      for (let i = 0; i < lives; i++) {
        const heart = document.createElement('span');
        heart.classList.add('life-icon');
        heart.textContent = '❤️';
        this.livesElement.appendChild(heart);
      }
    } else {
      console.error('Lives container not found.');
    }
  }
}
