var { Producto_Inv } = require("./Producto_Inv")
var { Categoria, MetodosDePago } = require("./types")

function Compra(
  metodoPago,
  productos,
  idProveedor
) {
  var _id = Math.floor(Math.random() * 1000000);
  var _metodoPago = metodoPago;
  var _fecha = new Date();
  var _productos = productos;
  var _idProveedor = idProveedor;

  this.devolverID = function() { return _id }

  this.devolverMetodoPago = function() { return _metodoPago }
  
  this.devolverFecha = function() { return _fecha }

  this.devolverProductos = function() { return _productos }

  this.devolverIDProveedor = function() { return _idProveedor }

  this.calcularTotal = function() {
    function addToTotal(accumulator, currentValue) {
      return accumulator + currentValue.devolverPrecio() * currentValue.devolverCantidad()
    }

    var total = _productos.reduce(addToTotal, 0)
    if(_metodoPago === "efectivo") total *= 0.90

    return total
  }
}

function imprimirDatos(compra, timing) {
  console.log(timing + " de los cambios\n")
  console.log("ID:", compra.devolverID())
  console.log("MetodoPago:", compra.devolverMetodoPago())
  console.log("Fecha:", compra.devolverFecha())
  console.log("Productos:", compra.devolverProductos())
  console.log("IDProveedor:", compra.devolverIDProveedor())
  console.log("\n")
}

var nuevoProdInv = new Producto_Inv("Coca Cola", "The Coca Cola Company", Categoria.GASEOSAS, "500ml", 250, 50)
var nuevaCompra = new Compra(MetodosDePago.EFECTIVO, [nuevoProdInv], 1)

imprimirDatos(nuevaCompra)

console.log("Total de la compra", nuevaCompra.calcularTotal())

module.exports = { Compra }
