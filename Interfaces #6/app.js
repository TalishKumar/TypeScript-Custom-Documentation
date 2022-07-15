// tsc app.ts -> compiles the TypeScript file to a JavaScript Executable
// node app.js -> run the compiled JavaScript file
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/* -------------------------------------------------------------------------- Type Interface --------------------------------------------------------------------------- */
// Interfaces define the contracts within your code
// They also provide explicit names for type checking.
// Example ->
// function that takes in a person object with the properties of firstName and lastName as an argument
// if you notice, the parameter for this function is quite hard to read, let's use a interface!
function getFullName(person) {
    // Returns the full name
    return "".concat(person.firstName, " ").concat(person.lastName);
}
// the person object
var person = {
    firstName: "John",
    lastName: "Doe"
};
// Output
console.log(getFullName(person)); // -> John Doe
// Now we can use the interface as a type in our function parameter
// Let's recreate the "getFullName" function
function getFullNameWithInterface(person) {
    // Return the full name
    return "".concat(person.firstName, " ").concat(person.lastName);
}
// a new person object
var newPerson = {
    firstName: "Jane",
    lastName: "Doe"
};
// Output
console.log(getFullNameWithInterface(newPerson)); // -> Jane Doe
;
// create a variable with the "INewPersonTwo" interface
var newPersonTwo;
newPersonTwo = {
    ssn: '171-28-0926',
    firstName: 'John',
    lastName: 'Doe'
};
// Now let's use it
// set the variable "format" to the "IStringFormat" interface
var format;
// Define the format function
format = function (str, isUpper) {
    // takes in a string and a boolean
    // if "true" then convert the provided string to upper case
    // else convert the provided string to lower case
    return isUpper ? str.toLocaleUpperCase() : str.toLocaleLowerCase();
};
// Output
console.log(format("hi", true)); // ->  HI
// Let's use it!
// Create a class "Mail" which implements the "IFutureMailable" interface
var Mail = /** @class */ (function () {
    function Mail() {
    }
    // Because we have created this class by implementing the "IFutureMailable" interface
    // we can define the "later" method here
    Mail.prototype.later = function (email, after) {
        console.log("Send email to ".concat(email, " in ").concat(after, " ms."));
        return true;
    };
    // Define the send method
    Mail.prototype.send = function (email) {
        console.log("Sent email to ".concat(email, "."));
        return true;
    };
    // Define the queue method
    Mail.prototype.queue = function (email) {
        console.log("Queue an email to ".concat(email, "."));
        return true;
    };
    return Mail;
}());
// TypeScript allows an interface to extend a class
// In this case, the interface inherits the properties and methods of the class.
// By doing this, you restrict the usage of the interface to only class or subclasses
// of the class from which the interface extends.
// Example ->
// Create a class named "Control"
var Control = /** @class */ (function () {
    function Control() {
    }
    return Control;
}());
// Class "Button" extends the "Control" class which implements the "IStatefulControl" interface
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.enable = function () { };
    return Button;
}(Control));
// What is this one doing? - type it out here
var TextBox = /** @class */ (function (_super) {
    __extends(TextBox, _super);
    function TextBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextBox.prototype.enable = function () { };
    return TextBox;
}(Control));
// Inheritance
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Label;
}(Control));
// Error: cannot implement
/*
 
 class Chart implements IStatefulControl {
    enable() { }

}

*/
/* --------------------------------------------------------------------- *** END OF INTERFACES *** --------------------------------------------------------------------- */ 
//# sourceMappingURL=app.js.map
