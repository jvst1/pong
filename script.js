let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x;
let y;
let dx;
let dy;
let ballRadius=10;

let wPressed= false;
let sPressed= false;
let upPressed= false;
let downPressed=false;

let paddleHeight = 55;
let paddleWidth = 2;
let paddleX= 15;
let paddleY= (canvas.height-paddleHeight)/2;

let paddleX2= 1009;
let paddleY2= (canvas.height-paddleHeight)/2;  
// pontuação
let score = 0;
let score2 = 0;

function setupBallAndPaddle() {
    x = canvas.width / 2; // inicial horizontal
    y = canvas.height - 35; // inicial vertical
    dx = 2; // variação horizontal
    dy = -2; // variação vertical;
    paddleY=  (canvas.height-paddleHeight)/2;
    paddleY2= (canvas.height-paddleHeight)/2;  
}
setupBallAndPaddle();
function drawPlayer1(){
    ctx.beginPath();
    ctx.rect(paddleX,paddleY,paddleWidth, paddleHeight);
    ctx.fillStyle = "#ddd";
    ctx.fill();
    ctx.closePath();
}
function drawPlayer2(){
    ctx.beginPath();
    ctx.rect(paddleX2,paddleY2,paddleWidth, paddleHeight);
    ctx.fillStyle = "#ddd";
    ctx.fill();
    ctx.closePath();
}
function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(score, (canvas.width/2)-(canvas.width/4), (canvas.height/8));
}
function drawScore2(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(score2, (canvas.width/2)+(canvas.width/4), (canvas.height/8));
}
function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#ccc";
    ctx.fill(); 
    ctx.closePath();
}
function drawLine(){
    ctx.beginPath();
    ctx.rect(canvas.width/2, 0, 2, canvas.height);
    ctx.fillStyle="#fff";
    ctx.fill();
    ctx.closePath();
}
let interval = setInterval(draw, 10);
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLine();
    drawBall();
    drawPlayer1();
    drawPlayer2();
    drawScore();
    drawScore2();
    // verifica se a bola sai na vertical
    if(y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy; // inverte o sinal de dx
    }
    // verifica se a bola sai na horizontal
    if ((x > paddleX  && x < paddleX  + paddleWidth && y < paddleY  + paddleHeight && y + ballRadius >= paddleY) ||
        (x > paddleX2 && x < paddleX2 + paddleWidth && y < paddleY2 + paddleHeight && y + ballRadius >= paddleY2)) {
       dx = -dx;
     }else if (x + dx > canvas.width - ballRadius) {
        score++;
        setupBallAndPaddle();
    }else if (x + dx < ballRadius){
        score2++;
        setupBallAndPaddle();
    }
    //condicao de vitoria
    if(score == 5){
        alert("Player 1 Ganhou!");
        document.location.reload();
      }else if(score2 == 5){
        alert("Player 2 Ganhou!");
        document.location.reload();
      }
    //controles p1
    if(sPressed){
        paddleY+=7;
        if(paddleY + paddleHeight>canvas.height){
            paddleY=canvas.height-paddleHeight;
        }
    }else if(wPressed){
        paddleY-=7;
        if(paddleY<0){
            paddleY=0;
        }
    }
    //controles p2
    if(downPressed){
        paddleY2+=7;
        if(paddleY2 + paddleHeight>canvas.height){
            paddleY2=canvas.height-paddleHeight;
        }
    }else if(upPressed){
        paddleY2-=7;
        if(paddleY2<0){
            paddleY2=0;
        }
    }
    //variacao bola
    x+= dx;
    y+= dy;
}
function keyDownHandler(e){
    if(e.key =="W" || e.key=="w"){
        wPressed = true;
    }
    if(e.key =="ArrowUp" || e.key=="Up"){
        upPressed = true;
    }
    if(e.key =="S" || e.key=="s"){
        sPressed = true;
    }
    if(e.key =="ArrowDown" || e.key=="Down"){
        downPressed = true;
    }
}
function keyUpHandler(e){
    if(e.key =="W" || e.key=="w"){
        wPressed = false;
    }
    if(e.key =="ArrowUp" || e.key=="Up"){
        upPressed = false;
    }
    if(e.key =="S" || e.key=="s"){
        sPressed = false;
    }
    if(e.key =="ArrowDown" || e.key=="Down"){
        downPressed = false;
    }
}  
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);