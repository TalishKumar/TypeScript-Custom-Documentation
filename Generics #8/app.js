// tsc app.ts -> compiles the TypeScript file to a JavaScript Executable
// node app.js -> run the compiled JavaScript file
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/* ----------------------------------------------------------------------- Introduction to Generics -------------------------------------------------------------------- */
// Generics allow you to write the reusable and generalized form of functions, classes, and interfaces
// Example ->
// Suppose you need to develop a function that returns a random element in an array of numbers
// getRandomNumberElement() function takes an array of numbers as its parameter
function getRandomNumberElement(items) {
    // assign the variable "randomIndex" a random element from the para array
    var randomIndex = Math.floor(Math.random() * items.length);
    // Math.random() that returns a random number between 0 and 1
    // multiplied it with the length of the array 
    // and applied the Math.floor() on the result
    // returns a random element from the array
    return items[randomIndex];
}
// Let's use it
var numbers = [1, 5, 7, 4, 2, 9];
console.log(getRandomNumberElement(numbers));
// Now what if we want to do the same thing but with strings?
// Then we assign a new function
function getRandomStringElement(items) {
    // assign the variable "index" a random element from the para array
    var randomIndex = Math.floor(Math.random() * items.length);
    // Math.random() that returns a random number between 0 and 1
    // multiplied it with the length of the array
    // and applied the Math.floor() on the result
    // return a random element from the array
    return items[randomIndex];
}
// Let's use it
var colors = ['red', 'green', 'blue'];
console.log(getRandomStringElement(colors));
// To solve this problem we could use the "any" type
function getRandomAnyElement(items) {
    // Now this function can work with any type
    var randomIndex = Math.floor(Math.random() * items.length);
    // Math.random() that returns a random number between 0 and 1
    // multiplied it with the length of the array
    // and applied the Math.floor() on the result
    // return a random element from the array
    return items[randomIndex];
}
// Use it ->
var anyNumbers = [1, 5, 7, 4, 2, 9];
var anyColors = ['red', 'green', 'blue'];
console.log(getRandomAnyElement(anyNumbers));
console.log(getRandomAnyElement(anyColors));
// However, these solutions are NOT type-safe
// Let's use generics to solve this issue!
// Define a generic function that returns the random element from an array of type T
function getRandomElement(items) {
    var randomIndex = Math.floor(Math.random() * items.length);
    // Math.random() that returns a random number between 0 and 1
    // multiplied it with the length of the array
    // and applied the Math.floor() on the result
    // return a random element from the array
    return items[randomIndex];
}
// using it ->
var genericNumbers = [1, 5, 7, 4, 2, 9];
var randomElement = getRandomElement(genericNumbers);
console.log(randomElement);
// You can also have a generic function that works with multiple types
// Example ->
// Generic function with two type variables TU and TV
function merge(obj1, obj2) {
    // combines two objects and returns an object
    return __assign(__assign({}, obj1), obj2);
}
// Let's use it
var result = merge({ name: 'John' }, { jobTitle: 'Frontend Developer' });
console.log(result); // -> { name: 'John', jobTitle: 'Frontend Developer' }
/* -------------------------------------------------------------------------- Generic Constraints ---------------------------------------------------------------------- */
// Going off the example given above with the generic merge function
// The merge() function expects two objects
// However, it doesn’t prevent you from passing a non - object as such ->
var person = merge({ name: 'John' }, 25 // -> not an object
);
console.log(person); // -> { name: 'John' }
// We should use constraints to make sure we are passing and returning the correct types
// In order to denote the constraint, you use the extends keyword
function constMerge(obj1, obj2) {
    return __assign(__assign({}, obj1), obj2);
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
function prop(obj, key) {
    return obj[key];
}
// Let's use it
var str = prop({ name: 'John' }, 'name'); // Cannot pass a key that is not a property in the object
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
var Stack = /** @class */ (function () {
    // constructor for the class
    function Stack(size) {
        this.size = size;
        // empty type array
        this.elements = [];
        // Nothing to do here
    }
    // Class methods ->
    // True or False depending on if the stack is empty
    Stack.prototype.isEmpty = function () {
        return this.elements.length === 0;
    };
    // True or False depending on if the stack is full
    Stack.prototype.isFull = function () {
        return this.elements.length === this.size;
    };
    // push method to insert items into the Stack
    Stack.prototype.push = function (element) {
        if (this.elements.length === this.size) {
            throw new Error('The stack is overflow!');
        }
        this.elements.push(element);
    };
    // pop methods to delete elements from the Stack
    Stack.prototype.pop = function () {
        if (this.elements.length == 0) {
            throw new Error('The stack is empty!');
        }
        return this.elements.pop();
    };
    return Stack;
}());
// Let's use it ->
// Create a new stack
var stkNumbers = new Stack(5);
// Random number generator function
function randBetween(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}
var month = {
    key: "January",
    value: 1
};
console.log(month); // => { key: 'January', value: 1 }
// Implementation
var List = /** @class */ (function () {
    function List() {
        // List of generic items
        this.items = [];
    }
    // add to the list
    List.prototype.add = function (o) {
        this.items.push(o);
    };
    // remove from the list
    List.prototype.remove = function (o) {
        var index = this.items.indexOf(o);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    };
    return List;
}());
// Use
var list = new List();
// Add items to the list
for (var i = 0; i < 10; i++) {
    list.add(i);
}
/* ---------------------------------------------------------------------------- END OF GENERICS ------------------------------------------------------------------------ */ 
//# sourceMappingURL=app.js.map
