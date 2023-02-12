var { Producto_Inv } = require("./Producto_Inv")
var { Categoria, MetodosDePago } = require("./types")

function Venta(
  metodoPago = null,
) {
  var _id = Math.floor(Math.random() * 1000000);
  var _metodoPago = metodoPago;
  var _fecha = new Date();
  var _productos = [];

  this.devolverID = function() { return _id }

  this.devolverMetodoPago = function() { return _metodoPago }
  this.establecerMetodoPago = function( metodoPago ) { _metodoPago = metodoPago }
  
  this.devolverFecha = function() { return _fecha }

  this.devolverProductos = function() { return _productos }

  this.calcularTotal = function() {
    function addToTotal(accumulator, currentValue) {
      return accumulator + currentValue.devolverPrecio() * currentValue.devolverCantidad()
    }

    var total = _productos.reduce(addToTotal, 0)
    if(_metodoPago === "efectivo") total *= 0.85

    return total
  }

  this.agregarProducto = function(producto) {
    var productoEncontrado = _productos.find(function(prod) { return prod.devolverID() === producto.devolverID() })

    if(!productoEncontrado) {
      var nuevoProdInv = new Producto_Inv(
        producto.devolverNombre(),
        producto.devolverMarca(),
        producto.devolverCategoria(),
        producto.devolverPresentacion(),
        producto.devolverPrecio(),
        1,
        producto.devolverID()
      )
      _productos.push(nuevoProdInv)
    }
    else {
      productoEncontrado.establecerCantidad(productoEncontrado.devolverCantidad() + 1)
    }
  }

  this.eliminarProducto = function( prodId ) {
    _productos = _productos.filter(function(prod) { return prod.devolverID() !== prodId })
  }
}

function imprimirDatos(compra, timing) {
  console.log(timing + " de los cambios\n")
  console.log("ID:", compra.devolverID())
  console.log("MetodoPago:", compra.devolverMetodoPago())
  console.log("Fecha:", compra.devolverFecha())
  console.log("Productos:", compra.devolverProductos())
  console.log("\n")
}

var nuevoProdInv = new Producto_Inv("Coca Cola", "The Coca Cola Company", Categoria.GASEOSAS, "500ml", 300, 5, 1)
var nuevoProdInv2 = new Producto_Inv("Coca Cola", "The Coca Cola Company", Categoria.GASEOSAS, "500ml", 300, 5, 2)
var nuevaVenta = new Venta(MetodosDePago.EFECTIVO, new Date())

// imprimirDatos(nuevaVenta, "Antes")

nuevaVenta.agregarProducto(nuevoProdInv)
nuevaVenta.agregarProducto(nuevoProdInv)
nuevaVenta.agregarProducto(nuevoProdInv2)
nuevaVenta.eliminarProducto(1)

nuevaVenta.devolverProductos().forEach(function(prod) { console.log(prod.devolverID()) })

// imprimirDatos(nuevaVenta, "Después")

// nuevaVenta.agregarProducto(nuevoProdInv)
// nuevaVenta.agregarProducto(nuevoProdInv2)

// console.log("ID",nuevaVenta.devolverProductos()[0].devolverID())
// console.log("IDProd",nuevoProdInv.devolverID())

// console.log("Total de la venta", nuevaVenta.calcularTotal())

module.exports = { Venta }
