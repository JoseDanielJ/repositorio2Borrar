//variables
const cursoInput = document.querySelector('#curso');
const profesorInput = document.querySelector('#profesor');
const nrcInput = document.querySelector('#nrc');
const horarioInput = document.querySelector('#horario');
const activoInput = document.querySelector('#activo');
const campusInput = document.querySelector('#campus');
const listaCursos = document.querySelector('#lista-cursos');
let cursos;


const objCurso ={
    curso:'',
    profesor:'',
    nrc:'',
    horario:'',
    campus:'',
    activo:true
};

//event listeners
document.addEventListener('DOMContentLoaded',()=>{
    addEventListeners();
    cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    imprimirCursos();
});

//funciones

function addEventListeners(){
    document.querySelector('.add').addEventListener('click',verificarRequeridos);
    cursoInput.addEventListener('input',obtenerInfo);
    profesorInput.addEventListener('input',obtenerInfo);
    nrcInput.addEventListener('input',obtenerInfo);
    horarioInput.addEventListener('change',obtenerInfo);
    campusInput.addEventListener('change',obtenerInfo);
    activoInput.addEventListener('change',obtenerInfo);
};

function verificarRequeridos(){
    const {curso, profesor,nrc,horario,campus} = objCurso;
    if(curso===''|| profesor===''|| nrc===''||horario===''||campus===''){
        mostrarMesanje("Todos los campos son requeridos",'error');
        return;
    }
    agregarCurso(objCurso);
    imprimirCursos(); 
}

function agregarCurso({...obj}){
    cursos = [...cursos,obj];
    localStorage.setItem('cursos',JSON.stringify(cursos));
}

function imprimirCursos(){
    limpiarHTML();
    cursos.forEach(nuevo => {
        const {curso, profesor,nrc,horario,activo,campus} = nuevo;
        const clase = activo?"on":"off";
        const active = activo?"Activo":"Inactivo";
        listaCursos.innerHTML+=
        `
        <tr>
            <th class ="materia">${curso}</th>
            <th >${profesor}</th>
            <th >${campus}</th>
            <th >${horario}</th>
            <th >${nrc}</th>
            <th class =${clase}>${active}</th>
        </tr>
        `;
    });
}

function limpiarHTML(){
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
}


function mostrarMesanje(mensaje,tipo){
    const divMensaje = document.createElement('div');
    const contenedor = document.querySelector('.container');

    divMensaje.textContent= mensaje;
    if(tipo==='error'){
        divMensaje.classList.add('error');
    };

    if(!document.querySelector('.error')){
        contenedor.insertBefore(divMensaje,document.querySelector('.table'));
        setTimeout(()=>{
            divMensaje.remove();
        },3000);
    };
}

function obtenerInfo(e){
    const id = e.target;
    objCurso[id.id] = id.id==='activo'?id.checked:id.value;
    console.log(objCurso);
}

function agregarTabla(){

}
