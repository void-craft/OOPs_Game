class Game {
  constructor() {
    this.container = document.getElementById('game-container');
    this.character = null;
    this.coins = [];
    this.punctuation = 0;
    this.createScenario();
    this.addEvents();
  }

  createScenario() {
    this.character = new Character();
    this.container.appendChild(this.character.element);
    for (let i = 0; i < 5; i++) {
      const coin = new Coin();
      this.coins.push(coin);
      this.container.appendChild(coin.element); // corrected here
    }
  }

  addEvents() {
    window.addEventListener('keydown', (e) => this.character.move(e));
    this.checkCollisions();
  }

  checkCollisions() {
    setInterval(() => {
      this.coins.forEach((coin, index) => {
        if (this.character.collideWith(coin)) {
          this.container.removeChild(coin.element);
          this.coins.splice(index, 1);
        }
      });
    }, 100);
  }
}

class Character {
  constructor() {
    this.x = 50;
    this.y = 300;
    this.width = 50;
    this.height = 50;
    this.velocity = 10;
    this.isJumping = false;
    this.element = document.createElement('div');
    this.element.classList.add('character');
    this.updatePosition();
  }

  move(event) {
    const container = document.getElementById('game-container');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    if (
      event.key === 'ArrowRight' &&
      this.x + 100 + this.velocity <= containerWidth
    ) {
      this.x += this.velocity;
    } else if (event.key === 'ArrowLeft' && this.x - this.velocity >= 0) {
      this.x -= this.velocity;
    } else if (event.key === 'ArrowUp') {
      this.jump();
    }
    if (this.x + this.width > containerWidth) {
      this.x = containerWidth - this.width;
    }
    if (this.x < 0) {
      this.x = 0;
    }
    this.updatePosition();
  }

  jump() {
    this.isJumping = true;
    let maxHeight = this.y - 100;
    const jump = setInterval(() => {
      if (this.y > maxHeight) {
        this.y -= 10;
      } else {
        clearInterval(jump);
        this.fall();
      }
      this.updatePosition();
    }, 20);
  }

  fall() {
  const container = document.getElementById("game-container");
  const groundLevel = container.offsetHeight - 80;

  const gravity = setInterval(() => {
    if (this.y + 20 < groundLevel) {
      this.y += 10;
    } else {
      this.y = groundLevel - 10;
      clearInterval(gravity);
    }
    this.updatePosition();
  }, 20);
}

  updatePosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  collideWith(object) {
    return (
      this.x < object.x + object.width &&
      this.x + this.width > object.x &&
      this.y < object.y + object.height &&
      this.y + this.height > object.y
    );
  }
}

class Coin {
  constructor() {
    this.x = Math.random() * 700 + 50;
    this.y = Math.random() * 250 + 50;
    this.width = 30;
    this.height = 30;
    this.element = document.createElement('div');
    this.element.classList.add('coin');
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
}

const game = new Game();
