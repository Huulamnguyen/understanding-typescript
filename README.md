## Understanding TypeScript
- A repo that helps me review and understand Basics of TypeScript
- React and MERN Stack

## Table of Contents:
62. [62. "private" and "public" Access Modifiers](#62-private-and-public-access-modifiers)
63. [63. Shorthand Initialization](#63-shorthand-initialization)
64. [64. "readonly" Properties](#64-readonly-properties)

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

```javascript
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
