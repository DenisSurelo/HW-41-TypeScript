// class House {
//   street: string;
//   constructor(name: string) {
//     this.street = name;
//   }

//   showAddress(this: House) {
//     console.log(this.street);
//   }
// }

// const newHouse = new House("sterr?2 5");
// newHouse.showAddress();

// const newHouseCopy = { street: "ergfergr", showAddress: newHouse.showAddress };
// newHouseCopy.showAddress();

// class A {
//   private someProperty = "str";
// }

// class B extends A {
//   showProperty() {
//     console.log(this.someProperty);
//   }
// }

// class A {
//   protected someProperty = "str";
// }

// class B extends A {
//   showProperty() {
//     console.log(this.someProperty);
//   }
// }

// const a = new A();
// const b = new B();

// a.someProperty;
// b.someProperty;
// b.showProperty();

// class House {
//   constructor(
//     private readonly type: string,
//     private street: string,
//   ) {}
// }

// class StoneHouse extends House {
//   constructor(street: string) {
//     super("sss", street); // Виклик батьківскього конструктора
//   }
// }

// const stone = new StoneHouse("Stone-some");
// console.log(stone);

// 	type PersonInformation = {
//     firstName?: string;
//     lastName?: string;
//   };

//   class Person {
//     private personInfo: PersonInformation = {};

//     set firstName(value: string) {
//       console.log("firstName added");
//       this.personInfo.firstName = value;
//     }

//     set lastName(value: string) {
//       console.log("lastName added");
//       this.personInfo.lastName = value;
//     }

//     get info() {
//       const { personInfo } = this;
//       return `${personInfo.lastName} ${personInfo.firstName}`;
//     }
//   }

//   const person = new Person();

//   person.lastName = "Pupkin";
//   person.firstName = "Petha";

//   console.log(person.info);

// class UserStatic {
//   private static count = 0;

//   constructor() {
//     UserStatic.count += 1;
//   }

//   public static isStaticMethod() {
//     console.log("RUN STATIC");
//   }

//   public showCount() {
//     console.log(UserStatic.count);
//   }
// }

// const obj1 = new UserStatic();
// const obj2 = new UserStatic();
// const obj3 = new UserStatic();

// obj1.showCount();
// obj2.showCount();
// obj3.showCount();
// UserStatic.isStaticMethod();

// abstract class Plane {
//   protected pilotInCabin: boolean = false;
//   public sitInPlan() {
//     this.pilotInCabin = true;
//   }

//   public abstract startEngine(): boolean;
// }

// class Maize extends Plane {
//   public startEngine() {
//     // Запускаємо гвинти двигуна
//     return true;
//   }
// }

// class Boeing extends Plane {
//   public startEngine() {
//     // Розігріваємо реактивні турбіни
//     return true;
//   }
// }

// interface IPerson {
//   name: string;
//   age: number;

//   greet(phrase: string): void;
// }

// interface IPilot {
//   flyMessage(): void;
// }
// class Pilot implements IPerson, IPilot {
//   constructor(
//     public name: string,
//     public age: number,
//   ) {
//     if (this.age < 28) {
//       throw new Error("Pilot too young");
//     }
//   }

//   greet(phrase: string): void {
//     console.log(phrase + " " + this.name);
//   }
//   flyMessage(): void {
//     console.log("FLYING");
//   }
// }

// abstract class Plane {
//   protected pilot?: IPilot;

//   public sitInPlane(pilot: IPilot) {
//     this.pilot = pilot;
//   }

//   public abstract startEngine(): boolean;
// }

// class Boeing extends Plane {
//   public startEngine(): boolean {
//     if (!this.pilot) {
//       throw new Error("No pilot");
//     }
//     console.log("START");
//     this.pilot.flyMessage();
//     return true;
//   }
// }

// const boeing = new Boeing();
// const pilot = new Pilot("John", 30);

// pilot.greet("GREETINGS");
// boeing.sitInPlane(pilot);
// boeing.startEngine();

// interface IReadonly {
//   readonly admin: string;
// }

// const user: IReadonly = {
//     admin: "dd"
// }
// user.admin = 'K'

// interface IPerson {
//   name: string;
//   age: number;
//   greetings(text: string): void;
// }

// interface IPilot extends IPerson {
//   flyMessage(): void;
// }

// const newPilot: IPerson = {};

// type AddFunc = (n1: number, n2: number) => number;
// interface AddFunc {
//   (a: number, b: number): number;
// }

// const func: AddFunc = (a, t) => a + t;

class JS {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  getName() {
    console.log(this.name);
  }

  private isAdult() {
    if (this.age >= 18) {
      alert("TOO YOUNG");
      return false;
    }
    alert("WELCOME");
    return true;
  }

  buy(game: string) {
    if (!this.isAdult()) {
      alert("YOU CANT BUY");
      return;
    }
    alert(`THANKS FOR BUYING ${game}`);
  }
}

const newUser = new User("some, name", 28);

const copy = { getName: newUser.getName.bind(newUser) };
copy.getName();
