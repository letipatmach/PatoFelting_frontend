import { MiServidor } from "../MiServidor.js";
import { Articulos } from "../Articulos.js";
import { Categorias } from "../Categorias.js";


import {
 imprimir,
 mostrarTodosArticulos,
 mostrarTodasLasCategorias
} from "../utiles.js";

//----------------------variables de mi sitio-------------

const mostrarError = (error) => {
  console.log("Muestro errores");
};
// //------------------ asigno eventos-----------------------------


//Listo en pantalla inicial las categorias

const listarCategorias= (data) => {
  console.log(data);
  const categorias = data.map(
    (c) =>
      new Categorias (
        c.idCategoria,
        c.nombreCategoria,
        c.imagenCategoria
       
      )
  );
  imprimir("categorias", mostrarTodasLasCategorias(categorias));

};


//Listo en pantalla inicial los articulos

const listarArticulos = (data) => {
  console.log(data);
  const articulo = data.map(
    (c) =>
      new Articulos (
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



//-------------------------------------VALIDAR FORMULARIO AGREGAR ARTICULO--------------------------------------------

//------------------------------------Funciones al cargar el sitio----------------------------------------------------

MiServidor.obtenerListadoArticulos().then(listarArticulos).catch(mostrarError);
MiServidor.obtenerCategorias().then(listarCategorias).catch(mostrarError);