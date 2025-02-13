import { Game } from './components/game.js';

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('.game-over').style.display = 'none';
  const game = new Game();
});
