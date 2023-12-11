import { MiServidor } from "../MiServidor.js";
import { Articulos } from "../Articulos.js";
import {
    imprimir,
    mostrarDetalleA
   
   } from "../utiles.js";

//----------------------variables de mi sitio-------------

const mostrarError = (error) => {
    console.log("Muestro errores");
  };



let parametros = window.location.search;
let idRecibido = new URLSearchParams(parametros).get("id");
idRecibido = Number(idRecibido);
console.log("Viendo el id"+idRecibido)



//muestro detalle de un articulo en particular
const listarDetalle = (data) => {
  console.log("La Data"+data.length)
  console.log("idArticulo"+data.precio)
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
  imprimir("detalle", mostrarDetalleA(deta));

  document.querySelectorAll(".btnCerrarDetalle").forEach((item) => {
    item.addEventListener("click", (e) => {
      cerrarDetalle();
    });
  });
};

if(idRecibido>0){
  let idBuscar = idRecibido;
  console.log("Ejecuantado")
  //MiServidor.obtenerDetalleArticulo(idBuscar).then(listarDetalle).catch(mostrarError);
  MiServidor.obtenerDetalleArticulo(idBuscar)
  .then((data) => {
    console.log("Datos del servidor:", data);
    listarDetalle(data);
  })
  .catch(mostrarError);
}else{
  console.log("No existe el id")
}
