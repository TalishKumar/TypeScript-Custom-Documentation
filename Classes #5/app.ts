// tsc app.ts -> compiles the TypeScript file to a JavaScript Executable
// node app.js -> run the compiled JavaScript file

/* -------------------------------------------------------------------------- Intro to classes ------------------------------------------------------------------------- */

// In TypeScript a class is simply syntactical sugar for creating a constructor function and prototypical inheritance
class Person {
    ssn;
    firstName;
    lastName;

    // constructor is a function that executes when an instance of a class (object) is created
    constructor(ssn, firstName, lastName) {

        // The "this" keyword is used to tell the compiler that
        // the variable we are referencing is the variable
        // which is a property of this class, not the variables
        // that we have passed in as arguments for the required
        // parameters when creating a "Person" object

        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // Let's define a method (function that is a property of a class)
    // This "method" will return the full name of the Person
    // Notice how we do not need any parameters in this function to use the variables in this class
    // that is because this function is a member of it's class, so it has access to all the variables
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

// Let's create a Person
let person = new Person("198-98-2006", "John", "Doe"); // Don't forget to provide the arguments for the constructor
console.log(person.getFullName()); // -> John Doe

console.log("");

/* -------------------------------------------------------------------------- Access Modifiers ------------------------------------------------------------------------- */

// Access modifiers are what set the visibility of the properties and methods of classes

// There are 3 access modifiers in TypeScript
// 1) private
// 2) protected
// 3) public

// private - limits the visibility to the same-class only
class PrivatePerson {

    // declare private access modifier for the class properties
    private ssn: string;
    private firstName: string;
    private lastName: string;

    // only the constructor and class methods can access these variables now
    constructor(ssn: string, firstName: string, lastName: string) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // this method will print the full name
    // i.e this method is able to access the 
    // private variables because it is a member of the same class
    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    // to get the ssn, you HAVE to use this method
    getSSN(): string {
        return `${this.ssn}`;
    }
}

let privatePerson = new PrivatePerson("456-78-9012", "Harry", "Potter");
console.log("Private Person's Name:", privatePerson.getFullName()); // -> Private Person's Name: Harry Potter
console.log("Private Person's SSN:", privatePerson.getSSN()); // -> Private Person's SSN: 456-78-9012

console.log("");

// The public modifier allows class properties and methods to be accessible from all locations
// If you don�t specify any access modifier for properties and methods, they will take the public modifier by default
// no example needed

// The protected modifier allows properties and methods of a class to be accessible within the same class and subclasses
// When a child class is created through inheritance of the parent class, it can access protected modifiers

// What does this mean?
// Well, inheritance will be covered later
// However, here is an example ->

// a new class
class ProtectedPerson {

    // protected variables "ssn"
    // Only accessible to this class and classes inherit from this class
    protected ssn: string;
}

// ** BEST PRACTICE ** -> When you consider the visibility of properties and methods
// it is a good practice to start with the least visible access modifier, which is private

/* ------------------------------------------------------------------------------ Readonly ----------------------------------------------------------------------------- */

// readonly modifier allows you to mark the properties of a class immutable

// readonly can only be used in two places:
// 1) in the property declaration
// 2) in the constructor of the same class

// Example ->
class ReadonlyPerson {

    // readonly declaration
    readonly birthDate: Date;

    // class constructor
    constructor(birthDate: Date) {
        this.birthDate = birthDate;
    }
}

// the birthdate property is a readonly property that is initialized in the constructor of the "ReadonlyPerson" class

// we are able to initialize an instance of the "ReadonlyPerson" class and set the "birthDate" property
let readonlyPerson = new ReadonlyPerson(new Date(2022, 12, 12));

// However, we CANNOT change this property anymore
// person.birthDate = new Date(1991, 12, 25); -> Compile error

/** readonly vs const **/
// readonly is used for Class properties and is initialized in the declaration or in the constructor of the same class
// const is used for variables and is initialized in the declaration of those variables

/* -------------------------------------------------------------------------- Getters & Setters ------------------------------------------------------------------------ */

// a getter method returns the value of the property�s value
// a getter is also called an accessor

// a setter method updates the property�s value
// a setter is also known as a mutator

// Example -> 
class GetSetPerson {

    // declare some private class variable properties
    private age: number;
    private firstName: string;
    private lastName: string;

    // method to "get" the age
    public get getAge() {
        return this.age;
    }

    // method to "set the age
    public set setAge(age: number) {

        // if the age is unreasonable
        if (age <= 0 || age >= 123) {

            // throw an error
            throw new Error("This age is invalid");

            // Otherwise
        } else {

            // set the class property "age" to the provided age argument
            this.age = age;
        }
    }
}

// usage ->
let getSetPerson = new GetSetPerson();
// getSetPerson.age = 25; -> does not work
// we have to use the set and get methods
getSetPerson.setAge = 25; // -> will set the age of this person to 25
console.log(getSetPerson.getAge); // -> 25

console.log("");

/* ----------------------------------------------------------------------------- Inheritance --------------------------------------------------------------------------- */

// A class can reuse the properties and methods of another class
// This is known as inheritance
// The class which inherits properties and methods is called the child class
// And the class whose properties and methods are inherited is known as the parent class

// Example ->
// This is a normal class
class NormalPerson {

    // constructor of the NormalPerson class
    constructor(private firstName: string, private lastName: string) {

        // sets the firstName and lastName of the class
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // returns the full name of the NormalPerson
    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    // an extra method that describes the person (lists the first and last name of the person)
    describe(): string {
        return `This is ${this.firstName} ${this.lastName}.`;
    }
}

// To inherit this class, we need to use the "extends" keyword
// Let's say we have an "NormalEmployee" that is inherited from the "NormalPerson" class
class NormalEmployee extends NormalPerson {

    // constructor for the NormalEmployee class
    constructor (firstName: string, lastName: string, private jobTitle: string) {

        // call the constructor of the NormalPerson class
        // we do this because the NormalPerson class has a constructor 
        // that initializes the firstName and lastName properties
        // you need to initialize these properties in the constructor 
        // of the Employee class by calling its parent class constructor
        super(firstName, lastName);
    }

    // If you want the NormalEmployee class has its own version of the describe() method
    // you can define it in the NormalEmployee class
    /*
     
     describe(): string {
        return super.describe() + `I'm a ${this.jobTitle}.`;
    }
    
    */
}

// Use ->
let employee = new NormalEmployee("John", "Doe", "Front-end Developer");

// because the NormalEmployee inherits it's properties from the NormalPerson class
// you can call the getFullName() and describe() methods on the employee object
console.log(employee.getFullName()); // -> John Doe
console.log(employee.describe()); // -> This is John Doe || This is John Doe.I'm a Web Developer. -> if the overrode method is UNCOMMENTED

/* --------------------------------------------------------------------- Static Methods & Properties ------------------------------------------------------------------- */

// Unlike an instance property, a static property is shared among all instances of a class
// Example -> 
class Employee {

    // this is available across all instances of this class
    static numOfEmp: number = 0;

    constructor(
        private firstName: string,
        private lastName: string,
        private jobTitle: string) {

        // it will increment every time a new object of this class is initialized
        Employee.numOfEmp++;
    }
}

// Use ->
let john = new Employee("John", "Doe", "Front-end Developer");
let jane = new Employee("Jane", "Doe", "Back-end Developer");

console.log(Employee.numOfEmp); // -> 2

// static methods can be declared with the same function and keyword
// you can change the visibility of static properties with access modifiers

console.log(""); 

/* --------------------------------------------------------------------------- Abstract Classes ------------------------------------------------------------------------ */

// Abstract classes are used to define common behaviors that derived classes perform
// Syntax -> abstract class className { some code here... }

// abstract classes contain methods
// An abstract method does not contain implementation
// It only defines the signature of the method without including the method definition
// An abstract method must be implemented in the derived class

// Example -> 
// The following in an abstract class named "Emp" (for Employee)
abstract class Emp {

    // A constructor to declare the firstName and lastName properties
    constructor(private firstName: string, private lastName: string) {
    }

    // The getSalary() method is an abstract method
    // The derived class will implement the logic based on the type of employee.
    abstract getSalary(): number;

    // The getFullName() and compensationStatement() methods contain detailed implementation.
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
    compensationStatement(): string {
        return `${this.fullName} makes ${this.getSalary()} a month.`;
    }
}

// let emp = new Emp("John", "Doe"); -> This is not possible, because we are trying to initialize an abstract class
// We need to inherit the abstract class to actually use it
class FullTimeEmployee extends Emp {

    // Constructor for the FullTimeEmployee Class
    constructor(firstName: string, lastName: string, private salary: number) {

        // Calling the constructor of the parent abstract class
        super(firstName, lastName);
    }

    // Definition of the abstract getSalary() method
    getSalary(): number {
        return this.salary;
    }
}

// Another class can inherit the properties of the abstract class
class Contractor extends Emp {

    // Constructor for the Contractor Class
    constructor(firstName: string, lastName: string, private rate: number, private hours: number) {

        // Calling the constructor of the parent abstract class
        super(firstName, lastName);
    }

    // Definition of the abstract getSalary() method
    getSalary(): number {
        return this.rate * this.hours;
    }
}

// Use ->
let John = new FullTimeEmployee("John", "Doe", 12000);
let Jane = new Contractor("Jane", "Doe", 100, 160);

// Output ->
console.log(John.compensationStatement()); // -> John Doe makes 12000 a month.
console.log(Jane.compensationStatement()); // -> Jane Doe makes 16000 a month.

console.log("");

/* ------------------------------------------------------------------------ *** END OF CLASSES *** --------------------------------------------------------------------- */
