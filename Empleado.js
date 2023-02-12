var { Persona } = require("./Persona")

function Empleado (nombre, apellido, telefono, dni, turno) {
  var _dni = dni;
  var _turno = turno;

  Persona.call(this, nombre, apellido, telefono)

  this.devolverDNI = function() { return _dni }

  this.devolverTurno = function() { return _turno }
  this.establecerTurno = function( turno ) { _turno = turno }
}

function imprimirDatos(Emp, timing) {
  console.log(timing + " de los cambios\n")
  console.log("DNI:", Emp.devolverDNI())
  console.log("Turno:", Emp.devolverTurno())
  console.log("\n")
}

var nuevoEmpleado = new Empleado("John", "Marston", "+54-341-1234567", 40555999, "Noche")

imprimirDatos(nuevoEmpleado, "Empleado - Antes")

nuevoEmpleado.establecerTurno("Tarde")

imprimirDatos(nuevoEmpleado, "Empleado - Después")

module.exports = { Empleado }
