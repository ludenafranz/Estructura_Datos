/*
Condicionales

*/

function imprimir(texto) {
  document.getElementById("consola").innerText = texto;
}

//if else
function condicionifelse() {
  const maximo = 10;
  const dinero = 3;
  if (dinero <= maximo) {
    imprimir("dinero insuficiente");
  } else {
    imprimir("dinero suficiente");
  }
}

//else if
function condicionelseif() {
  const nota = 50;
  if (nota >= 90) {
    imprimir("Aprobado con Sobresaliente");
  } else if (nota >= 75) {
    imprimir("Aprobado");
  } else {
    imprimir("Reprobado");
  }
}

//Switch
function condicionswitch() {
  const dia = "lunes";
  switch (dia) {
    case "lunes":
      imprimir("Inicio de semana");
      break;
    case "viernes":
      imprimir("Fin de semana cerca");
      break;
    default:
      imprimir("Día normal");
  }
}


//condiconaleTernario
function condicionternaria(){
  const numero = "10";
  const esMayor = numero == 10 ? "Es igual" : "No es igual";
  imprimir(esMayor);
}



