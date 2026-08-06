//! class return {} always

// class JS {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

// class User {
//   name: string;
//   age: number;

//   constructor(name: string, age: number) {
//     this.name = name;
//     this.age = age;
//   }
//   getName(this: User) {
//     console.log(this.name);
//   }
// }

//! ідентичний запис
//    constructor(name: string, age: number) {
//     this.name = name;
//     this.age = age;
//   }

// function name(name, age) {
//   const obj = {};
//   obj.name = name;
//   obj.age = age;
//   return obj;
// }

// name("dd", 27);

// const newUser = new User("some, name", 28);

//.bind(newUser)

// const copy = { getName: newUser.getName.bind(newUser) };
// copy.getName();

// Модифікатори доступу JS/TS

// class A {
//   #private = "Private value";
// }

// class B {
//   someValue = "Private value";
// }

// class User {
//   #email;
//   static counter = 0;
//   static addUser() {
//     this.counter += 1;
//   }

//   constructor(name: string, age: number, email: string) {
//     this.name = name;
//     this.age = age;
//     this.#email = email;
//     User.addUser();
//   }

//   #privateMethod() {}

//   get email() {
//     return this.#email;
//   }

//   set email(newEmail: string) {
//     if (newEmail.includes("@gmail.com")) {
//       this.#email = newEmail;
//       return;
//     }
//     alert("INVALID EMAIL");
//   }
// }

// const newObk = new User("df", 13, "2@gmUseril.com");

// console.log(newObk.email);
// newObk.email = "fff@gmail.com";

// console.log(User.addUser);

// class Human extends User {
//   public hp: number;
//   public damage: number;

//   constructor(
//     name: string,
//     age: number,
//     street: string,
//     hp: number,
//     damage: number,
//   ) {
//     super(name, age, street);
//     this.hp = hp;
//     this.damage = damage;
//   }

//   attack() {
//     console.log(`ATTACK with power ${this.damage}`);
//   }
// }

// const human1 = new Human("ff", 22, "", 1, 22);
// console.log(human1);

// interface IUser {
//   email: string;
//   login: string;
// }

// class User {
//   private email: string;
//   public login: string;

//   constructor({ email, login }: IUser) {
//     this.email = email;
//     this.login = login;
//   }

//   get getEmail() {
//     return this.email;
//   }
//   set setEmail(newEmail: string) {
//     this.email = newEmail;
//   }

//   get getLogin() {
//     return this.login;
//   }

//   set setLogin(newLogin: string) {
//     this.login = newLogin;
//   }
// }

// const newUSer = new User({
//   email: "newName",
//   login: "2i1f230",
// });

// console.log(newUSer.login);

class User {
  constructor(
    private name: string,
    private surname: string,
    public year: number,
  ) {}

  public getFullName() {
    return `Студент ${this.name} ${this.surname} вступив ${this.year}  року`;
  }
}

class Student extends User {
  constructor(name: string, surname: string, year: number) {
    super(name, surname, year);
  }

  getCourse() {
    const currYear = Number(new Date().getFullYear());
    const currCourse = currYear - this.year;
    const dateGaduate = currCourse > 5 ? currYear - currCourse : currCourse;
    const actualCourse = currCourse === 0 ? 1 : currCourse;

    return actualCourse > 5
      ? `ВИПУCТИВСЯ В ${dateGaduate} `
      : `НА ${actualCourse} курсі`;
  }
}

const newStudent = new Student("User", "userr", 2021);
console.log(newStudent.getCourse());
console.log(newStudent.getFullName());
