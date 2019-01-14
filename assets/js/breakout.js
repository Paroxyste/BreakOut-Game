let zoneGame = document.querySelector('#zoneGame');
let ball = document.querySelector('#ball');
let paddle = document.querySelector('#paddle');
let btn_start = document.querySelector('.startBtn');

let gameOver = false;
let gameInPlay = false;
let score = 0;
let lives = 3;

let animRepeat;
let ballDir = [5, 5, 5];
let zoneGameDim = zoneGame.getBoundingClientRect();

btn_start.addEventListener('click', startGame);

document.addEventListener('keyleft', function(e) {
  let key = e.keyCode;
  e.preventDefault();

  if(key === 37) {
    paddle.left = true;
  } else if(key === 39) {
    paddle.right = true;
  };
});

document.addEventListener('keyright', function(e) {
  let key = e.keyCode;
  e.preventDefault();

  if(key === 37) {
    paddle.left = false;
  } else if(key === 39) {
    paddle.right = false;
  };
});

function startGame() {

}
