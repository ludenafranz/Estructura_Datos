
export class ColaTareas {

    constructor(capacidad = 20) {
        this.tareas = new Array(capacidad);
        this.capacidad = capacidad;
        this.frente = 0;
        this.final = 0;
        this.contador = 0;
    }


    encolar(tarea) {
        if (this.isFull()) {
            return false;
        }
        this.tareas[this.final] = tarea;
        this.final = (this.final + 1) % this.capacidad;
        this.contador++;
        return true;
    }


    desencolar() {
        if (this.isEmpty()) {
            return null;
        }
        const tarea = this.tareas[this.frente];
        this.tareas[this.frente] = null
        this.frente = (this.frente + 1) % this.capacidad;
        this.contador--;
        return tarea;
    }

    isEmpty() {
        return this.contador === 0;
    }

    isFull() {
        return this.contador === this.capacidad;
    }

    mostrar(i,lista){
        if (i == this.contador){
            return
        }

        const posicion = (this.frente + i) % this.capacidad;
        const tarea = this.tareas[posicion];

        const li = document.createElement("li");

        li.classList.add("tarea-item");

        li.innerHTML = `
        <h3>${tarea.nombre}</h3>
        <p>${tarea.descripcion}</p>
        <span class="estado pendiente">${tarea.estado}</span>`;

        lista.appendChild(li);
        this.mostrar(i + 1,lista)
    }


}