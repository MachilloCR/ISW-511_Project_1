//=============================================================================================================//
//------------------------------------         Registro de personas        ------------------------------------//
//=============================================================================================================//

//lista global de personas
let Personas = [];

//formulario de registro
const formulario = document.getElementById("formRegistro");

//declara al boton de registro
var botonRegistrar = document.getElementById("btn_Registrar");

//Evento para el boton "registrar"
botonRegistrar.addEventListener('click', function (evt) {
  if (verifRegistro()) {
    registrar_Persona();
  } else {
    console.log("Informacion incompleta");
  }
});

//recarga las personas guardadas en el localstorage en un array
function recargar_Personas() {
  Personas = JSON.parse(localStorage.getItem('Personas'));
}

//verifica si los campos estan vacios y si el email ya esta en uso
function verifRegistro() {
  var verificacion;
  if (formulario.elements["Nombre"].value != "" && formulario.elements["Apellidos"].value != "" && formulario.elements["Direccion"].value != "" && formulario.elements["Direccion_2"].value != "" && formulario.elements["Ciudad"].value != "" && document.getElementById("Pais").value != "" && document.getElementById("Direccion").value != "") {
    recargar_Personas();
    if (!Personas) {
      verificacion = true;
    } else {
      for (i = 0; i < Personas.length; i++) {
        if (Personas[i].email == formulario.elements["Email"].value) {
          alert("El correo ya esta registrado");
          verificacion = false;
          break;
        }
        else {
          verificacion = true;
        }
      };
    }
  } else {
    verificacion = false;
  }
  return verificacion;
}
//registra a la persona
function registrar_Persona() {
  recargar_Personas();
  if (!Personas) {
    Personas = [];
  }
  //selecciona el valor del select de paises
  var sel = document.getElementById('Pais');
  var paistxt = sel.options[sel.selectedIndex].text;
  let persona = {
    nombre: formulario.elements["Nombre"].value,
    apellido: formulario.elements["Apellidos"].value,
    direccion: formulario.elements["Direccion"].value,
    direccion_2: formulario.elements["Direccion_2"].value,
    ciudad: formulario.elements["Ciudad"].value,
    pais: paistxt,
    email: formulario.elements["Email"].value,
    contraseña: formulario.elements["Password"].value,
  };
  //agrega a la persona a la lista
  Personas.push(persona);

  localStorage.setItem("Personas", JSON.stringify(Personas));

  alert("Registrado Correctamente!");
  window.location.href = 'Ingreso.html';
}
