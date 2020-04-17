const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');


const sq = 30; //the size (width=height=sq) of each square
const row = 20;
const column = 20;
const emptySquare = "white";


let score = 0;

let snake = [];
snake[0] = {
    x: 9 * sq,
    y: 10 * sq
};

const dead = new Audio();
const eat = new Audio();
dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";

const foodImg = new Image();
foodImg.src = "img/food.png";
let food = {
    x: Math.floor(Math.random() * 17 + 1) * sq,
    y: Math.floor(Math.random() * 15 + 3) * sq
}



function drawSquare(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * sq, y * sq, sq, sq);
    context.strokeStyle = 'grey';
    context.strokeRect(x * sq, y * sq, sq, sq); // (X : number of squares from the left, Y : number of squares from the top)
}


//Create the board
let board = [];
for (i = 0; i < row; i++) {
    board[i] = [];
    for (r = 0; r < column; r++) {
        if (2 < i && i < 19 && 0 < r && r < 19) {
            board[i][r] = emptySquare;
        } else {
            board[i][r] = 'darkgreen';
        }
    }
}

//Draw the board
function drawBoard() {
    for (i = 0; i < row; i++) {
        for (r = 0; r < column; r++) {
            drawSquare(r, i, board[i][r]);
        }
    }
}
//Controle snake
let d;

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (key == 38 && d != "DOWN") {
        d = "UP";
    } else if (key == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (key == 40 && d != "UP") {
        d = "DOWN";
    }
}
document.addEventListener('keydown', direction);

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

//Drawing function
function draw() {
    drawBoard();
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = (i == 0) ? "green" : "darkgreen";
        context.beginPath();
        context.arc(snake[i].x + 15, snake[i].y + 15, 15, 0, Math.PI * 2, false); // (X from the left, Y from the top, radius, start Angle, end Angle, direction'false==clock wires direction')
        context.closePath();
        context.fill();
    }
    context.drawImage(foodImg, sq, sq);

    context.drawImage(foodImg, food.x, food.y);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    if (d == "LEFT") snakeX -= sq;
    if (d == "RIGHT") snakeX += sq;
    if (d == "UP") snakeY -= sq;
    if (d == "DOWN") snakeY += sq;
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * sq,
            y: Math.floor(Math.random() * 15 + 3) * sq
        }
    } else {
        snake.pop();
    }
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (snakeX < sq || snakeX > 18 * sq || snakeY < 3 * sq || snakeY > 18 * sq || collision(newHead, snake)) {
        clearInterval(game);
        dead.play();
    }

    snake.unshift(newHead);

    context.fillStyle = "white";
    context.font = "40px Changa one";
    context.fillText(score, 3 * sq, 2 * sq);
}

let game = setInterval(draw, 130);