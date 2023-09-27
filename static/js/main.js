// DINO GAME //
// Version 1.2 //




///// VARIABLES /////
const player = document.getElementById('player');
const cactus = document.getElementById('cactus');
var cactus2 = document.createElement('div');
var img;
const fondo = document.getElementById('f1');
const fondo2 = document.getElementById('f2');
let scoreInterval;
const restart = document.getElementById('buttonRestart');
const board = document.getElementById('board');
var dinosaurio = 0;
const buttonPlayStop = document.getElementById("buttonPlayStop");
var score = 0
var record = 0;
var dino = document.getElementById('dino');
var muerto = false;
var gameOver = document.querySelector(".game-over");
var crearCactus = true;
var distancia = String(getComputedStyle(document.documentElement).getPropertyValue('--distancia')).trim();
ElegirDinosaurio();
Pause();

console.log(distancia);


///// EVENTOS /////
// teclas //
board.addEventListener("click",function(){
    Moverse();
});
document.addEventListener("keydown", function(e) {
    if (e.keyCode == 32) {
        Moverse();
    }
});
document.addEventListener("keydown", (event) => {
    if (event.key == "ArrowUp" || event.key.toLowerCase() == "w") {
        Moverse();
    }
});
function Moverse(){
    if(muerto == false){
        
        if(buttonPlayStop.classList.contains("play")){
            player.classList.add("playerJump");
        }
        else{
            Reanudar();
            buttonPlayStop.classList.add("play");
        }
    }
    else{
        RestartGame();
    }
    
}

// Animacion Salto //
player.addEventListener("animationend",() =>{
    player.classList.remove("playerJump");
})
// Reiniciar Juego //
restart.addEventListener("click",() => {
    RestartGame();
})


///// INTERVALOS DE JUEGO /////
var loop = setInterval(() => {
    checkCondition();
    createCactus();
    
},20);




///// FUNCIONES DE JUEGO /////

// Funcion para ver si esta vivo o muerto //
function checkCondition() {
    if (
        cactus.offsetLeft < (player.offsetLeft + 60)
        && cactus.offsetLeft > player.offsetLeft
        && (player.offsetTop >= (cactus.offsetTop - player.offsetHeight))
    ) {
        Pause();
        muerto = true;
        gameOver.classList.add("gameOver");
        gameOver.style.display = "block";
    }
    else if(
        cactus2.offsetLeft < (player.offsetLeft + 60)
        && cactus2.offsetLeft > player.offsetLeft
        && (player.offsetTop >= (cactus2.offsetTop - player.offsetHeight))
    )
    {
        Pause();
        muerto = true;
        gameOver.classList.add("gameOver");
        gameOver.style.display = "block";
    }
}

// Funcion para elegir dinosaurio //
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function ElegirDinosaurio(){
    dinosaurio = random(1,1);
    //HitBoxY(70,0);
    HitBoxX()
    switch(dinosaurio){
        case 1:
            dino.src = "/static/src/dinosaurio6.png";
            
            break;
        case 2:
            dino.src = "/static/src/dinosaurio2.png";
            HitBoxY(72,0);
            break;
        case 3:
            dino.src = "/static/src/dinosaurio3.png";
            HitBoxY(80,10);
            break;
        case 4:
            dino.src = "/static/src/dinosaurio4.png";
            
            break;
        
        
    }
}
function HitBoxY(h,y){
    dino.style.height = h+"px";
    player.style.bottom = (240+y)+"px";
    
}
function HitBoxX(a,x){
    dino.style.width = a+"px";
    //player.style.bottom = (240+x)+"px";
    
}


// Funcion para reanudar el score //
function ReanudarScore(){
    scoreInterval = setInterval(() => {
        score++;
        document.getElementById('score').innerHTML = score;
    },20);
}

// Pausar/Reanudar Juego //
function Pause() {
    cactus.style.animationPlayState = "paused";
    cactus2.style.animationPlayState = "paused";
    player.style.animationPlayState = "paused";
    fondo.style.animationPlayState = "paused";
    fondo2.style.animationPlayState = "paused";
    clearInterval(scoreInterval);
    // pausar el intervalo de score

}
function Reanudar() {
    cactus.style.animationPlayState = "running";
    cactus2.style.animationPlayState = "running";
    player.style.animationPlayState = "running";
    fondo.style.animationPlayState = "running";
    fondo2.style.animationPlayState = "running";
    ReanudarScore();
    
}

// Reiniciar Juego //
function RestartGame(){
    ElegirDinosaurio();
    Pause();
    
    muerto = false;
    gameOver.style.display = "none";
    board.removeChild(cactus2);
    crearCactus = true;
    cactus.classList.remove("cactusMove");
    player.classList.remove("playerJump");
    if(buttonPlayStop.classList.contains("play")){
        buttonPlayStop.classList.remove("play");
    }
    if(record<score){
        record = score;
        document.getElementById('record').innerHTML = record;
    }
    score=0;
    document.getElementById('score').innerHTML = score;
    void cactus.offsetWidth;
    cactus.classList.add("cactusMove");
    
}

// Crear Cactus //
function createCactus() {
    if(crearCactus == true && fondo.width/2 > cactus.offsetLeft){

        cactus2 = document.createElement('div');
        img = document.createElement('img');
        img.src = "/static/src/cactus.png";
        cactus2.classList.add('cactus');
        cactus2.appendChild(img);
        board.appendChild(cactus2);
        cactus2.classList.add("cactusMove");
        crearCactus = false;
    }
}

/*
function IsCollision(a, b) {
    return !(
    (a.offsetTop + a.offsetHeight) < (b.offsetTop) ||
    (a.offsetTop) > (b.offsetTop + b.offsetHeight) ||
    (a.offsetLeft + a.offsetWidth) < b.offsetLeft ||
    (a.offsetLeft) > (b.offsetLeft + b.offsetWidth)
    );
}
*/

// BOTON
buttonPlayStop.addEventListener('click', () => {
    buttonPlayStop.classList.toggle("play");
    if(buttonPlayStop.classList.contains("play")){
        if(muerto != true){
            Reanudar();
        }
        
    }
    else{
       Pause(); 
    }
    

})