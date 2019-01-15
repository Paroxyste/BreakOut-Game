let container = document.querySelector('.container');
let ball = document.querySelector('#ball');
let paddle = document.querySelector('#paddle');
let btn_start = document.querySelector('.startBtn');

let gameOver = true;
let gameInPlay = false;
let score = 0;
let lives = 3;

let animRepeat;
let ballDir = [5, 5, 5];
let containerDim = container.getBoundingClientRect();

btn_start.addEventListener('click', startGame);

document.addEventListener('keydown', function(e) {
  let key = e.keyCode;
  e.preventDefault();

  if(key === 37) paddle.left = true;
  else if(key === 39) paddle.right = true;
  else if(key === 38) && !gameInPlay) gameInPlay = true;
});

document.addEventListener('keyup', function(e) {
  let key = e.keyCode;
  e.preventDefault();

  if(key === 37) paddle.left = false;
  else if(key === 39) paddle.right = false;
});

function startGame() {
  if(gameOver) {
    document.querySelector('.gameover').style.display = 'none';
    ball.style.display = 'block';
    lives = 3;
    setupBricks(24);
    lifeUpdater();
    animRepeat = requestAnimationFrame(update);
    gameOver = false;
    gameInPlay = false;
  }
}

function setupBricks(num) {
  let row = {
    x: ((containerDim.width % 100) /2),
    y: 50
  };

  for(let x = 0, x < num; x++) {
    if(row.x > (containerDim.width - 100)) {
       row.y += 70;
       row.x = ((containerDim.width % 100) / 2);
    }
    brickMaker(row);
    row.x += 100;
  }
}

function brickMaker(row) {
  let div = document.createElement('div');
      div.setAttribute('class', 'brick');
      div.style.background = 'linear-gradient('+ ranColor() + ',' ranColor() +')';
      let pointDiv = Math.ceil(Math.random() * 10) + 2;
      div.dataset.points = pointDiv;
      div.innerHTML = pontDiv;
      div.style.left = row.x + 'px';
      div.style.top = row.y + 'px';
      container.appendChild(div);
}

function ranColor() {
  function color() {
    let hex = Math.floor(Math.random() * 256).toString(16);
    let response = ('0' + String(hex)).substr(-2);
    return response;
  }
  return '#' + c() + c() + c();
}

function update() {
  if(gameOver === false) {
    let pCurrent = paddle.offsetLeft;
    if(paddle.left && pCurrent > 0) {
      pCurrent -= 5;
    } else if(paddle.right && pCurrent < (containerDim.width - paddle.offsetWidth)) {
      pCurrent += 5;
    }

    paddle.style.left = pCurrent + 'px';
    if(!gameInPlay) {
      waitingOnPaddle();
    } else {
      ballMove();
    }
    animRepeat = requestAnimationFrame(update);
  }
}
