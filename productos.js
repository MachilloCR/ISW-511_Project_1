const paginaActual = window.location.pathname;
const dashboardPag = "/C:/Users/Machillo_CR/Documents/U/Quinto%20Cuatrimestre/Web/Proyecto%20Web%201/Dashboard.html";
const cambalachesPag = "/C:/Users/Machillo_CR/Documents/U/Quinto%20Cuatrimestre/Web/Proyecto%20Web%201/Cambalaches.html";
const detalleProdPag = "/C:/Users/Machillo_CR/Documents/U/Quinto%20Cuatrimestre/Web/Proyecto%20Web%201/Producto.html";
const indexPag = "/C:/Users/Machillo_CR/Documents/U/Quinto%20Cuatrimestre/Web/Proyecto%20Web%201/Index.html";


if (paginaActual == dashboardPag) {
    mostrarProductos();
    spanNomUsur();
    logout();
}
if (paginaActual == cambalachesPag) {
    mostrarProductos();
    logout();
}
if (paginaActual == detalleProdPag) {
    mostrarDetalleProd();
    logout();
}
if (paginaActual == indexPag) {
    sessionStorage.removeItem("producto");
    productosRecientes();
    logout();
}
// actualiza el nombre del usuario en el mensaje del dashboard
function spanNomUsur() {
    const user = JSON.parse(sessionStorage.getItem('Usuario'));
    const contenedor = document.getElementById('spanNomUsuario');
    contenedor.innerHTML = `Bievenido <span style="font-weight: bold;">${user.nombre}</span>, aquí podrá encontrar el estado actual de sus Cambalaches y sus productos registrados.`;
}

// -------------------------------------- Agregar productos --------------------------------------
// ------------------------------------- NuevoProducto.html --------------------------------------
//declara al boton de agregar productos
const botonIngresar = document.getElementById("btnAgregar");
botonIngresar.addEventListener('click', function () {
    agregarProductos();
});

function agregarProductos() {
    //sesion del usuario
    const user = JSON.parse(sessionStorage.getItem('Usuario'));

    const ProdNom = document.getElementById("ProdNom").value;
    const Descripcion = document.getElementById("Descripcion").value;
    const UrlFoto = document.getElementById("UrlFoto").value;
    const Busco = document.getElementById("Busco").value;
    const emailUser = user.email;

    if (!ProdNom || !Descripcion || !UrlFoto || !Busco) {
        alert("No pueden haber campos vacios");
    } else {
        let Productos = JSON.parse(localStorage.getItem('Productos'));
        if (!Productos) {
            Productos = [];
        }
        const producto = {
            name: ProdNom,
            id: asginarIdProductos(),
            desc: Descripcion,
            url: UrlFoto,
            busco: Busco,
            userEmail: emailUser

        }
        Productos.push(producto);
        localStorage.setItem('Productos', JSON.stringify(Productos));

        console.log(JSON.parse(localStorage.getItem('Productos')));
        window.location.href = 'Dashboard.html';
    }

}
//saca el id para los nuevos productos
function asginarIdProductos() {
    let Productos = JSON.parse(localStorage.getItem('Productos'));
    var codprod = 0;
    if(!Productos){
        Productos = [];
    }
    if (Productos.length == 0) {
        codprod = 1;
    } else {
        codprod = Productos[Productos.length - 1].id + 1;
    }
    return codprod;
}




//botones para cerrar la sesion


function cerrarsesion() {
    sessionStorage.removeItem('Usuario');
    window.location.href = 'Ingreso.html';
}



function mostrarProductos() {
    const pagina = window.location.pathname;

    if (pagina == dashboardPag) {
        //contenerdor de los productos
        const contenedor = document.getElementById('contenedorProds');

        //lista de los productos
        let Productos = JSON.parse(localStorage.getItem('Productos'));

        //sesion del usuario
        const user = JSON.parse(sessionStorage.getItem('Usuario'));

        Productos.forEach(producto => {
            //console.log(producto);
            var prodid = producto.id;
            if (producto.userEmail == user.email) {
                contenedor.innerHTML += `<div class="col d-flex justify-content-center">
                <div class="card border-danger g-2" style="width: 18rem;">
                <a onclick="detalleproducto(${prodid})"><img src=${producto.url} class="card-img-top" alt="..."></a>
                <div class="card-body">
                    <p class="card-title">${producto.name}</p>
                    <a class="btn btn-Primary" onclick="eliminarProd(${prodid})">Delete</a>
                    <a class="btn btn-success" onclick="editarProd(${prodid})">Edit</a>
                </div>
                </div>
                </div>`;

            }
        });
    }

    if (pagina == cambalachesPag) {
        //contenerdor de los productos
        const contenedor = document.getElementById('seccion_productos');

        //lista de los productos
        let Productos = JSON.parse(localStorage.getItem('Productos'));

        //div del producto
        const div = document.createElement('div');

        Productos.forEach(producto => {
            //console.log(producto);
            var prodid = producto.id;
            contenedor.innerHTML += `<div class="col d-flex justify-content-center">
                <div class="card border-danger g-2" style="width: 18rem;">
                <a onclick="detalleproducto(${prodid})"><img src=${producto.url} class="card-img-top" alt="..."></a>
                <div class="card-body">
                    <p class="card-title">${producto.name}</p>
                    <p class="card-text">${producto.userEmail}</p>
                </div>
            </div>
            </div>`;
        });
    }
    sessionStorage.removeItem("producto");
}

function eliminarProd(x) {
    //lista de los productos
    let Productos = JSON.parse(localStorage.getItem('Productos'));

    let newProductos = [];
    Productos.forEach(producto => {
        if (producto.id == x) {

        } else {
            newProductos.push(producto);
        }
    });

    localStorage.setItem('Productos', JSON.stringify(newProductos));

    location.reload();

}
function editarProd(a) {
    sessionStorage.setItem("producto", a);
    window.location.href = "ModificarProducto.html";
}

function detalleproducto(a) {
    window.location.href = "Producto.html";
    sessionStorage.setItem("producto", a);
}

function mostrarDetalleProd() {

    //lista de los productos
    let Productos = JSON.parse(localStorage.getItem('Productos'));

    const prodid = sessionStorage.getItem('producto');
    Productos.forEach(producto => {
        //console.log(producto);
        if (producto.id == prodid) {
            document.getElementById("imgDetalleProd").src = producto.url;
            document.getElementById("nombreDetalleProd").innerHTML = producto.name;
            document.getElementById("descripcionDetalle").textContent = producto.desc;
            document.getElementById("buscoDetalle").textContent = producto.busco;
            var ofertor = producto.userEmail;
            nombreProdUserDetalle(ofertor);
        }

    });
}

function nombreProdUserDetalle(email) {
    //busca el nombre de la persona
    let Personas = JSON.parse(localStorage.getItem('Personas'));
    for (i = 0; i < Personas.length; i++) {
        if (email == Personas[i].email) {
            document.getElementById("nombreUsu").textContent = Personas[i].nombre;
            break;
        }
    }

}


function productosRecientes() {
    //contenerdor de los productos
    const Slider = document.getElementById('slider');

    //lista de los productos
    let Productos = JSON.parse(localStorage.getItem('Productos'));
    if (!Productos){
    }else{
        var prodid = Productos[Productos.length - 1].id;
        var urle = Productos[Productos.length - 1].url;
        var nombreprod = Productos[Productos.length - 1].name;
        Slider.innerHTML += `<div class="carousel-item active" data-bs-interval="5000">
                <a onclick="detalleproducto(${prodid})"><img src=${urle} class="d-block w-50 m-auto" alt="..."></a>
                <div class="carousel-caption d-none d-md-block">
                    <h5>${nombreprod}</h5>
                </div>
                </div>`;
    
        var prodid2 = Productos[Productos.length - 2].id;
        var url2 = Productos[Productos.length - 2].url;
        var nombreprod2 = Productos[Productos.length - 2].name;
        Slider.innerHTML += `<div class="carousel-item active" data-bs-interval="5000">
                <a onclick="detalleproducto(${prodid2})"><img src=${url2} class="d-block w-50 m-auto" alt="..."></a>
                <div class="carousel-caption d-none d-md-block">
                    <h5>${nombreprod2}</h5>
                </div>
                </div>`;
    }

}

function logout() {
    let personaDb = JSON.parse(sessionStorage.getItem('Usuario'));
    const btncerrar_ingresar = document.getElementById('btnCerrarIngresar');
    if (!personaDb) {
        btncerrar_ingresar.innerHTML = "Ingresar";
        btncerrar_ingresar.setAttribute( "onclick","login()");
    } else {
        btncerrar_ingresar.innerHTML="Cerrar Sesion";
        btncerrar_ingresar.setAttribute( "onclick","cerrarsesion()");
    }
}

function login(){
    window.location.href = "Ingreso.html";
}