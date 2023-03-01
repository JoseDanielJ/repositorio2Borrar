let up = true;
let hour = false;
let horas, fecha, min;
const reloj24 = document.querySelector(".horas24");
const reloj12 = document.querySelector(".horas12");
const centro = document.querySelector(".hijo1");
const izquierda = document.querySelector(".hijo3");
const derecha = document.querySelector(".hijo2");
const page1 = document.querySelector('.uno');
const page2 = document.querySelector('.dos');
const page3 = document.querySelector('.tres');


page1.addEventListener('click',changePage);
page2.addEventListener('click',changePage);
page3.addEventListener('click',changePage);

document.addEventListener("DOMContentLoaded",()=>{
    colocarHora(hour);
});

document.querySelector('.reloj').addEventListener('click',cambiarHora);

document.querySelector('.boton').addEventListener('click',subirBajarBarra);




function cambiarHora(){
    hour = !hour;
    reloj12.style.top = hour?'45px':'-50px';
    reloj24.style.top = hour?'150px':'45px';
};

function colocarHora(horario){
    fecha = new Date();
    horas = Number((fecha.getHours()>=10)?fecha.getHours():"0"+fecha.getHours());
    min = (fecha.getMinutes()>=10)?fecha.getMinutes():"0"+fecha.getMinutes();

    reloj24.textContent = horas+":"+min;
    reloj12.textContent = (horas-12)+":"+min;

    //reloj12.textContent = horas>12?(horas-12)+":"+min:reloj12.value;
    horas = (horas>12)?(horario?(horas-12):horas):horas;
    document.querySelector('.hora').textContent = horas+":"+min;
    
    setTimeout("colocarHora(hour)",1000);
};

function subirBajarBarra(){
    if(up){
        document.querySelector('.notificaciones').style.top= '0px';
    }else{
         document.querySelector('.notificaciones').style.top= '-300px';
    };
    up = (!up);
};


function changePage(e){
    move(Number(e.target.dataset.id));
};


function move(elec){
    centro.style.left = elec===1?"720px":elec===2?"0px":"-720px";
    izquierda.style.left = elec===1?'0px':'-720px';
    derecha.style.right = elec===3?'0px':"-720px";
}






