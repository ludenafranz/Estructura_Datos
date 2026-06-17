/*
Operadores de comparacion

== comparacion normal 
=== {Comparacion si es de mismo tipo y de mismo valor}
!= diferente 
!== {diferentes en tipo y en valor}
<
>
And
&&
OR
||
not
!

*/

const numero = "10";
const valor = 10;
const menor = 5


// ==
console.log(numero == valor);

// ===
console.log(numero === valor);
// !=
console.log(numero != valor);
//!==
console.log(numero !== valor);
// <
console.log(menor < valor);
// >
console.log(menor > valor);

const verdadero = true;
const falso = false;

// And
console.log(numero && valor);
// OR
console.log(numero || valor);
//NOT
console.log(!verdadero);

// if (numero == 10){
//     console.log("igual")
// } 
// if (numero === 10){
//     console.log("no es igual")
// }

// const valor = "10";
// if (valor !== 10){
//     console.log("no es igual")
// } else {
//     console.log("es igual")
// }