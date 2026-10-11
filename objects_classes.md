### Конструктор

//! this - присутній лише в функціях

### Анатомія класу в TypeScript

```ts
class Student {
  // Поля класу з модифікаторами доступу
  public name: string;
  private grade: number;
  protected id: string;
  readonly createdAt: Date = new Date(); // не можна змінити після створення

  constructor(name: string, grade: number, id: string) {
    this.name = name;
    this.grade = grade;
    this.id = id;
  }

  // Метод
  study(): void {
    console.log(`${this.name} навчається`);
  }
}

class Student {
  constructor(
    public name: string = "",
    private grade: number,
    protected id: string,
    readonly createdAt: Date = new Date(),
    private tenants: string[] = [],
  ) {}

  changePrivate(a: number) {
    this.grade = a;
  }

  changeId(id: string) {
    this.id = id;
  }

  show(this: Student) {
    console.log(this.name);
  }

  public addTenants(tenant: string) {
    this.tenants.push(tenant);
  }
}
```

### Скорочений синтаксис конструктора (те, що реально пишуть в проєктах)

```ts
// Замість повторення полів двічі (як у Student вище) — скорочено:
class Product {
  constructor(
    public title: string,
    public price: number,
    private stock: number = 0,
  ) {}

  sell(qty: number): void {
    if (qty > this.stock) throw new Error("Недостатньо товару");
    this.stock -= qty;
  }

  show(this: Product) {
    console.log(`${this.title}`);
  }
}

const phone = new Product("iPhone", 45000, 10);
phone.sell(3);
```

### Методи

Давайте загадаємо, що таке this. Це посилання на контекст виконання, а оскільки контекст для showAddress - це об'єкт, тому ми можемо достукатися до властивості street. Але що буде, якщо ми зробимо ось так?

Другий метод не зміг повернути нам this.street, тому що у його новому контексті його просто немає. Але ми можемо вплинути на це, клас ще можна розглядати як тип даних, тому ми можемо скористатися цікавим підходом, можливо TypeScript вкрав цю концепцію з python. Ми вкажемо, якого типу повинен бути this в методі.

Дивіться ми ніби передаємо this в метод, вказуючи, що він повинен бути типу House, сам this, звичайно, ми передавати не можемо так, це вказівки для компілятора, і давайте тепер подивимося в код.

```ts
const phone = new Product("iPhone", 45000, 10);
phone.sell(3);

const phoneCopy = { showAddress: phone.sell };

houseCopy.sell(5);

add show (this: Product) {
	 console.log(this.name);
	}
```

### Модифікатори доступу

**public** - це як всі властивості та методи в js, можна викликати будь-де
**private** - є доступ тільки в класі, не наслідується
**protected** - наслідується, не можна викликати в екземплярі, але можна звернутись до властивості через метод класу або через геттери і сеттери

```ts
class A {
  private someProperty = "str";
}

class B extends A {
  showProperty() {
    console.log(this.someProperty);
  }
}

const a = new A();
const b = new B();

a.someProperty;
b.someProperty;
b.showProperty();


Вибираємо за змістом, public - коли це інтерфейс взаємодії, private - коли це технічні методи або властивості, які не варто викликати поза класом, protected - коли це технічні методи або властивості, які не варто викликати поза, але при цьому вони повинні наслідуватися дочірніми.
```

```js
class House {
	 private street:string;
	 private tenants:string[] = [];

	 constructor (n: string) {
	   this.street = n;
	 }

	 public showAddress (this: House) {
	   console.log('Address: ' + this.street);
	 }

	 public addTenant (tenant: string) {
	   this.tenants.push(tenant);
	 }

	 public showTenants () {
	   console.log(this.tenants);
	 }
	}

	const house = new House('Middle-earth');

	house.addTenant('Anton');
	house.addTenant('Nikita');

	house.showTenants();

    	const house = new House('Middle-earth');
Тепер не можна написати ось так.
	house.tenants.push('Anton');
```

```ts
SET & GET мають вищий пріоритет при зверненні до ключа, якщо назва змінних збігається

type PersonInformation = {
	 firstName?: string;
	 lastName?:  string;
	}

	class Person {
	 private personInfo: PersonInformation = {};

	 set firstName (value: string) {
	   console.log('firstName added');
	   this.personInfo.firstName = value;
	 }

	 set lastName (value: string) {
	   console.log('lastName added');
	   this.personInfo.lastName = value;
	 }

	 get info () {
	   const { personInfo } = this;
	   return `${personInfo.lastName} ${personInfo.firstName}`;
	 }
	}

	const person = new Person();

	person.lastName = 'Pupkin';
	person.firstName = 'Petha';

	console.log(person.info);
```

### Наслідування extends

```ts
super() викликає батьківський конструктор і його потрібно викликати до будь-якої маніпуляції з this в конструкторі.
class House {
  constructor(
    public street: string,
    public name: string,
  ) {}

  showAddress(this: House) {
    console.log(this.street);
  }
}

class StoneHouse extends House {
  constructor(
    street: string,
    name: string,
    public address: number,
  ) {
    super(street, name);
  }

  get getStreet() {
    return this.address;
  }

  set setStreet(newAddress: number) {
    this.address = newAddress;
  }
}

const stoneHouse = new StoneHouse("street", "New stone", 24);
console.log(stoneHouse);
console.log(stoneHouse.getStreet);
console.log((stoneHouse.setStreet = "new Street"));
```

### Статичні методи та властивості

Статичні властивості залишаються в класі, не йдуть на прототип

Статичний метод по факту - це як звичайна функція, що зберігається у класі.

Звертання до статичних властивостей в статичних методів через this

```ts
class UserStatic {
  private static count = 0;

  constructor() {
    UserStatic.count += 1;
  }

  public static runStaticMethod() {
    console.log("RUN STATIC");
  }

  public showCount() {
    console.log(UserStatic.count);
  }
}

const obj1 = new UserStatic();
const obj2 = new UserStatic();
const obj3 = new UserStatic();

obj1.showCount();
obj2.showCount();
obj3.showCount();
UserStatic.runStaticMethod();

UserStatic.runStaticMethod(); // 3 — лічильник спільний для всіх екземплярів
```

UserStatic.count; // ❌ Error: Property 'count' is private
a.count; // ❌ Error: static-поле через екземпляр недоступне
UserStatic.count = 999; // ❌ Error: ззовні підробити не можна

Реальні приклади використання: \***\* - Генерація унікальних ID;
\*\*** - Singleton (один екземпляр на весь застосунок);

```ts
class Database {
  private static instance: Database | null = null;

  private constructor() {} // new Database() ззовні заборонено

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true
```

Без private будь-хто міг би зробити UserStatic.count = -5, і лічильник втратив би сенс. Тобто private дає захист від випадкової зміни ззовні, а static дає спільний стан для всіх екземплярів.

клас це кресленик будинку, а об'єкти це самі будинки. static це табличка на воротах будівельної компанії з написом «Збудовано будинків: 3». Вона одна на всіх, а не висить на кожному будинку. private означає, що цю табличку може змінювати тільки сама компанія, а перехожі лише дивляться 🏠

### Абстрактні класи та методи

У нас є якийсь клас і він реалізує базовий функціонал, але сам по собі він ніколи не створюватиме екземпляри, лише його дочірні класи, тоді він за визначенням абстрактний.

є клас літак, але якщо я скажу літак в авіакомпанії, люди подумають про боїнг, а якщо на фермі, то про кукурудзяник, але що те, що те - це літак, вони характеризують одну сутність, але мають різні властивості.

```ts
abstract class Plane {
  protected pilotInCabin: boolean = false;
  public sitInPlan() {
    this.pilotInCabin = true;
  }

  public abstract startEngine(): boolean;
}

class Maize extends Plane {
  public startEngine() {
    // Запускаємо гвинти двигуна
    return true;
  }
}

class Boeing extends Plane {
  public startEngine() {
    // Розігріваємо реактивні турбіни
    return true;
  }
}
```

### interface це контракт, а не реалізація

```ts
interface Flyable {
  altitude: number;
  fly(): void;
}

interface Swimmable {
  depth: number;
  swim(): void;
}

// Клас може реалізувати кілька інтерфейсів одночасно —
// це те, чого немає при звичайному наслідуванні (extends лише один клас)
class Duck implements Flyable, Swimmable {
  altitude: number = 0;
  depth: number = 0;

  fly(): void {
    this.altitude = 50;
    console.log("Качка летить на висоті " + this.altitude);
  }

  swim(): void {
    this.depth = 2;
    console.log("Качка пливе на глибині " + this.depth);
  }
}
```

### Readonly

В інтерфейсі ми не можемо задавати модифікатори private, protected, оскільки вони всі вважаються як public, якби можна було б вказати private, це вже був би не інтерфейс (для цього є абстрактний клас).

```ts
interface IReadonly {
  readonly admin: string;
}

const user: IReadonly = {
  admin: "dd",
};
user.admin = "K";
```

### Extending Interfaces

```ts
interface IPerson {
  name: string;

  age: number;

  greet(phrase: string): void;
}

interface IPilot extends IPerson {
  flyMessage(): void;
}
```

13. Інтерфейси як тип функції

```ts
type AddFunc = (n1: number, n2: number) => number;

let add: AddFunc;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface AddFunc {
  (n1: number, n2: number): number;
}

let add: AddFunc;

add = (n1: number, n2: number) => {
  return n1 + n2;
};
```

### Опціональні параметри

```ts
interface IPerson {
  name?: string;
  age: number;
}

class Person implements IPerson {
  name?: string;

  constructor(public age: number) {}

  setName(n: string) {
    this.name = n;
  }
}
```
