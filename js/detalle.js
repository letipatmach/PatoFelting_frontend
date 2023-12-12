import { MiServidor } from "../MiServidor.js";
import { Articulos } from "../Articulos.js";
import { Imagenes } from "../Imagenes.js";
import {
    imprimir,
    mostrarDetalleA,
    mostrarDetalleI,
    mostrarImgPrincipal
   
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
  console.log("La Data Articulo"+data.length)
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

  
};


//muestro Imagen Princial en Detalle de Articulo
const listarImagenPrincipal = (data) => {
  console.log("La Data Articulo"+data.length)
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
  imprimir("imgPrincipal", mostrarImgPrincipal(deta));

  
};

// Muestro Imagenes en Minuatura Detalle Articulo 
const listarImagenes = (data) => {
  console.log(data);
  const imagenes = data.map(
    (c) =>
      new Imagenes(
        c.idImagen,
        c.idArticulo,
        c.rutaImagen
      )
  );
  imprimir("imgMiniaturas", mostrarDetalleI(imagenes));

  document.querySelectorAll(".imgMin").forEach((imgMin) => {
    imgMin.addEventListener("click", (e) => {
      const idImg = imgMin.id;
      const ruta = imgMin.getAttribute("src");
      mostrarEnPrincipal(idImg,ruta);
      
    });
  });     
};



if(idRecibido>0){
  let idBuscar = idRecibido;
  console.log("Ejecuantado")
  //MiServidor.obtenerDetalleArticulo(idBuscar).then(listarDetalle).catch(mostrarError);
  MiServidor.obtenerDetalleArticulo(idBuscar)
  .then((data) => {
    listarDetalle(data);
  })
  .catch(mostrarError);

  MiServidor.obtenerImagenes(idBuscar)
  .then((data) => {
    listarImagenes(data);
  })
  .catch(mostrarError);
 
  MiServidor.obtenerDetalleArticulo(idBuscar)
  .then((data) => {
    listarImagenPrincipal(data);
  })
  .catch(mostrarError);




}else{
  console.log("No existe el id")
}


//---- Pasar de Miniatura a Principal

function mostrarEnPrincipal(idImg,ruta){
  console.log("Debo mostrar la img "+idImg+" Con la Ruta "+ruta);
  const imgPrincipal = document.querySelector("#imgPrincipal");
  imgPrincipal.innerHTML = `<img src="${ruta}">`;
  

}