var { Venta } = require("./Venta")
var { Compra } = require("./Compra")
var { MetodoPago } = require("./MetodosDePago")
var { Producto_Inv } = require("./Producto_Inv")
var { Inventario } = require("./Inventario")
var { MetodosDePago, Categoria } = require("./types")

function Kiosko(
  nombreCalle,
  numeroCalle,
  telefono,
  saldo,
  inventario,
  ventaActual = null,
  ventas = [],
  compras = [],
  empleados = [],
  proveedores = [],
) {
  var _id = Math.floor(Math.random() * 1000000);
  var _nombreCalle = nombreCalle;
  var _numeroCalle = numeroCalle;
  var _telefono = telefono;
  var _saldo = saldo;
  var _inventario = inventario;
  var _ventaActual = ventaActual;
  var _ventas = ventas;
  var _compras = compras;
  var _empleados = empleados;
  var _proveedores = proveedores;

  //#region getters/setters
  this.devolverID = function() { return _id }

  this.devolverNombreCalle = function() { return _nombreCalle }
  this.establecerNombreCalle = function( nombreCalle ) { _nombreCalle = nombreCalle }

  this.devolverNumeroCalle = function() { return _numeroCalle }
  this.establecerNumeroCalle = function( numeroCalle ) { _numeroCalle = numeroCalle }

  this.devolverTelefono = function() { return _telefono }
  this.establecerTelefono = function( telefono ) { _telefono = telefono }

  this.devolverSaldo = function() { return _saldo }

  this.devolverInventario = function() { return _inventario }

  this.devolverVentaActual = function() { return _ventaActual }

  this.devolverVentas = function() { return _ventas }

  this.devolverCompras = function() { return _compras }

  this.devolverEmpleados = function() { return _empleados }

  this.devolverProveedores = function() { return _proveedores }
  //#endregion

  //#region methods
  //#region VENTA
  this.iniciarVenta = function(venta) {
    _ventaActual = venta
  }

  this.realizarVenta = function() {
    if(!_ventaActual) return;

    _saldo += _ventaActual.calcularTotal()
    var productosRed = _ventaActual.devolverProductos().map(function(prod) { return { id: prod.devolverID(), cantidad: prod.devolverCantidad() } })
    _inventario.reducirExistencias(productosRed)
    _ventas.push(_ventaActual)
  }

  this.eliminarVenta = function( ventaId ) { _ventas =  _ventas.filter(function(venta) { venta.devolverID() !== ventaId })}
  //#endregion

  //#region COMPRA
  this.realizarCompra = function( proveedor, productosCompra, metodoPago ) {
    var nuevaCompra = new Compra(metodoPago, productosCompra, proveedor.devolverID())
    _saldo += nuevaCompra.calcularTotal()

    productosCompra.forEach(function(prod) {
      var invIds = _inventario.devolverInventario().map(function(invProd) { return invProd.devolverID() })
      if(invIds.includes(prod.devolverID())) {
        _inventario.aumentarExistencias({ id: prod.devolverID(), cantidad: prod.devolverCantidad() })
      }
      else {
        _inventario.agregarProducto(prod)
      }
    })

    _compras.push(nuevaCompra)
  }

  this.eliminarCompra = function( compraId ) { _compras =  _compras.filter(function(compra) { compra.devolverID() !== compraId })}
  //#endregion

  //#region EMPLEADO
  this.agregarEmpleado = function( empleado ) { _empleados.push(empleado) }
  this.eliminarEmpleado = function( empleadoId ) { _empleados =  _empleados.filter(function(empleado) { empleado.devolverID() !== empleadoId })}
  //#endregion

  //#region PROVEEDOR
  this.agregarProveedor = function( proveedor ) { _proveedores.push(proveedor) }
  this.eliminarProveedor = function( proveedorId ) { _proveedores =  _proveedores.filter(function(proveedor) { proveedor.devolverID() !== proveedorId })}
  //#endregion
  //#endregion
}

var nuevoInventario = new Inventario()

var nuevoKiosko = new Kiosko("Jujuy", 1250, "+54-3471-666666", 100000, nuevoInventario)

var nuevoProdInv = new Producto_Inv("Coca Cola", "The Coca Cola Company", Categoria.GASEOSAS, "500ml", 300, 5, 1)
var nuevoProdInv2 = new Producto_Inv("Pepsi", "Pepsi co.", Categoria.GASEOSAS, "500ml", 250, 5, 2)

nuevoKiosko.devolverInventario().agregarProducto(nuevoProdInv)
nuevoKiosko.devolverInventario().agregarProducto(nuevoProdInv2)

var nuevaVenta = new Venta(new MetodoPago(MetodosDePago.DEBITO))

nuevoKiosko.iniciarVenta(nuevaVenta)

nuevoKiosko.devolverVentaActual().agregarProducto(nuevoProdInv)
nuevoKiosko.devolverVentaActual().agregarProducto(nuevoProdInv)
nuevoKiosko.devolverVentaActual().agregarProducto(nuevoProdInv2)
// nuevoKiosko.devolverVentaActual().eliminarProducto(1)

console.log("Saldo - Antes", nuevoKiosko.devolverSaldo())
console.log("Ventas - Antes", nuevoKiosko.devolverVentas())

nuevoKiosko.realizarVenta()

console.log("Saldo - Después", nuevoKiosko.devolverSaldo())
console.log("Ventas - Después", nuevoKiosko.devolverVentas())
