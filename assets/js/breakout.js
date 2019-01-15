let container = document.querySelector('.container');
let ball = document.querySelector('#ball');
let paddle = document.querySelector('#paddle');
let btn_start = document.querySelector('.startBtn');

let gameOver = false;
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
});

document.addEventListener('keyup', function(e) {
  let key = e.keyCode;
  e.preventDefault();

  if(key === 37) paddle.left = false;
  else if(key === 39) paddle.right = false;
});

function startGame() {
  document.querySelector('.gameover').style.display = 'none';
  ball.style.display = 'block';
  animRepeat = requestAnimationFrame(update);
  gameOver = false;
  gameInPlay = true;
};

function update() {
  if(gameOver === false) {
    let pCurrent = paddle.offsetLeft;
    if(paddle.left && pCurrent > 0) {
      pCurrent -= 5;
    } else if(paddle.right && pCurrent < (containerDim.width - paddle.offsetWidth)) {
      pCurrent += 5;
    }

    paddle.style.left = pCurrent + 'px';
    animRepeat = requestAnimationFrame(update);

  }
};
