function invertirArreglo(arr, inicio, fin) {
    // Caso base
    if (inicio >= fin) {
        return;
    }

    // Intercambiar elementos
    let temp = arr[inicio];
    arr[inicio] = arr[fin];
    arr[fin] = temp;

    // Llamada recursiva
    invertirArreglo(arr, inicio + 1, fin - 1);
}

// Casos de prueba para validación
let miLista = [10, 20, 30, 40, 50];
invertirArreglo(miLista, 0, miLista.length - 1);
console.assert(JSON.stringify(miLista) === JSON.stringify([50, 40, 30, 20, 10]));
console.log("Ejercicio 2.1 superado.");
