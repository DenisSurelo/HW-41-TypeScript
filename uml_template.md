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
