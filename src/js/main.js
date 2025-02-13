import { Game } from './core/game.js';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.game-over').style.display = 'none';
  const game = new Game();
});
