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

function waitingOnPaddle() {
  ball.style.top = (paddle.offsetTop - 22) + 'px';
  ball.style.left = (paddle.offsetLeft + 70) + 'px';
}

function ballMove() {
  let x = ball.offsetLeft;
  let y = ball.offsetTop;

  if(x > (containerDim.width - 20) || x < 0) {
    ballDir[0] *= -1;
  }

  if(y > (containerDim.height - 20) || y < 0) {
    if(y > (containerDim.height - 20)) {
      fallOffEdge();
      return;
    }
    ballDir[1] *= 1;
  }

  if(isCollide(ball, paddle)) {
    let nDir = ((x - paddle.offsetLeft) - (paddle.offsetWidth / 2)) / 10;
    ballDir[0] = nDir;
    ballDir[1] *= -1;
  }

  let tempBricks = document.querySelectorAll('.brick');
  if(tempBricks.length == 0) {
    stopper();
    setupBricks(20);
  }

  for(let targetBrick of tempBricks) {
    if(isCollide(targetBrick, ball)) {
      ballDir[1] *= -1;
      targetBrick.parentNode.removeChild(targetBrick);
      scoreUpdate(targetBrick.dataset.points);
    }
  }

  x += ballDir[0];
  y += ballDir[1];
  ball.style.top = y + 'px';
  ball.style.left = x + 'px';
}

function lifeUpdater() {
  document.querySelector('lives').innerText = lives;
}

function scoreUpdate(num) {
  score += parseInt(num);
  document.querySelector('.score').innerText = score;
}

function stopper() {
  gameInPlay = false;
  ballDir[0, -5];
  waitingOnPaddle();
  window.cancelAnimationFrame(animRepeat);
}

function endGame() {
  document.querySelector('.gameover').style.display = 'block';
  document.querySelector('.gameover').innerHTML = 'GAME OVER<br>Your Score' + score;
  gameOver = true;
  ball.style.display = 'none';

  let tempBricks = document.querySelectorAll('.brick');
  for(var targetBrick of tempBricks) {
    targetBrick.parentNode.removeChild(targetBrick);
  }
}
