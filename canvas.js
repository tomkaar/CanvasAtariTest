// Canvas Basics
var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

//  Configuration
  // Canvas
    var canvasHeight = window.innerHeight;
    var canvasWidth = window.innerWidth;
    var intervall = 10;

  // Game related
    var totalScore = 0;

  // Pad
    var padHeight = 20;
    var padWidth = 100;
    var padBottom = 30; // How far from the bottom of the canvas the pad is located 

  // Ball
    var ballRadius = 15;
    var acceleration = 0.5; // add speed /(pixels per frame)
    var x = canvasWidth/2; // Ball spawn x-axes
    var y = canvasHeight - ballRadius - padHeight - padBottom; // Ball spawn y-axes
    var dx = -2; // Velocity, x-axes
  var dy = -2; // Velocity, y-axes

  // Brick Wall
    var brickRow = 7;
    var brickCol = 3;
    var brickWidth = 120;
    var brickHeight = 25;



// Init Elements

  // Create brick objects. 
  var brick = [];
  for(var row = 0; row < brickRow; row++) {
          brick[row] = [];
      for (var col = 0; col < brickCol; col++) {
          brick[row][col] = {
              x: 0, y: 0, status: 1
          }
      }
  }

  // Create single objects
    // Each Object needs to be stored in it's own variable.
    // To render the objects you need to call the draw function
    // from inside the animate function below.

    // Brick(x, y, width, height, color, score);
    var brickTest = new Brick(100, 250, 100, 25, 'rgb(255,0,170)', 10);
    var brickTest2 = new Brick(100, 300, 100, 25, '#00AAFF', -15);
    var brickTest3 = new Brick(650, 350, 100, 25, 'rgba(255,170,0,1)', 10);
    var brickTest4 = new Brick(250, 250, 400, 400, 'blue', 30);

    // Block(x, y, width, height, color);
    var blockTest = new Block(200, 350, 25, 100, 'grey');
    var blockTest2 = new Block(600, 200, 100, 25, 'grey');

    // MovingBlock(x, y, width, height, color, speed x-axes, speed y-axes);
    var movingBlockTest = new MovingBlock(0, 500, 100, 25, 'grey', 1, 0);



function animate() {
  Basics(); // Do not remove

  // Draw Brick Wall
  drawBrick();
  collisionDetect();
    
  // This is where you call the draw functions
  // Without this the objects won't render
  brickTest.draw();
  brickTest2.draw();
  brickTest3.draw();
  brickTest4.draw();

  blockTest.draw();
  blockTest2.draw();

  movingBlockTest.draw();
}


function Basics(){
    c.clearRect(0, 0, canvasWidth, canvasHeight);
    drawBall();
    drawPad();
    drawScore();

    x += dx;
    y += dy;

    // When the ball hit the top
    if(y - ballRadius < 0){
      dy = -dy;
      addScore(10);
    }
    // When the ball hit the sides
    if(x + ballRadius > canvasWidth|| x - ballRadius < 0){
      dx = -dx;
    }
    // When the ball hit the bottom
    else if(y + dy > canvasHeight - ballRadius - 50) {
        // If the ball hit the pad
        if(x > mouse.x - padWidth/2 - ballRadius && x < mouse.x + padWidth/2 + ballRadius) {
          dx += acceleration;
          dy += acceleration;
          dy = -dy;
        }
        // If the ball misses the pad
        else {
            gameOver();
        }
    }
}





// Draw Ball
function drawBall() {
  c.beginPath();
  c.arc(x, y, ballRadius, 0, Math.PI*2);
  c.fillStyle = "white";
  c.fill();
  c.closePath();
}

// Draw Pad
function drawPad() {
  c.beginPath();
  c.rect(mouse.x-padWidth/2, canvasHeight - padHeight - padBottom, padWidth, padHeight);
  c.fillStyle = "white";
  c.fill();
  c.closePath();
}





// Score
function drawScore(){
  c.font = "16px Arial";
  c.fillStyle = "gold";
  c.fillText("Score: "+ totalScore, 10, canvasHeight-10);
  document.getElementById('gameover-score').innerHTML = totalScore;
}
function addScore(newScore){
  totalScore += newScore;
}
function removeScore(newScore){
  totalScore -= newScore;
}





// Game Over
function gameOver(){
  document.getElementById("gameover").classList.add('active');
  ballRadius = 15;
  x = canvasWidth/2;
  y = canvasHeight - ballRadius - padHeight - padBottom;
  dx = 0;
  dy = 0;
  mouse.x = canvasWidth/2;
}

// Restart game by reloading window
function restartGame(){
  location.reload();
}





// Resize
function resize(){
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
}
resize();
window.addEventListener( 'resize', function(){
  resize();
} );

// Track mouse Movement
var mouse = {
  x: canvasWidth/2
}
canvas.addEventListener('mousemove', function(event){
  mouse.x = event.x;
})





setInterval(animate, intervall);