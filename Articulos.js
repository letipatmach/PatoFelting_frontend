export class Articulos {
  idArticulo;
  nombre;
  precio;
  imagenPorDefecto;

  constructor(idArticulo = number, nombre = "", precio = number,imagenPorDefecto="") {
    this.idArticulo = idArticulo;
    this.nombre = nombre;
    this.precio = precio;
    this.imagenPorDefecto=imagenPorDefecto;
  }

  mostrarListadoArticulos() {
    return `
    <tr>
    <td>${this.idArticulo}</td>
    <td>${this.nombre}</td>
    <td>${this.precio}</td>
    <td><img src="${this.imagenPorDefecto}" alt="${this.imagenPorDefecto}"></td>
    <td>xxxxx</td>
    </tr>
      `;
  }
}
