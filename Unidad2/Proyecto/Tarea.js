export class Tarea {
    constructor(descripcion,nombre){
        this.descripcion = descripcion;
        this.nombre = nombre;
        this.estado = "Pendiente";
    }

    completar(){
        this.estado = "Completa"
    }

    
}