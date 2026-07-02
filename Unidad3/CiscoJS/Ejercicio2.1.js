//Pregunta 1
console.log("Pregunta 1")
let boolLiteral = true;
let boolConstructor = Boolean(false);
let numLiteral = 100;
let numConstructor = Number("200");
let bigLiteral = 12345678901234567890n;
let bigConstructor = BigInt(500);
let strLiteral = "123";
let strConstructor = String(123);
let indefinido = undefined;
let sinValor;

//Pregunta2
console.log("\nPregunta 2")
console.log(boolLiteral ,typeof (boolLiteral));
console.log(boolConstructor,typeof (boolConstructor));

console.log(numLiteral,typeof (numLiteral));
console.log(numConstructor, typeof (numConstructor));

console.log(bigLiteral,typeof (bigLiteral));
console.log(bigConstructor, typeof (bigConstructor));

console.log(strLiteral,typeof (strLiteral));
console.log(strConstructor, typeof (strConstructor));

console.log(indefinido, typeof indefinido);
console.log(sinValor, typeof sinValor);

//Pregunta3
console.log("\nPregunta 3")
let string = "1234";
let num = Number(string);
let bigInt = BigInt(num);
let booleano = Boolean(bigInt);

console.log(string, typeof(string));
console.log(num, typeof (num));
console.log(bigInt, typeof (bigInt));
console.log(booleano, typeof (booleano));


//Pregunta4
console.log("\nPregunta 4")
let sumaNumero = 10 + 20;
let sumaBigInt = 10n + 20n;
let sumaCadena = "Hola " + "Mundo";
let sumaBoolean = true + false;
let sumaUndefined = undefined + undefined;

console.log(sumaNumero,typeof (sumaNumero));
console.log(sumaBigInt, typeof (sumaBigInt));
console.log(sumaCadena, typeof (sumaCadena));
console.log(sumaBoolean, typeof (sumaBoolean));
console.log(sumaUndefined, typeof (sumaUndefined));

//Pregunta5
console.log("\nPregunta 5")
let sumNumStr = 10 + "5";
let sumBolNum = true + 5;
let sumBolStr = false + "Hola";
//let sumBigNum = 10n + 5;  genera error
let sumUndNum = undefined + 10; 

console.log(sumNumStr, typeof (sumNumStr));          
console.log(sumBolNum, typeof (sumBolNum));         
console.log(sumBolStr, typeof (sumBolStr));    
//console.log(sumBigNum);  genera error
console.log(sumUndNum, typeof (sumUndNum));    
