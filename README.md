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