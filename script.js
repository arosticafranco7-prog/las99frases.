/*=========================================
LAS 99 FRASES
SCRIPT.JS
VERSIÓN 1.0
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================
      HEADER AL HACER SCROLL
    =========================*/

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.style.background = "#000";
            header.style.boxShadow = "0 10px 30px rgba(0,0,0,.30)";

        } else {

            header.style.background = "rgba(0,0,0,.95)";
            header.style.boxShadow = "none";

        }

    });

    /*=========================
      BOTÓN VOLVER ARRIBA
    =========================*/

    const volver = document.createElement("button");

    volver.innerHTML = "↑";

    volver.id = "volverArriba";

    document.body.appendChild(volver);

    volver.style.position = "fixed";
    volver.style.bottom = "100px";
    volver.style.right = "30px";
    volver.style.width = "55px";
    volver.style.height = "55px";
    volver.style.border = "none";
    volver.style.borderRadius = "50%";
    volver.style.background = "#d4a017";
    volver.style.color = "white";
    volver.style.fontSize = "24px";
    volver.style.cursor = "pointer";
    volver.style.display = "none";
    volver.style.zIndex = "9999";

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            volver.style.display = "block";

        } else {

            volver.style.display = "none";

        }

    });

    volver.onclick = () => {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    };

    /*=========================
      CARRITO
    =========================*/

    let cantidad = 0;

    const contador = document.querySelector(".carrito span");

    const botonesComprar = document.querySelectorAll(".btn-comprar");

    botonesComprar.forEach(boton=>{

        boton.addEventListener("click",(e)=>{

            e.preventDefault();

            cantidad++;

            contador.textContent = cantidad;

            mostrarMensaje("Producto agregado al carrito");

        });

    });

    /*=========================
      FAVORITOS
    =========================*/

    const favorito = document.querySelectorAll(".icono")[1];

    let activo = false;

    favorito.addEventListener("click",()=>{

        activo=!activo;

        favorito.textContent = activo ? "💛" : "❤";

    });

    /*=========================
      BUSCADOR
    =========================*/

    const buscar = document.querySelectorAll(".icono")[0];

    buscar.addEventListener("click",()=>{

        const texto = prompt("¿Qué estás buscando?");

        if(texto){

            mostrarMensaje("Buscando: " + texto);

        }

    });

    /*=========================
      MENSAJES
    =========================*/

    function mostrarMensaje(texto){

        const aviso=document.createElement("div");

        aviso.innerText=texto;

        aviso.style.position="fixed";

        aviso.style.left="50%";

        aviso.style.top="100px";

        aviso.style.transform="translateX(-50%)";

        aviso.style.background="#111";

        aviso.style.color="white";

        aviso.style.padding="15px 30px";

        aviso.style.borderRadius="10px";

        aviso.style.zIndex="99999";

        aviso.style.boxShadow="0 10px 25px rgba(0,0,0,.3)";

        document.body.appendChild(aviso);

        setTimeout(()=>{

            aviso.remove();

        },2000);

    }

    console.log("LAS 99 FRASES cargado correctamente");

});
