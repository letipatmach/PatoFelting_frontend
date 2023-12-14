import { MiServidor } from "../MiServidor.js";
import { Articulos } from "../Articulos.js";
import { Imagenes } from "../Imagenes.js";
import {
  imprimir,
  mostrarDetalleA,
  mostrarDetalleI,
  mostrarImgPrincipal,
  mostrarTodasLasSugerencias,
  validarSesion,
} from "../utiles.js";

//----------------------variables de mi sitio-------------

const mostrarError = (error) => {
  console.log("Muestro errores");
};
let parametros = window.location.search;
let idRecibido = new URLSearchParams(parametros).get("id");
let ventaAbierta = document.querySelector("#prodcutoAgregado");
let verCarrito = document.querySelector("#verCarrito");
let continuarComprando = document.querySelector("#continuarComprando");

idRecibido = Number(idRecibido);

//----------- Asigno Eventos
verCarrito.addEventListener("click", fnverCarrito);
continuarComprando.addEventListener("click", fncontinuarComprando);

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

//muestro detalle de un articulo en particular
const listarDetalle = (data) => {
  console.log("La Data Articulo" + data.length);
  console.log("idArticulo" + data.precio);
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

  const personalizacion = document.getElementById("consultarPersonalizado").addEventListener("click",consulPersonalizacion) 
  
};

//muestro Imagen Princial en Detalle de Articulo
const listarImagenPrincipal = (data) => {
  console.log("La Data Articulo" + data.length);
  console.log("idArticulo" + data.precio);
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
    (c) => new Imagenes(c.idImagen, c.idArticulo, c.rutaImagen)
  );
  imprimir("imgMiniaturas", mostrarDetalleI(imagenes));

  document.querySelectorAll(".imgMin").forEach((imgMin) => {
    imgMin.addEventListener("click", (e) => {
      const idImg = imgMin.id;
      const ruta = imgMin.getAttribute("src");
      mostrarEnPrincipal(idImg, ruta);
    });
  });
  document
    .querySelector("#agregarCarrito")
    .addEventListener("click", agregarCarrito);
};

if (idRecibido > 0) {
  let idBuscar = idRecibido;
  
  console.log("Ejecuantado");
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
    .catch(mostrarError)
   
    
  MiServidor.obtenerSugerencias(idBuscar)
    .then((data) => {
      listarSugenencias(data);
    })
    .catch(mostrarError);
} else {
  console.log("No existe el id");
}

 

//---- Pasar de Miniatura a Principal

function mostrarEnPrincipal(idImg, ruta) {
  console.log("Debo mostrar la img " + idImg + " Con la Ruta " + ruta);
  const imgPrincipal = document.querySelector("#imgPrincipal");
  imgPrincipal.innerHTML = `<img src="${ruta}">`;
}

function agregarCarrito() {
  console.log("Agregar CArrito");
  sessionStorage.setItem("agregando", "TRUE");
  let cantCarrito = sessionStorage.getItem("cant");

  if (cantCarrito > 0) {
    cantCarrito = parseInt(cantCarrito) + 1;
    sessionStorage.setItem("cant", cantCarrito);
  } else {
    sessionStorage.setItem("cant", 1);
    cantCarrito = 1;
  }
  //---- Actualizo Canttidad
  document.getElementById("numeroCarrito").innerHTML = cantCarrito;
  //---- Genero Codigo de Venta
  const fechaHoraActual = new Date();
  const codigo = Math.floor(Math.random() * 10000) + 1;
  const codigoVenta =
    fechaHoraActual.getFullYear() +"" +
    fechaHoraActual.getMonth() +"" +
    fechaHoraActual.getDate() +"" +
    fechaHoraActual.getHours() +"" +
    codigo;
  //--- Verifico si existe venta Abierta en esta seccion sino abro una nueva venta
  if (sessionStorage.getItem("codigoVenta")) {
    console.log("Ya Existe una venta Abierta");
  } else {
    sessionStorage.setItem("codigoVenta", codigoVenta);
  }

  if (sessionStorage.getItem("sesionActiva") === "TRUE") {
    ventaAbierta.style.display = "grid";  
    let elemento = document.getElementById("prArticulo");
    let precio = elemento.getAttribute("data-precio");  
    let nombreArticulo = document.getElementById("nombreArtDet").textContent;
    let imagenArticulo = document.getElementById("idImagenArt").getAttribute("src");
    console.log(   "idArticulo" +idRecibido +"\nNombre" +nombreArticulo +  "\nImagen" + imagenArticulo    );


    localStorage.removeItem("cant");

    llenarCarrito(idRecibido, precio, nombreArticulo, imagenArticulo);
  } else {
    //-- Guardo Para cagar luego de Login
    let elemento = document.getElementById("prArticulo");
    let precio = elemento.getAttribute("data-precio"); 
    let nombreArticulo = document.getElementById("nombreArtDet").textContent; 
    let imagenArticulo = document.getElementById("idImagenArt").getAttribute("src");
    console.log(   "idArticulo" +idRecibido +"\nNombre" +nombreArticulo +  "\nImagen" + imagenArticulo    );
    sessionStorage.setItem("idArticulo", idRecibido);
    sessionStorage.setItem("precio", precio);
    sessionStorage.setItem("imgArt",imagenArticulo);
    sessionStorage.setItem("nombArt",nombreArticulo);
    
    validarSesion();
  }
}

function cantElementoCarrito() {
  let cantCarrito = sessionStorage.getItem("cant");
  if (cantCarrito > 0) {
    document.getElementById("numeroCarrito").innerHTML = cantCarrito;
  }
}

function llenarCarrito(idRecibido, precioEnv, nombreArticulo, imagenArticulo) {
    // let idCarrito: 	 sessionStorage.getItem("codigoVenta"),
    let codigoVta  = sessionStorage.getItem("codigoVenta") ;
    let usuario    = sessionStorage.getItem("nombreUser");
    let idArticulo = idRecibido;
    let cantidad   = 1;
    let precio     =precioEnv; 
    let total      = precio;
    let rutaImagen = imagenArticulo;
    let nombre     = nombreArticulo ;
    let altura     =     "ddd"
   
    MiServidor.cargarCarrito(
      codigoVta  ,
      usuario    ,
      idArticulo ,
      cantidad   ,
      precio     ,
      total      ,
      rutaImagen ,
      nombre     ,
      altura     
    )
      .then(() => {
        sessionStorage.setItem("carritocargado", "SI");
       
      })
      .catch((error) => {     
      });
}

function fnverCarrito() {
  document.location.replace("carrito.html");
}
function fncontinuarComprando() {
  document.location.replace("catalogo.html");
}

function consulPersonalizacion(){
  document.location.replace("personalizaciones.html");
}


function  guardarCarrito(){        
  // let idCarrito: 	 sessionStorage.getItem("codigoVenta"),
   let codigoVta  = sessionStorage.getItem("codigoVenta") ;
   let usuario    = sessionStorage.getItem("nombreUser");
   let idArticulo = sessionStorage.getItem("idArticulo");
   let cantidad   = sessionStorage.getItem("cant");
   let precio     = sessionStorage.getItem("precio"); 
   let total      = precio*cantidad;
   let rutaImagen = sessionStorage.getItem("imgArt");
   let nombre     = sessionStorage.getItem("nombArt") ;
   let altura     =     "ddd"
  
   MiServidor.cargarCarrito(
     codigoVta  ,
     usuario    ,
     idArticulo ,
     cantidad   ,
     precio     ,
     total      ,
     rutaImagen ,
     nombre     ,
     altura     
   )
     .then(() => {
       sessionStorage.setItem("carritocargado", "SI");
      
     })
     .catch((error) => {     
     });


}



cantElementoCarrito();
