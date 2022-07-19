// tsc app.ts -> compiles the TypeScript file to a JavaScript Executable
// node app.js -> run the compiled JavaScript file

/* ----------------------------------------------------------------------- Introduction to Generics -------------------------------------------------------------------- */

// Generics allow you to write the reusable and generalized form of functions, classes, and interfaces
// Example ->

// Suppose you need to develop a function that returns a random element in an array of numbers
// getRandomNumberElement() function takes an array of numbers as its parameter
function getRandomNumberElement(items: number[]): number {

    // assign the variable "randomIndex" a random element from the para array
    let randomIndex = Math.floor(Math.random() * items.length);

    // Math.random() that returns a random number between 0 and 1
    // multiplied it with the length of the array 
    // and applied the Math.floor() on the result

    // returns a random element from the array
    return items[randomIndex];
}

// Let's use it
let numbers = [1, 5, 7, 4, 2, 9];
console.log(getRandomNumberElement(numbers));

// Now what if we want to do the same thing but with strings?
// Then we assign a new function
function getRandomStringElement(items: string[]): string {

    // assign the variable "index" a random element from the para array
    let randomIndex = Math.floor(Math.random() * items.length);

    // Math.random() that returns a random number between 0 and 1
    // multiplied it with the length of the array
    // and applied the Math.floor() on the result

    // return a random element from the array
    return items[randomIndex];
}

// Let's use it
let colors = ['red', 'green', 'blue'];
console.log(getRandomStringElement(colors));

// To solve this problem we could use the "any" type
function getRandomAnyElement(items: any[]): any {

    // Now this function can work with any type

    let randomIndex = Math.floor(Math.random() * items.length);

    // Math.random() that returns a random number between 0 and 1
    // multiplied it with the length of the array
    // and applied the Math.floor() on the result

    // return a random element from the array
    return items[randomIndex];
}

// Use it ->
let anyNumbers = [1, 5, 7, 4, 2, 9];
let anyColors = ['red', 'green', 'blue'];

console.log(getRandomAnyElement(anyNumbers));
console.log(getRandomAnyElement(anyColors));

// However, these solutions are NOT type-safe
// Let's use generics to solve this issue!

// Define a generic function that returns the random element from an array of type T
function getRandomElement<T>(items: T[]): T {
    let randomIndex = Math.floor(Math.random() * items.length);

    // Math.random() that returns a random number between 0 and 1
    // multiplied it with the length of the array
    // and applied the Math.floor() on the result

    // return a random element from the array
    return items[randomIndex];
}

// using it ->
let genericNumbers = [1, 5, 7, 4, 2, 9];
let randomElement = getRandomElement<number>(genericNumbers);
console.log(randomElement);

// You can also have a generic function that works with multiple types
// Example ->

// Generic function with two type variables TU and TV
function merge<TU, TV>(obj1: TU, obj2: TV) {

    // combines two objects and returns an object
    return {
        ...obj1,
        ...obj2
    };
}

// Let's use it
let result = merge (
    { name: 'John' },
    { jobTitle: 'Frontend Developer' }
);

console.log(result); // -> { name: 'John', jobTitle: 'Frontend Developer' }

/* -------------------------------------------------------------------------- Generic Constraints ---------------------------------------------------------------------- */

// Going off the example given above with the generic merge function
// The merge() function expects two objects
// However, it doesn’t prevent you from passing a non - object as such ->
let person = merge(
    { name: 'John' },
    25 // -> not an object
);

console.log(person); // -> { name: 'John' }

// We should use constraints to make sure we are passing and returning the correct types
// In order to denote the constraint, you use the extends keyword
function constMerge<TU extends object, TV extends object>(obj1: TU, obj2: TV) {
    return {
        ...obj1,
        ...obj2
    };
}

// Now this will result in an error ->
/*
 
 let person = merge(
    { name: 'John' },
    25 // -> not an object
);

*/

// Using parameters
// The following prop() function accepts an object and a property name
// It returns the value of the property
function prop<T, TK extends keyof T>(obj: T, key: TK) {
    return obj[key];
}

// Let's use it
let str = prop({ name: 'John' }, 'name'); // Cannot pass a key that is not a property in the object
console.log(str); // -> John

/* ---------------------------------------------------------------------------- Generic Classes ------------------------------------------------------------------------ */

// A generic class has a generic type parameter list in an angle brackets <> that follows the name of the class
/*
 
 class className<T>{
    //... 
}

*/

// You can also have multiple generic types
/*
 
 class className<K, T>{
    //...
}

*/

// As well as have generic constraints
/*
 
 class className<T extends TypeA>{
    //...
}

*/

// Let's make a generic stack class
// Typically, a stack has a size
// By default, it is empty

// The stack has two main operations:
/*

 Push: push an element into the stack.
 
 Pop: pop an element from the stack.
 
 */

// Define the Stack Class with Generic Type
class Stack<T> {

    // empty type array
    private elements: T[] = [];

    // constructor for the class
    constructor(private size: number) {

        // Nothing to do here
    }

    // Class methods ->

    // True or False depending on if the stack is empty
    isEmpty(): boolean {
        return this.elements.length === 0;
    }

    // True or False depending on if the stack is full
    isFull(): boolean {
        return this.elements.length === this.size;
    }

    // push method to insert items into the Stack
    push(element: T): void {
        if (this.elements.length === this.size) {
            throw new Error('The stack is overflow!');
        }
        this.elements.push(element);

    }

    // pop methods to delete elements from the Stack
    pop(): T {
        if (this.elements.length == 0) {
            throw new Error('The stack is empty!');
        }
        return this.elements.pop();
    }
}

// Let's use it ->

// Create a new stack
let stkNumbers = new Stack<number>(5);

// Random number generator function
function randBetween(low: number, high: number): number {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

// Push numbers into the stack
/*
 
 while (!stkNumbers.isFull()) {
    let n = randBetween(1, 10);
    console.log(`Push ${n} into the stack.`);
    numbers.push(n);
}

*/
// Output ->
/*
 
Push 3 into the stack.
Push 2 into the stack. 
Push 1 into the stack. 
Push 8 into the stack. 
Push 9 into the stack. 
 
 */

// Pop numbers out of the Stack
/*
 
 while (!stkNumbers.isEmpty()) {
    let n = numbers.pop();
    console.log(`Pop ${n} from the stack.`);
}

*/
// Output ->
/*

Pop 9 from the stack.
Pop 8 from the stack.
Pop 1 from the stack.
Pop 2 from the stack.
Pop 3 from the stack.

 */

/* --------------------------------------------------------------------------- Generic Interfaces ---------------------------------------------------------------------- */

// Like classes, interfaces also can be generic
// A generic interface has generic type parameter list in an angle brackets <>
// following the name of the interface

// Syntax ->
/*
 
 interface interfaceName<T> {
    // ...
}

*/

// The type parameter list can have one or multiple types
/*
 
 interface interfaceName<U, V> {
    // ...
}

*/

// Example ->
interface IPair<TK, TV> {
    key: TK;
    value: TV;
}

let month: IPair<string, number> = {
    key: "January",
    value: 1
};
console.log(month); // => { key: 'January', value: 1 }

// Generic interfaces that define methods
interface ICollection<T> {
    add(o: T): void;
    remove(o: T): void;
}

// Implementation
class List<T> implements ICollection<T>{

    // List of generic items
    private items: T[] = [];

    // add to the list
    add(o: T): void {
        this.items.push(o);
    }

    // remove from the list
    remove(o: T): void {
        let index = this.items.indexOf(o);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }
}

// Use
let list = new List<number>();

// Add items to the list
for (let i = 0; i < 10; i++) {
    list.add(i);
}

/* ---------------------------------------------------------------------------- END OF GENERICS ------------------------------------------------------------------------ */