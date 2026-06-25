class RegistroAmbiental {
  constructor(idRegistro, especie, toneladasCO2) {
    this.idRegistro = idRegistro; // Índice principal
    this.especie = especie;
    this.toneladasCO2 = toneladasCO2;
  }
}
// Implementación Parcial del TDA GestorAmbiental
class GestorRegistrosVerdes {
  // Tarea del estudiante: Implementar Merge Sort (Ordenación Verde)
  mergeSort(arreglo, inicio, fin) {
    if (inicio < fin) {
      let medio = Math.floor(inicio + (fin - inicio) / 2);
      // 1. Dividir (Llamadas recursivas)
      this.mergeSort(arreglo, inicio, medio);
      this.mergeSort(arreglo, medio + 1, fin);
      // 2. Vencer y Combinar
      this.merge(arreglo, inicio, medio, fin);
    }
  }
  merge(arreglo, inicio, medio, fin) {
    // Tamaño del subarreglo izquierdo
    let n1 = medio - inicio + 1;
    // Tamaño del subarreglo derecho
    let n2 = fin - medio;
    // Arreglos auxiliares
    let L = new Array(n1);
    let R = new Array(n2);

    // Copiar elementos al arreglo izquierdo
    for (let i = 0; i < n1; i++) {
      L[i] = arreglo[inicio + i];
    }

    // Copiar elementos al arreglo derecho
    for (let j = 0; j < n2; j++) {
      R[j] = arreglo[medio + 1 + j];
    }

    // Variables de control
    let i = 0; // Índice del arreglo izquierdo
    let j = 0; // Índice del arreglo derecho
    let k = inicio; // Índice del arreglo principal

    // Comparar elementos y ordenar
    while (i < n1 && j < n2) {
      // Verifica cuál elemento es menor
      if (L[i].idRegistro <= R[j].idRegistro) {
        arreglo[k] = L[i];
        i++;
      } else {
        arreglo[k] = R[j];
        j++;
      }
      k++;
    }
    // Copiar elementos restantes del arreglo izquierdo
    while (i < n1) {
      arreglo[k] = L[i];
      i++;
      k++;
    }
    // Copiar elementos restantes del arreglo derecho
    while (j < n2) {
      arreglo[k] = R[j];
      j++;
      k++;
    }
  }
  // Tarea 3: Búsqueda Secuencial
  // Este método debe iterar sobre el arreglo sin importar si está ordenado o no.
  busquedaSecuencial(arreglo, idBuscado) {
    // Recorre el arreglo y compara el idRegistro de cada elemento
    for (let i = 0; i < arreglo.length; i++) {
      // Retorna el índice si lo encuentra, o -1 si termina el ciclo sin éxito
      if (arreglo[i].idRegistro === idBuscado) {
        return i;
      }
    }
    return -1;
  }

    // Tarea 3: Búsqueda Binaria
    // Este método es el que aprovecha la estructura ordenada por mergeSort.
    busquedaBinaria(arreglo, idBuscado) {
        // Define tus punteros (izq, der)
        let bajo = 0
        let alto = arreglo.length - 1
        // Utiliza un ciclo (while) o recursión para reducir el espacio de búsqueda
        while (bajo <= alto) {
            const medio = Math.floor((bajo  + alto) / 2)
        if (arreglo[medio].idRegistro === idBuscado) {
            return medio
        } else if (arreglo[medio].idRegistro < idBuscado) {
            bajo = medio + 1
        } else {
            alto = medio -1
        }
        }
        // Retorna el índice o -1
        return -1
    }
}

function generarDatosPrueba(cantidad) {
  let datos = [];
  for (let i = 0; i < cantidad; i++) {
    // El idRegistro es secuencial temporalmente
    let especie = `Especie_${Math.floor(Math.random() * 100)}`;
    let co2 = +(Math.random() * 100).toFixed(2);
    datos.push(new RegistroAmbiental(i, especie, co2));
  }
  // Algoritmo de Fisher-Yates para desordenar el arreglo eficientemente en O(n)
  for (let i = datos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [datos[i], datos[j]] = [datos[j], datos[i]];
  }
  return datos;
}

// Generación de los 3 escenarios
const dataset25K = generarDatosPrueba(25000);
const dataset500K = generarDatosPrueba(500000);
const dataset1M = generarDatosPrueba(1000000);

// Instanciar el gestor
const gestor = new GestorRegistrosVerdes();
// Busqueda Secuencial

// =====================
// Dataset 25K
// =====================
// Capturar el tiempo justo antes de iniciar la búsqueda
const inicioTiempo25k = performance.now();
// Ejecutar la búsqueda (ejemplo con arreglo de 25k)
const resultado25K = gestor.busquedaSecuencial(dataset25K, 24999);
// Capturar el tiempo justo al terminar la búsqueda
const finTiempo25k = performance.now();
const tiempoTotal25k = finTiempo25k - inicioTiempo25k;
console.log("Busqueda Secuencial para 25k")
console.log(`Búsqueda Secuencial finalizada. Índice encontrado: ${resultado25K}`);
console.log(`Tiempo de ejecución (secuencial): ${tiempoTotal25k.toFixed(4)} milisegundos \n`);



// =====================
// Dataset 500K
// =====================
// Capturar el tiempo justo antes de iniciar la búsqueda
const inicioTiempo500k = performance.now();
// Ejecutar la búsqueda (ejemplo con arreglo de 500k)
const resultado500k = gestor.busquedaSecuencial(dataset500K, 499999);
// Capturar el tiempo justo al terminar la búsqueda
const finTiempo500k = performance.now();
const tiempoTotal500k = finTiempo500k - inicioTiempo500k;
console.log("Busqueda Secuencial para 500k")
console.log(`Búsqueda Secuencial finalizada. Índice encontrado: ${resultado500k}`);
console.log(`Tiempo de ejecución (secuencial): ${tiempoTotal500k.toFixed(4)} milisegundos \n`);

// =====================
// Dataset 1M
// =====================
// Capturar el tiempo justo antes de iniciar la búsqueda
const inicioTiempo1M = performance.now();
// Ejecutar la búsqueda (ejemplo con arreglo de 500k)
const resultado1M = gestor.busquedaSecuencial(dataset1M, 999999);
// Capturar el tiempo justo al terminar la búsqueda
const finTiempo1M = performance.now();
const tiempoTotal1M = finTiempo1M - inicioTiempo1M;
console.log("Busqueda Secuencial para 1M")
console.log(`Búsqueda Secuencial finalizada. Índice encontrado: ${resultado1M}`);
console.log(`Tiempo de ejecución (secuencial): ${tiempoTotal1M.toFixed(4)} milisegundos \n`);


//Busqueda Binaria

// =====================
// Dataset 25K
// =====================
// Ejemplo de medición para Búsqueda Binaria (dataset de 500k)
// 1. Primero, ordenamos el arreglo usando el método implementado
gestor.mergeSort(dataset25K, 0, dataset25K.length - 1);
// 2. Capturamos el tiempo de inicio
const inicioBinaria25k = performance.now();
// 3. Ejecutamos la búsqueda binaria
const resultadoBinaria25k = gestor.busquedaBinaria(dataset25K, 24999);
// 4. Capturamos el tiempo de fin
const finBinaria25k = performance.now();
const tiempoBinariaMs25k = finBinaria25k - inicioBinaria25k;
console.log("Busqueda Binaria para 25k")
console.log(`Búsqueda Binaria finalizada. Índice: ${resultadoBinaria25k}`);
console.log(`Tiempo de ejecución (Binaria): ${tiempoBinariaMs25k.toFixed(4)} milisegundos \n`);

// =====================
// Dataset 500K
// =====================
// Ejemplo de medición para Búsqueda Binaria (dataset de 0k)
// 1. Primero, ordenamos el arreglo usando el método implementado
gestor.mergeSort(dataset500K, 0, dataset500K.length - 1);
// 2. Capturamos el tiempo de inicio
const inicioBinaria = performance.now();
// 3. Ejecutamos la búsqueda binaria
const resultadoBinaria = gestor.busquedaBinaria(dataset500K, 499999);
// 4. Capturamos el tiempo de fin
const finBinaria = performance.now();
const tiempoBinariaMs = finBinaria - inicioBinaria;
console.log("Busqueda Binaria para 500k")
console.log(`Búsqueda Binaria finalizada. Índice: ${resultadoBinaria}`);
console.log(`Tiempo de ejecución (Binaria): ${tiempoBinariaMs.toFixed(4)} milisegundos \n`);

// =====================
// Dataset 1M
// =====================
// Ejemplo de medición para Búsqueda Binaria (dataset de 1M)
// 1. Primero, ordenamos el arreglo usando el método implementado
gestor.mergeSort(dataset1M, 0, dataset1M.length - 1);
// 2. Capturamos el tiempo de inicio
const inicioBinaria1M = performance.now();
// 3. Ejecutamos la búsqueda binaria
const resultadoBinaria1M = gestor.busquedaBinaria(dataset1M, 999999);
// 4. Capturamos el tiempo de fin
const finBinaria1M = performance.now();
const tiempoBinariaMs1M = finBinaria1M - inicioBinaria1M;
console.log("Busqueda Binaria para 1M")
console.log(`Búsqueda Binaria finalizada. Índice: ${resultadoBinaria1M}`);
console.log(`Tiempo de ejecución (Binaria): ${tiempoBinariaMs1M.toFixed(4)} milisegundos \n`);