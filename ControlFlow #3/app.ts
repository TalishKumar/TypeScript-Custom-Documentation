// tsc app.ts -> Compiles TypeScript into JavaScript (creates it's own file)
// node app.js -> Executes the JavaScript file

/* ------------------------------------------------------------------------ if else ------------------------------------------------------------------------ */

// if statement executes a statement based on a condition
// if(condition) { execute something... }
// Example ->
const max = 100;
let counter = 0;

// if the counter is less than max
if (counter < max) {

    // increment the counter value (+1)
    ++counter;
}

// Output
console.log(counter); // -> 1

// Reassign counter to 100
counter = 100;

// Now the if statement will NOT execute
if (counter < max) {

    //unreachable code
    ++counter;
}

// Output
console.log(counter); // -> 100

// This scenario can be improved by the utilization of an if-else block
if (counter < max) {
    ++counter;
} else {

    // This code will execute if counter is > or = to "max" / is NOT less than "max"
    counter = 1;
}

// This scenario can be improved further via the use of a ternary operator
counter < max ? ++counter : counter = 1; // -> same as -> if(counter < max) { ++counter; } else { counter = 1 }
console.log(counter); // -> 2

// What about when I have multiple conditions?
// In that case we use an if ... else if(n) ... else block | where (n) -> is the number of times we use the "else if" block
// Example ->
let discount: number; // let the variable discount be a number type
let itemCount = 11; // let the value of the variable itemCount be the number 11

// If the value of variable "itemCount" is greater than 0 AND less than OR equal to 5
if (itemCount > 0 && itemCount <= 5) {

    // set the value of the variable "discount" to 5 (representing 5%)
    discount = 5;
} else if (
    itemCount > 5 &&
        itemCount <= 10) { // else if the value of variable "itemCount" is greater than 5 AND less than OR equal to 10

    // set the value of the variable "discount" to 10 (representing 10%)
    discount = 10;
} else { // else if no other condition has been met

    // set the value of the variable "discount" to 15 (representing 15%)
    discount = 15;
}

// Output
console.log(`You got a ${discount}% discount.`); // -> You got a 15% discount.

/* --------------------------------------------------------------------------- switch case ----------------------------------------------------------------------------- */

// switch case statement are similar to if-else statements except that...
/*

// First, the switch case statement evaluates the expression
switch(expression) {

    // then it searches for the case statement that evaluates to the same value as the expression it was handed

    case value1: -> if the expression evaluates to "value1"

        // statement 1 -> execute this statement

        // then break out of this switch case block
        break; 

    case value2: -> if the expression evaluates to "value2"

        // statement 2 -> execute this statement
        
        // then break out of this switch case block
        break;

    case valueN: -> if the expression evaluates to "valueN"

        // statement N -> execute this statement
        
        // then break out of this switch case block
        break;

    default: // if none of the cases are a match for the expression

        // default statement or nothing -> execute this statement by default

        // then break out of this switch case block
        break;
}*/

// Example ->
let targetId = "btnDelete";
switch(targetId) {
    case "btnUpdate":
        console.log("Updated");
        break;
    case "btnDelete":
        console.log("Deleted"); // this executes -> Output -> Deleted
        break;
    case "btnNew":
        console.log("New");
        break;
    default:
        console.log("None of the cases matched the expression");
        break;
}

// You can also group case statements (having a singular output for multiple values)
let month = 2, year = 2022;
let days: number;
switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
        days = 31;
        break;
    case 4:
    case 6:
    case 9:
    case 11:
        days = 30;
        break;
    case 2:
        // Leap Year
        if (((year % 4 === 0) && !(year % 100 === 0)) || (year % 400 === 0)) {
            days = 29;
        } else {
            days = 28;
        }
        break;
    default:
        throw Error("Invalid Month!");
}

console.log(`The month ${month} in ${year} has ${days} days.`);

/* ------------------------------------------------------------------------------ for loop ----------------------------------------------------------------------------- */

// For loop statement executes a piece of code repeatedly
// Best used when the number of iterations is known
// for(initialization; condition; expression) {} -> all 3 parameters for a "for" loop are optional
// Meaning, this... is valid
/*
 
 for (;;) {

    // do something

}

*/

// Let's do something useful with it
// For example, print a list of numbers
for (let i = 0; i <= 10; ++i) {
    console.log(i); // -> 0 1 2 3 4 5 6 7 8 9 10 - all number print on new lines
}

console.log(" ");

// and since the parameters are optional
// the same task can be done like so
let i = 0;
for (; i <= 10; ++i) {
    console.log(i);
}

console.log(" ");

// Or even like this
let i2 = 0;
for (; i2 <= 10;) {
    console.log(i2);
    ++i2; // increment i at the end of the loop
}

console.log(" ");

/* ----------------------------------------------------------------------------- while loop ---------------------------------------------------------------------------- */

// A while loops allows you to create a loop that executes a block of code as long as a condition is true
// while(condition) { // do something }

/*
 * if you want to break out of a while loop you can ->
 *
 * while(condition) {
 *      // do something
 *      break; // break out
 * }
 *
 *
 * if you want to break out because of a certain condition you can ->
 *
 * while(condition) {
 *      // do something
 *
 *      if(condition) {
 *          break;
 *  }
 * }
 */

// Example ->
let wCounter = 0;
while (wCounter <= 5) {
    console.log(wCounter); // -> 0 1 2 3 4 5 - numbers print on new line
    ++wCounter;
}

console.log(" ");

/* ---------------------------------------------------------------------------- do while loop -------------------------------------------------------------------------- */

// do while statement runs until a condition evaluates to false
// and it runs at least one time

/* Syntax ->

do {

} while(condition);

*/

// Example - print a list of numbers ->
let iterator = 0;

do {
    console.log(iterator); // -> 0 1 2 3 4 5 6 7 8 9 10
    ++iterator;
} while (iterator <= 10);

console.log(" ");

// Variable iterator is now 11
do {

    // will execute only once
    console.log(iterator); // -> 11

} while (iterator <= 10);

console.log(" ");

/* --------------------------------------------------------------------------- break & continue ------------------------------------------------------------------------ */

// The break statement allows you to terminate a loop and pass the program control over the next statement after the loop
// Break statement can be used inside for, while, do while, switch case, etc. statements

// Example ->

// define "products" variable as a list of objects
let products = [
    { name: "phone", price: 700 },
    { name: "tablet", price: 900 },
    { name: "laptop", price: 1200 }
];

// for loop that loops through the products list and gets the product priced under 900
for (var fIterator = 0; i < products.length; ++fIterator) {

    // if the current iterations object "price" property is equal to 900
    if (products[fIterator].price === 900) {

        // break out of the loop
        break;
    }
}

// show the product
console.log(products[fIterator]); // -> { name: 'phone', price: 700 }

console.log(" ");

// The continue statement is used to skip to the end of its respective loop and continues to the next iteration
// Example for loop -> 
for (let index = 0; index < 9; ++index) {

    // if index is odd, skip it
    if (index % 2) {
        continue;
    }

    // this code will be skipped for odd numbers
    console.log(index); // -> 0 2 4 6 8
}

console.log(" ");

// Example while loop ->
let index = -1;

while (index < 9) {

    ++index;

    if (index % 2) {
        continue;
    }

    console.log(index); // -> 0 2 4 6 8
}

console.log(" ");

/* ------------------------------------------------------------------------ *** END OF CONTROLFLOW *** ----------------------------------------------------------------- */
