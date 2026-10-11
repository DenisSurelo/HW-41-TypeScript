// **public** - це як всі властивості та методи в js, можна викликати будь-де
// **private** - є доступ тільки в класі, не наслідується
// **protected** - наслідується, не можна викликати в екземплярі, але можна звернутись до властивості через метод класу або через геттери і сеттери

// Вибираємо за змістом,
// public - коли це інтерфейс взаємодії,
// private - коли це технічні методи або властивості, які не варто викликати поза класом,
// protected - коли це технічні методи або властивості, які не варто викликати поза, але при цьому вони повинні наслідуватися дочірніми.

// class Student {
//   private friends: string[] = [];
//   protected createdAt: Date = new Date();
//   private id: number = 0;

//   constructor(
//     public name: string = "",
//     public age: number = 0,
//     public city: string = "",
//   ) {}

//   public addFriend(newFriend: string) {
//     this.friends.push(newFriend);
//   }

//   public showFriends(this: Student) {
//     console.log(this.friends);
//   }
// }

// const student = new Student("Bob", 19, "Kyiv");
// student.friends.push("");

// student.addFriend("Taras");

// console.log(student);
// student.showFriends();

// const copy = {
//   showFriends: student.showFriends,
//   addFriend: student.addFriend,
//   name: "Name",
//   age: 20,
//   city: "",
//   friends: ["new friend"],
//   createdAt: new Date(),
// };

// copy.showFriends();

// class NewStudent extends Student {
//   show() {
//     console.log(this.createdAt);
//   }
// }

// const student1 = new NewStudent();
// student1.show();

// SET & GET мають вищий пріоритет при зверненні до ключа, якщо назва змінних збігається

// type TPersonalInfo = {
//   firstName: string;
//   lastName: string;
// };

// class Person {
//   private personalInfo: TPersonalInfo = {
//     firstName: "",
//     lastName: "",
//   };

//   public getFirstName() {
//     console.log("getFirstName", this.personalInfo);
//   }

//   set firstName(value: string) {
//     this.personalInfo.firstName = value;
//   }

//   set lastName(value: string) {
//     this.personalInfo.lastName = value;
//   }

//   get personalData() {
//     console.log("personalData");
//     console.log(this.personalInfo);
//     return this.personalInfo;
//   }
// }

// const person = new Person();
// person.firstName = "new first name";
// person.lastName = "new last name";

// person.getFirstName();
// person.personalData;

// class House {
//   constructor(
//     public street: string,
//     public name: string,
//   ) {}

//   showAddress(this: House) {
//     console.log(this.street);
//   }
// }

// class StoneHouse extends House {
//   constructor(
//     street: string,
//     name: string,
//     public address: number,
//   ) {
//     super(street, name);
//   }

//   get showStreet() {
//     return this.street;
//   }

//   set setAddress(newAddress: number) {
//     this.address = newAddress;
//   }
// }

// const stone = new StoneHouse("S.Bandery", "house", 28);
// console.log(stone.showStreet);
// console.log((stone.setAddress = 62));

// Статичні властивості залишаються в класі, не йдуть на прототип

// Статичний метод по факту - це як звичайна функція, що зберігається у класі.

// Звертання до статичних властивостей в статичних методів через this

// class UserStatic {
//   private static count = 0;

//   constructor() {
//     UserStatic.count += 1;
//   }

//   public static runStaticMethod() {
//     console.log("RUN STATIC");
//     console.log(this.count);
//   }

//   public showCount() {
//     console.log(UserStatic.count);
//   }
// }

// const obj1 = new UserStatic();
// const obj2 = new UserStatic();
// const obj3 = new UserStatic();
// const obj4 = new UserStatic();

// obj1.showCount();
// obj1.showCount();
// obj1.showCount();
// obj1.showCount();
// obj2.showCount();
// obj3.showCount();

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

// type TExample = {};

// interface IFlyable {
//   attitude: number;
//   fly: () => void;
// }

// interface ISwimmable {
//   depth: number;
//   swim: () => void;
// }

// class Duck implements IFlyable, ISwimmable {
//   constructor(
//     public attitude: number = 0,
//     public depth: number = 0,
//   ) {}

//   fly() {
//     console.log("FLy");
//   }

//   swim() {
//     console.log("SWIM");
//   }
// }

// IIFE

// (() => {})();

// enum Admin {
//   admin = "admin",
//   superadmin = "superadmin",
// }

// export type TAdmin = "admin" | "superadmin";

// interface IReadOnly {
//   readonly admin: Admin;
// }

// const user: IReadOnly = {
//   admin: Admin.admin,
// };

// user.admin = Admin.admin;

// type IFunc = (a: number) => void;
// interface A {
//   id: string;
//   (a: number): void;
// }

// interface B extends A {
//   createdAt: string;
// }

// interface IPerson {
//   name?: string;
//   age: number;
// }

// class Person implements IPerson {
//   //  pu name?: string;

//   constructor(public age: number) {}

//   setAge(n: number) {
//     this.age = n;
//   }
// }

// const person = new Person();
