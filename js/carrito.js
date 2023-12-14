import { MiServidor } from "../MiServidor.js";
import { Articulos } from "../Articulos.js";
import { Carritos } from "../Carritos.js";
import { Imagenes } from "../Imagenes.js";
import {
  imprimir,
  mostrarListadoCarrito,
  mostrarTodasLasSugerencias
} from "../utiles.js";


const mostrarError = (error) => {
    console.log("Muestro errores");
  };
//muestro listado de venta cruzada--Sugerencias

const listarSugenencias = (data) => {
    console.log(data);
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
    imprimir("articulosVtaDetalle", mostrarTodasLasSugerencias(articulo));
  };

  const listarCarrito = (data) => {
    console.log(data);
    const carrito = data.map(
      (c) =>
        new Carritos(
          c.idCarrito ,
          c.codigoVta ,
          c.usuario   ,
          c.idArticulo,
          c.cantidad  ,
          c.precio    ,
          c.total     ,
          c.rutaImagen,
          c.nombre    ,
          c.altura    
        )
    );
    imprimir("artCarrito", mostrarListadoCarrito(carrito));
  };



  MiServidor.obtenerSugerencias()
  .then((data) => {
    listarSugenencias(data);
  })
  .catch(mostrarError);


  function guardarEnCarrito(){
    console.log("Mostraar Carrito");
  }


  function cargarDetalle(){
    console.log("Cargadndo Detalle");
    cargarArtCarrito();
  }

  function cargarArtCarrito(){
    let codigoVta  = sessionStorage.getItem("codigoVenta") ;
    console.log("Codigo Venta"+codigoVta)
    

    MiServidor.obtenerDetalleCarrito(codigoVta)
      .then(listarCarrito)
      .catch(mostrarError);
  }

  cargarDetalle();
