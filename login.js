//=============================================================================================================//
//------------------------------------          Login de Personas          ------------------------------------//
//=============================================================================================================//
//declara al boton de inicio
const botonIngresar = document.getElementById("btnIngreso");


//Evento del boton ingresar
botonIngresar.addEventListener('click', function () {
    logear();
});


function logear(){
    const Personas = JSON.parse(localStorage.getItem('Personas'));
    const username = document.getElementById("Username").value;
    const contraseña = document.getElementById("Password").value;
    if (!username || !contraseña){
        alert("Contraseña o Nombre de Usuario incorrecto.");
    } else {
        if (!Personas) {
            alert("No hay usuarios registrados.");
        } else {
            //inicia sesion
            for (i = 0; i < Personas.length; i++) {
                if (username == Personas[i].email && contraseña == Personas[i].contraseña) {
                    sessionStorage.setItem('Usuario', JSON.stringify(Personas[i]));
                    window.location.href = 'Dashboard.html';
                    break;
                }
            };
        }
    }
    

}
