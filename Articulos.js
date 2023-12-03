export class Articulos {
  idArticulo;
  categoria;
  nombre;
  precio;
  novedad;
  descuento;
  porcentajeDto;
  descripcion;
  imagenPorDefecto;

  constructor(
    idArticulo = Number,
    categoria = "",
    nombre = "",
    precio = Number,
    novedad = "",
    descuento = 0,
    porcentajeDto = "",
    descripcion = "",
    imagenPorDefecto = ""
  ) {
    this.idArticulo = idArticulo;
    (this.categoria = categoria),
      (this.nombre = nombre),
      (this.precio = precio),
      (this.novedad = novedad),
      (this.descuento = descuento),
      (this.porcentajeDto = porcentajeDto),
      (this.descripcion = descripcion),
      (this.imagenPorDefecto = imagenPorDefecto);
  }

  mostrarListadoArticulos() {
    return `
    <article>
    <figure>
    <a href="detalle.html?id=${this.idArticulo}"><img src="${this.imagenPorDefecto}" alt="${this.nombre}" title="${this.nombre}" /></a>
      
    </figure>
    <h3>${this.nombre}</h3>
    <div>
      <p>Precio:${this.precio}</p>
      <div>    
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path  class="pruebaFill" d="M12 21.6516C11.69 21.6516 11.39 21.6116 11.14 21.5216C7.32 20.2116 1.25 15.5616 1.25 8.69156C1.25 5.19156 4.08 2.35156 
          7.56 2.35156C9.25 2.35156 10.83 3.01156 12 4.19156C13.17 3.01156 14.75 2.35156 16.44 2.35156C19.92 
          2.35156 22.75 5.20156 22.75 8.69156C22.75 15.5716 16.68 20.2116 12.86 21.5216C12.61 21.6116 12.31 21.6516 
          12 21.6516ZM7.56 3.85156C4.91 3.85156 2.75 6.02156 2.75 8.69156C2.75 15.5216 9.32 19.3216 11.63 20.1116C11.81 
          20.1716 12.2 20.1716 12.38 20.1116C14.68 19.3216 21.26 15.5316 21.26 8.69156C21.26 6.02156 19.1 3.85156 16.45 3.85156C14.93 3.85156 13.52 
          4.56156 12.61 5.79156C12.33 6.17156 11.69 6.17156 11.41 5.79156C10.48 4.55156 9.08 3.85156 7.56 3.85156Z" fill="#00A859">
          </path>
        </svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="pruebaStroke" d="M7.5 7.67001V6.70001C7.5 4.45001 9.31 2.24001 11.56 2.03001C14.24 1.77001 16.5 3.88001 16.5 6.51001V7.89001" stroke="#00A859" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
          <path class="pruebaStroke" d="M8.99999 22H15C19.02 22 19.74 20.39 19.95 18.43L20.7 12.43C20.97 9.99 20.27 8 16 8H7.99999C3.72999 8 3.02999 
          9.99 3.29999 12.43L4.04999 18.43C4.25999 20.39 4.97999 22 8.99999 22Z" stroke="#00A859" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
          <path class="pruebaStroke" d="M15.4955 12H15.5045" stroke="#00A859" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          <path class="pruebaStroke" d="M8.49451 12H8.50349" stroke="#00A859" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </div>
    </div>
  </article>
      `;
  }
  mostrarNovedades() {
    return `
    <article>   
      <img src="${this.imagenPorDefecto}" alt="${this.nombre}" title="${this.nombre}" />
      <h3>${this.nombre}</h3>    
     </article>`;
  }

  mostrarOfertas() {
    const pr = this.precio;
    const dto = this.porcentajeDto / 100;
    const precioFinal = pr - pr * dto;
    return `
    <article>
      <div>
        <figure>
          <img src="${this.imagenPorDefecto}" alt="${this.nombre}" title="${this.nombre}">
        </figure>
        <div>
          <h3>${this.nombre}</h3>
          <p>Precio:${precioFinal}</p>
        </div>
      </div>
     </article>
     `;
  }
  mostrarDetalleArticulo() {
    return `
    <div>
   
    <p>Categoría: ${this.categoria}</p>
    <p>Nombre: ${this.nombre}</p>
    <p>Precio Venta: $ ${this.precio}</p>
    <p>Humedad de Riego: ${this.humedad} %</p>
    <p>${this.tipoCaracteristica}: ${this.caracteristica}</p>
    <p>
      <input type="button" class="btnCerrarDetalle" value="Cerrar detalle" id="btnCerrarDetalle" />
    </p>
  </div>
  <div>
    <figure>
      <img src="${this.imagen}" alt="${this.nombre}" title="${this.nombre}" />
    </figure>
  </div>
      `;
  }
}
