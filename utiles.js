import { Articulos } from "./Articulos.js";
import { MiServidor } from "./MiServidor.js";


export const imprimir = (elemento, contenido) => {
  document.querySelector(`#${elemento}`).innerHTML = contenido;
};

// export const validarSesion = () => {
//   const sesionActiva = sessionStorage.getItem("sesionActiva") === "TRUE";
//   const estaEnLogin = document.location.pathname.includes("login.html");

//   if (!sesionActiva) {
//     if (!estaEnLogin) {
//       document.location.replace("login.html");
//     }
//   } else if (estaEnLogin) {
//     document.location.replace("index.html");
//   }
// };

// export const eventoClickCerrarSesion = () => {
//   document.querySelector("#btnCerrarSesion").addEventListener("click", (e) => {
//     sessionStorage.clear();
//     validarSesion();

//     MiServidor.salirusu().then(console.log).catch(console.log);
//   });
// };



export const mostrarTodosArticulos = (articulos = [new Articulos()]) => {
  console.log("Esta llamando esta funcion?")
  let listado = "";

  articulos.forEach((c) => {
    listado += c.mostrarListadoArticulos();
  });

  return listado;
};



//Obtener nombre de usuario

// export const obtenerNombreApellidoUsu=()=>{
//   let nombreUsu=sessionStorage.getItem('nombreUser'); 
//   return nombreUsu


// }