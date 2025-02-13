export class GameObject {
  constructor(game, container, x, y, width, height, elementClass) {
    this.game = game; // Now `game` is passed correctly
    this.x = x || Math.random() * (container.offsetWidth - width);
    this.y = y || Math.random() * (container.offsetHeight - height);
    this.width = width;
    this.height = height;
    this.container = container;
    this.element = document.createElement('div');
    this.element.classList.add(elementClass);
    this.container.appendChild(this.element);
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  collideWith(character) {
    return (
      this.x < character.x + character.width &&
      this.x + this.width > character.x &&
      this.y < character.y + character.height &&
      this.y + this.height > character.y
    );
  }
}
