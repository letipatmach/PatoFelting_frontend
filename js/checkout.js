import { MiServidor } from "../MiServidor.js";
import { Articulos } from "../Articulos.js";
import { Carritos } from "../Carritos.js";
import { Imagenes } from "../Imagenes.js";
import {
  imprimir,
  mostrarListadoCarrito,
  mostrarTodasLasSugerencias,
} from "../utiles.js";

const mostrarError = (error) => {
  console.log("Muestro errores");
};

const dirEnvio = document.getElementById("btnDireccion");
let mjsdir = document.getElementById("mensajeDireccion");
const dpto = document.getElementById("btnDepartamento");
let mjsdpto = document.getElementById("mensajeDepartamento");
const ciudad = document.getElementById("btnCiudad");
let mjsCiudad = document.getElementById("mensajeCiudad");
const celular = document.getElementById("btnCelular");
let mjsCelular = document.getElementById("mensajeCelular");
const retira = document.getElementById("retira");
const envio = document.getElementById("envia");

const btnProcecarCompra = document.getElementById("btnProcesar");
//---- Asigno Eventos
dirEnvio.addEventListener("blur", validadFormulario);
dpto.addEventListener("blur", validadFormulario);
ciudad.addEventListener("blur", validadFormulario);
celular.addEventListener("blur", validadFormulario);
btnProcecarCompra.addEventListener("click", procesar);
retira.addEventListener("click", fnretira);
envio.addEventListener("click", fnenvio);
/*
  const listarCarritocheck = (data) => {
    console.log("Carrssito:"+data);
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
    
   
    imprimir("artCarritoChek", mostrarListadoCarritoCheck(carrito));
      
          
  };
 */

/*
  function cargarArtCarrito(){
    let codigoVta  = sessionStorage.getItem("codigoVenta") ;
    console.log("Codigo Venta"+codigoVta)
    

    MiServidor.obtenerDetalleCarritoChek(codigoVta)
      .then(listarCarritocheck)
      .catch(mostrarError);
  }
  
*/

function llenarTotales() {
  let subTotal = sessionStorage.getItem("subTotal");
  let retira = sessionStorage.getItem("retira");
  let envio = 200;
  if (retira > 0) {
    envio = 0;
  }
  let total = parseInt(subTotal) + envio;
  let usuario = sessionStorage.getItem("nombreUser");
  console.log("Usaurio" + usuario);
  document.getElementById("subTotalCarrito").textContent = subTotal;
  document.getElementById("prenvio").textContent = envio;
  document.getElementById("totalCarrito").textContent = total;

  document.getElementById("btnEmail").value = usuario;
}

function validadFormulario() {
  let valido = 0;
  if (dirEnvio.value == "") {
    mjsdir.classList.add("mostrarError");
    mjsdir.textContent = "Debe Ingresar Una Direccion";
  } else {
    mjsdir.classList.remove("mostrarError");
    mjsdir.textContent = "";
    if (dpto.value == "") {
      mjsdpto.classList.add("mostrarError");
      mjsdpto.textContent = "Debe Ingresar Departamento";
    } else {
      mjsdpto.classList.remove("mostrarError");
      mjsdpto.textContent = "";
      if (ciudad.value == "") {
        mjsCiudad.classList.add("mostrarError");
        mjsCiudad.textContent = "Debe Ingresar Una Ciudad";
      } else {
        mjsCiudad.classList.remove("mostrarError");
        mjsCiudad.textContent = "";
        if (celular.value == "") {
          mjsCelular.classList.add("mostrarError");
          mjsCelular.textContent = "Debe Ingresar un Celular";
        } else {
          mjsCelular.classList.remove("mostrarError");
          mjsCelular.textContent = "";
          valido = 1;
        }
      }
    }
  }
  return valido;
}

function fnretira() {
  console.log("Retira");
  sessionStorage.setItem("retira", 1);
  llenarTotales();
}

function fnenvio() {
  console.log("Envio");
  sessionStorage.setItem("retira", 0);
  llenarTotales();
}

function procesar() {
  if (validadFormulario() == 1) {
    console.log("Procesar");
    let codigoVta = sessionStorage.getItem("codigoVenta");
    let usuario = document.getElementById("btnEmail").value;
    let direccion = dirEnvio.value;
    let departamento = dpto.value;
    let Fciudad = ciudad.value;
    let Fcelular = celular.value;
    let montoTotal = document.getElementById("totalCarrito").textContent;

    MiServidor.cargarCheck(
      codigoVta,
      usuario,
      direccion,
      departamento,
      Fciudad,
      Fcelular,
      montoTotal
    )
      .then(() => {
        limpiar();
      })
      .catch((error) => {
        limpiar();
      });
  }
}

function limpiar() {
  localStorage.clear();
  document.location.replace("index.html");
}

//cargarArtCarrito();
llenarTotales();
