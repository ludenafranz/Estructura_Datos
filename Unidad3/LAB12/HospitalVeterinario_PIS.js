class NodoB {
    static lecturasDisco = 0;
    constructor(t, hoja) {
        this.t = t; // Grado mínimo
        this.hoja = hoja;
        this.claves = []; // IDs de los pacientes
        this.hijos = []; // Punteros a subárboles (páginas de disco)
        this.n = 0; // Número actual de claves
    }
    buscar(k) {
        let i = 0;
        while (i < this.claves.length && k > this.claves[i]) {
            i++;
        }

        if (i < this.claves.length && this.claves[i] === k) {
            return this;
        }

        if (this.hoja) {
            return null;
        }

        NodoB.lecturasDisco++;
        return this.hijos[i].buscar(k);
    }
    insertarNoLleno(k) {
        let i = this.claves.length - 1;
        
        if (this.hoja) {
            while (i >= 0 && this.claves[i] > k) {
                this.claves[i + 1] = this.claves[i];
                i--;
            }
            this.claves[i + 1] = k;
            this.n++;
        } else {
            while (i >= 0 && this.claves[i] > k) {
                i--;
            }
            i++;
            
            if (this.hijos[i].n === 2 * this.t - 1) {
                this.dividirHijo(i, this.hijos[i]);
                if (this.claves[i] < k) {
                    i++;
                }
            }
            this.hijos[i].insertarNoLleno(k);
        }
    }
    dividirHijo(i, hijo) {
        let nuevoNodo = new NodoB(hijo.t, hijo.hoja);
        let t = this.t;
        
        for (let j = 0; j < t - 1; j++) {
            nuevoNodo.claves[j] = hijo.claves[j + t];
        }
        
        if (!hijo.hoja) {
            for (let j = 0; j < t; j++) {
                nuevoNodo.hijos[j] = hijo.hijos[j + t];
            }
        }
        
        nuevoNodo.n = t - 1;
        hijo.n = t - 1;
        
        for (let j = this.n; j >= i + 1; j--) {
            this.hijos[j + 1] = this.hijos[j];
        }
        this.hijos[i + 1] = nuevoNodo;
        
        for (let j = this.n - 1; j >= i; j--) {
            this.claves[j + 1] = this.claves[j];
        }
        this.claves[i] = hijo.claves[t - 1];
        this.n++;
    }
    obtenerAltura() {
        if (this.hoja) return 1;
        return 1 + this.hijos[0].obtenerAltura();
    }
    contarNodos() {
        if (this.hoja) return 1;
        let total = 1;
        for (let i = 0; i <= this.n; i++) {
            total += this.hijos[i].contarNodos();
        }
        return total;
    }
}

class ArbolBPacientes {
    constructor(t) {
        this.raiz = null;
        this.t = t;
    }

    buscar(k) {
        NodoB.lecturasDisco = 0;
        return this.raiz ? this.raiz.buscar(k) : null;
    }

    insertar(k) {
        if (!this.raiz) {
            this.raiz = new NodoB(this.t, true);
            this.raiz.claves[0] = k;
            this.raiz.n = 1;
            return;
        }
        
        if (this.raiz.n === 2 * this.t - 1) {
            let nuevaRaiz = new NodoB(this.t, false);
            nuevaRaiz.hijos[0] = this.raiz;
            nuevaRaiz.dividirHijo(0, this.raiz);
            this.raiz = nuevaRaiz;
        }
        
        this.raiz.insertarNoLleno(k);
    }

    obtenerAltura() {
        if (!this.raiz) return 0;
        return this.raiz.obtenerAltura();
    }

    contarNodos() {
        if (!this.raiz) return 0;
        return this.raiz.contarNodos();
    }
}

class EvaluadorABP {
    constructor() {
        this.resultados = [];
    }

    evaluar() {
        console.log('\n=== EVALUACIÓN ÁRBOL B vs AVL ===\n');
        
        const NUM_REGISTROS = 1000000;
        const GRADOS = [4, 8, 16, 32, 64];
        const NUM_BUSQUEDAS = 50;
        
        // AVL teórico
        const lecturasAVL = Math.ceil(Math.log2(NUM_REGISTROS));
        console.log(`ÁRBOL AVL (teórico):`);
        console.log(`  Lecturas de disco: ${lecturasAVL}`);
        console.log(`  Altura esperada: ~${Math.ceil(Math.log2(NUM_REGISTROS))}\n`);
        
        console.log(`ÁRBOL B (simulación con ${NUM_REGISTROS.toLocaleString()} registros):\n`);
        console.log('Grado | Altura | Lecturas Disco | Mejora vs AVL');
        console.log('------|--------|----------------|---------------');
        
        GRADOS.forEach(t => {
            const arbol = new ArbolBPacientes(t);
            
            // Insertar registros
            const claves = [];
            for (let i = 0; i < NUM_REGISTROS; i++) {
                const id = Math.floor(Math.random() * NUM_REGISTROS * 2) + 1;
                arbol.insertar(id);
                claves.push(id);
            }
            
            // Realizar búsquedas
            let totalLecturas = 0;
            for (let i = 0; i < NUM_BUSQUEDAS; i++) {
                const id = claves[Math.floor(Math.random() * claves.length)];
                arbol.buscar(id);
                totalLecturas += NodoB.lecturasDisco;
            }
            
            const promedioLecturas = totalLecturas / NUM_BUSQUEDAS;
            const altura = arbol.obtenerAltura();
            const mejora = ((lecturasAVL - promedioLecturas) / lecturasAVL * 100).toFixed(1);
            
            console.log(`${t.toString().padEnd(5)} | ${altura.toString().padEnd(6)} | ${promedioLecturas.toFixed(2).padEnd(14)} | ${mejora}%`);
        });
        
        console.log('\n El Árbol B reduce significativamente las lecturas de disco comparado con AVL.');
    }
}

class RouterBuffer {
    constructor() {
        this.heap = [];
        this.procesados = 0;
    }

    push(paquete) {
        this.heap.push(paquete);
        this._bubbleUp();
    }

    _bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex].latencia <= this.heap[index].latencia) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    pop() {
        if (this.heap.length === 0) return null;
        
        const paquete = this.heap[0];
        const ultimo = this.heap.pop();
        
        if (this.heap.length > 0) {
            this.heap[0] = ultimo;
            this._sinkDown();
        }
        
        this.procesados++;
        return paquete;
    }

    _sinkDown() {
        let index = 0;
        const length = this.heap.length;
        
        while (true) {
            let leftChildIdx = 2 * index + 1;
            let rightChildIdx = 2 * index + 2;
            let smallest = index;
            
            if (leftChildIdx < length && this.heap[leftChildIdx].latencia < this.heap[smallest].latencia) {
                smallest = leftChildIdx;
            }
            
            if (rightChildIdx < length && this.heap[rightChildIdx].latencia < this.heap[smallest].latencia) {
                smallest = rightChildIdx;
            }
            
            if (smallest === index) break;
            
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }

    mostrarEstado() {
        console.log(`\nRouter Buffer:`);
        console.log(`  Paquetes en cola: ${this.heap.length}`);
        console.log(`  Paquetes procesados: ${this.procesados}`);
        if (this.heap.length > 0) {
            console.log(`  Próximo paquete: ID ${this.heap[0].id} (${this.heap[0].latencia}ms)`);
        }
    }
}

function simularRouter() {
    console.log('\n=== SIMULACIÓN DE ROUTER ===\n');
    
    const router = new RouterBuffer();
    const numPaquetes = 15;
    
    console.log(`Generando ${numPaquetes} paquetes...`);
    
    // Crear y encolar paquetes
    for (let i = 0; i < numPaquetes; i++) {
        const paquete = {
            id: i + 1,
            latencia: Math.floor(Math.random() * 100) + 1
        };
        router.push(paquete);
        console.log(`  Encolado: Paquete ${paquete.id} (${paquete.latencia}ms)`);
    }
    
    router.mostrarEstado();
    
    console.log('\nProcesando paquetes por prioridad (menor latencia):');
    let procesados = 0;
    while (router.heap.length > 0) {
        const paquete = router.pop();
        procesados++;
        console.log(`  ${procesados}. Procesado: Paquete ${paquete.id} (${paquete.latencia}ms)`);
    }
    
    console.log(`\n Total procesados: ${procesados} paquetes`);
}

function ejecutar() {
    
    // 1. Probar Árbol B básico
    console.log('\n--- PRUEBA ÁRBOL B ---');
    const arbol = new ArbolBPacientes(3);
    
    const pacientes = [10, 20, 5, 6, 12, 30, 7, 17];
    console.log('Insertando pacientes:', pacientes.join(', '));
    pacientes.forEach(id => arbol.insertar(id));
    
    console.log(`Altura del árbol: ${arbol.obtenerAltura()}`);
    console.log(`Nodos totales: ${arbol.contarNodos()}`);
    
    // Buscar pacientes
    console.log('\nBuscando pacientes:');
    [6, 12, 99].forEach(id => {
        const resultado = arbol.buscar(id);
        const encontrado = resultado ? 'Encontrado' : 'No encontrado';
        console.log(`  Paciente ${id}: ${encontrado} (${NodoB.lecturasDisco} lecturas de disco)`);
    });
    
    const evaluador = new EvaluadorABP();
    evaluador.evaluar();
    
    simularRouter();
}

ejecutar();