var { MetodosDePago } = require("./types")

function MetodoPago(tipo, cantCuotas = 1) {
  var _tipo = tipo;
  var _cantCuotas = cantCuotas;

  this.devolverTipo = function() { return _tipo }
  this.devolverCantCuotas = function() { return _cantCuotas }
}

function imprimirDatos(MdoPago, description) {
  console.log(description + "\n")
  console.log("Tipo:", MdoPago.devolverTipo())
  console.log("CantCuotas:", MdoPago.devolverCantCuotas())
  console.log("\n")
}

var nuevoMetodoPagoBase = new MetodoPago(MetodosDePago.DEBITO)
var nuevoMetodoPagoCuotas = new MetodoPago(MetodosDePago.CREDITO, 6)

imprimirDatos(nuevoMetodoPagoBase, "MetodoPagoBase")
imprimirDatos(nuevoMetodoPagoCuotas, "MetodoPagoCuotas")

module.exports = { MetodoPago }
