let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x=canvas.width/2;
let y=canvas.height-30;
let dx=2;
let dy=-2;
let ballRadius=10;

let paddleHeight = 55;
let paddleWidth = 2;
let paddleX= 507;
let paddleY= (canvas.height-paddleHeight)/2;
let wPressed= false;
let sPressed= false;



function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,paddleY,paddleWidth, paddleHeight);
    ctx.fillStyle = "#ddd";
    ctx.fill();
    ctx.closePath();

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
    drawBall();
    drawPaddle();
    drawLine();
    // Limite saida horizontal -
    
    if(x>paddleX && x<paddleX+paddleY && y+ballRadius>=paddleY){
        dx= -dx;
    }else if(x+dx<ballRadius || x + dx > canvas.width-ballRadius){
        alert("Game Over!");
        document.location.reload();
        clearInterval(interval);
    }
    /*
    if(x+dx<ballRadius){
        dx = -dx;
    }else if(x + dx > canvas.width-ballRadius){
        alert("Game Over!");
        document.location.reload();
        clearInterval(interval);
    }

    */
    if(y + dy > canvas.height-ballRadius || y+dy<ballRadius ){
        dy = -dy;
    }

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

    x+= dx;
    y+= dy;
}

function keyDownHandler(e){
    if(e.key =="W" || e.key=="w"){
        wPressed = true;
    }
    if(e.key =="S" || e.key=="s"){
        sPressed = true;
    }
}
function keyUpHandler(e){
    if(e.key =="W" || e.key=="w"){
        wPressed = false;
    }
    if(e.key =="S" || e.key=="s"){
        sPressed = false;
    }
}
    
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);