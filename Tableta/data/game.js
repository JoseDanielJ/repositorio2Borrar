const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

const gameContainer = document.querySelector('.game-screen');

const flapyImg = new Image();
flapyImg.src = '/Tableta/images/bird.png';

//Variables del juego
const flap_speed = -3;
const bird_height = 21;
const bird_width = 30;
const pipe_width = 30;
const pipe_gap = 10;

//Variables del pajaro
let birdX = 50;
let birdY = 50;
let birdVelocity = 0;
let birdAcceleration = 0.1;

//variables del obstaculo o pipe
let pipeX = 400;
let pipeY  = canvas.height-100;

//Varibles de puntaje
let scoreDiv  = document.querySelector('.score-display');
let score = 0;
let highScore = 0;

let scored = false;

document.body.onkeyup = function(e){
    if(e.code =='Space'){
        birdVelocity = flap_speed;
    };
};

document.querySelector('.restart-button').addEventListener('click',()=>{
    hideEndMenu();
    resetGame();
    loop();
});
function increaseScore(){
    if(birdX>pipeX && !scored){
        score++;
        scored = true;
        scoreDiv.innerHTML = score;
    }

    if(birdX<pipeX){
        scored = false;
    }
};

function collisionCheck(){

    const birdBox ={
        x:birdX,
        y:birdY,
        width:bird_width,
        height:bird_height
    }

    const topPipeBox = {
        x:pipeX,
        y:pipeY - pipe_gap - 85,
        width:pipe_width,
        height:pipeY
    };

    const bottomPipeBox ={
        x: pipeX,
        y:pipeY+pipe_gap+10,
        width:pipe_width,
        height:canvas.height-pipeY-pipe_gap  
    };

     if(birdBox.x + birdBox.width > topPipeBox.x && birdBox.x < topPipeBox.x+topPipeBox.width
        && birdBox.y < topPipeBox.y){
         return true;
     }

     if(birdBox.x + birdBox.width > bottomPipeBox.x && birdBox.x < bottomPipeBox.x+bottomPipeBox.width
          && birdBox.y+birdBox.height > bottomPipeBox.y){
        return true;
     }

    if(birdBox.y < 0 || birdBox.y+birdBox.height>canvas.height){
        return true;
    }

    return false;
};

function hideEndMenu(){
    document.querySelector('.menu').style.display = 'none';
    gameContainer.classList.remove('blackdrop-blur');
}

function showEndMenu(){
    document.querySelector('.menu').style.display = 'block';
    gameContainer.classList.add('blackdrop-blur');
    document.querySelector('#your-score').innerHTML = score;
    if(score>highScore){
        highScore = score;
    }

    document.querySelector('#best-score').innerHTML = highScore;
};
 
function resetGame(){
    birdX = 50;
    birdY = 50;
    birdVelocity = 0;
    birdAcceleration = 0.1;
    pipeX = 400;
    pipeY  = canvas.height-100;
    score = 0;
    scoreDiv.innerHTML = 0;
};

function endGame(){
    showEndMenu();
};

function drawPipes(){
    ctx.fillStyle = '#333';
    ctx.fillRect(pipeX,-100,pipe_width,pipeY);
    ctx.fillRect(pipeX,pipeY+pipe_gap,pipe_width,canvas.height-pipeY);

    pipeX-=2;

    if(pipeX<-20){
        pipeX= 400;
        pipeY = Math.random()*(canvas.height-pipe_gap)+pipe_width;
    }
}

function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.drawImage(flapyImg,birdX,birdY);
    
    drawPipes();
    if(collisionCheck()){
        endGame();
        return;
    }
    birdVelocity += birdAcceleration;
    birdY += birdVelocity;
    increaseScore();
    requestAnimationFrame(loop);
};

loop();

