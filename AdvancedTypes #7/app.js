// tsc app.ts -> compiles the TypeScript file to a JavaScript Executable
// node app.js -> run the compiled JavaScript file
// Using intersection type
var empOne = {
    // Can be assigned all the properties of both IIdentity and IContact
    id: 100,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(408)-897-5684"
};
var custOne = {
    // Can be assigned all the properties of both IBusinessPartner and IContact
    name: 'ABC Inc.',
    credit: 1000000,
    email: 'sales@abcinc.com',
    phone: '(408)-897-5735'
};
// declare a function that adds two variables a and b with the type of alphanumeric
function add(a, b) {
    // check if both types of arguments are numbers using the typeof operator
    if (typeof a === 'number' && typeof b === 'number') {
        //  If yes, then calculate the sum of arguments using the + operator
        return a + b;
    }
    // check if both types of arguments are strings using the typeof operator
    if (typeof a === 'string' && typeof b === 'string') {
        // If yes, then concatenate two arguments
        return a.concat(b);
    }
    // throw an error if arguments are neither numbers nor strings
    throw new Error('Invalid arguments. Both arguments must be either numbers or strings.');
}
// Similar example but with "instanceof" operator
// Define class CCustomer
var CCustomer = /** @class */ (function () {
    function CCustomer() {
    }
    // class method
    CCustomer.prototype.isCreditAllowed = function () {
        return true;
    };
    return CCustomer;
}());
// Define class CSupplier
var CSupplier = /** @class */ (function () {
    function CSupplier() {
    }
    // class method
    CSupplier.prototype.isInShortList = function () {
        return true;
    };
    return CSupplier;
}());
// declare a function signContract() that accepts a parameter with the type BusinessPartner
function signContract(partner) {
    var message;
    // check if the partner is an instance of Customer
    if (partner instanceof CCustomer) {
        // assign the logic
        message = partner.isCreditAllowed() ? 'Sign a new contract with the customer' : 'Credit issue';
    }
    // check if the partner is an instance of CSupplier
    if (partner instanceof CSupplier) {
        // assign the logic
        message = partner.isInShortList() ? 'Sign a new contract the supplier' : 'Need to evaluate further';
    }
    // finally, return the message
    return message;
}
// The in operator carries a safe check for the existence of a property on an object
// "in" can also be used as a type guard
function funcSignContract(partner) {
    var message;
    // check if the "isCreditAllowed" is a method in the partner argument
    if ('isCreditAllowed' in partner) {
        message = partner.isCreditAllowed() ? 'Sign a new contract with the customer' : 'Credit issue';
    }
    else {
        // must be Supplier
        message = partner.isInShortList() ? 'Sign a new contract the supplier ' : 'Need to evaluate further';
    }
    // return the message
    return message;
}
// User-defined type guard
//  allow you to define a type guard or help TypeScript infer a type when you use a function
//  user-defined type guard function is a function that simply returns argument is aType
// Example ->
// Function definition - checks if the argument is of type CCustomer and returns true or false
function isCustomer(partner) {
    return partner instanceof CCustomer;
}
// Let's use it ->
function typeFuncSignContract(partner) {
    var message;
    // check the type of partner
    if (isCustomer(partner)) {
        message = partner.isCreditAllowed() ? 'Sign a new contract with the customer' : 'Credit issue';
    }
    else {
        message = partner.isInShortList() ? 'Sign a new contract with the supplier' : 'Need to evaluate further';
    }
    // return the message
    return message;
}
/* ---------------------------------------------------------------------------- Type Casting --------------------------------------------------------------------------- */
//  Every variable in TypeScript has a type
// Type castings allow you to convert a variable from one type to another
// the "as" keyword and "<>" operator can be used for type casting
// The following selects the first input element by using the querySelector() method
var input = document.querySelector('input["type="text"]');
// since the type of the document.querySelector() method is the Element type it will cause an error
// console.log(input.value); // ->  the value property doesn’t exist in the Element type, it only exists on the HTMLInputElement type
// use type casting that cast the Element to HTMLInputElement by using the as keyword
var castInput = document.querySelector('input[type="text"]');
console.log(castInput.value);
// Alternative method
var enteredText = input.value;
// Now using the "<>" operator
var operatorCaseInput = document.querySelector('input[type="text"]');
console.log(operatorCaseInput.value);
/* ---------------------------------------------------------------------------- Type Assertion ------------------------------------------------------------------------- */
// Type assertions instruct the TypeScript compiler to treat a value as a specified type
// Uses the "as" keyword
// expression as targetType
// A type assertion is also known as type narrowing
// It allows you to narrow a type from a union type
// Example ->
// The getNetPrice() function accepts price, discount, and format arguments
function getNetPrice(price, discount, format) {
    var netPrice = price * (1 - discount);
    // returns a value of the union type number | string
    return format ? "$".concat(netPrice) : netPrice;
}
// The following uses the as keyword to instruct the compiler that the value assigned to the netPrice is a string
var netPrice = getNetPrice(100, 0.05, true);
console.log(netPrice); // -> $95
// alternative
var altNetPrice = getNetPrice(100, 0.05, false);
/* ------------------------------------------------------------------------ END OF ADVANCED TYPES ---------------------------------------------------------------------- */ 
//# sourceMappingURL=app.js.map
