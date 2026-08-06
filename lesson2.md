# Урок 2. TypeScript: робота з класами та об'єктами (ООП)

**Тривалість:** ~2 заняття по 90 хв (матеріал об'ємний — не намагайтесь впхнути в одне)
**Заняття 2.1:** ООП-концепція, класи, об'єкти, інтерфейси
**Заняття 2.2:** SOLID, UML, шаблони проєктування
**Аудиторія:** ті самі учні, вже пройшли Урок 1 (базові типи, enum, tuple, tsconfig)

---

## Мета уроку

Після цього уроку учні повинні вміти:

- пояснити 4 стовпи ООП і навести приклад кожного на TS;
- створювати класи з конструкторами, модифікаторами доступу, геттерами/сеттерами;
- використовувати `interface` для опису контракту класу (`implements`);
- пояснити своїми словами кожен принцип SOLID і показати "поганий" та "хороший" приклад;
- прочитати найпростішу UML class-діаграму;
- реалізувати 2 базові патерни проєктування (Singleton, Factory) на TS.

---

# ЗАНЯТТЯ 2.1

## Блок 1. Вступ до ООП. Концепція ООП (20 хв)

### Аналогія для дітей

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

### Практика (5 хв)

Учні створюють `abstract class Vehicle` з методом `move(): void` та два підкласи `Car` і `Bicycle`.

---

## Блок 2. Класи. Об'єкти (25 хв)

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
```

### Модифікатори доступу — коротко для дітей

| Модифікатор           | Хто має доступ      | Аналогія                                |
| --------------------- | ------------------- | --------------------------------------- |
| `public` (за замовч.) | будь-хто            | двері квартири відкриті всім            |
| `private`             | тільки цей клас     | сейф, ключ лише у власника              |
| `protected`           | клас + його нащадки | сімейна валіза, доступна дітям і онукам |

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
}

const phone = new Product("iPhone", 45000, 10);
phone.sell(3);
```

### Геттери та сеттери

```ts
class Temperature {
  private _celsius: number = 0;

  get celsius(): number {
    return this._celsius;
  }

  set celsius(value: number) {
    if (value < -273.15) throw new Error("Нижче абсолютного нуля неможливо");
    this._celsius = value;
  }

  get fahrenheit(): number {
    return this._celsius * 1.8 + 32;
  }
}

const temp = new Temperature();
temp.celsius = 25; // виклик як звичайного поля, а не методу!
console.log(temp.fahrenheit); // 77
```

### Статичні поля та методи — належать класу, а не об'єкту

```ts
class Counter {
  static count: number = 0;

  constructor() {
    Counter.count++;
  }

  static getCount(): number {
    return Counter.count;
  }
}

new Counter();
new Counter();
new Counter();
console.log(Counter.getCount()); // 3
```

> 💡 **Порада практика:** `static` часто використовують для утиліт (`Math.random()` — теж статичний метод) і для реалізації патерну Singleton — до нього ми ще дійдемо в цьому уроці.

---

## Блок 3. Інтерфейси (20 хв)

### Інтерфейс — це контракт, а не реалізація

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

### Інтерфейс vs Type alias — коли що використовувати

```ts
// Interface можна "доповнити" пізніше (declaration merging)
interface User {
  name: string;
}
interface User {
  age: number;
}
// тепер User = { name: string; age: number }

// Type так не може — але може робити union/intersection, чого interface не вміє
type ID = string | number;
type AdminUser = User & { role: "admin" };
```

**Практичне правило для дітей:** описуєте форму об'єкта чи клас — беріть `interface`. Потрібні union-типи, tuple, або обчислені типи — беріть `type`. У реальних React-проєктах для `props` компонентів найчастіше використовують саме `interface`.

```ts
// Приклад з реального React + TS проєкту
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

// function Button({ label, onClick, disabled }: ButtonProps) { ... }
```

### Практика (5 хв)

Учні створюють `interface Comparable<T>` з методом `compareTo(other: T): number` та реалізують його в класі `Money`.

---

# ЗАНЯТТЯ 2.2

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

> 💡 **Жарт для класу:** SOLID — це як прибирання в кімнаті. Можна не робити цього одразу, і нічого не станеться. Але через пів року, коли шукаєш шкарпетку (баг), розумієш, чому мама (senior-розробник) просила прибратись 🧦

---

## Блок 5. UML та шаблони проєктування (30 хв)

### UML class diagram — як "читати" клас на папері

```
┌─────────────────────────┐
│         Animal           │  <- назва класу
├─────────────────────────┤
│ - name: string            │  <- поля (- = private, + = public, # = protected)
├─────────────────────────┤
│ + makeSound(): void       │  <- методи
└─────────────────────────┘
            △
            │  (наслідування — порожня стрілка вгору)
┌─────────────────────────┐
│           Dog             │
├─────────────────────────┤
│ + bark(): void             │
└─────────────────────────┘
```

Позначення, які варто показати дітям:

- `△──` — наслідування (extends)
- `┄┄▷` — реалізація інтерфейсу (implements), пунктирна лінія
- `◇──` — композиція/агрегація ("має в собі")

Цьому класу з блоку 2 відповідала б така діаграма:

```
Student
- name: string
- grade: number
# id: string
+ study(): void
```

### Патерн 1: Singleton — лише один екземпляр на весь застосунок

```ts
class Logger {
  private static instance: Logger;
  private logs: string[] = [];

  private constructor() {} // конструктор закритий ззовні!

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(message: string): void {
    this.logs.push(message);
    console.log(`[LOG]: ${message}`);
  }
}

const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();
console.log(logger1 === logger2); // true — це той самий об'єкт
```

### Патерн 2: Factory — "фабрика", яка створює об'єкти за умовою

```ts
interface Notification {
  send(message: string): void;
}

class EmailNotification implements Notification {
  send(message: string): void {
    console.log(`Email: ${message}`);
  }
}
class SMSNotification implements Notification {
  send(message: string): void {
    console.log(`SMS: ${message}`);
  }
}

class NotificationFactory {
  static create(type: "email" | "sms"): Notification {
    if (type === "email") return new EmailNotification();
    return new SMSNotification();
  }
}

const notifier = NotificationFactory.create("email");
notifier.send("Урок почався!"); // Email: Урок почався!
```

> 💡 **Де це реально зустрічається:** Singleton часто ховається в `Zustand`-сторах чи Redux-store — по суті це єдине "джерело правди" на весь застосунок. Factory-патерн часто зустрічається в бекенді, коли за роллю користувача (`admin`, `user`, `guest`) створюється відповідний обʼєкт з різними правами.

---

## Домашнє завдання

1. Створити ієрархію класів `Employee` (abstract) → `Developer`, `Manager`, `Designer`, кожен реалізує свій `calculateSalary(): number`.
2. Переписати клас із порушенням хоча б одного принципу SOLID (навмисно "погано") і показати виправлену версію — з коментарями, який саме принцип виправлено.
3. Реалізувати Singleton-клас `AppConfig`, який зберігає налаштування застосунку (`theme`, `language`) і доступний з будь-якого місця коду.
4. (Бонус) Намалювати UML-діаграму своєї ієрархії `Employee` від руки або в draw.io.

## Питання для повторення

- Чим `interface` відрізняється від `abstract class`? Коли що обирати?
- Наведіть свій приклад порушення Liskov Substitution Principle.
- Чому Singleton іноді критикують як "антипатерн" у великих застосунках?
- Яка стрілка на UML-діаграмі означає `implements`, а яка — `extends`?

---

### Нотатка для викладача

SOLID — найважча тема для дітей, бо вона про **дизайн**, а не про синтаксис. Радимо для кожного принципу спершу писати "поганий" код разом із класом, дати їм відчути біль (наприклад, штучно "зламати" щось при розширенні), а вже потім показувати рефакторинг. Абстрактні пояснення "просто повірте, так краще" тут не працюють.
