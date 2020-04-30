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

// ----------------------------------------------------------------- tetrominos

function tetrominos(tetromino, color) {
    this.tetromino = tetromino;
    this.color     = color;

    this.tetrominoN  = 0; // Start from the 1st pattern
    this.activeTetro = this.tetromino[this.tetrominoN];

    // Tetrominos control
    this.x = 3;
    this.y = -2;
}

// ------------------------------------------------------------------ fill func

tetrominos.prototype.fill = function(color) {
    for (r = 0; r < this.activeTetro.length; r++) {
        for (c = 0; c < this.activeTetro.length; c++) {
            // Draw only occuped squares
            if (this.activeTetro[r][c]) {
                drawSquare(this.x + c, this.y + r, color);
            }
        }
    }
}

// ------------------------------------------------------------ Draw tetrominos

tetrominos.prototype.draw = function() {
    this.fill(this.color);
}

// ---------------------------------------------------------- Undraw tetrominos

tetrominos.prototype.unDraw = function() {
    this.fill(GDC);
}

// ------------------------------------------------------------ Move tetrominos

// Down
tetrominos.prototype.moveDown = function() {
    if (!this.collision(0, 1, this.activeTetro)) {
        this.unDraw();
        this.y++
        this.draw();
    } else {
        // Lock tetrominos and generate a new one
        this.lock();
        randTetro = randomTetro();
    }
}

// Right
tetrominos.prototype.moveRight = function() {
    if (!this.collision(0, 1, this.activeTetro)) {
        this.unDraw();
        this.x++
        this.draw();
    }
}

// Left
tetrominos.prototype.moveRight = function() {
    if (!this.collision(0, 1, this.activeTetro)) {
        this.unDraw();
        this.x--
        this.draw();
    }
}

// Rotate
tetrominos.prototype.rotate = function() {
    let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
    let kick = 0;

    if (this.collision(0, 0, nextPattern)) {
        if (this.x > COL / 2) {
            // Right wall
            kick = -1;
        } else {
            // Left wall
            kick = 1;
        }
    }

    if (!this.collision(kick, 0, nextPattern)) {
        this.unDraw();
        this.x += kick;

        // (0 + 1) % 4 = 1
        this.tetrominoN  = (this.tetrominoN + 1) % this.tetromino.length;
        this.activeTetro = this.tetromino[this.tetrominoN];

        this.draw();
    }
}

let score = 0;
