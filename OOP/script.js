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
*/
