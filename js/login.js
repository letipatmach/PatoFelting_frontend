import { MiServidor } from "../MiServidor.js";

//asigno variables
const btnIngresar = document.querySelector("#btnIngresar");
let mensajeNombreUsu = document.querySelector("#mensajeNombreUsu");
let mensajePass = document.querySelector("#mensajePass");

let mensajeNombre = document.querySelector("#mensajeNombre");
let mensajeApellido = document.querySelector("#mensajeApellido");
let mensajeUsuario = document.querySelector("#mensajeUsuario");
let mensajeContrasenia = document.querySelector("#mensajeContrasenia");
let mensajeReContrasenia = document.querySelector("#mensajeReContrasenia");

const btnRegistrar = document.querySelector("#btnRegistrar");
const btnCancelar = document.querySelector("#btnCancelar");
const btnRegistrado = document.querySelector("#btnRegistrado");
const btnCerrarConf = document.querySelector("#cerrarConfGuardado");
const confirmacionGuardado = document.querySelector("#guardado");
const formularioResgistro = document.querySelector("#fondoRegistro");
// asigno eventos
btnIngresar.addEventListener("click", ingresarSistema);
btnRegistrar.addEventListener("click", ingresaAFormRegistro);
btnCancelar.addEventListener("click", cerrarFormRegistro);
btnCerrarConf.addEventListener("click", cerrarConfirmacion);

//ingreso al sistema
function ingresarSistema() {
  limpiarErrores();
  const email = document.querySelector("#nombreUsuario").value;
  const contrasenia = document.querySelector("#pass").value;

  MiServidor.ingresousu(email, contrasenia)
    .then(() => {
      sessionStorage.setItem("sesionActiva", "TRUE");
      nombreApellidoUsu(email);
      document.location.replace("index.html");
    })
    .catch((error) => {
      erroresLogin(error);
    });
}
function nombreApellidoUsu(email){
  sessionStorage.setItem("nombreUser", email);
}

//valido formulario de ingreso
function erroresLogin(error) {
  let numeroError = error.substring(0, 2);
  let mensajeError = error.substring(3);
  if ("01" == numeroError) {
    mensajeNombreUsu.textContent = mensajeError;
    mensajeNombreUsu.classList.add("error");
  }
  if ("02" == numeroError) {
    mensajePass.textContent = mensajeError;
    mensajePass.classList.add("error");
  }
  if ("03" == numeroError) {
    mensajePass.textContent = mensajeError;
    mensajePass.classList.add("error");
  }
}
//limpio formulario de ingreso y de registro usuario

function limpiarErrores() {
  mensajeNombreUsu.classList.remove("error");
  mensajePass.classList.remove("error");
  mensajeNombre.classList.remove("error");
  mensajeApellido.classList.remove("error");
  mensajeUsuario.classList.remove("error");
  mensajeContrasenia.classList.remove("error");
  mensajeReContrasenia.classList.remove("error");
  mensajeNombreUsu.textContent = "";
  mensajePass.textContent = "";
  mensajeNombre.textContent = "";
  mensajeApellido.textContent = "";
  mensajeUsuario.textContent = "";
  mensajeContrasenia.textContent = "";
  mensajeReContrasenia.textContent = "";
}
//limpio textos de formulario registro

function limpiarTextos() {
  document.querySelector("#nombre").value = "";
  document.querySelector("#apellido").value = "";
  document.querySelector("#usuario").value = "";
  document.querySelector("#nuevoPass").value = "";
  document.querySelector("#reContrasenia").value = "";
}

//abro y cierro formulario registro
function ingresaAFormRegistro() {
  fondoRegistro.style.display = "grid";
}
function cerrarFormRegistro() {
  fondoRegistro.style.display = "none";
  limpiarErrores();
  limpiarTextos();
}
//registro un nuevo usuario y muestro errores de formulario

const registroUsuario = () => {
  limpiarErrores();

  const nombre = document.querySelector("#nombre").value;
  const apellido = document.querySelector("#apellido").value;
  const email = document.querySelector("#usuario").value;
  const nuevoPass = document.querySelector("#nuevoPass").value;
  const repetirContrasenia = document.querySelector("#reContrasenia").value;

  MiServidor.registrousu(nombre, apellido, email, nuevoPass, repetirContrasenia)
    .then(() => {
      limpiarTextos();
      confirmacionGuardado.style.display = "grid";
    })
    .catch((error) => {
      erroresFormRegistro(error);
    });
};
//asigno evento a boton registrar dentro de formulario

btnRegistrado.addEventListener("click", registroUsuario);

function erroresFormRegistro(error) {
  let numeroError = error.substring(0, 2);
  let mensajeError = error.substring(3);
  if ("01" == numeroError) {
    mensajeNombre.textContent = mensajeError;
    mensajeNombre.classList.add("error");
  }
  if ("02" == numeroError) {
    mensajeApellido.textContent = mensajeError;
    mensajeApellido.classList.add("error");
  }
  if ("03" == numeroError) {
    mensajeUsuario.textContent = mensajeError;
    mensajeUsuario.classList.add("error");
  }
  if ("04" == numeroError) {
    mensajeContrasenia.textContent = mensajeError;
    mensajeContrasenia.classList.add("error");
  }
  if ("05" == numeroError) {
    mensajeReContrasenia.textContent = mensajeError;
    mensajeReContrasenia.classList.add("error");
  }
  if ("06" == numeroError) {
    mensajeUsuario.textContent = mensajeError;
    mensajeUsuario.classList.add("error");
  }
}
function cerrarConfirmacion() {
  confirmacionGuardado.style.display = "none";
  formularioResgistro.style.display = "none";
}
limpiarErrores();
