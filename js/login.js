import { MiServidor } from "../MiServidor.js";

//asigno variables
//--- Form Ingreso
const mailIngreso = document.querySelector("#btnEmailIng");
let mensajeEmailIng = document.querySelector("#mensajeEmailIng");
const contrasena = document.querySelector("#btnContraseniaIng");
let mensajeContrasenaIng = document.querySelector("#mensajeContrasenaIng");
const btnolvido = document.querySelector("#olvido");
const btnIngresar = document.querySelector("#btnIngresar");
let mensajePass = document.querySelector("#mensajePass");

//--- Fomr Registro
const nombre = document.querySelector("#btnNombre");
let mensajeNombre = document.querySelector("#mensajeNombre");
const apellido = document.querySelector("#btnApellido");
let mensajeApellido = document.querySelector("#mensajeApellido");
const emailReg = document.querySelector("#btnEmailReg");
let mensajeEmailReg = document.querySelector("#mensajeEmailReg");
const contrasenaReg = document.querySelector("#btnContraseniaReg");
let mensajeContrasenaReg = document.querySelector("#mensajeContrasenaReg");
const repetirContrasena = document.querySelector("#btnReCon");
let mensajeReContrasena = document.querySelector("#mensajeReContrasenaReg");
const btnRegistrarse = document.querySelector("#btnRegistrarse");
const confirmacionGuardado = document.querySelector("#guardado");

// asigno eventos

btnIngresar.addEventListener("click", ingresar);
mailIngreso.addEventListener("blur", validarIngreso);
contrasena.addEventListener("blur", validarIngreso);

btnRegistrarse.addEventListener("click", registrar);
nombre.addEventListener("blur", validar);
apellido.addEventListener("blur", validar);
emailReg.addEventListener("blur", validar);
contrasenaReg.addEventListener("blur", validar);
repetirContrasena.addEventListener("blur", validar);

confirmacionGuardado.addEventListener("click", cerrarConfirmacion);

//ingreso al sistema

function validarIngreso() {
  let valido = 0;
  //limpiarErrores();
  const contrasenia = contrasena.value;
 

  //validar formulario ingreso

  if (validarMail(mailIngreso, mensajeEmailIng) == 0) {
  } else {
    if (contrasenia == "") {
      mensajeContrasenaIng.classList.add("mostrarError");
      mensajeContrasenaIng.textContent = "Debe ingresar su contraseña";
    } else {
      mensajeContrasenaIng.classList.remove("mostrarError");
      mensajeContrasenaIng.classList.add("ocultarError");
      valido = 1;
    }
  }
  return valido;
}

function ingresar() {
  if(validarIngreso()==1){
    const email=mailIngreso.value
    const contrasenia = contrasena.value;
  MiServidor.ingresousu(email, contrasenia)
    .then(() => {
      sessionStorage.setItem("sesionActiva", "TRUE");
      nombreApellidoUsu(email);
      if (sessionStorage.getItem("agregando") === "TRUE") {
        guardarCarrito();
        document.location.replace("carrito.html");
    
      } else {

        document.location.replace("index.html");

      }
    })
    .catch((error) => {
      console.log("Usuario y Contraseña incorrecta")
      mensajeContrasenaIng.textContent = "Usuario o Contraseña incorrectos";
      mensajeContrasenaIng.classList.add("mostrarError");
    });
  }
}

function nombreApellidoUsu(email) {
  sessionStorage.setItem("nombreUser", email);
}

function validar() {
  // valida formulario resgistro
  let valido = 0;

  if (nombre.value == "") {
    mensajeNombre.classList.add("mostrarError");
    mensajeNombre.textContent = "Debe ingresar su Nombre";
  } else {
    mensajeNombre.classList.remove("mostrarError");
    if (apellido.value == "") {
      mensajeApellido.classList.add("mostrarError");
      mensajeApellido.textContent = "Debe ingresar su Apellido";
    } else {
      mensajeApellido.classList.remove("mostrarError");
      if (validarMail(emailReg, mensajeEmailReg) == 0) {
        // mensajeEmailReg.classList.add("mostrarError")
        // mensajeEmailReg.textContent="Debe Ingresar un e-mail para registrarse"
      } else {
        mensajeEmailReg.classList.remove("mostrarError");
        if (contrasenaReg.value == "") {
          mensajeContrasenaReg.classList.add("mostrarError");
          mensajeContrasenaReg.textContent = "Debe Ingresar contraseña";
        } else {
          mensajeContrasenaReg.classList.remove("mostrarError");
          if (
            repetirContrasena.value === "" ||
            contrasenaReg.value != repetirContrasena.value
          ) {
            mensajeReContrasena.classList.add("mostrarError");
            mensajeReContrasena.textContent = "La contraseña no coincide";
          } else {
            mensajeReContrasena.classList.remove("mostrarError");
            valido = 1;
          }
        }
      }
    }
  }
  return valido;
}

function validarMail(mail, mensaje) {
  let validoMail = 0;
  const mailIng = mail.value;
  const posicionArroba = mailIng.indexOf("@");
  const posicionPunto = mailIng.lastIndexOf(".");

  mensaje.textContent = "";

  if (mailIng.length == 0) {
    mensaje.textContent = "Ingrese un mail";
    mensaje.classList.add("mostrarError");
  } else if (posicionArroba == -1) {
    mensaje.textContent = "Debe contener el simbolo @";
    mensaje.classList.add("mostrarError");
  } else if (posicionArroba != mailIng.lastIndexOf("@")) {
    mensaje.textContent = "No puede contener mas de una @";
    mensaje.classList.add("mostrarError");
  } else if (mailIng.charAt(posicionArroba + 1) == "") {
    mensaje.textContent = "Tiene que tener texto luego del @";
    mensaje.classList.add("mostrarError");
  } else if (posicionPunto == -1) {
    mensaje.textContent = "Tiene que haber un punto luego del @";
    mensaje.classList.add("mostrarError");
  } else if (posicionArroba > posicionPunto) {
    mensaje.textContent = "Luego del @ tiene que haber un punto";
    mensaje.classList.add("mostrarError");
  } else if (mailIng.charAt(posicionPunto + 1) == "") {
    mensaje.textContent = "Debe contener texto luego del punto";
    mensaje.classList.add("mostrarError");
  } else {
    validoMail = 1;
    mensaje.classList.remove("mostrarError");
  }
  return validoMail;
}

function registrar() {
  if (validar() == 1) {
    MiServidor.registrousu(
      nombre.value,
      apellido.value,
      emailReg.value,
      contrasenaReg.value,
      repetirContrasena.value
    )
      .then(() => {
        confirmacionGuardado.style.display = "grid";
      })
      .catch((error) => {});
  }
}

//cierro confirmacion de cartel se guardo articulo correctamente

function cerrarConfirmacion() {
  confirmacionGuardado.style.display = "none";
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