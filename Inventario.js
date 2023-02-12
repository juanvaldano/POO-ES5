var { Producto_Inv } = require("./Producto_Inv")
var { Categoria } = require("./types")

function Inventario(
  inv_prod = []
) {
  var _inv_prod = inv_prod;

  this.devolverInventario = function() { return _inv_prod }

  this.agregarProducto = function( producto ) { _inv_prod.push(producto) }

  this.eliminarProducto = function( prodId ) { _inv_prod =  _inv_prod.filter(function(prod) { prod.devolverID() !== prodId }) }
  this.eliminarProductos = function( prodIdsArr ) { prodIdsArr.forEach(function(prod) { this.eliminarProducto(prod) }) }

  this.actualizarPrecios = function( productosParaActualizar ) {
    productosParaActualizar.forEach(function(prod) {
      var prodEncontrado = _inv_prod.find(function(pi) { pi.devolverID() === prod.devolverID() })
      if(prodEncontrado) { prodEncontrado.establecerPrecio(prod.devolverPrecio()) }
    })
  }

  this.aumentarExistencias = function( productos ) {
    productos.forEach(function(prod) {
      var prodEncontrado = _inv_prod.find(function(pi) { pi.devolverID() === prod.id })
      if(prodEncontrado) { prodEncontrado.establecerCantidad(prodEncontrado.devolverCantidad() + prod.cantidad) }
    })
  }

  this.reducirExistencias = function( productos ) {
    productos.forEach(function(prod) {
      var prodEncontrado = _inv_prod.find(function(pi) { pi.devolverID() === prod.id })
      if(prodEncontrado) {
        prodEncontrado.establecerCantidad(prodEncontrado.devolverCantidad() - prod.cantidad)
        this.revisarExistencias(prodEncontrado)
      }
    })
  }

  this.revisarExistencias = function( producto ) {
    if(producto.devolverCantidad() < 100) console.log("Bajas existencias de " + producto.devolverNombre() + ". Total: " + producto.devolverCantidad())
  }
}

//#region Setup
var nuevoProdInv1 = new Producto_Inv("Coca Cola", "The Coca Cola Company", Categoria.GASEOSAS, "500ml", 250, 100)
nuevoProdInv1.establecerID(1)

var nuevoProdInv2 = new Producto_Inv("Pepsi", "Pepsi co.", Categoria.GASEOSAS, "500ml", 210, 150)
nuevoProdInv2.establecerID(2)

var nuevoInventario = new Inventario([nuevoProdInv1]);
//#endregion

console.log("Inventario - antes de realizar modificaciones", nuevoInventario.devolverInventario())

nuevoInventario.agregarProducto(nuevoProdInv2)

console.log("Inventario - luego de agregar prod2", nuevoInventario.devolverInventario())

console.log("Existencias prod1 antes de modificar", nuevoInventario.devolverInventario()[0].devolverCantidad())

nuevoInventario.aumentarExistencias([{ id: 1, cantidad: 33 }])

console.log("Existencias prod1 aumentadas", nuevoInventario.devolverInventario()[0].devolverCantidad())

nuevoInventario.reducirExistencias([{ id: 1, cantidad: 70 }])

console.log("Existencias prod1 reducidas", nuevoInventario.devolverInventario()[0].devolverCantidad())

module.exports = { Inventario }
