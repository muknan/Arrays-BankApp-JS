'use strict';

/*
///////////////////////////////////////
// ---------- Challenge 1 ---------- //
///////////////////////////////////////
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

car1.accelerate();
car1.brake();
car1.accelerate();

///////////////////////////////////////
// ---------- Challenge 2 ---------- //
///////////////////////////////////////
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log(this.speed);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(s) {
    this.speed = s * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
console.log(ford.speedUS);
ford.speedUS = 50;
console.log(ford.speedUS);

///////////////////////////////////////
// ---------- Challenge 3 ---------- //
///////////////////////////////////////

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `Tesla going at ${this.speed} km/h, with a charge of ${this.charge}`
  );
};

const tesla = new EV('Tesla', 120, 23);

tesla.accelerate();
tesla.brake();
tesla.chargeBattery(100);
tesla.accelerate();
*/

///////////////////////////////////////
// ---------- Challenge 3 ---------- //
///////////////////////////////////////

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log(this.speed);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(s) {
    this.speed = s * 1.6;
  }
}

// Inheritance in ES6 class

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `Tesla going at ${this.speed} km/h, with a charge of ${this.#charge}%`
    );
    return this;
  }
}

const tesla = new EVCl('Tesla', 120, 23);
// tesla.accelerate();
// tesla.brake();
// tesla.chargeBattery(100);
// tesla.accelerate();

tesla.accelerate().chargeBattery(100).brake().accelerate();

/*
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this!
  // this.calcAge = function () {
  //   console.log(2023 - this.birthYear);
  // };
};

const mukul = new Person('Mukul', 1993);
console.log(mukul);

const meena = new Person('Meena', 1963);
const gaurav = new Person('Gaurav', 1990);

console.log(meena instanceof Person);

Person.hey = function () {
  console.log('Hey there 👋');
  console.dir(this);
};

Person.hey();
// mukul.hey() // Error

// Prototypes
Person.prototype.calcAge = function () {
  console.log(2023 - this.birthYear);
};

mukul.calcAge();

console.log(mukul.__proto__ === Person.prototype); // True

console.log(Person.prototype.isPrototypeOf(mukul)); // True
console.log(Person.prototype.isPrototypeOf(Person)); // False

Person.prototype.species = 'Homo Sapiens';
console.log(mukul.species);
console.log(mukul.hasOwnProperty('firstName'));
console.log(mukul.hasOwnProperty('species'));

console.log(mukul.__proto__);
// Object.prototype (top of prototype chain)
console.log(mukul.__proto__.__proto__);
console.log(mukul.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [1, 2, 3, 4, 5];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); // True

// Bad idea to create methods in existing prototype such as Arrays
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };
// console.log([1, 1, 1, 2, 2, 2, 3, 4, 5].unique());

console.log(x => x + 10);

// ES6 classes
// const PersonCl = class {}; or
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet() {
    console.log(`Hey, ${this.fullName}`);
  }
  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else console.log('Not a full name');
  }
  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('Hey there 👋');
    console.dir(this);
  }
}

const tim = new PersonCl('Tim Cook', 2011);
tim.calcAge();
console.log(tim.age);
console.log(tim.__proto__ === PersonCl.prototype);

PersonCl.hey();

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
tim.greet();

const account = {
  owner: 'Mukul',
  movements: [1000, -200, 400, 500],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};
console.log(account.latest);
account.latest = 100;
console.log(account.movements);


const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steve = Object.create(PersonProto);
// steve.name = 'Steven';
steve.birthYear = 2001;
steve.calcAge();
console.log(steve);

const jesse = Object.create(PersonProto);
jesse.init('Jesse', 1986);
console.log(jesse);
jesse.calcAge();

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.hey = function () {
  console.log('Hey there 👋');
  console.dir(this);
};

Person.prototype.calcAge = function () {
  console.log(2023 - this.birthYear);
};

// Inheritance
const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(
    `Hello, my name is ${this.firstName} and I study ${this.course}.`
  );
};

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();

// Inheritance with ES6 classes
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet() {
    console.log(`Hey, ${this.fullName}`);
  }
  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else console.log('Not a full name');
  }
  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('Hey there 👋');
    console.dir(this);
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(
      `Hello, my name is ${this.fullName} and I study ${this.course}.`
    );
  }

  calcAge() {
    console.log(
      `I am ${
        2023 - this.birthYear
      } years old, but as a student I feel more like ${
        2023 - this.birthYear + 10
      }`
    );
  }
}

// const martha = new StudentCl('Martha Jones', 2012);

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

// Inheritance - Object.create
const PersonProto = {
  calcAge() {
    console.log(2023 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steve = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
const yuji = Object.create(StudentProto);

yuji.introduce = function () {
  console.log(
    `Hello, my name is ${this.firstName} and I study ${this.course}.`
  );
};

yuji.init('Yuji', 2005, 'Computer Science');
yuji.calcAge();
yuji.introduce();


class Account {
  // 1) Public fields (instances)
  locale = navigator.language;

  // 2) Private fields (instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;

    // protected property
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account with us ${this.owner}`);
  }

  // 3) Public methods
  // Public interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  // 4) Private methods
  #approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this;
    }
  }

  static helper() {
    console.log('Testing out static method');
  }
}

const acc1 = new Account('Robert', 'EUR', '1111');

// acc1.movements.push(200);
// acc1.movements.push(-150);
acc1.deposit(200);
acc1.withdraw(150);
acc1.requestLoan(1000);
// acc1.approveLoan(1000);
console.log(acc1.getMovements());
console.log(acc1);
// console.log(acc1.#movements);
// console.log(acc1.#pin);
// console.log(acc1.#approveLoan);
Account.helper();

// Chaining
acc1.deposit(300).deposit(500).withdraw(150).requestLoan(1500).withdraw(125);
console.log(acc1.getMovements());
*/
