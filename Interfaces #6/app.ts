// tsc app.ts -> compiles the TypeScript file to a JavaScript Executable
// node app.js -> run the compiled JavaScript file

/* -------------------------------------------------------------------------- Type Interface --------------------------------------------------------------------------- */

// Interfaces define the contracts within your code
// They also provide explicit names for type checking.

// Example ->
// function that takes in a person object with the properties of firstName and lastName as an argument
// if you notice, the parameter for this function is quite hard to read, let's use a interface!
function getFullName(person: { firstName: string, lastName: string }) {

    // Returns the full name
    return `${person.firstName} ${person.lastName}`;
}

// the person object
let person = {
    firstName: "John",
    lastName: "Doe"
};

// Output
console.log(getFullName(person)); // -> John Doe

// Creating an interface ->

// use the keyword "interface" followed by the name of the interface
// Best Practice -> Type an "I" before the name of the interface to make it clear when you are utilizing the interface
interface IPerson {
    firstName: string;
    lastName: string;
}

// Now we can use the interface as a type in our function parameter
// Let's recreate the "getFullName" function
function getFullNameWithInterface(person: IPerson) {

    // Return the full name
    return `${person.firstName} ${person.lastName}`;
}

// a new person object
let newPerson = {
    firstName: "Jane",
    lastName: "Doe"
};

// Output
console.log(getFullNameWithInterface(newPerson)); // -> Jane Doe

// Interfaces also have optional properties
interface INewPerson {
    firstName: string;
    lastName: string;
    gender?: string; // -> This is no longer a required property
};

// Interfaces can also have readonly properties
// Let's create a new interface with a readonly property
interface INewPersonTwo {
    readonly ssn: string; // this property can only be assigned on initialization
    firstName: string;
    lastName: string;
}

// create a variable with the "INewPersonTwo" interface
let newPersonTwo: INewPersonTwo;
newPersonTwo = {
    ssn: '171-28-0926', // -> this can no longer be changed
    firstName: 'John',
    lastName: 'Doe'
}

// person.ssn = '171-28-0000'; -> will not work / ERROR

// Interfaces also allow you to describe function types
// Example -> 
interface IStringFormat {

    // we have defined that this interface will be used to create
    // a function which will accept a string and a boolean as it's arguments
    // and then return a string
    (str: string, isUpper: boolean): string
}

// Now let's use it
// set the variable "format" to the "IStringFormat" interface
let format: IStringFormat;

// Define the format function
format = (str: string, isUpper: boolean) => {

    // takes in a string and a boolean

    // if "true" then convert the provided string to upper case
    // else convert the provided string to lower case
    return isUpper ? str.toLocaleUpperCase() : str.toLocaleLowerCase();
};

// Output
console.log(format("hi", true)); // ->  HI

/* ------------------------------------------------------------------------ Interface Extending ------------------------------------------------------------------------ */

// Extending interfaces allows you to copy properties and methods
// of one interface to another

// Suppose we have an interface called "IMailable" that contains two methods called send() and queue()
interface IMailable {
    send(email: string): boolean;
    queue(email: string): boolean;
}

// Assume that there are many classes that already implement the "IMailable" interface

// Now, let's say we want to add a new method to the IMailable interface
// that sends an email "later" -> later(email: string, after: number): void;
// Adding this method would break the current functionality of the "IMailable" interface
// especially within the classes that it is utilized

// So solve this, we can create a new interface which extends the IMailable interface
interface IFutureMailable extends IMailable {

    // now let's add the "later" method to this interface
    later(email: string, after: number): boolean;
}

// Let's use it!

// Create a class "Mail" which implements the "IFutureMailable" interface
class Mail implements IFutureMailable {

    // Because we have created this class by implementing the "IFutureMailable" interface
    // we can define the "later" method here
    later(email: string, after: number): boolean {
        console.log(`Send email to ${email} in ${after} ms.`);
        return true;
    }

    // Define the send method
    send(email: string): boolean {
        console.log(`Sent email to ${email}.`);
        return true;
    }

    // Define the queue method
    queue(email: string): boolean {
        console.log(`Queue an email to ${email}.`);
        return true;
    }
}

// Interfaces can extend multiple interfaces as well
// Example ->

// Interface A
interface IA {
    a(): void
}

// Interface B extends interface A
interface IB extends IA {
    b(): void
}

// Interface C
interface IC {
    c(): void
}

// Interface D extends interface B & interface C
interface ID extends IB, IC {
    d(): void
}

// TypeScript allows an interface to extend a class
// In this case, the interface inherits the properties and methods of the class.

// By doing this, you restrict the usage of the interface to only class or subclasses
// of the class from which the interface extends.

// Example ->

// Create a class named "Control"
class Control {
    private state: boolean;
}

// Interface "IStatefulControl" extends the "Control" class
interface IStatefulControl extends Control {
    enable(): void
}

// Class "Button" extends the "Control" class which implements the "IStatefulControl" interface
class Button extends Control implements IStatefulControl {
    enable() { }
}

// What is this one doing? - type it out here
class TextBox extends Control implements IStatefulControl {
    enable() { }
}

// Inheritance
class Label extends Control { }


// Error: cannot implement
/*
 
 class Chart implements IStatefulControl {
    enable() { }

}

*/

/* --------------------------------------------------------------------- *** END OF INTERFACES *** --------------------------------------------------------------------- */