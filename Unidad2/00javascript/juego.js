const numeroAleatorio = Math.floor(Math.random() * 10 + 1);
const numeroJugador = parseInt(prompt("Adivina el numero secreto entre el 1 al 10:"));

console.log(`Este es el numero con el que juegas ${numeroJugador}`)

if (numeroJugador == numeroAleatorio){
    console.log("Felicidades, adivianaste el numero secreto");
} else if (numeroJugador < numeroAleatorio){
    console.log("numero menor!!! intenta nuevamente");
} else if (numeroJugador > numeroAleatorio){
    console.log("numero mayor/ muy alto, intente nuevamente");
} else {
    console.log("Numero no encontrado")
}