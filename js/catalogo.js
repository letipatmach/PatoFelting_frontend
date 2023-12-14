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
const pMinimo  =  document.querySelector("#prMinimo");
const pMaximo  =  document.querySelector("#prMaximo");
let tamano = document.querySelectorAll('input[type="radio"]');
const descuento =document.querySelector("#descuento");
const btnBorrarFiltros = document.querySelector("#btnBorrarFiltros");
 

//-----


//--------------------asigno eventos---------

pMinimo.addEventListener("keyup", buscaPrecio);
pMaximo.addEventListener("keyup", buscaPrecio);
tamano.forEach(function(tamano) {
  tamano.addEventListener('change', buscaPrecio);  
} )
descuento.addEventListener("change", buscaPrecio);
btnBorrarFiltros.addEventListener("click",limpiarFiltros);

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
  let tamanoActivo = document.querySelector('input[name="tamano"]:checked');
  let filtroTamano ="";
  if(tamanoActivo) {    
      filtroTamano = tamanoActivo.id;
  } else {
      filtroTamano ="";
  }

  let precioMinimo = pMinimo.value;
  let precioMaximo = pMaximo.value;
  let filtroCategoria = id;
  let filtroDescuento  =descuento.checked;

  console.log("PrecioMinimo" + precioMinimo);
  console.log("PrecioMaximo " + precioMaximo);
  console.log("Categoria Activa: "+id)   
  console.log("Tamaño seleccionado es "+filtroTamano)
  console.log("Con Descuento"+filtroDescuento)
 
  MiServidor.obtenerListadoArticulos({
    filtroCategoria,precioMinimo,precioMaximo,filtroTamano,filtroDescuento
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
  console.log("Buscando Precio");
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

  function limpiarFiltros(){
    location.reload();
  }

//-------------------------------------VALIDAR FORMULARIO AGREGAR ARTICULO--------------------------------------------

//------------------------------------Funciones al cargar el sitio----------------------------------------------------

MiServidor.obtenerListadoArticulos().then(listarArticulos).catch(mostrarError);
MiServidor.obtenerCategorias().then(listarCategorias).catch(mostrarError);
function cantElementoCarrito(){
  let cantCarrito = sessionStorage.getItem("cant");
  if(cantCarrito>0){
    document.getElementById("numeroCarrito").innerHTML =cantCarrito
  }
}

cantElementoCarrito()