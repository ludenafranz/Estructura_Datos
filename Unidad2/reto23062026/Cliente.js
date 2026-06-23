export class Cliente {
    constructor(nombre, turno) {
        this.nombre = nombre;
        this.turno = turno;
    }

    mostrarInformacion() {
        return `Turno ${this.turno}: ${this.nombre}`;
    }
}