var { Persona } = require("./Persona")

function Proveedor(
  nombre,
  apellido,
  telefono,
  razonSocial,
  email,
  notas,
  listaPrecios
) {
  var _razonSocial = razonSocial;
  var _email = email;
  var _notas = notas;
  var _listaPrecios = listaPrecios;

  Persona.call(this, nombre, apellido, telefono)

  this.devolverRazonSocial = function() { return _razonSocial }
  this.establecerRazonSocial = function( razonSocial ) { _razonSocial = razonSocial }

  this.devolverEmail = function() { return _email }
  this.establecerEmail = function( email ) { _email = email }

  this.devolverNotas = function() { return _notas }
  this.establecerNotas = function( notas ) { _notas = notas }

  this.devolverListaPrecios = function() { return _listaPrecios }
  this.establecerListaPrecios = function( listaPrecios ) { _listaPrecios = listaPrecios }
}

function imprimirDatos(Emp, timing) {
  console.log(timing + " de los cambios\n")
  console.log("RazonSocial:", Emp.devolverRazonSocial())
  console.log("Email:", Emp.devolverEmail())
  console.log("Notas:", Emp.devolverNotas())
  console.log("ListaPrecios:", Emp.devolverListaPrecios())
  console.log("\n")
}

var nuevoProveedor = new Proveedor("John", "Wick", "+54-3471-123456", "Murder Inc.", "murder-inc@gmail.com", "Always on time", ["Here goes a product - Add it later,  you bozo"])

imprimirDatos(nuevoProveedor, "Proveedor - Antes")

nuevoProveedor.establecerRazonSocial("Umbrella Corp.")
nuevoProveedor.establecerEmail("umbrella-corp@outlook.com")
nuevoProveedor.establecerNotas("A little shady")
nuevoProveedor.establecerListaPrecios(["Assume this is a list of prices, please"])

imprimirDatos(nuevoProveedor, "Proveedor - Después")

module.exports = { Proveedor }
