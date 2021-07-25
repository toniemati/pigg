import { Enemy } from "./Enemy.js";

const board = document.querySelector('#board');
const player = document.querySelector('.player');
const playerImg = document.querySelector('.player-img');
const scoreSpan = document.querySelector('.score');

//* default center player position
player.style.left = `${(board.clientWidth / 2) - (player.clientWidth / 2)}px`;
player.style.top = `${(board.clientHeight / 2) - (player.clientHeight / 2)}px`;

let score = 0;
const pigStaySrc = './img/pig-stay.gif';
const pigShootSrc = './img/pig-shooting.gif';
let isShooting = false;

const FPS = 60;
const PLAYER_SPEED = 5;
const keys = [];
let lastRenderTime = 0;

let enemy = new Enemy(board, player);

const loop = (currentTime) => {
  requestAnimationFrame(loop);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / FPS) return;
  lastRenderTime = currentTime;

  movePlayer();
  enemy.move();
  checkKillEnemy();
}

requestAnimationFrame(loop);

window.addEventListener('keydown', (e) => {
  keys[e.code] = true;
});

window.addEventListener('keyup', (e) => {
  delete keys[e.code];
});

const movePlayer = () => {
  let {top, left} = player.style;
  top = parseInt(top);
  left = parseInt(left);

  if (keys['ArrowUp']) {
    if (top <= board.clientTop) return;
    player.style.top = `${top - PLAYER_SPEED}px`;
  }

  //todo EDGE COLLISION
  if (keys['ArrowDown']) {
    if (top >= (board.clientHeight - playerImg.clientHeight) ) return;
    player.style.top = `${top + PLAYER_SPEED}px`;
  }

  if (keys['ArrowLeft']) {
    if (left <= board.clientLeft) return;
    playerImg.classList.add('left');
    player.style.left = `${left - PLAYER_SPEED}px`;
  }

  if (keys['ArrowRight']) {
    if (left >= board.clientWidth - playerImg.clientWidth) return;
    playerImg.classList.remove('left');
    player.style.left = `${left + PLAYER_SPEED}px`;
  }

  if (keys['Space']) {
    setTimeout(() => {isShooting = true}, 2000);
    playerImg.src = pigShootSrc;
    setTimeout(() => {
      playerImg.src = pigStaySrc
      isShooting = false;
    }, 6000)
  }
};

const checkKillEnemy = () => {
  if (!isShooting) return;
  
  if (enemyInRange()) createNewEnemy();
};

const enemyInRange = () => {
  return (
    enemy.left < parseInt(player.style.left) + player.clientWidth &&
    enemy.left + 32 > parseInt(player.style.left) &&
    enemy.top < parseInt(player.style.top) + player.clientHeight &&
    enemy.top + 64 > parseInt(player.style.top)
  ) ? true : false;
};

const createNewEnemy = () => {
  const prevEnemy = document.querySelector('.enemy');
  if (prevEnemy) board.removeChild(prevEnemy);
  else enemy = new Enemy(board, player);

  score++;
  scoreSpan.innerText = score;
}