// ===============================
// LAS 99 FRASES - SCRIPT.JS
// ===============================

let carrito = [];
let total = 0;


// Productos de ejemplo
const productos = [
    {
        id: 1,
        nombre: "Remera Oversize Negra",
        precio: 19990,
        categoria: "ropa",
        imagen: "img/remera1.jpg"
    },
    {
        id: 2,
        nombre: "Buzo Premium",
        precio: 34990,
        categoria: "ropa",
        imagen: "img/buzo1.jpg"
    },
    {
        id: 3,
        nombre: "Importado Exclusivo",
        precio: 49990,
        categoria: "importados",
        imagen: "img/importado1.jpg"
    }
];


// ===============================
// CARGAR PRODUCTOS
// ===============================

const contenedor = document.querySelector(".productos");

function mostrarProductos(lista = productos){

    if(!contenedor) return;

    contenedor.innerHTML = "";

    lista.forEach(producto => {

        contenedor.innerHTML += `

        <div class="card-producto">

            <img src="${producto.imagen}">

            <h3>${producto.nombre}</h3>

            <p>$${producto.precio}</p>

            <button onclick="agregarCarrito(${producto.id})">
                Comprar
            </button>

        </div>

        `;

    });

}


mostrarProductos();


// ===============================
// CARRITO
// ===============================

function agregarCarrito(id){

    let producto = productos.find(p => p.id === id);

    carrito.push(producto);

    total += producto.precio;

    actualizarCarrito();

    alert(producto.nombre + " agregado al carrito");

}



function actualizarCarrito(){

    const contador = document.querySelector("#contador");

    if(contador){
        contador.innerHTML = carrito.length;
    }


    const totalBox = document.querySelector("#total");

    if(totalBox){
        totalBox.innerHTML = "$" + total;
    }

}



// ===============================
// FILTROS
// ===============================

function filtrar(categoria){

    if(categoria === "todos"){
        mostrarProductos(productos);
        return;
    }


    let filtrados = productos.filter(
        p => p.categoria === categoria
    );


    mostrarProductos(filtrados);

}



// ===============================
// WHATSAPP
// ===============================

function comprarWhatsApp(){

    let mensaje = "Hola! Quiero comprar:%0A";


    carrito.forEach(producto=>{

        mensaje += 
        "- " + producto.nombre +
        " $" + producto.precio +
        "%0A";

    });


    mensaje += "%0ATotal: $" + total;


    window.open(
        "https://wa.me/5490000000000?text=" + mensaje,
        "_blank"
    );

}



// ===============================
// MENU MOBILE
// ===============================

const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav");


if(menu){

    menu.onclick = () => {

        nav.classList.toggle("active");

    };

}



// ===============================
// ANIMACIONES SCROLL
// ===============================

window.addEventListener("scroll",()=>{

    document.querySelectorAll(".card-producto")
    .forEach(card=>{

        let posicion =
        card.getBoundingClientRect().top;


        if(posicion < window.innerHeight - 100){

            card.classList.add("mostrar");

        }

    });

});
