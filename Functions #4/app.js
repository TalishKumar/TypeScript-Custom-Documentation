// tsc app.ts -> compiles the TypeScript file to a JavaScript Executable
// node app.js -> run the compiled JavaScript file
/* ------------------------------------------------------------------------- Intro to functions ------------------------------------------------------------------------ */
// functions are the building blocks of readable, maintainable, and reusable code
// use the "function" keyword to declare a function
// Syntax ->
// function name (parameter: type, parameter: type, ...) : returnType { some code here... }
// Let's create an add function
function add(x, y) {
    return x + y;
}
// let sum = add ('10', '20'); -> This will fail and throw an error (we are passing in strings where ONLY number types are allowed)
console.log(add(10, 10)); // -> 20
// When you do not want your function to return a value, use the "void" returnType
// Let's create a function that prints a message to the console
// Remember, we are NOT returning any value
// we are simply using an in -built feature of TypeScript to print a string to our console
function printAMessage(message) {
    console.log(message);
}
printAMessage("Hello User!"); // -> Hello User!
// Going back to type inference
// Even if you do not declare a specific returnType for a function
// TypeScript will assume the returnType is the same as the parameter types
// Example ->
function secondAdd(x, y) {
    return x + y; // -> will return a number type
}
console.log(typeof (secondAdd(1, 2))); // -> number
/* --------------------------------------------------------------------------- Function types -------------------------------------------------------------------------- */
// To declare a function type you must declare two parts
// 1) parameter types
// 2) return types
// let functionName : (parameter: type, parameter: type) => returnType;
var addition;
// Once you annotate a variable with a function type, you can assign the function with the same type to the variable
addition = function (x, y) { return x + y; };
// Additionally, you can declare a variable and assign a function to a variable
var secondAddition = function (x, y) { return x + y; };
// You cannot assign other functions that do not match the type of the addition variable
// addition = (x: string, y: string) => x.concat(y) -> THIS WILL THROW AN ERROR
/* ------------------------------------------------------------------------- Optional Parameters ----------------------------------------------------------------------- */
// In JavaScript you can call a function without passing any arguments even if the function has specified parameters
// In TypeScript, the compiler checks every function and calls errors when:
// 1) The number of arguments is different than the number of parameters
// 2) The types of the arguments is not compatible with the types of the parameters
// Because of this, when creating a function, use the "?" symbol to create "optional" parameters
// Example -> 
function multiply(x, y, z) {
    // if z is provided (is a valid number)
    if (z) {
        // multiply all 3 parameters
        return x * y * z;
        // otherwise
    }
    else {
        // only multiply x and y 
        return x * y;
    }
}
// Output
console.log(multiply(5, 4)); // -> 20
console.log(multiply(1, 2, 3)); // -> 6
/* ------------------------------------------------------------------------- Default Parameters ------------------------------------------------------------------------ */
// JavaScript syntax -> function name(parameter = defaultValue) { some code here... }
// JavaScript example ->
function applyDiscount(price, discount) {
    if (discount === void 0) { discount = 0.05; }
    return price * (1 - discount);
}
// since only "price" is provided, the function will take the default value of discount as 0.05
console.log(applyDiscount(100)); // -> 95
//  TypeScript has the same syntax, will the key difference being that you are allowed to assign types explicitly
function tsApplyDiscount(price, discount) {
    if (discount === void 0) { discount = 0.05; }
    return price * (1 - discount);
}
// since only "price" is provided, the function will take the default value of discount as 0.05
console.log(tsApplyDiscount(100)); // -> 95
// You cannot include default parameters in function type definitions
// let applyDiscount: (price: number, discount: number = 0.05) => number; -> will throw an error
// Additionally, unlike optional parameters, default parameters can be written in any order
// Example -> The following function print the number of days in a month based on the year
function printDays(month, year) {
    // The year parameter is defaulted to the current year if no year is provided on the function call
    if (year === void 0) { year = new Date().getFullYear(); }
    // switch case statement to get the correct output
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            console.log("There are 31 days in the ".concat(month, "th month of the year ").concat(year, "."));
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            console.log("There are 30 days in the ".concat(month, "th month of the year ").concat(year, "."));
            break;
        case 2:
            // Leap years
            if (((year % 4 === 0) && !(year % 100 === 0)) || (year % 400 === 0)) {
                console.log("There are 29 days in the ".concat(month, "th month of the year ").concat(year, "."));
                break;
            }
            else {
                console.log("There are 28 days in the ".concat(month, "th month of the year ").concat(year, "."));
                break;
            }
        default:
            throw Error("Invalid Month!");
    }
}
printDays(7); // -> There are 31 days in the 7th month of the year 2022.
printDays(11, 1992); // -> There are 30 days in the 11th month of the year 1992.
// etc...
/* ------------------------------------------------------------------------ Rest Parameters ---------------------------------------------------------------------------- */
// A rest parameter allows a function to accept zero or more arguments of the specified type.
// Rules ->
/*
 *
 * 1) A function can have only one rest parameter
 * 2) The rest parameter is LAST in the parameter list
 * 3) The type of the rest parameter is an "array" type
 *
 */
// Syntax -> function functionName(...restParameterName: restParameterArrayType[]): returnType => returnValue;
// Example ->
function getTotal() {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    var total = 0;
    numbers.forEach(function (number) { return total += number; });
    return total;
}
// Outputs
console.log(getTotal()); // -> 0
console.log(getTotal(10, 20)); // -> 30
console.log(getTotal(10, 20, 30)); // -> 60
/* ---------------------------------------------------------------------- Function Overloading ------------------------------------------------------------------------- */
// Function overloading allow you to establish the relationship between function parameter types and result types of a function
// Example of simple functions ->
function addNumbers(x, y) {
    return x + y; // -> sum of two numbers
}
function addStrings(a, b) {
    return a + b; // -> concatenation of two strings
}
// Example of a union function ->
function unionAdd(x, y) {
    // This function's parameters can accept either numbers or strings
    // This function can either return a number or a string
    if (typeof x === "number" && typeof y === "number") {
        return x + y; // -> sum of two numbers
    }
    else if (typeof x === "string" && typeof y === "string") {
        return x + y; // -> concatenation of two strings
    }
    else {
        throw new Error("number | string type mismatch"); // -> throws error
    }
}
// "overloadedAdd" function definition
function overloadedAdd(x, y) {
    return x + y;
}
// Outputs
console.log(overloadedAdd(1, 1)); // -> 2
console.log(overloadedAdd("Hello", '!')); // -> Hello!
// function definition with optional 3rd argument
function overloadedSum(x, y, z) {
    if (z) {
        return x + y + z;
    }
    else {
        return x + y;
    }
}
// Outputs
console.log(overloadedSum(1, 2)); // -> 3
console.log(overloadedSum(1, 2, 3)); // -> 6
// Method overloading
// What is a method?
// A method is simply a function inside of a class, also known as a function property of a class ->
// (will be covered in the next module)
// Early example ->
// Define a class
var Counter = /** @class */ (function () {
    function Counter() {
        // private access modifier for the "current" variable
        this.current = 0; // assigned the type "number" and value 0
    }
    // overload parameter to "optional" with type "number" and return type to either "number" or "number array"
    Counter.prototype.count = function (target) {
        // if there is a valid value for the variable "target"
        if (target) {
            // initialize an array variable "values"
            var values = [];
            // for as long as the variable "start" is less than the value of variable "target"
            // increment the value of variable "start" by 1
            for (var start = this.current; start <= target; start++) {
                // push the value of start to the values array
                values.push(start);
            }
            // Set the "Counter" class variable "current" (use of the "this" keyword)
            // to the value of the "target" variable
            this.current = target;
            // return the "values" array
            return values;
        }
        // if the value for the "target" variable is not valid
        // just return the incremented value of the "Counter" class
        // variable "current"
        return ++this.current;
    };
    return Counter;
}());
// initialize the Counter class
// we are making an instance of the "Counter" class
// then assigning the object to a variable named "counter"
// we can then use this variable to access the properties of the "Counter" class
var counter = new Counter();
// Outputs
console.log(counter.count()); // return a number -> 1
console.log(counter.count(20)); // return an array ->
/*
 
[
    1, 2, 3, 4, 5, 6, 7,
    8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20
]

*/
/* ---------------------------------------------------------------------- *** END OF FUNCTIONS *** --------------------------------------------------------------------- */ 
//# sourceMappingURL=app.js.map
