import { MiServidor } from "../MiServidor.js";
import { Articulos } from "../Articulos.js";
import { Categorias } from "../Categorias.js";

import {
  imprimir,
  mostrarTodosArticulos,
  mostrarTodasLasCategorias,
  mostrarMenu,
  cerrarMenu,
} from "../utiles.js";

//----------------------variables de mi sitio-------------

const mostrarError = (error) => {
  console.log("Muestro errores");
};
const pMinimo = document.querySelector("#prMinimo");
const pMaximo = document.querySelector("#prMaximo");

//--------------------asigno eventos---------

pMinimo.addEventListener("keyup", buscaPrecio);
pMaximo.addEventListener("keyup", buscaPrecio);

//Listo en pantalla inicial las categorias

const listarCategorias = (data) => {
  console.log(data);
  const categorias = data.map(
    (c) => new Categorias(c.idCategoria, c.nombreCategoria, c.imagenCategoria)
  );
  imprimir("categorias", mostrarTodasLasCategorias(categorias));

  document.querySelectorAll(".categoriaScroll").forEach((cate) => {
    cate.addEventListener("click", (e) => {
      const nombreCategoria = cate.id;
      buscar(nombreCategoria);
      seleccionar(nombreCategoria);
    });
  });
};

//Listo en pantalla inicial los articulos

const listarArticulos = (data) => {
  //console.log(data);
  const articulo = data.map(
    (c) =>
      new Articulos(
        c.idArticulo,
        c.categoria,
        c.nombre,
        c.precio,
        c.novedad,
        c.descuento,
        c.porcentajeDto,
        c.descripcion,
        c.imagenPorDefecto
      )
  );
  imprimir("datosArticulos", mostrarTodosArticulos(articulo));
};

//--------------funcion buscar-----------------------------------
function buscar(id) {
  let precioMinimo = pMinimo.value;
  let precioMaximo = pMaximo.value;
  console.log("PrecioMinimo" + precioMinimo);
  console.log("PrecioMaximo " + precioMaximo);
  console.log("Categoria Activa: "+id)
  let filtroCategoria = id;
  MiServidor.obtenerListadoArticulos({
    filtroCategoria,precioMinimo,precioMaximo
  })
    .then(listarArticulos)
    .catch(mostrarError);
}

function seleccionar(id) {
  const nombre = "img" + id;
  const selecionados = document.querySelectorAll(".elementoActivo");
  if (selecionados.length > 0) {
    for (let x = 0; x < selecionados.length; x++) {
      selecionados[x].classList.remove("elementoActivo");
    }
  }
  const elemento = document.getElementById(nombre);
  elemento.classList.add("elementoActivo");
}

function buscaPrecio() { 
  let catActiva = categoriaActiva();
  buscar(catActiva)
}

function categoriaActiva(){
  const selecionados = document.querySelectorAll(".elementoActivo");
  let activa ="";
  if (selecionados.length > 0) {
    for (let x = 0; x < selecionados.length; x++) {
        activa =selecionados[x].id;
        activa =activa.substring(3)

    }
  }
  return activa
}

//-------------------------------------VALIDAR FORMULARIO AGREGAR ARTICULO--------------------------------------------

//------------------------------------Funciones al cargar el sitio----------------------------------------------------

MiServidor.obtenerListadoArticulos().then(listarArticulos).catch(mostrarError);
MiServidor.obtenerCategorias().then(listarCategorias).catch(mostrarError);
