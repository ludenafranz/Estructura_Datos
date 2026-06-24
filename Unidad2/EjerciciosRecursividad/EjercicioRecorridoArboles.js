class NodoArbol {
    constructor(valor) {
        this.valor = valor;
        this.izquierdo = null;
        this.derecho = null;
    }
}


function recorridoInorden(raiz) {
    if (raiz === null) {
        return;
    }

    recorridoInorden(raiz.izquierdo);
    console.log(raiz.valor);
    recorridoInorden(raiz.derecho);
}

function recorridoPostorden(raiz) {
    if (raiz === null) {
        return;
    }

    recorridoPostorden(raiz.izquierdo);
    recorridoPostorden(raiz.derecho);
    console.log(raiz.valor);
}

