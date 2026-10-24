// let age: number = 50;
// let name: string = 'Max';
// let toggle:boolean = true;
// let empty:null = null;
// let notInitialize:undefined = undefined;


// let callback = (a:number): number => { return 100 + a }; 




// let anything: any= -20;
// anything = 'Text';
// anything = {};



// let some:unknown;
// some = 'Text';
// let str: string;
// str = some as string;



// const person: readonly [string, number] = ['Max', 21];


// enum  LoadingStatus {
// LOADING,
// READY
// }


// let value: string | number;


// let status: 'enable' | 'disable';


// function showMessage(message: string): void {
//   console.log(message);
// }

// function calc(num1: number, num2: number): number {
//   return num1 + num2;
// }

// function customError(): never {
//   throw new Error('Error');
// }




// type Page = {
//     title:string;
//     likes: number;
//     accounts: string[]
//     status: 'open' | 'close'
//     details?: {
//         createAt: Date
//         updateAt: Date
//     }
// }

// const page1:Page = {
//  title: 'The awesome page',
//  likes: 100,
//  accounts: ['Max', 'Anton', 'Nikita'],
//  status: 'open',
//  details: {
//    createAt: new Date('2021-01-01'),
//    updateAt: new Date('2021-05-01'),
//  }
// }

// const page2:Page = {
//  title: 'Python or Js',
//  likes: 5,
//  accounts: ['Alex'],
//  status: 'close',
// }


// =================================================== TypeScript. Робота з класами та об'єктами==================================================

abstract class House {
  door: boolean = false;
  key: Key;
  tenants: Person[] = [];

  constructor(key: Key) {
    this.key = key;
  }

  comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
      console.log("Мешканець зайшов у будинок.");
    } else {
      console.log("Двері зачинені!");
    }
  }

  abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  openDoor(key: Key): void {
    if (this.key.getSignature() === key.getSignature()) {
      this.door = true;
      console.log("Двері відкрито");
    } else {
      console.log("Неправильний ключ");
    }
  }
}

class Key {
  signature: number;

  constructor() {
    this.signature = Math.floor(Math.random() * 100000);
  }

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  key: Key;

  constructor(key: Key) {
    this.key = key;
  }

  getKey(): Key {
    return this.key;
  }
}

const houseKey = new Key();
const house = new MyHouse(houseKey);
const person = new Person(houseKey);

house.openDoor(person.getKey());
house.comeIn(person);

console.log("Кількість мешканців:", house.tenants.length);
