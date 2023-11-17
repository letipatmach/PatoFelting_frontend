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
    idArticulo=Number,
    categoria="",
    nombre="",
    precio=Number,
    novedad="",
    descuento=0,
    porcentajeDto="",
    descripcion="",
    imagenPorDefecto=""
  ) {
    this.idArticulo=idArticulo
    this.categoria=categoria,
    this.nombre=nombre,
    this.precio=precio,
    this.novedad=novedad,
    this.descuento=descuento,
    this.porcentajeDto=porcentajeDto,
    this.descripcion=descripcion,
    this.imagenPorDefecto=imagenPorDefecto
  }

  mostrarListadoArticulos() {
    return `
    <tr>
    <td>${this.idArticulo}</td>
    <td>${this.nombre}</td>
    <td>${this.precio}</td>
    <td><img src="${this.imagenPorDefecto}" alt="${this.nombre}"></td>
    <td>xxxxx</td>
    </tr>
      `;
  }
  mostrarNovedades() {
    
    return `
    <article>   
    <img src="${this.imagenPorDefecto}" alt="${this.nombre}" title="${this.nombre}" />
      <h2>${this.nombre}</h2>    
     
      
    </article>`;
  }
}
