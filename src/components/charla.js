var HtablaCharla;
var BtablaCharla;
var FtablaCharla;

var CharlaSaveTemplate = `
<div class="card" style="margin-top: 10px">
    <div class="card-body">
      <div class="form-group mb-1">
      <input type="text" class="form-control" id="txtnombre" aria-describedby="title" placeholder="Nombre de la charla" required="" autofocus="autofocus">
      </br>
      <input type="text" class="form-control" id="txthora" aria-describedby="title" placeholder="Hora de la charla" required="">
      </br>
      <input type="text" class="form-control" id="txttags" aria-describedby="title" placeholder="Tag1,tag2,..." required="">
      </br>
      <div id="cboExpo">
      </div>
      </br>
      <button class="btn btn-success btn-sm btn-send" id="btnregistrar" data-id="{{ID}}"><i class="fa fa-paper-plane fa-lg"></i> Registrar</button>
      </div>
    </div>
</div>
`;
var CharlaSaveTemplate2 = CharlaSaveTemplate;

HtablaCharla = `<div class="card mb-3">
<div class="card-header">
  <i class="fas fa-table"></i>
  Consulta
</div>
<div class="card-body">
  <div class="table-responsive">
    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Hora</th>
          <th>Tags</th>
          <th>Expositor</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Nombre</th>
          <th>Hora</th>
          <th>Tags</th>
          <th>Expositor</th>
          <th>Opciones</th>
        </tr>
      </tfoot>
      <tbody>`;

BtablaCharla = `<tr>
                    <td>{{NOMBRE}}</td>
                    <td>{{HORA}}</td>
                    <td>{{TAGS}}</td>
                    <td>{{EXPOSITOR}}</td>
                    <td><a href="#" data-id="{{ID2}}" class="txtId">Ver</a> - <a href="#" data-id="{{ID3}}" class="txtId2">Editar</a> - <a href="#" data-id="{{ID4}}" class="txtId3">Eliminar</a></td>
                    </tr>`;

FtablaCharla = ` </tbody>
</table>
</div>
</div>
<div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
</div> `;

var profileTemplate = `
<div class="container-fluid well span6">
	<div class="row-fluid">
        <div class="span2" >
		    <img src="Template/nouser.jpg" class="img-circle">
        </div>
        <hr>
        <div class="span8">
            <h3>{{ID}} - {{NOMBRE}}</h3>
            <h6>Hora: <i>{{HORA}}</i></h6>
            <h6>Expositor: <i>{{EXPOSITOR}}</i></h6>
            <h6>Tags: <i>{{TAGS}}</i></h6>
          </div>
</div>
</div>
`;
//cargaExpositores();

export function ObtenerCharlas() {
  var data;
  var cabecera = new Headers();
  //cabecera.append("Authorization",'Bearer '+ token);
  cabecera.append("Content-Type", "application/json");
  fetch(`${API_PATH}/charla2`, {
    method: "GET",
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: cabecera
  })
    .then(res => res.json())
    .then(res => {
      var postView = "";
      res.forEach(p => {
        //console.log('Expo',p)
        postView =
          postView +
          BtablaCharla.replace("{{ID}}", p.id)
            .replace("{{ID2}}", p.id)
            .replace("{{ID3}}", p.id)
            .replace("{{ID4}}", p.id)
            .replace("{{NOMBRE}}", p.nombre)
            .replace("{{HORA}}", p.hora)
            .replace("{{TAGS}}", p.tags)
            .replace("{{EXPOSITOR}}", p.expositor.nombre);
      });

      document.getElementById("app").innerHTML = CharlaSaveTemplate2 + HtablaCharla + postView + FtablaCharla;

      var i;
      var bes = document.getElementsByClassName("txtId");
      for (i = 0; i < bes.length; i++) {
        bes[i].addEventListener("click", showCharlaEventProfile);
      }
      function showCharlaEventProfile(event) {
        var ueObject = event.target;
        var idCharla = ueObject.getAttribute("data-id");
        ObtenerCharlaId(idCharla);
      }

      var bes = document.getElementsByClassName("txtId2");
      for (i = 0; i < bes.length; i++) {
        bes[i].addEventListener("click", EditCharlaEventProfile);
      }
      function EditCharlaEventProfile(event) {
        var ueObject = event.target;
        var idCharla = ueObject.getAttribute("data-id");
        EditarCharlaId(idCharla);
      }

      var bes = document.getElementsByClassName("txtId3");
      for (i = 0; i < bes.length; i++) {
        bes[i].addEventListener("click", DeleteCharlaEventProfile);
      }
      function DeleteCharlaEventProfile(event) {
        var ueObject = event.target;
        var idCharla = ueObject.getAttribute("data-id");
        var r = confirm("Desea Elimiar el Charla?");
        if (r == true) {
          EliminarCharlaId(idCharla);
        }
      }

      document
        .getElementById("btnregistrar")
        .addEventListener("click", registrarEvent);

      cargarExpositores()

    })
    .catch(error => console.error("Error:", error))
    .then(response => console.log("Success:", response));
}

function ObtenerCharlaId(id) {
  var data;
  var cabecera = new Headers();
  //cabecera.append("Authorization",'Bearer '+ token);
  cabecera.append("Content-Type", "application/json");
  fetch(`${API_PATH}/charla2/${id}`, {
    method: "GET",
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: cabecera
  })
    .then(res => res.json())
    .then(res => {
      var postView = "";
      console.log(res);
      postView = profileTemplate
        .replace("{{ID}}", res.id)
        .replace("{{NOMBRE}}", res.nombre)
        .replace("{{HORA}}", res.hora)
        .replace("{{EXPOSITOR}}", res.expositor.nombre)
        .replace("{{TAGS}}", res.tags);

      document.getElementById("app").innerHTML = postView;
    })
    .catch(error => console.error("Error:", error))
    .then(response => console.log("Success:", response));
}

function getTags(data) {
  var html = ``;
  $(data).each(function (index, value) {
    html += `<a href="javascript:void(0)" class="btn btn-link mx-0 px-0">${$.trim(value)}</a>, `;
  })
  html = html.slice(0, -2);
  return html;
}

function registrarEvent() {
  var nombre = document.getElementById("txtnombre").value;
  var hora = document.getElementById("txthora").value;
  var tags = document.getElementById("txttags").value;
  var expositor_id = document.getElementById("cboExpositor").value;

  if (nombre == "") {
    alert("Debe escribir un nombre");
    document.getElementById("txtnombre").focus();
    return;
  }

  if (hora == "") {
    alert("Debe escribir el horario");
    document.getElementById("txthora").focus();
    return;
  }

  if (tags == "") {
    alert("Debe escribir al menos un tags");
    document.getElementById("txttags").focus();
    return;
  }

  var data = {
    nombre: nombre,
    tags: tags,
    expositor_id: expositor_id,
    hora: hora
  };
  var idCharla = document
    .getElementById("btnregistrar")
    .getAttribute("data-id");
  if (idCharla > 0) {
    ActualizarCharla(data, idCharla);
  } else {
    RegistrarCharla(data);
  }
}

function RegistrarCharla(data) {
  fetch(`${API_PATH}/charla2`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => {
      if (response.error) {
        alert(response.message);
      } else {
        alert("Charla Creado!");
        console.log("Expo", response);
        ObtenerCharlas();
      }
    })
    .catch(error => console.error("Error:", error))
    .then(response => console.log("Success:", response));
}

function ActualizarCharla(data, id) {
  fetch(`${API_PATH}/charla2/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => {
      if (response.error) {
        alert(response.message);
      } else {
        alert("Charla Actualizado!");
        console.log("Expo", response);
        ObtenerCharlas();
      }
    })
    .catch(error => console.error("Error:", error))
    .then(response => console.log("Success:", response));
}

function EditarCharlaId(id) {
  var data;
  var cabecera = new Headers();
  cabecera.append("Content-Type", "application/json");
  console.log(`${API_PATH}/charla2/${id}`)
  fetch(`${API_PATH}/charla2/${id}`, {
    method: "GET",
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: cabecera
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      document.getElementById("txtnombre").value = res.nombre;
      document.getElementById("txthora").value = res.hora;
      document.getElementById("txttags").value = res.tags;
      document.getElementById("cboExpositor").value = res.expositor_id
      document.getElementById("btnregistrar").setAttribute("data-id", res.id);
      document.getElementById("txtnombre").focus();
    })
    .catch(error => console.error("Error:", error))
    .then(response => console.log("Success:", response));
}

function EliminarCharlaId(id) {
  var data;
  var cabecera = new Headers();
  cabecera.append("Content-Type", "application/json");
  fetch(`${API_PATH}/charla2/${id}`, {
    method: "DELETE",
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: cabecera
  })
    .then(res => res.json())
    .then(res => {
      ObtenerCharlas();
    })
    .catch(error => console.error("Error:", error))
    .then(response => console.log("Success:", response));
}

function cargarExpositores() {
  var retorno
  var htmldet = "";
  var data;
  var cabecera = new Headers();
  cabecera.append("Content-Type", "application/json");
  fetch(`${API_PATH}/expositor2`, {
    method: "GET",
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: cabecera
  })
    .then(res => res.json())
    .then(res => {
      res.forEach(p => {
        htmldet += "<option value=" + p.id + ">" + p.nombre + "</option>";
      });
      retorno = `<select id="cboExpositor" class="form-control"">{{COMBO}}</select>`
      retorno = retorno.replace("{{COMBO}}", htmldet);
      console.log(retorno)
      document.getElementById('cboExpo').innerHTML = retorno

    })
    .catch(error => console.error("Error:", error))
    .then(response => console.log("Successx:", response));
}




export default ObtenerCharlas;
