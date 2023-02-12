function Persona (nombre, apellido, telefono) {
  var _id = Math.floor(Math.random() * 1000000)
  var _nombre = nombre;
  var _apellido = apellido;
  var _telefono = telefono;

  this.devolverID = function() { return _id }

  this.devolverNombre = function() { return _nombre }
  this.establecerNombre = function( nombre ) { _nombre = nombre }

  this.devolverApellido = function() { return _apellido }
  this.establecerApellido = function( apellido ) { _apellido = apellido }

  this.devolverTelefono = function() { return _telefono }
  this.establecerTelefono = function( telefono ) { _telefono = telefono }
}

function imprimirDatos(pers, timing) {
  console.log(timing + " de los cambios\n")
  console.log("ID:", pers.devolverID())
  console.log("Nombre:", pers.devolverNombre())
  console.log("Apellido:", pers.devolverApellido())
  console.log("Telefono:", pers.devolverTelefono())
  console.log("\n")
}

var nuevaPersona = new Persona("John", "Rambo", "+54-341-1234567");

imprimirDatos(nuevaPersona, "Persona - Antes")

nuevaPersona.establecerNombre("Bruce")
nuevaPersona.establecerApellido("Lee")
nuevaPersona.establecerTelefono("+54-341-9876543")

imprimirDatos(nuevaPersona, "Persona - Después")

module.exports = { Persona }
