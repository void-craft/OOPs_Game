export class GameObject {
  constructor(game, container, x, y, width, height, elementClass, type) {
    this.game = game;
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

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
    this.updatePosition();
  }

  checkBounds() {
    const containerWidth = this.container.offsetWidth;
    const containerHeight = this.container.offsetHeight;

    this.x = Math.max(0, Math.min(this.x, containerWidth - this.width));
    this.y = Math.max(0, Math.min(this.y, containerHeight - this.height));
    this.updatePosition();
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

  destroy() {
    this.remove();
    // Add any additional cleanup logic here
  }

  addClickListener(callback) {
    this.element.addEventListener('click', callback);
  }

  startAnimation(animationClass) {
    this.element.classList.add(animationClass);
  }

  stopAnimation(animationClass) {
    this.element.classList.remove(animationClass);
  }

  debug() {
    this.element.style.border = '2px solid red';
  }
}