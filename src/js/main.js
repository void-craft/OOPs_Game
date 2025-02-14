import { Game } from './core/game.js';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.start-screen').style.display = 'none';
  const game = new Game();
});
