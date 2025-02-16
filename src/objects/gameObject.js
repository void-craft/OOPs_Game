export class GameObject {
  constructor(body, container, x, y, width, height, elementClass, type) {
    this.body = body;
    this.x = x || Math.random() * (container.offsetWidth - width);
    this.y = y || Math.random() * (container.offsetHeight - height);
    this.width = width;
    this.height = height;
    this.container = container;
    this.element = document.createElement('div');
    this.element.classList.add(elementClass);
    this.container.appendChild(this.element);
    this.type = type || 'default';
    this.isVisible = true;
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

  collideWithObject(otherObject) {
    return (
      this.x < otherObject.x + otherObject.width &&
      this.x + this.width > otherObject.x &&
      this.y < otherObject.y + otherObject.height &&
      this.y + this.height > otherObject.y
    );
  }

  remove() {
    if (this.element && this.container.contains(this.element)) {
      this.container.removeChild(this.element);
    }
  }

  addClickListener(callback) {
    this.element.addEventListener('click', callback);
  }

}