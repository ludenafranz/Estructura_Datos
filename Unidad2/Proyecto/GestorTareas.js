import { Tarea } from "./Tarea.js";
import { ColaTareas } from "./ColaTareas.js"

const colatarea = new ColaTareas()

const listaTareas = document.getElementById("tareas");
const proximaTarea = document.getElementById("proximaTarea");

function mostrarTarea(){
    proximaTarea.innerHTML = "";

    if (colatarea.isEmpty()) {
        proximaTarea.classList.remove("tarea-item")
        proximaTarea.textContent = "No hay tareas";
        return;
    }
    proximaTarea.classList.add("tarea-item")
    const tarea = colatarea.tareas[colatarea.frente];

    const h3 = document.createElement("h3");
    h3.textContent = tarea.nombre;

    const p = document.createElement("p");
    p.textContent = tarea.descripcion;

    const boton = document.createElement("button");
    boton.textContent = "Completar";

    boton.addEventListener("click", () => {
        colatarea.tareas[colatarea.frente].completar()
        colatarea.desencolar();
        console.log("se desencolo")
        mostrar()
    });

    proximaTarea.appendChild(h3);
    proximaTarea.appendChild(p);
    proximaTarea.appendChild(boton);
}

function mostrarLista() {
    listaTareas.innerHTML = "";

    if (colatarea.isEmpty()) {
        listaTareas.textContent = "No hay tareas";
        return;
    }

    colatarea.mostrar(0,listaTareas)
}

function agregarTarea(){
    event.preventDefault(); 

    const nombretarea = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;

    const tarea = new Tarea(descripcion, nombretarea);
    const guardado = colatarea.encolar(tarea)
    if (guardado == null){
        alert("No se pudo agregar una nueva tarea")
    }

    event.target.reset();

    console.log("Tarea agregada con éxito:", tarea);
    
    mostrar()

}
const formulario = document.getElementById("formularioTarea");
formulario.addEventListener("submit", agregarTarea);

function mostrar(){
    mostrarLista();
    mostrarTarea();
}

mostrar()