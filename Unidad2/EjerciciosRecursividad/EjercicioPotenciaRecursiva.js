function potencia(base, exponente) {
    if (exponente === 0){
        return 1;
    }
    if (exponente % 2 ===0){
        let mitad = potencia(base, exponente / 2);
        return mitad * mitad;
    } else{
        return base * potencia(base,(exponente -1))
    }
}

// Casos de prueba para validación
console.assert(potencia(2, 10) === 1024, "Error en potencia(2, 10)");
console.assert(potencia(5, 3) === 125, "Error en potencia(5, 3)");
console.assert(potencia(7, 0) === 1, "Error en potencia(7, 0)");
console.log("Ejercicio 1.2 superado.");
