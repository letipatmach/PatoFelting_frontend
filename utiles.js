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

// listado de novedades
export const mostrarTodasLasNovedades = (articulos = [new Articulos()]) => {
  console.log("mostrarNovedades-en utiles");
  let listado = "";
  articulos.forEach((c) => {
    listado += c.mostrarNovedades();
  });

  return listado;
};

// Listado de ofertas
export const mostrarTodasLasOfertas = (articulos = [new Articulos()]) => {
  console.log("mostrarOfertas-en utiles");
  let listado = "";
  articulos.forEach((c) => {
    listado += c.mostrarOfertas();
  });

  return listado;
};

// Listado de categorias
export const mostrarTodasLasCategorias = (categorias = [new Categorias()]) => {
  console.log("mostrarCategorias-en utiles");
  let listado = "";
  categorias.forEach((c) => {
    listado += c.mostrarListadoCategoria();
  });

  return listado;
};

//Listado de articulos
export const mostrarTodosArticulos = (articulos = [new Articulos()]) => {
  console.log("Esta llamando esta funcion?");
  let listado = "";
  articulos.forEach((c) => {
    listado += c.mostrarListadoArticulos();
  });

  return listado;
};
//Detalle de un articulo
export const mostrarDetalleArticulo = (detalle = new Articulos()) => {
  let mostrar = detalle.mostrarDetalleArticulo();
  return mostrar;
};













//Obtener nombre de usuario

// export const obtenerNombreApellidoUsu=()=>{
//   let nombreUsu=sessionStorage.getItem('nombreUser');
//   return nombreUsu

// }
