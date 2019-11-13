import ObtenerExpositores from './components/expositor';

function ObtenerCharlas(){
    document.getElementById('app').innerHTML = '<H1>En Proceso</H1>'
}


function inicio(){
    document.getElementById('app').innerHTML = '<H1>Evento Tech Day</H1>'
}

window.onload = function(){
    inicio()
    document.getElementById("btnExpositor").addEventListener('click',function(){ObtenerExpositores();}); 
    document.getElementById("btnCharlas").addEventListener('click',function(){ObtenerCharlas();}); 
    document.getElementById("btnInicio").addEventListener('click',function(){inicio();}); 

}

