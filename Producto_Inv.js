var { Producto } = require("./Producto")
var { Categoria } = require("./types")

function Producto_Inv(
  nombre,
  marca,
  categoria,
  presentacion,
  precio,
  cantidad,
  id = Math.floor(Math.random() * 1000000)
) {
  var _cantidad = cantidad;

  Producto.call(this, nombre, marca, categoria, presentacion, precio, id)

  this.devolverCantidad = function() { return _cantidad }
  this.establecerCantidad = function( cantidad ) { _cantidad = cantidad }
}

function imprimirDatos(pers, timing) {
  console.log(timing + " de los cambios\n")
  console.log("Cantidad:", pers.devolverCantidad())
  console.log("\n")
}

var nuevoProdInv = new Producto_Inv("Coca Cola", "The Coca Cola Company", Categoria.GASEOSAS, "500ml", 250, 100)

imprimirDatos(nuevoProdInv, "ProductoInv - Antes")

nuevoProdInv.establecerCantidad(200)

imprimirDatos(nuevoProdInv, "ProductoInv - Después")

module.exports = { Producto_Inv }
