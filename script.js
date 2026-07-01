/*=========================================
LAS 99 FRASES
SCRIPT.JS
PARTE 1
=========================================*/

"use strict";

/*==============================
ELEMENTOS
==============================*/

const carritoBtn = document.querySelector(".cart-btn");
const carrito = document.querySelector(".cart-panel");
const cerrarCarrito = document.querySelector(".close-cart");
const overlay = document.querySelector(".cart-overlay");

const loader = document.getElementById("loader");

const btnTop = document.getElementById("btnTop");

const contador = document.getElementById("contador");

const toast = document.getElementById("toast");

const menuBtn = document.querySelector(".menu");

const menu = document.querySelector("nav");

/*==============================
LOCAL STORAGE
==============================*/

let carritoProductos =
JSON.parse(localStorage.getItem("carrito")) || [];

let favoritos =
JSON.parse(localStorage.getItem("favoritos")) || [];

/*==============================
GUARDAR
==============================*/

function guardarDatos(){

localStorage.setItem(
"carrito",
JSON.stringify(carritoProductos)
);

localStorage.setItem(
"favoritos",
JSON.stringify(favoritos)
);

}

/*==============================
CONTADOR
==============================*/

function actualizarContador(){

contador.textContent =
carritoProductos.length;

}

actualizarContador();

/*==============================
LOADER
==============================*/

window.addEventListener("load",()=>{

setTimeout(()=>{

loader.style.opacity="0";

loader.style.visibility="hidden";

},1800);

});

/*==============================
ABRIR CARRITO
==============================*/

carritoBtn.addEventListener("click",()=>{

carrito.classList.add("active");

overlay.classList.add("active");

});

/*==============================
CERRAR CARRITO
==============================*/

cerrarCarrito.addEventListener("click",cerrarPanel);

overlay.addEventListener("click",cerrarPanel);

function cerrarPanel(){

carrito.classList.remove("active");

overlay.classList.remove("active");

}

/*==============================
BOTÓN SUBIR
==============================*/

btnTop.style.display="none";

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

btnTop.style.display="flex";

}else{

btnTop.style.display="none";

}

});

btnTop.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

/*==============================
MENÚ RESPONSIVE
==============================*/

menuBtn.addEventListener("click",()=>{

menu.classList.toggle("active");

});

/*==============================
TOAST
==============================*/

function mostrarToast(texto){

toast.textContent = texto;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2500);

}
/*=========================================
LAS 99 FRASES
SCRIPT.JS
PARTE 2
PRODUCTOS + CARRITO + FAVORITOS
=========================================*/

/*==============================
PRODUCTOS
==============================*/

const productos = [

{
id:1,
nombre:"Remera Oversize",
precio:34999,
categoria:"Remeras"
},

{
id:2,
nombre:"Buzo Premium",
precio:59999,
categoria:"Buzos"
},

{
id:3,
nombre:"Campera Street",
precio:89999,
categoria:"Camperas"
},

{
id:4,
nombre:"Pantalón Cargo",
precio:64999,
categoria:"Pantalones"
},

{
id:5,
nombre:"Gorra Premium",
precio:25999,
categoria:"Accesorios"
},

{
id:6,
nombre:"Nike Air Max",
precio:189999,
categoria:"Importados"
},

{
id:7,
nombre:"Jordan Retro",
precio:319999,
categoria:"Importados"
},

{
id:8,
nombre:"Adidas Campus",
precio:159999,
categoria:"Importados"
}

];

/*==============================
AGREGAR AL CARRITO
==============================*/

function agregarAlCarrito(id){

const producto = productos.find(p=>p.id===id);

if(!producto) return;

carritoProductos.push(producto);

guardarDatos();

actualizarContador();

mostrarToast("Producto agregado al carrito");

}

/*==============================
QUITAR PRODUCTO
==============================*/

function quitarProducto(id){

carritoProductos = carritoProductos.filter(item=>item.id!==id);

guardarDatos();

actualizarContador();

mostrarToast("Producto eliminado");

}

/*==============================
FAVORITOS
==============================*/

function agregarFavorito(id){

if(favoritos.includes(id)){

favoritos = favoritos.filter(f=>f!==id);

mostrarToast("Quitado de favoritos");

}else{

favoritos.push(id);

mostrarToast("Agregado a favoritos");

}

guardarDatos();

}

/*==============================
TOTAL DEL CARRITO
==============================*/

function calcularTotal(){

let total = 0;

carritoProductos.forEach(producto=>{

total += producto.precio;

});

return total;

}

/*==============================
ACTUALIZAR TOTAL
==============================*/

function actualizarTotal(){

const totalSpan = document.querySelector(".cart-footer span");

if(totalSpan){

totalSpan.textContent =
"$" + calcularTotal().toLocaleString("es-AR");

}

}

actualizarTotal();
/*=========================================
LAS 99 FRASES
SCRIPT.JS
PARTE 3
RENDER + BUSCADOR + SCROLL
=========================================*/

/*==============================
RENDER PRODUCTOS
==============================*/

function crearTarjeta(producto){

return `

<div class="product-card reveal">

<div class="img-animation"></div>

<div class="etiqueta">NUEVO</div>

<div class="favorito"
onclick="agregarFavorito(${producto.id})">

<i class="fa-regular fa-heart"></i>

</div>

<div class="product-info">

<h3>${producto.nombre}</h3>

<p>${producto.categoria}</p>

<div class="precio">

$${producto.precio.toLocaleString("es-AR")}

</div>

<div class="talles">

<span>S</span>

<span>M</span>

<span>L</span>

<span>XL</span>

</div>

</div>

<div class="product-footer">

<button
class="btn-add"
onclick="agregarAlCarrito(${producto.id})">

Agregar

</button>

</div>

</div>

`;

}

/*==============================
MOSTRAR PRODUCTOS
==============================*/

const nuevos =
document.getElementById("nuevos-productos");

const vendidos =
document.getElementById("mas-vendidos");

if(nuevos){

nuevos.innerHTML =
productos
.map(crearTarjeta)
.join("");

}

if(vendidos){

vendidos.innerHTML =
productos
.slice()
.reverse()
.map(crearTarjeta)
.join("");

}

/*==============================
BUSCADOR
==============================*/

const inputBuscar =
document.getElementById("searchInput");

const resultados =
document.getElementById("searchResults");

if(inputBuscar){

inputBuscar.addEventListener("input",()=>{

const texto =
inputBuscar.value.toLowerCase();

const encontrados =
productos.filter(p=>

p.nombre.toLowerCase().includes(texto)

);

resultados.innerHTML =
encontrados
.map(crearTarjeta)
.join("");

});

}

/*==============================
ANIMACIÓN SCROLL
==============================*/

function revelar(){

const elementos =
document.querySelectorAll(".reveal");

const pantalla =
window.innerHeight;

elementos.forEach(el=>{

const posicion =
el.getBoundingClientRect().top;

if(posicion < pantalla-100){

el.classList.add("active");

}

});

}

window.addEventListener("scroll",revelar);

revelar();
/*=========================================
LAS 99 FRASES
SCRIPT.JS
PARTE 4
=========================================*/

/*==============================
CARRUSEL HERO
==============================*/

const hero = document.querySelector(".hero");

const fondos = [

"linear-gradient(135deg,#111,#1d1d1d,#000)",

"linear-gradient(135deg,#2b1b00,#111,#000)",

"linear-gradient(135deg,#000,#222,#111)"

];

let slide = 0;

setInterval(()=>{

slide++;

if(slide>=fondos.length){

slide=0;

}

hero.style.background=fondos[slide];

const dots=document.querySelectorAll(".hero-dots span");

dots.forEach(dot=>dot.classList.remove("active"));

if(dots[slide]){

dots[slide].classList.add("active");

}

},5000);

/*==============================
CONTADOR DROP
==============================*/

function iniciarContador(){

const numeros=document.querySelectorAll(".contador-drop h3");

if(numeros.length!==4) return;

let dias=2;
let horas=14;
let minutos=37;
let segundos=58;

setInterval(()=>{

segundos--;

if(segundos<0){

segundos=59;
minutos--;

}

if(minutos<0){

minutos=59;
horas--;

}

if(horas<0){

horas=23;
dias--;

}

if(dias<0){

dias=0;

}

numeros[0].textContent=String(dias).padStart(2,"0");
numeros[1].textContent=String(horas).padStart(2,"0");
numeros[2].textContent=String(minutos).padStart(2,"0");
numeros[3].textContent=String(segundos).padStart(2,"0");

},1000);

}

iniciarContador();

/*==============================
NEWSLETTER
==============================*/

const newsletter=document.querySelector(".newsletter form");

if(newsletter){

newsletter.addEventListener("submit",(e)=>{

e.preventDefault();

mostrarToast("¡Gracias por suscribirte!");

newsletter.reset();

});

}

/*==============================
AÑO AUTOMÁTICO
==============================*/

const copy=document.querySelector(".footer-copy");

if(copy){

copy.innerHTML=`© ${new Date().getFullYear()} LAS 99 FRASES · Todos los derechos reservados.`;

}

/*==============================
EFECTO BOTONES
==============================*/

document.querySelectorAll("button").forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="translateY(-3px)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="translateY(0)";

});

});

/*==============================
INICIALIZACIÓN
==============================*/

document.addEventListener("DOMContentLoaded",()=>{

actualizarContador();

actualizarTotal();

revelar();

console.log("LAS 99 FRASES cargada correctamente.");

});
