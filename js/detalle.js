import { MiServidor } from "../MiServidor.js";
import { Articulos } from "../Articulos.js";
import {
    imprimir,
    mostrarDetalleArticulo,
   } from "../utiles.js";

//----------------------variables de mi sitio-------------

const mostrarError = (error) => {
    console.log("Muestro errores");
  };



let parametros = window.location.search;
let idRecibido = new URLSearchParams(parametros).get("id");
idRecibido = Number(idRecibido);
console.log(idRecibido)

//muestro detalle de un articulo en particular

const listarDetalle = (data) => {
    const deta = new Articulos(

        data.idArticulo,
        data.categoria,
        data.nombre,
        data.precio,
        data.novedad,
        data.descuento,
        data.porcentajeDto,
        data.descripcion,
        data.imagenPorDefecto      
    );
    imprimir("detalle", mostrarDetalleArticulo(deta));
     
  };


  MiServidor.obtenerDetalleArticulo(idRecibido).then(listarDetalle).catch(mostrarError);