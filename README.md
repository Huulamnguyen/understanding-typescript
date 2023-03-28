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
