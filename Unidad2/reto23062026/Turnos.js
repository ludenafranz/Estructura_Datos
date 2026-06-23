import { Cliente } from "./Cliente.js";
import { Cola } from "./ColaTurnos.js";

const farmacia = new Cola();

farmacia.encolarCliente(new Cliente("Juan", 1));
farmacia.encolarCliente(new Cliente("María", 2));
farmacia.encolarCliente(new Cliente("Pedro", 3));

console.log(`hay un total de ${farmacia.tamaño()} pacientes esperando turno`)

let cliente = farmacia.desencolarCliente();

if (cliente !== null) {
    console.log(`Atendiendo: ${cliente.mostrarInformacion()}`);
}

cliente = farmacia.desencolarCliente();

if (cliente !== null) {
    console.log(`Atendiendo: ${cliente.mostrarInformacion()}`);
}

cliente = farmacia.desencolarCliente();

if (cliente !== null) {
    console.log(`Atendiendo: ${cliente.mostrarInformacion()}`);
} 

cliente = farmacia.desencolarCliente();

if (cliente === null) {
    console.log("No existen más clientes en la cola.");
}
