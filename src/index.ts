class UserStatic {
  private static count: number = 0;

  constructor() {
    UserStatic.count += 1;
  }

  public static runStaticMethod() {
    console.log(UserStatic.count);
    console.log(this.count);
  }
}

const obj1 = new UserStatic();
console.log(obj1);
const ob2 = new UserStatic();
const obj3 = new UserStatic();

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

// interface Flyable {
//   altitude: number;
//   fly(): void;
// }

// interface Swimmable {
//   depth: number;
//   swim(): void;
// }

// class Duck implements Flyable, Swimmable {
//   altitude: number = 0;
//   depth: number = 0;

//   fly(): void {
//     this.altitude = 50;
//     console.log("КАЧКА ЛЕТИТЬ НА ВИСОТі" + this.altitude);
//   }

//   swim(): void {
//     this.depth = 3;
//     console.log("Качка пливе на глибині", this.depth);
//   }
// }

// interface IAdmin {
//   readonly admin: string;
// }

// const user: IAdmin = {
//   admin: "",
// };
