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
const btnProcesar = document.getElementById("procesarCompra")
btnProcesar.addEventListener("click",procesarCompra)
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
    console.log("Carrssito:"+data);
    obtenerTotal(data)
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
    document.querySelectorAll(".btnEliminarCar").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idborrar = btn.id;
        eliminarDeCarrito(idborrar);
         
      });
    });      
          
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


  function obtenerTotal(data){
    console.log("Carrito:", data);

    // Obtener solo el campo 'total' de cada objeto
    const totales = data.map(c => c.total);
    
    console.log("Totales:", totales);
    
    // Utilizar reduce para sumar los totales
    const sumaSubTotales = totales.reduce((acumulador, valor) => acumulador + valor, 0);
    const envio =200;
    const total = sumaSubTotales+envio;
    console.log("Suma de totales:", sumaSubTotales);
    document.getElementById("subTotalCarrito").textContent =sumaSubTotales;
    document.getElementById("totalCarrito").textContent =total;
    sessionStorage.setItem("subTotal",sumaSubTotales)
  }



  function eliminarDeCarrito(idborrar){
    console.log("Eliminando El Carrito"+idborrar)
    MiServidor.eliminarArtCarrito(idborrar)
    .then(() => {
       cargarDetalle();
    })
    .catch(mostrarError); 
  }

  function procesarCompra(){
     let cantCarrito = sessionStorage.getItem("cant")
     if(cantCarrito>0){
      console.log("Proceso Compra")
      document.location.replace("checkout.html");
     }else{
      console.log("No Tiene Articulos Compra")
     }
  }





  cargarDetalle();
