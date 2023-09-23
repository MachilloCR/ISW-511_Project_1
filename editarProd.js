cargarProd();
function cargarProd(){
    var a = sessionStorage.getItem('producto');
    let Productos = JSON.parse(localStorage.getItem('Productos'));
    Productos.forEach(prod => {
        if (prod.id == a) {
            document.getElementById("ProdNom").value = prod.name;
            document.getElementById("Descripcion").value = prod.desc;
            document.getElementById("UrlFoto").value = prod.url;
            document.getElementById("Busco").value = prod.busco;
        }
    });
}


function modProd() {
    const ProdNom = document.getElementById("ProdNom").value;
    const Descripcion = document.getElementById("Descripcion").value;
    const UrlFoto = document.getElementById("UrlFoto").value;
    const Busco = document.getElementById("Busco").value;

    if (!ProdNom || !Descripcion || !UrlFoto || !Busco) {
        alert("No pueden haber campos vacios");
    } else {
        let Productos = JSON.parse(localStorage.getItem('Productos'));
        var idprod = sessionStorage.getItem("producto");
        if (!Productos) {
            Productos = [];
        }
        Productos.forEach(prod => {
            if (idprod == prod.id) {
                prod.name = ProdNom
                prod.desc = Descripcion
                prod.url = UrlFoto
                prod.busco = Busco

            }
        });
        localStorage.setItem('Productos', JSON.stringify(Productos));
        alert("Producto Modificado");
        sessionStorage.removeItem('producto');
        window.location.href = 'Dashboard.html';
    }

}