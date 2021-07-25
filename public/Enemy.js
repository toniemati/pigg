export class Enemy {

  speed = {
    x: 2,
    y: 2
  }

  constructor(board, player) {
    this.board = board;
    this.player = player
    this.create();
    this.setSpeed();
  }

  create() {
    let left, top;
   
    //* checking if enemy position in board
    while (
      !left || 
      left < 0 || 
      left + 32 >= this.board.clientWidth || 
      left < parseInt(this.player.style.left) + this.player.clientWidth &&
      left + 32 > parseInt(this.player.style.left)
    )
      left = Math.floor(Math.random() * this.board.clientWidth);

    while (
      !top || 
      top < 0 || 
      top + 64 >= this.board.clientHeight || 
      top < parseInt(this.player.style.top) + this.player.clientHeight &&
      top + 64 > parseInt(this.player.style.top)
    )
      top = Math.floor(Math.random() * this.board.clientHeight)
    
    this.left = left;
    this.top = top;

    const enemyEl = document.createElement('div')
    enemyEl.classList.add('enemy');
    enemyEl.style.left = `${left}px`;
    enemyEl.style.top = `${top}px`;
    this.board.appendChild(enemyEl);

    this.enemyDiv = enemyEl;
  }

  setSpeed() {
    const x = Math.floor(Math.random() * 3 + 1) * (Math.round(Math.random()) ? 1 : -1);
    const y = Math.floor(Math.random() * 3 + 1) * (Math.round(Math.random()) ? 1 : -1);

    this.speed = {
      x,
      y
    }

    console.log('enemy speed: ',this.speed);
  }

  move() {
    let {left, top} = this.enemyDiv.style;
    left = parseInt(left);
    top = parseInt(top);

    this.left = left;
    this.top = top;

    if (left <= 0) this.speed.x = 2;
    if (left >= this.board.clientWidth - 32) this.speed.x *= -1;
    if (top <= 0) this.speed.y = 3;
    if (top >= this.board.clientHeight - 64) this.speed.y *= -1;

    this.enemyDiv.style.left = `${left + this.speed.x}px`;
    this.enemyDiv.style.top = `${top + this.speed.y}px`;

  }
}