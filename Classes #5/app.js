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
/* -------------------------------------------------------------------------- Intro to classes ------------------------------------------------------------------------- */
// In TypeScript a class is simply syntactical sugar for creating a constructor function and prototypical inheritance
var Person = /** @class */ (function () {
    // constructor is a function that executes when an instance of a class (object) is created
    function Person(ssn, firstName, lastName) {
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
    Person.prototype.getFullName = function () {
        return "".concat(this.firstName, " ").concat(this.lastName);
    };
    return Person;
}());
// Let's create a Person
var person = new Person("198-98-2006", "John", "Doe"); // Don't forget to provide the arguments for the constructor
console.log(person.getFullName()); // -> John Doe
console.log("");
/* -------------------------------------------------------------------------- Access Modifiers ------------------------------------------------------------------------- */
// Access modifiers are what set the visibility of the properties and methods of classes
// There are 3 access modifiers in TypeScript
// 1) private
// 2) protected
// 3) public
// private - limits the visibility to the same-class only
var PrivatePerson = /** @class */ (function () {
    // only the constructor and class methods can access these variables now
    function PrivatePerson(ssn, firstName, lastName) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    // this method will print the full name
    // i.e this method is able to access the 
    // private variables because it is a member of the same class
    PrivatePerson.prototype.getFullName = function () {
        return "".concat(this.firstName, " ").concat(this.lastName);
    };
    // to get the ssn, you HAVE to use this method
    PrivatePerson.prototype.getSSN = function () {
        return "".concat(this.ssn);
    };
    return PrivatePerson;
}());
var privatePerson = new PrivatePerson("456-78-9012", "Harry", "Potter");
console.log("Private Person's Name:", privatePerson.getFullName()); // -> Private Person's Name: Harry Potter
console.log("Private Person's SSN:", privatePerson.getSSN()); // -> Private Person's SSN: 456-78-9012
console.log("");
// The public modifier allows class properties and methods to be accessible from all locations
// If you don’t specify any access modifier for properties and methods, they will take the public modifier by default
// no example needed
// The protected modifier allows properties and methods of a class to be accessible within the same class and subclasses
// When a child class is created through inheritance of the parent class, it can access protected modifiers
// What does this mean?
// Well, inheritance will be covered later
// However, here is an example ->
// a new class
var ProtectedPerson = /** @class */ (function () {
    function ProtectedPerson() {
    }
    return ProtectedPerson;
}());
// ** BEST PRACTICE ** -> When you consider the visibility of properties and methods
// it is a good practice to start with the least visible access modifier, which is private
/* ------------------------------------------------------------------------------ Readonly ----------------------------------------------------------------------------- */
// readonly modifier allows you to mark the properties of a class immutable
// readonly can only be used in two places:
// 1) in the property declaration
// 2) in the constructor of the same class
// Example ->
var ReadonlyPerson = /** @class */ (function () {
    // class constructor
    function ReadonlyPerson(birthDate) {
        this.birthDate = birthDate;
    }
    return ReadonlyPerson;
}());
// the birthdate property is a readonly property that is initialized in the constructor of the "ReadonlyPerson" class
// we are able to initialize an instance of the "ReadonlyPerson" class and set the "birthDate" property
var readonlyPerson = new ReadonlyPerson(new Date(2022, 12, 12));
// However, we CANNOT change this property anymore
// person.birthDate = new Date(1991, 12, 25); -> Compile error
/** readonly vs const **/
// readonly is used for Class properties and is initialized in the declaration or in the constructor of the same class
// const is used for variables and is initialized in the declaration of those variables
/* -------------------------------------------------------------------------- Getters & Setters ------------------------------------------------------------------------ */
// a getter method returns the value of the property’s value
// a getter is also called an accessor
// a setter method updates the property’s value
// a setter is also known as a mutator
// Example -> 
var GetSetPerson = /** @class */ (function () {
    function GetSetPerson() {
    }
    Object.defineProperty(GetSetPerson.prototype, "getAge", {
        // method to "get" the age
        get: function () {
            return this.age;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetSetPerson.prototype, "setAge", {
        // method to "set the age
        set: function (age) {
            // if the age is unreasonable
            if (age <= 0 || age >= 123) {
                // throw an error
                throw new Error("This age is invalid");
                // Otherwise
            }
            else {
                // set the class property "age" to the provided age argument
                this.age = age;
            }
        },
        enumerable: false,
        configurable: true
    });
    return GetSetPerson;
}());
// usage ->
var getSetPerson = new GetSetPerson();
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
var NormalPerson = /** @class */ (function () {
    // constructor of the NormalPerson class
    function NormalPerson(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        // sets the firstName and lastName of the class
        this.firstName = firstName;
        this.lastName = lastName;
    }
    // returns the full name of the NormalPerson
    NormalPerson.prototype.getFullName = function () {
        return "".concat(this.firstName, " ").concat(this.lastName);
    };
    // an extra method that describes the person (lists the first and last name of the person)
    NormalPerson.prototype.describe = function () {
        return "This is ".concat(this.firstName, " ").concat(this.lastName, ".");
    };
    return NormalPerson;
}());
// To inherit this class, we need to use the "extends" keyword
// Let's say we have an "NormalEmployee" that is inherited from the "NormalPerson" class
var NormalEmployee = /** @class */ (function (_super) {
    __extends(NormalEmployee, _super);
    // constructor for the NormalEmployee class
    function NormalEmployee(firstName, lastName, jobTitle) {
        var _this = 
        // call the constructor of the NormalPerson class
        // we do this because the NormalPerson class has a constructor 
        // that initializes the firstName and lastName properties
        // you need to initialize these properties in the constructor 
        // of the Employee class by calling its parent class constructor
        _super.call(this, firstName, lastName) || this;
        _this.jobTitle = jobTitle;
        return _this;
    }
    return NormalEmployee;
}(NormalPerson));
// Use ->
var employee = new NormalEmployee("John", "Doe", "Front-end Developer");
// because the NormalEmployee inherits it's properties from the NormalPerson class
// you can call the getFullName() and describe() methods on the employee object
console.log(employee.getFullName()); // -> John Doe
console.log(employee.describe()); // -> This is John Doe || This is John Doe.I'm a Web Developer. -> if the overrode method is UNCOMMENTED
/* --------------------------------------------------------------------- Static Methods & Properties ------------------------------------------------------------------- */
// Unlike an instance property, a static property is shared among all instances of a class
// Example -> 
var Employee = /** @class */ (function () {
    function Employee(firstName, lastName, jobTitle) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobTitle = jobTitle;
        // it will increment every time a new object of this class is initialized
        Employee.numOfEmp++;
    }
    // this is available across all instances of this class
    Employee.numOfEmp = 0;
    return Employee;
}());
// Use ->
var john = new Employee("John", "Doe", "Front-end Developer");
var jane = new Employee("Jane", "Doe", "Back-end Developer");
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
var Emp = /** @class */ (function () {
    // A constructor to declare the firstName and lastName properties
    function Emp(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    Object.defineProperty(Emp.prototype, "fullName", {
        // The getFullName() and compensationStatement() methods contain detailed implementation.
        get: function () {
            return "".concat(this.firstName, " ").concat(this.lastName);
        },
        enumerable: false,
        configurable: true
    });
    Emp.prototype.compensationStatement = function () {
        return "".concat(this.fullName, " makes ").concat(this.getSalary(), " a month.");
    };
    return Emp;
}());
// let emp = new Emp("John", "Doe"); -> This is not possible, because we are trying to initialize an abstract class
// We need to inherit the abstract class to actually use it
var FullTimeEmployee = /** @class */ (function (_super) {
    __extends(FullTimeEmployee, _super);
    // Constructor for the FullTimeEmployee Class
    function FullTimeEmployee(firstName, lastName, salary) {
        var _this = 
        // Calling the constructor of the parent abstract class
        _super.call(this, firstName, lastName) || this;
        _this.salary = salary;
        return _this;
    }
    // Definition of the abstract getSalary() method
    FullTimeEmployee.prototype.getSalary = function () {
        return this.salary;
    };
    return FullTimeEmployee;
}(Emp));
// Another class can inherit the properties of the abstract class
var Contractor = /** @class */ (function (_super) {
    __extends(Contractor, _super);
    // Constructor for the Contractor Class
    function Contractor(firstName, lastName, rate, hours) {
        var _this = 
        // Calling the constructor of the parent abstract class
        _super.call(this, firstName, lastName) || this;
        _this.rate = rate;
        _this.hours = hours;
        return _this;
    }
    // Definition of the abstract getSalary() method
    Contractor.prototype.getSalary = function () {
        return this.rate * this.hours;
    };
    return Contractor;
}(Emp));
// Use ->
var John = new FullTimeEmployee("John", "Doe", 12000);
var Jane = new Contractor("Jane", "Doe", 100, 160);
// Output ->
console.log(John.compensationStatement()); // -> John Doe makes 12000 a month.
console.log(Jane.compensationStatement()); // -> Jane Doe makes 16000 a month.
console.log("");
/* ------------------------------------------------------------------------ *** END OF CLASSES *** --------------------------------------------------------------------- */ 
//# sourceMappingURL=app.js.map