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


const a = 10;
const b = 20;
const c = "30";

console.log(a == b)
console.log(a === b)
console.log(a === c)
console.log(a == c);
a === b;
a === c;
a == c;