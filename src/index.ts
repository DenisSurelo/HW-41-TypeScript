// class Student {
//   constructor(
//     public name: string = "",
//     private grade: number,
//     protected id: string,
//     readonly createdAt: Date = new Date(),
//     private tenants: string[] = [],
//   ) {}

//   changePrivate(a: number) {
//     this.grade = a;
//   }

//   changeId(id: string) {
//     this.id = id;
//   }

//   show(this: Student) {
//     console.log(this.name);
//   }

//   public addTenants(tenant: string) {
//     this.tenants.push(tenant);
//   }
// }

// const student = new Student("bob", 20, "10");
// console.log(student);
// student.changePrivate(20);
// student.changeId("22");
// student.createdAt;

// const copyStudent = { show: student.show };

// copyStudent.show();
// student.addTenants("");

// type PersonInformation = {
//   firstName?: string;
//   lastName?: string;
// };

// class Person {
//   private personInfo: PersonInformation = {};

//   get getFirstName() {
//     return this.personInfo.firstName;
//   }

//   set setFirstName(a: string) {
//     this.personInfo.firstName = a;
//   }
// }

// const newPerson = new Person();

// console.log((newPerson.setFirstName = "new name"));
// console.log(newPerson.getFirstName);

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

//   get getStreet() {
//     return this.address;
//   }

//   set setStreet(value: string) {
//     this.street = value;
//   }
// }

// const stoneHouse = new StoneHouse("Prospect", "name", 28);
// console.log(stoneHouse);
// console.log(stoneHouse.getStreet);
// console.log((stoneHouse.setStreet = "new Street"));

// class UserStatic {
//   private static count: number = 0;

//   constructor() {
//     UserStatic.count += 1;
//   }

//   public static runStaticMethod() {
//     console.log(UserStatic.count);
//   }
// }

// const obj1 = new UserStatic();
// console.log(obj1);
// const ob2 = new UserStatic();
// const obj3 = new UserStatic();

// abstract class Plane {
//   protected isPilotInCabin: boolean = false;

//   public toggleCabin() {
//     this.isPilotInCabin = !this.isPilotInCabin;
//   }

//   public abstract startEngine(): boolean;
// }

// class Boeing extends Plane {
//   public startEngine(): boolean {
//     return true;
//   }
// }

// class RyanAir extends Plane {
//   public startEngine(): boolean {
//     return true;
//   }
// }

interface Flyable {
  altitude: number;
  fly(): void;
}

interface Swimmable {
  depth: number;
  swim(): void;
}

class Duck implements Flyable, Swimmable {
  altitude: number = 0;
  depth: number = 0;

  fly(): void {
    this.altitude = 50;
    console.log("КАЧКА ЛЕТИТЬ НА ВИСОТі" + this.altitude);
  }

  swim(): void {
    this.depth = 3;
    console.log("Качка пливе на глибині", this.depth);
  }
}

interface IAdmin {
  readonly admin: string;
}

const user: IAdmin = {
  admin: "",
};
