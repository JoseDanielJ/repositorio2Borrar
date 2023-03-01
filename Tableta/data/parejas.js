//Variables 
const contenedorCartas = document.querySelector('.container-cartas');
const menu = document.querySelector('.menu');
const restartBtn = document.querySelector('.restart-button');
let listaImages =[], listaCartas = [],cartasVisibles = [];
let tiempoTranscurrido = 0, seleccionados  = 0;
//funciones
document.addEventListener('DOMContentLoaded',()=>{
    addCards();
    fillArrayImages();
    start();
});

restartBtn.addEventListener('click',()=>{
    contenedorCartas.classList.remove('black-blur');
    listaCartas.forEach(carta=>{
        hidden(carta);
        if(carta.children[2]){carta.children[2].remove()}
    });
    menu.style.display = 'none';
    start();
});

function createCard(){
    const divCarta = document.createElement('div');
    divCarta.classList.add('carta');
    divCarta.innerHTML = `<div class = "back"> </div><div class = "front"> </div>`;
    divCarta.dataset.estado = 'oculto';
    return divCarta;
};

function addCards(){
    for(let i = 0; i < 18; i++){
        listaCartas[i]=(createCard());
        contenedorCartas.appendChild(listaCartas[i]); 
    };
    addEventClick();
};

function addEventClick(){ listaCartas.forEach(carta =>{carta.addEventListener('click',showCard)});};

function showCard(e){
    const carta  = e.target.parentElement
    
    if(carta.dataset.estado==='oculto' && seleccionados<2){
        seleccionados++;
        carta.dataset.estado = 'viendo';
        carta.children[0].style.transform = 'rotateY(360deg)';
        carta.children[1].style.transform = 'rotateY(180deg)';
        if(seleccionados==2){hiddenCard(); endGame();};
    }; 
};

function cartasIguales(){
    cartasVisibles = listaCartas.filter(carta=>{return carta.dataset.estado==='viendo'});
    if(cartasVisibles[0].children[0].style.background === cartasVisibles[1].children[0].style.background){ 
        cartasVisibles.forEach(carta=>carta.dataset.estado = 'pareja');
        addCheck();
        seleccionados = 0;
        return true;
    };
    return false;
};

function addCheck(){
    setTimeout(()=>{cartasVisibles.forEach(carta=>{carta.innerHTML += `<div class ="check"></div>`});},1000)
    

}

function hiddenCard(){
    if(!cartasIguales()){
        setTimeout(()=>{
            cartasVisibles.forEach(carta =>hidden(carta));
            seleccionados = 0;
        },1000);
    }; 
};

function hidden(carta){
    carta.dataset.estado = 'oculto';
    carta.children[0].style.transform = 'rotateY(180deg)';
    carta.children[1].style.transform = 'rotateY(0deg)';
};

function fillArrayImages(){
    for(let i = 1; i <= 18;i++){
        listaImages[i-1]=("url(/Tableta/Cards/"+(i<=9?i:i-9)+".png)");
    };
};

function mixArray(){listaImages = _.shuffle(listaImages);};

function addCardsImages(){
    let i = 0;
    listaCartas.forEach(carta=>{
        carta.children[0].style.background = listaImages[i++];
        carta.children[0].style.backgroundSize ='cover';
    });
};

function start(){
    mixArray();
    addCardsImages();
};

function endGame(){
    const someCard = listaCartas.find(carta=>{return carta.dataset.estado !== 'pareja'});
    if(!someCard){
        contenedorCartas.classList.add('black-blur');
        menu.style.display = 'block';
    };
};