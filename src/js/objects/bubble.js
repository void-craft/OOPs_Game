export class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 10 + 5;
    this.element = document.createElement('div');
    this.element.classList.add('bubble');
    this.updatePosition();

    this.element.style.width = `${this.size}px`;
    this.element.style.height = `${this.size}px`;

    const container = document.querySelector('.main__container');
    container.appendChild(this.element);

    setTimeout(() => {
      this.element.style.transition = 'transform 2s ease-out, opacity 2s ease-out';
      this.element.style.transform = `translateY(-100px)`;
      this.element.style.opacity = '0';
    }, 10);

    setTimeout(() => {
      this.element.remove();
    }, 2000);
  }

  updatePosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
}

