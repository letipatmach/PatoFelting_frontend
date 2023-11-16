import { MiServidor } from "../MiServidor.js";
import { Articulos } from "../Articulos.js";


import {

  imprimir,
 mostrarTodosArticulos
} from "../utiles.js";

//----------------------variables de mi sitio-------------


// //------------------ asigno eventos-----------------------------




//Listo los artículos con novedades

const listarNovedades = (data) => {
  console.log(data);
  const articulo = data.map(
    (c) =>
      new Articulos (       
        c.nombre,
        c.imagenPorDefecto
       
      )
  );
  imprimir("novedades", mostrarTodosArticulos(articulo));

};



//-------------------------------------VALIDAR FORMULARIO AGREGAR ARTICULO--------------------------------------------

//------------------------------------Funciones al cargar el sitio----------------------------------------------------

MiServidor.obtenerNovedades().then(listarNovedades).catch(mostrarError);