/*==================================================
LAS 99 FRASES
SCRIPT.JS
VERSIÓN 2.0
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    iniciarHeader();
    iniciarMenu();
    iniciarCarrito();
    iniciarFavoritos();
    iniciarBuscador();
    iniciarSlider();
    iniciarScroll();
    iniciarAnimaciones();

});

/*==========================
HEADER
==========================*/

function iniciarHeader(){

    const header=document.querySelector(".header");

    window.addEventListener("scroll",()=>{

        if(window.scrollY>80){

            header.classList.add("header-scroll");

        }else{

            header.classList.remove("header-scroll");

        }

    });

}

/*==========================
MENU
==========================*/

function iniciarMenu(){

    const boton=document.querySelector(".menu-icon");

    const menu=document.querySelector(".menu");

    if(!boton||!menu)return;

    boton.addEventListener("click",()=>{

        menu.classList.toggle("menu-activo");

    });

}

/*==========================
CARRITO
==========================*/

let carrito=JSON.parse(localStorage.getItem("carrito"))||[];

function iniciarCarrito(){

    actualizarCarrito();

    document.querySelectorAll(".agregar-carrito").forEach(btn=>{

        btn.addEventListener("click",()=>{

            const card=btn.closest(".producto");

            const nombre=card.querySelector("h3").innerText;

            const precio=card.querySelector("p").innerText;

            carrito.push({

                nombre,

                precio

            });

            guardarCarrito();

            actualizarCarrito();

            toast("Producto agregado");

        });

    });

}

function guardarCarrito(){

    localStorage.setItem(

        "carrito",

        JSON.stringify(carrito)

    );

}

function actualizarCarrito(){

    const contador=document.getElementById("contador-carrito");

    if(contador){

        contador.innerText=carrito.length;

    }

}

/*==========================
FAVORITOS
==========================*/

let favoritos=JSON.parse(localStorage.getItem("favoritos"))||[];

function iniciarFavoritos(){

    const corazon=document.querySelector(".fa-heart");

    if(!corazon)return;

    corazon.addEventListener("click",()=>{

        toast("Favoritos");

    });

}

/*==========================
BUSCADOR
==========================*/

function iniciarBuscador(){

    const lupa=document.querySelector(".fa-magnifying-glass");

    if(!lupa)return;

    lupa.addEventListener("click",()=>{

        let texto=prompt("Buscar producto");

        if(texto){

            toast("Buscando: "+texto);

        }

    });

}

/*==========================
SLIDER
==========================*/

function iniciarSlider(){

    const puntos=document.querySelectorAll(".hero-slider span");

    if(!puntos.length)return;

    let actual=0;

    setInterval(()=>{

        puntos[actual].classList.remove("active");

        actual++;

        if(actual>=puntos.length){

            actual=0;

        }

        puntos[actual].classList.add("active");

    },3500);

}

/*==========================
SCROLL
==========================*/

function iniciarScroll(){

    const boton=document.createElement("button");

    boton.innerHTML="↑";

    boton.id="subir";

    document.body.appendChild(boton);

    boton.onclick=()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    };

    window.addEventListener("scroll",()=>{

        if(window.scrollY>400){

            boton.style.opacity="1";

        }else{

            boton.style.opacity="0";

        }

    });

}

/*==========================
ANIMACIONES
==========================*/

function iniciarAnimaciones(){

    const elementos=document.querySelectorAll(

        ".producto,.categoria-card"

    );

    const observer=new IntersectionObserver((items)=>{

        items.forEach(item=>{

            if(item.isIntersecting){

                item.target.classList.add("mostrar");

            }

        });

    });

    elementos.forEach(el=>{

        observer.observe(el);

    });

}

/*==========================
TOAST
==========================*/

function toast(texto){

    const aviso=document.createElement("div");

    aviso.className="toast";

    aviso.innerHTML=texto;

    document.body.appendChild(aviso);

    setTimeout(()=>{

        aviso.classList.add("toast-show");

    },100);

    setTimeout(()=>{

        aviso.remove();

    },2500);

}/*==================================================
PARTE 2
CARRITO LATERAL + FAVORITOS + FILTRO + UTILIDADES
==================================================*/

/*==========================
CARRITO LATERAL
==========================*/

const panelCarrito = document.createElement("div");
panelCarrito.className = "panel-carrito";

panelCarrito.innerHTML = `
<div class="panel-header">
<h2>Mi Carrito</h2>
<button id="cerrarCarrito">✕</button>
</div>

<div id="listaCarrito"></div>

<div class="panel-footer">

<h3>Total: <span id="totalCarrito">$0</span></h3>

<button id="vaciarCarrito">
Vaciar carrito
</button>

<button id="comprarAhora">
Finalizar compra
</button>

</div>
`;

document.body.appendChild(panelCarrito);

const botonCarrito = document.querySelector(".carrito");

if (botonCarrito) {

    botonCarrito.addEventListener("click", (e) => {

        e.preventDefault();

        panelCarrito.classList.add("abierto");

        renderCarrito();

    });

}

document
.getElementById("cerrarCarrito")
.addEventListener("click",()=>{

panelCarrito.classList.remove("abierto");

});

/*==========================
RENDER CARRITO
==========================*/

function renderCarrito(){

const lista=document.getElementById("listaCarrito");

const total=document.getElementById("totalCarrito");

lista.innerHTML="";

let suma=0;

if(carrito.length===0){

lista.innerHTML="<p>Tu carrito está vacío.</p>";

total.innerHTML="$0";

return;

}

carrito.forEach((producto,index)=>{

let precio=parseFloat(

producto.precio
.replace("$","")
.replace(/\./g,"")
.replace(",",".")
);

if(isNaN(precio)) precio=0;

suma+=precio;

const item=document.createElement("div");

item.className="item-carrito";

item.innerHTML=`

<div>

<h4>${producto.nombre}</h4>

<p>${producto.precio}</p>

</div>

<button onclick="eliminarProducto(${index})">

🗑

</button>

`;

lista.appendChild(item);

});

total.innerHTML="$"+suma.toLocaleString();

}

/*==========================
ELIMINAR
==========================*/

window.eliminarProducto=function(indice){

carrito.splice(indice,1);

guardarCarrito();

actualizarCarrito();

renderCarrito();

toast("Producto eliminado");

}

/*==========================
VACIAR
==========================*/

document
.getElementById("vaciarCarrito")
.addEventListener("click",()=>{

carrito=[];

guardarCarrito();

actualizarCarrito();

renderCarrito();

toast("Carrito vacío");

});

/*==========================
COMPRAR
==========================*/

document
.getElementById("comprarAhora")
.addEventListener("click",()=>{

if(carrito.length===0){

toast("No hay productos");

return;

}

alert("Checkout próximamente.");

});

/*==========================
FAVORITOS
==========================*/

document.querySelectorAll(".producto").forEach(card=>{

const boton=document.createElement("button");

boton.className="favorito";

boton.innerHTML="♡";

card.appendChild(boton);

boton.addEventListener("click",()=>{

boton.classList.toggle("activo");

boton.innerHTML=
boton.classList.contains("activo")
?"♥":"♡";

});

});

/*==========================
BUSCADOR
==========================*/

function buscarProducto(texto){

const cards=document.querySelectorAll(".producto");

texto=texto.toLowerCase();

cards.forEach(card=>{

const nombre=card
.querySelector("h3")
.innerText
.toLowerCase();

if(nombre.includes(texto)){

card.style.display="block";

}else{

card.style.display="none";

}

});

}

/*==========================
LUPA
==========================*/

const botonBuscar=document.querySelector(".search-btn");

if(botonBuscar){

botonBuscar.addEventListener("click",()=>{

const texto=prompt("Buscar producto");

if(texto){

buscarProducto(texto);

}

});

}

/*==========================
UTILIDADES
==========================*/

window.addEventListener("load",()=>{

actualizarCarrito();

renderCarrito();

});
