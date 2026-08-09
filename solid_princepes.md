## Блок 4. Принципи ООП — SOLID (35 хв)

SOLID — 5 правил, які допомагають писати код, що не перетворюється на "спагеті" через пів року підтримки.

### **S — Single Responsibility Principle** (Принцип єдиної відповідальності)

Клас має мати лише одну причину для зміни.

```ts
// ❌ Погано: клас робить і бізнес-логіку, і збереження, і друк
class Invoice {
  calculateTotal(): number {
    /* ... */ return 100;
  }
  saveToDatabase(): void {
    /* ... */
  }
  printReceipt(): void {
    /* ... */
  }
}

// ✅ Добре: кожен клас відповідає лише за одну справу
class Invoice {
  calculateTotal(): number {
    return 100;
  }
}
class InvoiceRepository {
  save(invoice: Invoice): void {
    /* збереження в БД */
  }
}
class InvoicePrinter {
  print(invoice: Invoice): void {
    /* друк */
  }
}
```

### **O — Open/Closed Principle** (Відкритий для розширення, закритий для зміни)

```ts
// ❌ Погано: при кожній новій фігурі треба лізти і редагувати клас
class AreaCalculator {
  calculate(shape: { type: string; radius?: number; side?: number }): number {
    if (shape.type === "circle") return Math.PI * shape.radius! ** 2;
    if (shape.type === "square") return shape.side! ** 2;
    // а завтра додадуть трикутник — знову редагувати цей клас
    return 0;
  }
}

// ✅ Добре: додаємо нові фігури, не чіпаючи старий код
interface Shape {
  getArea(): number;
}
class Circle implements Shape {
  constructor(private radius: number) {}
  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}
class Square implements Shape {
  constructor(private side: number) {}
  getArea(): number {
    return this.side ** 2;
  }
}
// Triangle просто додається новим класом, AreaCalculator не змінюється
class AreaCalculator {
  calculate(shape: Shape): number {
    return shape.getArea();
  }
}
```

### **L — Liskov Substitution Principle** (Підстановки Лісков)

Об'єкт підкласу має можна підставити замість об'єкта базового класу без поломки логіки.

```ts
// ❌ Погано: класичний "пінгвін не літає"
class Bird {
  fly(): void {
    console.log("Лечу!");
  }
}
class Penguin extends Bird {
  fly(): void {
    throw new Error("Пінгвіни не літають!");
  } // порушення LSP
}

// ✅ Добре: розділяємо на різні контракти
interface Bird {
  move(): void;
}
interface FlyingBird extends Bird {
  fly(): void;
}

class Sparrow implements FlyingBird {
  move(): void {
    console.log("Стрибаю");
  }
  fly(): void {
    console.log("Лечу!");
  }
}
class Penguin implements Bird {
  move(): void {
    console.log("Ходжу і плаваю");
  }
}
```

### **I — Interface Segregation Principle** (Розділення інтерфейсів)

Краще кілька маленьких інтерфейсів, ніж один величезний "на все".

```ts
// ❌ Погано: клас Robot змушений реалізовувати eat(), який йому не потрібен
interface Worker {
  work(): void;
  eat(): void;
}

// ✅ Добре
interface Workable {
  work(): void;
}
interface Eatable {
  eat(): void;
}

class Human implements Workable, Eatable {
  work(): void {
    console.log("Працюю");
  }
  eat(): void {
    console.log("Їм");
  }
}
class Robot implements Workable {
  work(): void {
    console.log("Працюю без перерви");
  }
}
```

### **D — Dependency Inversion Principle** (Інверсія залежностей)

Залежати від абстракцій (інтерфейсів), а не від конкретних реалізацій.

```ts
// ❌ Погано: сервіс жорстко прив'язаний до конкретної БД
class MySQLDatabase {
  save(data: string): void {
    console.log("Збережено в MySQL");
  }
}
class UserService {
  private db = new MySQLDatabase(); // жорстка залежність
  saveUser(name: string): void {
    this.db.save(name);
  }
}

// ✅ Добре: залежимо від інтерфейсу, а не від конкретного класу
interface Database {
  save(data: string): void;
}
class MySQLDatabase implements Database {
  save(data: string): void {
    console.log("Збережено в MySQL");
  }
}
class MongoDatabase implements Database {
  save(data: string): void {
    console.log("Збережено в MongoDB");
  }
}
class UserService {
  constructor(private db: Database) {} // можна підставити будь-яку БД
  saveUser(name: string): void {
    this.db.save(name);
  }
}

const service = new UserService(new MongoDatabase()); // легко підмінити
```
