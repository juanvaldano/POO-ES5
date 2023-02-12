var { Categoria } = require("./types")

function Producto(nombre, marca, categoria, presentacion, precio, id = Math.floor(Math.random() * 1000000)) {
  var _id = id;
  var _nombre = nombre;
  var _marca = marca;
  var _categoria = categoria;
  var _presentacion = presentacion;
  var _precio = precio;

  this.devolverID = function() { return _id }
  this.establecerID = function( id ) { _id = id } //To Debug

  this.devolverNombre = function() { return _nombre }
  this.establecerNombre = function( nombre ) { _nombre = nombre }

  this.devolverMarca = function() { return _marca }
  this.establecerMarca = function( marca ) { _marca = marca }

  this.devolverCategoria = function() { return _categoria }
  this.establecerCategoria = function( categoria ) { _categoria = categoria }

  this.devolverPresentacion = function() { return _presentacion }
  this.establecerPresentacion = function( presentacion ) { _presentacion = presentacion }

  this.devolverPrecio = function() { return _precio }
  this.establecerPrecio = function( precio ) { _precio = precio }

}

function imprimirDatos(prod, timing) {
  console.log(timing + " de los cambios\n")
  console.log("ID:", prod.devolverID())
  console.log("Nombre:", prod.devolverNombre())
  console.log("Marca:", prod.devolverMarca())
  console.log("Categoria:", prod.devolverCategoria())
  console.log("Presentacion:", prod.devolverPresentacion())
  console.log("Precio:", prod.devolverPrecio())
  console.log("\n")
}

var nuevoProducto = new Producto("Coca Cola", "The Coca Cola Company", Categoria.GASEOSAS, "500ml", 250);

imprimirDatos(nuevoProducto, "Producto - Antes")

nuevoProducto.establecerNombre("Lays")
nuevoProducto.establecerMarca("Pepsi co.")
nuevoProducto.establecerCategoria(Categoria.COMESTIBLES)
nuevoProducto.establecerPresentacion("250g")
nuevoProducto.establecerPrecio(125)

imprimirDatos(nuevoProducto, "Producto - Después")

module.exports = { Producto }
