let canvas =  document.getElementById("snake");   
let canvasContext = canvas.getContext('2d');
let tamanho = 32;
let direction = "right";
//create snake as list
let snake = [];
snake[0] = {
    y: 8*tamanho,
    x: 8*tamanho
}

//create food as list
let apple = {
    x: Math.floor(Math.random() * 15 + 1) * tamanho,
    y: Math.floor(Math.random() * 15 + 1) * tamanho
}
//create bg for the game
function createBackground(){
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0,0, 16 * tamanho, 16 * tamanho);
}
//create snake and add score
function createSnake(){
    for (i = 0; i < snake.length; i++) {
        canvasContext.fillStyle = "green";
        canvasContext.fillRect(snake[i].x, snake[i].y, tamanho, tamanho);
        document.getElementById('score').innerHTML = "Score: " + (snake.length-1);
    }
}
//create food
function createApple(){
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(apple.x, apple.y, tamanho, tamanho);
}
//update game as press any key
document.addEventListener('keydown', update);
function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}
//dont die as the snake pass the border
function border(){
    if (snake[0].x > 15 * tamanho && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * tamanho;
    if (snake[0].y > 15 * tamanho && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * tamanho;
}
//if snake head pos == snake pos (game over)
function gameOver(){
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert('Game Over :(\nScore: ' + (snake.length-1));
            window.location.reload();
        }
    }
}
//start the game
function startGame(){
    //call functions
    border();
    gameOver();
    createBackground();
    createSnake();
    createApple();

    //variable head pos
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if( direction == "right") snakeX += tamanho;
    if (direction == "left") snakeX -= tamanho;
    if (direction == "up") snakeY -= tamanho;
    if (direction == "down") snakeY += tamanho;

    
    if(snakeX != apple.x || snakeY != apple.y) {
        snake.pop();//take from the list
    }else{
        //randon an apple
        apple.x = Math.floor(Math.random()* 15 + 1) * tamanho;
        apple.y = Math.floor(Math.random()* 15 + 1) * tamanho;
    }


    let newHead = {
        x: snakeX,
        y: snakeY
    };
    snake.unshift(newHead);//new head

}
let game = setInterval(startGame, 100);//start the game with (100)interval