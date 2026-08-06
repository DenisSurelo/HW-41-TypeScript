### Конструктор

//! this - присутній лише в функціях

```ts
class House {
  street: string;

  constructor(n: string) {
    this.street = n;
  }
}

const house = new House("Middle-earth");
```

```ts
add

	 showAddress () {
	   console.log('Address: ' + this.street);
	 }


	house.showAddress();


```

### Методи

```ts
const house = new House("Middle-earth");

house.showAddress();

const houseCopy = { showAddress: house.showAddress };

houseCopy.showAddress();

add showAddress (this: House) {
	 console.log('Address: ' + this.street);
	}
```

### Модифікатори доступу

public - це як всі властивості та методи в js, можна викликати будь-де
private - є доступ тільки в класі
protected - наслідується, не можна викликати в екземплярі, але можна звернутись до властивості через метод класу або через геттери і сеттери

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

### Скорочення ініціалізації в TS

```ts
    private readonly type: string,
class House {
  constructor(
    private type: string,
    private street: string,
  ) {}

  changeType(type: string) {
    this.type = type;
  }


}


SET & GET мають вищий пріоритет при зверненні до ключа, якщо назва змінних збігається

```

### Наслідування extends

```ts
super() викликає батьківський конструктор і його потрібно викликати до будь-якої маніпуляції з this в конструкторі.
class StoneHouse extends House {
  constructor(street: string) {
    super("sss", street); // Виклик батьківскього конструктора
  }
}

const stone = new StoneHouse("Stone-some");
console.log(stone);
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

  public static isStaticMethod() {
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
UserStatic.isStaticMethod();
```

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

### interface

```ts
або;
type IPerson = {
  name: string;
  age: number;

  greet(phrase: string): void;
};

interface IPerson {
  name: string;
  age: number;

  greet(phrase: string): void;
}

let user: IPerson;

user = {
  name: "Anthony",
  age: 21,

  greet(phrase) {
    console.log(phrase + " " + this.name);
  },
};

user.greet("Усім привіт я");
```

```ts
interface IPerson {
  name: string;
  age: number;

  greet(phrase: string): void;
}

interface IPilot {
  flyMessage(): void;
}

class Pilot implements IPerson, IPilot {
  constructor(
    public name: string,
    public age: number,
  ) {
    if (this.age < 28) {
      throw new Error("Pilot too young");
    }
  }

  greet(phrase: string): void {
    console.log(phrase + " " + this.name);
  }
  flyMessage(): void {
    console.log("FLYING");
  }
}

const pilot = new Pilot("bob", 29);
pilot.greet("ddd");
pilot.flyMessage();

abstract class Plane {
  protected pilot?: IPilot;

  public sitInPlane(pilot: IPilot) {
    this.pilot = pilot;
  }

  public abstract startEngine(): boolean;
}

class Boeing extends Plane {
  public startEngine(): boolean {
    if (!this.pilot) {
      throw new Error("No pilot");
    }
    console.log("START");
    this.pilot.flyMessage();
    return true;
  }
}

const boeing = new Boeing();
const pilot = new Pilot("John", 30);

pilot.greet("GREETINGS");
boeing.sitInPlane(pilot);
boeing.startEngine();
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
  greetings(text: string): void;
}

interface IPilot extends IPerson {
  flyMessage(): void;
}

const newPilot: IPerson = {};
```

### Інтерфейси як тип функції

```ts
type AddFunc = (n1: number, n2: number) => number;

const func: AddFunc = (a, t) => a + t;
```

````ts
interface AddFunc {
  (a: number, b: number): number;
}```
````
