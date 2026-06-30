/*==================================================
  LAS 99 FRASES
  SCRIPT.JS
  PARTE 1
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    console.log("LAS 99 FRASES iniciada correctamente");

    iniciarHeader();
    iniciarBotonSubir();
    iniciarToast();
    iniciarAnimaciones();

});

/*==================================================
HEADER
==================================================*/

function iniciarHeader(){

    const header = document.querySelector(".header");

    if(!header) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 60){

            header.classList.add("header-scroll");

        }else{

            header.classList.remove("header-scroll");

        }

    });

}

/*==================================================
BOTÓN VOLVER ARRIBA
==================================================*/

function iniciarBotonSubir(){

    const boton = document.createElement("button");

    boton.id = "btnSubir";

    boton.innerHTML = "↑";

    document.body.appendChild(boton);

    boton.style.position = "fixed";
    boton.style.bottom = "100px";
    boton.style.right = "25px";
    boton.style.width = "55px";
    boton.style.height = "55px";
    boton.style.borderRadius = "50%";
    boton.style.border = "none";
    boton.style.background = "#d4af37";
    boton.style.color = "#fff";
    boton.style.fontSize = "24px";
    boton.style.cursor = "pointer";
    boton.style.display = "none";
    boton.style.zIndex = "9999";

    window.addEventListener("scroll",()=>{

        if(window.scrollY>300){

            boton.style.display="block";

        }else{

            boton.style.display="none";

        }

    });

    boton.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/*==================================================
TOAST
==================================================*/

let toast;

function iniciarToast(){

    toast=document.createElement("div");

    toast.id="toast";

    toast.style.position="fixed";
    toast.style.top="100px";
    toast.style.left="50%";
    toast.style.transform="translateX(-50%)";
    toast.style.background="#111";
    toast.style.color="#fff";
    toast.style.padding="15px 30px";
    toast.style.borderRadius="12px";
    toast.style.opacity="0";
    toast.style.transition=".3s";
    toast.style.zIndex="99999";

    document.body.appendChild(toast);

}

function mostrarToast(texto){

    toast.innerHTML=texto;

    toast.style.opacity="1";

    clearTimeout(toast.timer);

    toast.timer=setTimeout(()=>{

        toast.style.opacity="0";

    },2200);

}

/*==================================================
ANIMACIONES
==================================================*/

function iniciarAnimaciones(){

    const elementos=document.querySelectorAll(

        ".card,.card-producto,.slide"

    );

    const observer=new IntersectionObserver((items)=>{

        items.forEach(item=>{

            if(item.isIntersecting){

                item.target.style.opacity="1";

                item.target.style.transform="translateY(0px)";

            }

        });

    });

    elementos.forEach(el=>{

        el.style.opacity="0";

        el.style.transform="translateY(40px)";

        el.style.transition=".7s";

        observer.observe(el);

    });

}

/*==================================================
UTILIDADES
==================================================*/

function $(selector){

    return document.querySelector(selector);

}

function $$(selector){

    return document.querySelectorAll(selector);

}
