## Understanding TypeScript
- A repo that helps me review and understand Basics of TypeScript
- React and MERN Stack

## Table of Contents:
62. [62. "private" and "public" Access Modifiers](#62-private-and-public-access-modifiers)
63. [63. Shorthand Initialization](#63-shorthand-initialization)
64. [64. "readonly" Properties](#64-readonly-properties)
65. [65. Inheritance](#65-inheritance)
66. [66. Overriding Properties & The "protected" Modifier](#66-overriding-properties)
67. [67. Getters & Setters](#67-getters-setters)
68. [68. Static Methods & Properties](#68-static-method-properties)
69. [69. Abstract Classes](#69-abstract-classes)
70. [70. Singletons & Private Constructors](#70-singletons-private-constructors)
72. [72. A First Interface](#72-a-first-interface)
73. [73. Using Interfaces with Classes](#73-using-interfaces-with-classes)
74. [74. Why Interfaces?](#74-why-interfaces)
75. [75. Readonly Interface Properties](#75-readonly-interface-properties)
76. [76. Extending Interfaces](#76-extending-interfaces)
77. [77. Interfaces as Function Types](#77-interfaces-as-function-types)
78. [78. Optional Parameters & Properties](#78-optional-parameters-properties)
79. [79. Compiling Interfaces to JavaScript](#79-compiling-interfaces-to-javascript)

--------------------------------
## [Section 6: Advanced Types] (#section-6-advanced-types)
82. [82. Module Introduction](#82-module-introduction)
83. [83. Intersection Types](#83-intersection-types)
84. [84. More on Type Guards](#84-more-on-type-guards)
85. [85. Discriminated Unions](#85-discriminated-unions)
86. [86. Type Casting](#86-type-casting)
87. [87. Index Properties](#87-index-properties)
88. [88.Function Overloads](#88-function-overloads)
89. [89. Optional Chaining](#89-optional-chaining)
90. [90. Nullish Coalescing](#90-nullish-coalescing)

--------------------------------

### 62. "private" and "public" Access Modifiers <a name="62-private-and-public-access-modifiers"></a>
- `public` keyword: default
- `private` keywork: can ONLY be accessed inside a Class
- Source: ["private" and "public" Access Modifiers](https://github.com/Huulamnguyen/understanding-typescript/tree/main/cl-interfaces-03-private-and-public)

### 63. Shorthand Initialization <a name="63-shorthand-initialization"></a>
- Will update later

### 64. "readonly" Properties <a name="64-readonly-properties"></a>
- `readonly`: To make it clear that it shouldn't change 
- `readonly` is introduced by TypeScript, it does not exist in JavaScript.
- It makes sure that if you try to write to its property thereafter, you fail. So you can only use it once during initialization
- Code example:

```typescript
    class Department {
    // private readonly id: string;
    // private name: string;
        private employees: string[] = [];

        constructor(private readonly id: string, public name: string) {
            // this.id = id;
            // this.name = n;
        }

        describe(this: Department) {
            console.log(`Department (${this.id}): ${this.name}`);
        }

        addEmployee(employee: string) {
            // validation etc
            // this.id = 'd2';
            this.employees.push(employee);
        }

        printEmployeeInformation() {
            console.log(this.employees.length);
            console.log(this.employees);
        }
    }

    const accounting = new Department('d1', 'Accounting');

    accounting.addEmployee('Max');
    accounting.addEmployee('Manu');

    // accounting.employees[2] = 'Anna';

    accounting.describe();
    accounting.name = 'NEW NAME';
    accounting.printEmployeeInformation();

    // const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

    // accountingCopy.describe();
```

### 65. Inheritance <a name="65-inheritance"></a>

You have an Class Department:

```typescript
    class Department {
        // private readonly id: string;
        // private name: string;
        private employees: string[] = [];

        constructor(private readonly id: string, public name: string) {
            // this.id = id;
            // this.name = n;
        }

        describe(this: Department) {
            console.log(`Department (${this.id}): ${this.name}`);
        }

        addEmployee(employee: string) {
            // validation etc
            // this.id = 'd2';
            this.employees.push(employee);
        }

        printEmployeeInformation() {
            console.log(this.employees.length);
            console.log(this.employees);
        }
    }
```

Now, let create specialize department called "ITDepartment" and inherite the Departmant Class by `extends` keyword:

```typescript
    class ITDepartment extends Department {
        admins: string[];
        constructor(id: string, admins: string[]) {
            super(id, 'IT');
            this.admins = admins;
        }
    } 
```
```typescript
    // Check new it department
    const it = new ITDepartment('d1', ['Max']);

    it.addEmployee('Max');
    it.addEmployee('Manu');

    // it.employees[2] = 'Anna';

    it.describe();
    it.name = 'NEW NAME';
    it.printEmployeeInformation();

    console.log(it);
```

You now can create a new deprtment called 'AccountingDepartment' and its own properties:
```typescript
    class AccountingDepartment extends Department {
        constructor(id: string, private reports: string[]) {
            super(id, 'Accounting');
        }

        addReport(text: string) {
            this.reports.push(text);
        }

        printReports() {
            console.log(this.reports);
        }
    }
```
```typescript
    const accounting = new AccountingDepartment('d2', []);
    accounting.addReport('Something went wrong...');
    accounting.printReports();
```

- Whenever you add your own constructor in a class that inherits from another class, you have to add `super` in the inheriting class and you have to execute it like a function.
- Super here calls the constructor of the base class, so department constructor in this case. And now the other super takes the arguments of the parent class constructor, the ID, and the name. So here I can forward ID, so ID which I'm getting here is just passed to super, and I can hard code a value for the name, like IT.
- Now, important, you have to call super first in your constructor before you do anything with the `this` keyword.

### 66. Overriding Properties & The "protected" Modifier <a name="66-overriding-properties"></a>

- You can override methods of your base class. You can add your own implementation, and then that implementation is used, instead of the base class's implementation.

- For example, you can create a method called `addEmployee` to `AccountingDepartment` class:

```typescript
    class AccountingDepartment extends Department {
        constructor(id: string, private reports: string[]) {
            super(id, 'Accounting');
        }

        addEmployee(name: string) {
            if (name === 'Max') {
            return;
            }
            this.employees.push(name);
        }

        addReport(text: string) {
            this.reports.push(text);
        }

        printReports() {
            console.log(this.reports);
        }
    }
```

- And, you also have to control access to properties from the base Class with `protected`.
- `protected` keyword: `protected` is like `private`, but unlike `private`, it's now not just available in this class, but also in any class that extends this class.
- For example: 

```typescript
    class Department {
        // private readonly id: string;
        // private name: string;
        protected employees: string[] = [];

        constructor(private readonly id: string, public name: string) {
            // this.id = id;
            // this.name = n;
        }

        describe(this: Department) {
            console.log(`Department (${this.id}): ${this.name}`);
        }

        addEmployee(employee: string) {
            // validation etc
            // this.id = 'd2';
            this.employees.push(employee);
        }

        printEmployeeInformation() {
            console.log(this.employees.length);
            console.log(this.employees);
        }
    }
```

### 67. Getters & Setters <a name="67-getters-setters"></a>

- A getter `get `is basically a property, where you execute a function or method, when you retrieve a value and that allows you as a developer to add more complex logic. Here, you create a getter by using the get keyword, and then any name of your choice. Typically closely related to the property you're trying to control the access to.
- Getter `get` should return something.

- A setter `set` to set a value to a property. Setter need to take an argument.

- So these are getters and setters, which can be great for encapsulating logic, and for adding extra logic, that should run when you try to read a property, or when you try to set a property. 

- Take a look at the example below:

```typescript
    class AccountingDepartment extends Department {
        private lastReport: string;

        get mostRecentReport() {
            if (this.lastReport) {
            return this.lastReport;
            }
            throw new Error('No report found.');
        }

        set mostRecentReport(value: string) {
            if (!value) {
            throw new Error('Please pass in a valid value!');
            }
            this.addReport(value);
        }

        constructor(id: string, private reports: string[]) {
            super(id, 'Accounting');
            this.lastReport = reports[0];
        }

        addEmployee(name: string) {
            if (name === 'Max') {
            return;
            }
            this.employees.push(name);
        }

        addReport(text: string) {
            this.reports.push(text);
            this.lastReport = text;
        }

        printReports() {
            console.log(this.reports);
        }
    }
```
```typescript

const accounting = new AccountingDepartment('d2', []);

accounting.mostRecentReport = 'Year End Report';
accounting.addReport('Something went wrong...');
console.log(accounting.mostRecentReport);
```
### 68. Static Methods & Properties <a name="68-static-method-properties"></a>

- Static `static` properties and methods allow you to add properties and methods to classes which are not accessed on an instance of the class, so where you don't need to call new class name first, but which you access directly on the class.
- For example: on the `Department` class, we want a method `createEmployee` and that is something we might wanna be able to access without instantiating `Department` class. Take a look at the code below:

```typescript
    class Department {
        // private readonly id: string;
        // private name: string;
        private employees: string[] = [];

        static fiscalYear = 2020;

        static createEmployee(name: sting){
            return {name: name};s
        }

        constructor(private readonly id: string, public name: string) {
            // this.id = id;
            // this.name = n;
            console.log(Department.fiscalYear);
        }

        describe(this: Department) {
            console.log(`Department (${this.id}): ${this.name}`);
        }

        addEmployee(employee: string) {
            // validation etc
            // this.id = 'd2';
            this.employees.push(employee);
        }

        printEmployeeInformation() {
            console.log(this.employees.length);
            console.log(this.employees);
        }
    }
```

- Create a new employee, we call it directly on the class, without the `new` keyword. For example:

```typescript
    const employee1 = Department.createEmployee('Liam');
    console.log(employee1)
    console.log(Department.fiscalYear)
```

- Note: you can only access static method and properties by use the class name NOT `this` keyworld.

### 69. Abstract Classes <a name="69-abstract-classes"></a>

- Another way of adding methods to classes, which you plan to inherit from.
- You can override a mehtod from base class in your specilize class inheriting from the base class.
- `abstract` keyword

```typescript
    abstract class Department {
        static fiscalYear = 2020;
        // private readonly id: string;
        // private name: string;
        protected employees: string[] = [];

        constructor(protected readonly id: string, public name: string) {
            // this.id = id;
            // this.name = n;
            // console.log(Department.fiscalYear);
        }

        static createEmployee(name: string) {
            return { name: name };
        }

        abstract describe(this: Department): void;

        addEmployee(employee: string) {
            // validation etc
            // this.id = 'd2';
            this.employees.push(employee);
        }

        printEmployeeInformation() {
            console.log(this.employees.length);
            console.log(this.employees);
        }
    }
```

```typescript
    class ITDepartment extends Department {
        admins: string[];
        constructor(id: string, admins: string[]) {
            super(id, 'IT');
            this.admins = admins;
        }

        describe() {
            console.log('IT Department - ID: ' + this.id);
        }
    }
```

```typescript
    class AccountingDepartment extends Department {
        private lastReport: string;

        get mostRecentReport() {
            if (this.lastReport) {
            return this.lastReport;
            }
            throw new Error('No report found.');
        }

        set mostRecentReport(value: string) {
            if (!value) {
            throw new Error('Please pass in a valid value!');
            }
            this.addReport(value);
        }

        constructor(id: string, private reports: string[]) {
            super(id, 'Accounting');
            this.lastReport = reports[0];
        }

        describe() {
            console.log('Accounting Department - ID: ' + this.id);
        }

        addEmployee(name: string) {
            if (name === 'Max') {
            return;
            }
            this.employees.push(name);
        }

        addReport(text: string) {
            this.reports.push(text);
            this.lastReport = text;
        }

        printReports() {
            console.log(this.reports);
        }
    }
```

```typescript
    it.describe();
    accounting.describe();
```

### 70. Singletons & Private Constructors <a name="70-singletons-private-constructors"></a>

- The "singleton" pattern is about ensuring that you always only have exactly one instance of a certain class.
- This can be useful in scenarios where you somehow can't use static methods or properties or you don't want to, but at the same time you want to make sure that you can't create multiple objects based on a class but that you always have exactly one object based on a class.

- For example:

Let's say for our `AccountingDepartment`, we wanna make sure that we can only create exactly one object based on this class, because we have exactly one accounting department in our entire company.

We might have more than one IT department but we have exactly one accounting department. Now to enforce this and to avoid that we manually call new `AccountingDepartment` multiple times, we can turn the constructor of the `AccountingDepartment` class into a **private constructor** by adding the `private` keyword in front of it.

```typescript
    class AccountingDepartment extends Department {
    private lastReport: string;

    // ... Remainging codes

    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    // ... remainging codes

}
```

Now what this does is, it ensures that we can't call new on this. You will get an error because the constructor is private so it's only accessible from inside the class.

which sounds strange because how do we get inside of the class if we can't create objects based on it anymore. The answer is, well, **static methods**.

So here we can add a static method which we could call getInstance. Now getInstance will check if we already have an instance of this class and if not, return a new one

For that we can add a new static property instance, a static private property so you can put private in front of static called instance which will be of type `AccountingDepartment`.

```typescript
    class AccountingDepartment extends Department {
        private lastReport: string;
        private static instance: AccountingDepartment;

        // ... remaining codes ...

        private constructor(id: string, private reports: string[]) {
            super(id, 'Accounting');
            this.lastReport = reports[0];
        }

        static getInstance() {
            if (AccountingDepartment.instance) {
            return this.instance;
            }
            this.instance = new AccountingDepartment('d2', []);
            return this.instance;
        }

        // ... remaining code ...

    }
```

The singleton pattern can sometimes be useful, you don't need it all the time, but it's definitely worth to know about it because it is something interesting which you can easily implement with TypeScript thanks to `private` constructors.

### 72. A First Interface <a name="72-a-first-interface"></a>

- What is an interface? in its simplest version, an **interface** describes the structure of an object. We can use it to describe how an object should look like.

- For example:

```typescript
interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
}

let user1: Person;

user1 = {
  name: 'Max',
  age: 30,
  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
};

user1.greet('Hi there - I am');
```

### 73. Using Interfaces with Classes <a name="73-using-interfaces-with-classes"></a>

- When you define something as an interface, it's super clear that you want to define the structure of an object with that. And indeed when it comes to defining object types, you more often see interfaces out there in the wild.

- So here, we could now add a Person class, the name is available again because we renamed the interface. And now, tell typescript and this class should basically adhere to this interface. It should implement this interface.

- We do this by adding the `implements` keyword after the class name. 

- You can inherit only from one class, you can implement multiple interfaces by simply separating them with a comma,

```typescript
interface Greetable {
  name: string;

  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age = 30;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
}
```
```typescript
let user1: Greetable;
user1 = new Person('Max');
user1.greet('Hi there - I am');
console.log(user1);
```

### 74. Why Interfaces? <a name="74-why-interfaces"></a>
- where we know we want to have a certain set of functionalities.
- Let's say a greet method, and we want to ensure that a clause has such a greet method, and another clause has it maybe as well, well, then, we can implement an interface which forces the existence of this method. Then we can easily share functionality amongst clauses

### 75. Readonly Interface Properties <a name="75-readonly-interface-properties"></a>
- you can also add the read-only `readonly` modifier.
- You cannot add `public` or `private` or anything like that

```typescript
interface Greetable {
  readonly name: string;

  greet(phrase: string): void;
}
```

- You can not re-write a read-only property from the interface.

### 76. Extending Interfaces <a name="76-extending-interfaces"></a>
- `Greetable` interface actually extends the `Named` interface, so that together, they form a new interface, which forces every object based on Greetable to have a greet method, but also to have a name. And to do that, we can add `extends` keywork.

```typescript
interface Named {
  readonly name: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}
```

```typescript
class Person implements Greetable {
  name: string;
  age = 30;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
}
```

```typescript
let user1: Greetable;

user1 = new Person('Max');
// user1.name = 'Manu';

user1.greet('Hi there - I am');
console.log(user1);
```

- So extending interfaces is possible. And there you can also extend more than one. So you can merge multiple interfaces into one single interface.

```typescript
interface Named {
  readonly name: string;
}

interface Greetable extends Named, AnotherInterface, AnotherInterface1 {
  greet(phrase: string): void;
}
```

- NOTE: When you use classes in inheritance, you can only inherit from one class.

### 77. Interfaces as Function Types <a name="77-interfaces-as-function-types"></a>

- Now, interfaces can also be used to define the structure of a function.

```typescript
// type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};
```

### 78. Optional Parameters & Properties <a name="78-optional-parameters-properties"></a>

- You can also define optional properties in interfaces and also in classes
- You can specify an optional property by adding a question mark after the property name.

```typescript
interface Named {
  readonly name?: string;
  outputName?: string;
}
```

- Now on a class you can also have an optional property.
- So that would be optional properties both in a **class** and in an **interface** and also in my **constructor** list here.

```typescript
interface Named {
  readonly name?: string;
  outputName?: string;
}

class Person implements Greetable {
  name?: string;
  age = 30;

  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }
}

let user1: Greetable;

user1 = new Person();
// user1.name = 'Manu';

user1.greet('Hi there - I am');
console.log(user1);
```

### 79. Compiling Interfaces to JavaScript <a name="79-compiling-interfaces-to-javascript"></a>

At runtime, no trace will be left of these interfaces. You'll not see anything related to the interfaces in your code, only functions, classes, and all the other code is compiled in output. They're used during compilation to check your code and then they're ignored.

## Section 6: Advanced Types <a name="section-6-advanced-types"></a>

### 82. Module Introduction <a name="82-module-introduction"></a>

- **Intersection types**, what that is and why it mighty be useful.

- **Type guards**, what we can do with those

- **Discriminated unions**, fancy term for a quite interesting topic.

- We'll also have a look at **type casting** a useful feature for telling typescripts about the type of something in cases where typescript is not able to find out which type something has on its own.

- We'll have a look at **function overloads**, a pretty neat feature that allows us to write more flexible functions with better types of support than we might otherwise get it.

### 83. Intersection Types <a name="83-intersection-types"></a>
- Intersection types allow us to combine other types.
```typescript
type Admin = {
  name: string;
  privileges: string[];
};
```
```typescript
type Employee = {
  name: string;
  startDate: Date;
};
```

- You can combine type Admin and type Employee **object type**:
```typescript
type ElevatedEmployee = Admin & Employee;
```
```typescript
const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date()
};
```

- Interface can also be combined as type.
```typescript
interface ElevatedEmployee extends Employee, Admin {}
```

- Intersection type can combine any types like **union type**:
```typescript
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;
```

So the intersection operator can be used with any types and it then simply builds the intersection of these types.
- In the case of a **union type**, that is basically the types they have in common.
- In the case of **object types**, it's simply the combination of these object properties.

### 84. More on Type Guards <a name="84-more-on-type-guards"></a>

- **Type guards** is just a term that describes the idea or approach of checking if a certain property or method exists before you try to use it.
- For **objects**, that can be done with **instanceof** or with **in**:
```typescript
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name: ' + emp.name);
  if ('privileges' in emp) {
    console.log('Privileges: ' + emp.privileges);
  }
  if ('startDate' in emp) {
    console.log('Start Date: ' + emp.startDate);
  }
}

printEmployeeInformation({ name: 'Manu', startDate: new Date() });
```
```typescript
class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...');
  }

  loadCargo(amount: number) {
    console.log('Loading cargo ...' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);
```

- for other types, you can use **typeof**:
```typescript
type Combinable = string | number;

function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
```

### 85. Discriminated Unions <a name="85-discriminated-unions"></a>

- Now this is a discriminated union because we have one common property in every object that makes up our union, which describes that object, so that we can use this property that describes this object in our check to have 100% type safety and understand which properties are available for such an object and which properties are not.

- Useful pattern which you can use when working with **objects** and with **union types**, **interfaces**.

```typescript
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }
  console.log('Moving at speed: ' + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 10});
```

### 86. Type Casting <a name="86-type-casting"></a>

- **Type casting** helps you tell TypeScript that some value is of a specific type where TypeScript is not able to detect it on it's own.
- For example, if you have <p></p> tag, typescript is actually able to find out but not sure it is an **element** or **null**.

- There are two ways to case a type in TS:
```typescript
const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
```
OR
```typescript
const userInputElement = document.getElementById('user-input') as HTMLInputElement;
```

- The explanation mark (!) allows us to tell TypeScript that the expression in front of it will never yield **null**.
- Otherwise, if you're not sure that this will not return null, you can use an **if** check.
```typescript
const userInputElement = document.getElementById('user-input');

if (userInputElement) {
  (userInputElement as HTMLInputElement).value = 'Hi there!';
}
```

### 87. Index Properties <a name="87-index-properties"></a>

Let's say your writing an application where you're validating some user input. So you have multiple input fields and depending on what the user enters there and which field it is, you might wanna store and eventually show different error messages.

For example, if it's an email field you wanna check whoever it is in the email and if it is not then you wanna add a proper error message to the error container

I want this to be a flexible container. I want to be able to use it on any form I have in my webpage. And I might have different forms with different inputs with different identifier. So I don't want to restrict myself to just our email and username errors.

And for such a scenario we can use index types.

```typescript
interface ErrorContainer { // { email: 'Not a valid email', username: 'Must start with a character!' }
  [prop: string]: string;
}
```
This says I don't know the exact property name. I also don't know the property count. I just know that every property which is added to this object, which is based on error container, must have a property name which can be interpreted as a **string** and the value of the property also must be a **string**.

And now, we can create an error:
```typescript
const errorBag: ErrorContainer = {
  email: 'Not a valid email!',
  username: 'Must start with a capital character!'
};
```

### 88.Function Overloads <a name="88-function-overloads"></a>

- **Overloads** is a feature that allows us to define multiple function signatures.
- We can have multiple possible ways of calling a function with different parameters.
- A function overload is written by simply writing function right above your main function.
- Overload is used in situations  where TypeScript would not be able to correctly infer the return type on its own

```typescript
type Combinable = string | number;

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
```

### 89. Optional Chaining <a name="89-optional-chaining"></a>

Let say you fetch user data from backend or from any data source like API. And if you wouldn't know whether the object is defined or not. In typescript, we can use **optional chaining**. For example:

```typescript
const fetchedUserData = {
    id: 1,
    name: "Liam",
    job: { title: "CEO", description: "My own company"}
}
console.log(fetchedUserData?.job?.title)
```

### 90. Nullish Coalescing <a name="90-nullish-coalescing"></a>

Now loosely related to **optional chaining**, we got another nice feature in TypeScript, which helps us deal with nullish data. And that feature is called **nullish coalescing**.

Now imagine you have some data, some input, where you don't know with certainty whether it's null or undefined or whether it's actually a valid piece of data.

If you are fetching this through some DOM API, where you don't know it with certainty, or if you're getting this from a back-end, then you might not know in advance and TypeScript might not know whether this is null or not.

If you then want to store this in some other constant or variable like storedData, you might wanna make sure that if it is null, you store a fallback value.

The double question mark operator ??, this is called the nullish coalescing operator. And it means if this is **null** or **undefined**, and really just that, **not an empty string, not zero**, really just **null** or **undefined**, then we'll use the fallback.

```typescript
const userInput = undefined;

const storedData = userInput ?? 'DEFAULT';

console.log(storedData);
```