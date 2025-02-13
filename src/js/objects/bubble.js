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
    if (container) {
      container.appendChild(this.element);

      this.element.animate(
        [
          { transform: 'translateY(0)', opacity: 1 },
          { transform: 'translateY(-100px)', opacity: 0 }
        ],
        {
          duration: 2000,
          easing: 'ease-out'
        }
      );

      setTimeout(() => {
        this.element.remove();
      }, 2000);
    }
  }

  updatePosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
}