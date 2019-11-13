var HtablaExpositor;
var BtablaExpositor;
var FtablaExpositor;


var ExpositoSaveTemplate = `
<div class="card" style="margin-top: 10px">
    <div class="card-body">
      <div class="form-group mb-1">

      <input type="text" class="form-control" id="txtnombre" aria-describedby="title" placeholder="Nombre del expositor" required="" autofocus="autofocus">
      </br>
      <input type="text" class="form-control" id="txtcuentagithub" aria-describedby="title" placeholder="Cuenta Github" required="">
      </br>
      <input type="text" class="form-control" id="txtcorreo" aria-describedby="title" placeholder="Correo electronico" required="">
      </br>
      <button class="btn btn-success btn-sm btn-send" id="btnregistrar" data-id="{{ID}}"><i class="fa fa-paper-plane fa-lg"></i> Registrar</button>
      </div>
    </div>
</div>
`
HtablaExpositor = `<div class="card mb-3">
<div class="card-header">
  <i class="fas fa-table"></i>
  Consulta
</div>
<div class="card-body">
  <div class="table-responsive">
    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Cuenta de Hithub</th>
          <th>Correo</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Cuenta de Hithub</th>
          <th>Correo</th>
          <th>Opciones</th>
        </tr>
      </tfoot>
      <tbody>`

BtablaExpositor = `<tr>
                    <td><a href="#" data-id="{{ID2}}" class="txtId">{{ID}}</td>
                    <td>{{NOMBRE}}</td>
                    <td>{{CUENTAGIT}}</td>
                    <td>{{CORREO}}</td>
                    <td><a href="#" data-id="{{ID3}}" class="txtId2">Editar</td>
                    </tr>`

FtablaExpositor = ` </tbody>
</table>
</div>
</div>
<div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
</div> `


var profileTemplate = `
<div class="container-fluid well span6">
	<div class="row-fluid">
        <div class="span2" >
		    <img src="Template/nouser.jpg" class="img-circle">
        </div>
        <hr>
        <div class="span8">
            <h3>{{ID}} - {{NOMBRE}}</h3>
            <h6>Email: <i>{{CORREO}}</i></h6>
            <h6>Cuenta GitHub: <i>{{CUENTAGIT}}</i></h6>
        </div>
</div>
</div>
`


export function ObtenerExpositores(){

    var data;
    var cabecera = new Headers();
    //cabecera.append("Authorization",'Bearer '+ token);                    
    cabecera.append('Content-Type', 'application/json');
    fetch(`${API_PATH}/expositor2`, {
      method: 'GET',
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:cabecera
    }).then(res => res.json())
    .then(res => {
        var postView = '';
        res.forEach(p => {
            //console.log('Expo',p)
            postView = postView + BtablaExpositor.replace('{{ID}}',p.id)
                                              .replace('{{ID2}}',p.id)
                                              .replace('{{ID3}}',p.id)
                                              .replace('{{NOMBRE}}',p.nombre)
                                              .replace('{{CUENTAGIT}}',p.cuenta_github)
                                              .replace('{{CORREO}}',p.correo)
                                              ;
  
                          });
        
        var f = ExpositoSaveTemplate

        document.getElementById("app").innerHTML= f + HtablaExpositor + postView + FtablaExpositor;
    
        var i
        var bes = document.getElementsByClassName("txtId");
        for(i=0; i < bes.length;i++)
        {
            bes[i].addEventListener('click',showExpositorEventProfile);
        }
        function showExpositorEventProfile(event){
            var ueObject = event.target;
            var idExpositor = ueObject.getAttribute('data-id');
            ObtenerExpositorId(idExpositor)
        }

        var bes = document.getElementsByClassName("txtId2");
        for(i=0; i < bes.length;i++)
        {
            bes[i].addEventListener('click',EditExpositorEventProfile);
        }
        function EditExpositorEventProfile(event){
            var ueObject = event.target;
            var idExpositor = ueObject.getAttribute('data-id');
            EditarExpositorId(idExpositor)
        }



        document.getElementById("btnregistrar").addEventListener('click',registrarEvent);

  
     })      
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
}        

function ObtenerExpositorId(id){
    var data;
    var cabecera = new Headers();
    //cabecera.append("Authorization",'Bearer '+ token);                    
    cabecera.append('Content-Type', 'application/json');
    fetch(`${API_PATH}/expositor2/${id}`, {
        method: 'GET',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:cabecera
    }).then(res =>res.json())
      .then(res => {
        var postView = '';
        console.log(res)
        postView = profileTemplate.replace('{{ID}}',res.id)
                                .replace('{{NOMBRE}}',res.nombre)
                                .replace('{{CUENTAGIT}}',res.cuenta_github)
                                .replace('{{CORREO}}',res.correo);

        document.getElementById("app").innerHTML=postView;
        })      
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
}

function registrarEvent(){

    var nombre = document.getElementById("txtnombre").value;
    var cuentagithub = document.getElementById("txtcuentagithub").value;
    var correo = document.getElementById("txtcorreo").value;
  
    if(nombre==""){
      alert("Debe escribir un nombre");
      document.getElementById("txtnombre").focus();
      return;
    }
  
    if(cuentagithub==""){
      alert("Debe escribir una cuenta");
      document.getElementById("txtcuentagithub").focus();
      return;
    }
  
    if(correo==""){
        alert("Debe escribir un correo");
        document.getElementById("txtcorreo").focus();
        return;
      }

    var data ={
        nombre:nombre,
        correo:correo,
        cuenta_github:cuentagithub
    };
    var idExpositor = document.getElementById("btnregistrar").getAttribute("data-id")
    if (idExpositor>0){
        ActualizarExpositor(data,idExpositor)
    }else{
        RegistrarExpositor(data)
    }

}

function RegistrarExpositor(data){
    fetch(`${API_PATH}/expositor2`, {
        method: 'POST',
        body: JSON.stringify(data), 
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(response => {
        if(response.error){
            alert(response.message);
        }else{
            alert("Expositor Creado!");
            console.log('Expo',response)
            ObtenerExpositores()
          }
        })
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
}

function ActualizarExpositor(data,id){
    fetch(`${API_PATH}/expositor2/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data), 
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(response => {
        if(response.error){
            alert(response.message);
        }else{
            alert("Expositor Actualizado!");
            console.log('Expo',response)
            ObtenerExpositores()
          }
        })
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
}




function EditarExpositorId(id){
    var data;
    var cabecera = new Headers();
    //cabecera.append("Authorization",'Bearer '+ token);                    
    cabecera.append('Content-Type', 'application/json');
    fetch(`${API_PATH}/expositor2/${id}`, {
        method: 'GET',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:cabecera
    }).then(res =>res.json())
      .then(res => {
          console.log(res)
        document.getElementById("txtnombre").value = res.nombre;
        document.getElementById("txtcuentagithub").value  = res.cuenta_github;
        document.getElementById("txtcorreo").value  = res.correo;
        document.getElementById("btnregistrar").setAttribute('data-id',res.id)
        document.getElementById("txtnombre").focus();
    })      
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
}

export default ObtenerExpositores