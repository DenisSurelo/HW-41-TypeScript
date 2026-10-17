let age: number = 50;
let name: string = 'Max';
let toggle:boolean = true;
let empty:null = null;
let notInitialize:undefined = undefined;


let callback = (a:number): number => { return 100 + a }; 
// тут трохи не розібрався з (a:number), глянув в інтернеті



let anything: any= -20;
anything = 'Text';
anything = {};
// тут також в документації глянув


let some:unknown;
some = 'Text';
let str: string;
str = some as string;
// і тут глянув документацію, не памятаю шоб ми це розглядали на уроці


const person: readonly [string, number] = ['Max', 21];
// 

enum  LoadingStatus {
LOADING,
READY
}
// 

let value: string | number;
// 

let status: 'enable' | 'disable';
// 

function showMessage(message: string) {
 console.log(message);
}

function calc(num1: number, num2: number) {
 return num1 + num2;
}

function customError() {
 throw new Error('Error');
}
//

type Page = {
    title:string;
    likes: number;
    accounts: string[]
    status: 'open' | 'close'
    details?: {
        createAt: Date
        updateAt: Date
    }
}

const page1:Page = {
 title: 'The awesome page',
 likes: 100,
 accounts: ['Max', 'Anton', 'Nikita'],
 status: 'open',
 details: {
   createAt: new Date('2021-01-01'),
   updateAt: new Date('2021-05-01'),
 }
}

const page2:Page = {
 title: 'Python or Js',
 likes: 5,
 accounts: ['Alex'],
 status: 'close',
}


