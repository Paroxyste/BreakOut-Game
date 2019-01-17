let container = document.querySelector('#container');
let ball = document.querySelector('#ball');
let paddle = document.querySelector('#paddle');
let btn_start = document.querySelector('#startBtn');

let gameOver = true;
let gameInPlay = false;

let score = 0;
let lives = 3;

let animationRepeat;
let ballDir = [7, 7, 7];
let containerDim = container.getBoundingClientRect();

btn_start.addEventListener('click', startGame);


/************ BASIC FUNCTIONALITIES ************/


function startGame() {
  if(gameOver) {
    document.querySelector('#gameover').style.display = 'none';
    ball.style.display = 'block';
    lives = 3;
    score = 0;
    setupBricks(60);
    lifeUpdater();
    animationRepeat = requestAnimationFrame(update);
    gameOver = false;
    gameInPlay = false;
  };
};

function update() {
  if(gameOver === false) {
    let pCurrent = paddle.offsetLeft;

    if(paddle.left && pCurrent > 0) pCurrent -= 6;
    else if(paddle.right && pCurrent < (containerDim.width - paddle.offsetWidth)) pCurrent += 5;

    paddle.style.left = pCurrent + 'px';

    if (!gameInPlay) waitingOnPaddle();
    else ballMove();

    animationRepeat = requestAnimationFrame(update);
  };
};

function lifeUpdater() {
  document.querySelector('.lives').innerText = lives;
};

function scoreUpdate(num) {
  score += parseInt(num);
  document.querySelector('.score').innerText = score;
};

function stopper() {
  gameInPlay = false;
  ballDir[0, -5];
  waitingOnPaddle();
  window.cancelAnimationFrame(animationRepeat);
};

function endGame() {
  document.querySelector('#gameover').style.display = 'block';
  document.querySelector('#gameover').innerHTML = '<div class="uk-alert-primary" uk-alert>' +
                                                  '<a class="uk-alert-close" uk-close></a>' +
                                                  '<h5 style="text-align: center; text-transform: uppercase;">GAME OVER - Your Score: '
                                                  + score + '</h5></div>';
  gameOver = true;
  ball.style.display = 'none';

  let tempBricks = document.querySelectorAll('.brick');
  for(let tarBrick of tempBricks) {
    tarBrick.parentNode.removeChild(tarBrick);
  };
};

function fallOffEdge() {
  lives--;

  if(lives < 0) {
    endGame();
    lives = 0;
  };

  lifeUpdater();
  stopper();
};


/************ BRICKS PARAMETERS ************/


function setupBricks(num) {
  let row = {
    x: ((containerDim.width % 100) / 2),
    y: 2
  };

  for(let x = 0; x < num; x++) {
    if(row.x > (containerDim.width - 100)) {
        row.y += 29;
        row.x = ((containerDim.width % 100) / 2);
    };

    brickMaker(row);
    row.x += 100;
  };
};

function brickMaker(row) {
  let div = document.createElement('div');
      div.setAttribute('class', 'brick');
      div.style.background = ranColor();

  let pointDiv = Math.ceil(Math.random() * 10);
      div.dataset.points = pointDiv;
      div.innerHTML = pointDiv;
      div.style.left = row.x + 'px';
      div.style.top = row.y + 'px';
      container.appendChild(div);
};

function ranColor() {
  function c() {
    let hex = Math.floor(Math.random() * 256).toString(16);
    let response = ('0' + String(hex)).substr(-2);
    return response;
  };
  return '#' + c() + c() + c();
};

function isCollide(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();

  return (!(aRect.bottom < bRect.top ||
            aRect.top > bRect.bottom ||
            aRect.right < bRect.left ||
            aRect.left > bRect.right));
};


/************ MOVING ELEMENTS SETTINGS ************/


function waitingOnPaddle() {
  ball.style.top = (paddle.offsetTop - 11) + 'px';
  ball.style.left = (paddle.offsetLeft + 70) + 'px';
};

document.addEventListener('keydown', function(e) {
  let key = e.keyCode;
  e.preventDefault();

  if(key === 37) paddle.left = true;
  else if(key === 39) paddle.right = true;
  else if(key === 38 && !gameInPlay) gameInPlay = true;
});

document.addEventListener('keyup', function(e) {
  let key = e.keyCode;
  e.preventDefault();

  if(key === 37) paddle.left = false;
  else if(key === 39) paddle.right = false;
});

function ballMove() {
  let x = ball.offsetLeft;
  let y = ball.offsetTop;

  if(x > (containerDim.width - 20) || x < 0) ballDir[0] *= -1;
  if(y > (containerDim.height - 20) || y < 0) {
    if (y > (containerDim.height - 20)) {
      fallOffEdge();
      return;
    };

    ballDir[1] *= -1;
  };

  if(isCollide(ball, paddle)) {
    let nDir = ((x - paddle.offsetLeft) - (paddle.offsetWidth / 2)) / 10;
      ballDir[0] = nDir;
      ballDir[1] *= -1;
  };

  let tempBricks = document.querySelectorAll('.brick');

  if(tempBricks.length == 0) {
    stopper();
    setupBricks(60);
  };

  for(var tarBrick of tempBricks) {
    if(isCollide(tarBrick, ball)) {
      ballDir[1] *= -1;
      tarBrick.parentNode.removeChild(tarBrick);
      scoreUpdate(tarBrick.dataset.points);
    };
  };

  x += ballDir[0];
  y += ballDir[1];

  ball.style.top = y + 'px';
  ball.style.left = x + 'px';
};
