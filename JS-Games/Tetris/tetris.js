const cvs   = document.getElementById('tetris');
const ctx   = cvs.getContext('2d');
const score = document.getElementById('score');

// ---------------------------------------------------------------- Grid config

const COL = 10; // Columns
const ROW = 20; // Row
const SQS = 20; // Square sizes
const GDC = '#1C1C1A'; // Background grid color

// --------------------------------------------------------------- Tetro colors

const TETRO = [
    [I, '#66BAD2'],
    [J, '#FE8081'],
    [L, '#FD8816'],
    [O, '#FECC00'],
    [S, '#70C836'],
    [T, '#DD87CE'],
    [Z, '#AADF87']
] 

// ----------------------------------------------------------------- drawSquare

function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * SQS, y * SQS, SQS, SQS);

    ctx.strokeStyle = '#1B1D1A';
    ctx.strokeRect(x * SQS, y * SQS, SQS, SQS);
}

// --------------------------------------------------------------- Create board

let board = [];

for(r = 0; r < ROW; r++) {
    board[r] = [];

    for(c = 0; c < COL; c++) {
        board[r][c] = GDC;
    }
}

// ------------------------------------------------------------------ drawBoard

function drawBoard() {
    for(r = 0; r < ROW; r++) {
        board[r] = [];

        for (c = 0; c < COL; c++){
            drawSquare(c, y, board[r][c]);
        }
    }
}

drawBoard();

// ---------------------------------------------------------------- randomTetro

function randomTetro() {
    let rand = Math.floor(Math.random() * TETRO.length); // 0 -> 6 Tetrominos

    return new tetrominos(TETRO[rand][0], TETRO[rand][1]);
}

let randTetro = randomTetro();