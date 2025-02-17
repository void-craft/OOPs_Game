export class GameObject {
  constructor(container, x, y, width, height, elementClass) {
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

  remove() {
    if (this.element && this.container.contains(this.element)) {
      this.container.removeChild(this.element);
    }
  }
}