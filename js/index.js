import { MiServidor } from "../MiServidor.js";
import { Articulos } from "../Articulos.js";


import {

  imprimir,
 mostrarTodosArticulos
} from "../utiles.js";

//----------------------variables de mi sitio-------------


// //------------------ asigno eventos-----------------------------




//Listo en pantalla inicial los articulos

const listarArticulos = (data) => {
  console.log(data);
  const articulo = data.map(
    (c) =>
      new Articulos (
        c.idArticulo,
        c.nombre,       
        c.precio
       
      )
  );
  imprimir("datosArticulos", mostrarTodosArticulos(articulo));

};



//-------------------------------------VALIDAR FORMULARIO AGREGAR ARTICULO--------------------------------------------

//------------------------------------Funciones al cargar el sitio----------------------------------------------------

MiServidor.obtenerListadoArticulos().then(listarArticulos).catch(mostrarError);