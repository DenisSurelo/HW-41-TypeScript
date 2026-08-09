Уявіть конструктор LEGO. Об'єктно-орієнтоване програмування — це коли ви спершу створюєте **креслення деталі** (клас), а потім штампуєте з нього скільки завгодно однакових, але незалежних цеглинок (об'єктів). Кожна цеглинка має свій колір, розмір — але всі "народжені" за одним кресленням.

### 4 стовпи ООП з прикладами на TS

**1. Інкапсуляція (Encapsulation)** — приховування внутрішньої "кухні" об'єкта

```ts
class BankAccount {
  private balance: number = 0; // ніхто ззовні не може напряму змінити

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Сума має бути додатною");
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount();
account.deposit(1000);
console.log(account.getBalance()); // 1000
// account.balance = 999999;  // ❌ Помилка: Property 'balance' is private
```

**2. Наслідування (Inheritance)** — дитячий клас переймає можливості батьківського

```ts
class Animal {
  constructor(public name: string) {}
  makeSound(): void {
    console.log(`${this.name} видає звук`);
  }
}

class Dog extends Animal {
  bark(): void {
    console.log(`${this.name} гавкає: Гав!`);
  }
}

const rex = new Dog("Рекс");
rex.makeSound(); // успадковано від Animal
rex.bark(); // власний метод Dog
```

**3. Поліморфізм (Polymorphism)** — одна назва методу, різна поведінка

```ts
class Cat extends Animal {
  makeSound(): void {
    console.log(`${this.name} нявкає: Няв!`);
  }
}

const animals: Animal[] = [new Dog("Рекс"), new Cat("Мурка")];
animals.forEach((a) => a.makeSound());
// Рекс видає звук   <- Dog не перевизначив makeSound
// Мурка нявкає: Няв! <- Cat перевизначив makeSound
```

**4. Абстракція (Abstraction)** — приховуємо складність, показуємо тільки суть

```ts
abstract class Shape {
  abstract getArea(): number; // жодної реалізації, тільки контракт

  describe(): string {
    return `Площа фігури: ${this.getArea()}`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }
  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

const circle = new Circle(5);
console.log(circle.describe()); // Площа фігури: 78.53...
// new Shape(); // ❌ Cannot create an instance of an abstract class
```
