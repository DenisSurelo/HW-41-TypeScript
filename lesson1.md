# Урок 1. TypeScript: синтаксис та типи

**Тривалість:** ~90 хв (можна розбити на 2 заняття по 45 хв)
**Аудиторія:** діти/підлітки, вже знають базовий JavaScript
**Формат:** теорія + живе кодування + міні-практика після кожного блоку

---

## Мета уроку

Після цього уроку учні повинні вміти:

- пояснити, навіщо потрібен TypeScript і чим він відрізняється від JS;
- встановити TS локально та скомпілювати перший файл;
- писати базові типи (`string`, `number`, `boolean`, масиви, об'єкти);
- використовувати типи, яких немає в JS (`enum`, `tuple`, `never`, `unknown`, `any`);
- налаштувати `tsconfig.json` під свій проєкт.

---

## Блок 1. TypeScript — сутність і синтаксис (15 хв)

### Пояснення для дітей (аналогія)

JavaScript — це як писати записку олівцем: швидко, гнучко, але легко помилитись, і ніхто не перевірить до останнього моменту.
TypeScript — це та сама записка, але з вчителькою, яка перевіряє помилки **ще до того, як ти здав зошит**.

### Ключова ідея

TypeScript — це **надмножина JavaScript** (superset). Будь-який валідний JS-код — це вже валідний TS-код.

```ts
// Це звичайний JS-код — і водночас валідний TS-код
function greet(name) {
  return "Привіт, " + name;
}
console.log(greet("Артем"));
```

TypeScript додає **статичну типізацію**, яка перевіряється **на етапі компіляції**, а не під час виконання коду.

```ts
// А це вже TypeScript — додали тип параметра
function greet(name: string) {
  return "Привіт, " + name;
}

greet("Артем"); // ✅ ок
greet(123); // ❌ Помилка компіляції: Argument of type 'number'
//    is not assignable to parameter of type 'string'
```

**Важливо донести дітям:** TS-код ніколи не виконується браузером напряму. Компілятор (`tsc`) перетворює `.ts` → `.js`, і саме `.js` запускається в браузері чи Node.js.

```
file.ts  --(tsc компілює)-->  file.js  --(запускається в браузері/Node)
```

### Міні-практика

Попросіть учнів написати функцію `sum(a, b)` на звичайному JS, а потім самостійно здогадатись, як додати типи `a: number, b: number`.

---

## Блок 2. Встановлення та налаштування (15 хв)

### Встановлення глобально (для експериментів)

```bash
npm install -g typescript
tsc --version
```

### Встановлення в проєкт (правильний спосіб для реальних проєктів)

```bash
mkdir ts-lesson && cd ts-lesson
npm init -y
npm install typescript --save-dev
npx tsc --init
```

Команда `npx tsc --init` створює файл `tsconfig.json` — це "паспорт" проєкту, за яким компілятор розуміє, як саме перетворювати код.

### Перший запуск

```ts
// index.ts
const message: string = "Мій перший TypeScript-файл!";
console.log(message);
```

```bash
npx tsc index.ts     # створить index.js
node index.js         # запустить результат
```

### Лайфхак для швидкої розробки (обов'язково покажіть дітям)

```bash
npm install -g ts-node
ts-node index.ts     # компілює і одразу запускає, без проміжного .js
```

> 💡 **Порада практика:** у реальних React/Next.js проєктах ви ніколи не запускаєте `tsc` руками — це робить Vite/Webpack/Next автоматично під час білду. Але розуміти, що відбувається "під капотом", — обов'язково.

---

## Блок 3. Базові типи та робота з ними (25 хв)

### Примітивні типи

```ts
let userName: string = "Оля";
let age: number = 12;
let isStudent: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;
```

### Масиви

```ts
let scores: number[] = [90, 85, 100];
let names: Array<string> = ["Іван", "Марія"]; // альтернативний синтаксис
```

### Об'єкти

```ts
let student: { name: string; age: number; isActive: boolean } = {
  name: "Дмитро",
  age: 14,
  isActive: true,
};
```

### Union types (об'єднання типів) — дуже практична штука

```ts
let id: string | number;
id = 101; // ✅
id = "A101"; // ✅
id = true; // ❌ Type 'boolean' is not assignable
```

### Функції з типізованими параметрами та поверненням

```ts
function multiply(a: number, b: number): number {
  return a * b;
}

// Опціональний параметр — позначається знаком ?
function createUser(name: string, age?: number) {
  return { name, age: age ?? "невідомо" };
}
```

### Type aliases та Interface — два способи описати "форму" об'єкта

```ts
// Через type
type User = {
  name: string;
  age: number;
};

// Через interface (частіше використовується для об'єктів/класів)
interface Product {
  title: string;
  price: number;
  inStock: boolean;
}

const laptop: Product = { title: "MacBook", price: 45000, inStock: true };
```

### Практика (5 хв)

Дайте учням задачу: описати тип `Book` (`title`, `author`, `year`, `isAvailable`) і створити масив з трьох книжок цього типу.

---

## Блок 4. Типи, яких немає в JavaScript (20 хв)

Це найцікавіший блок — саме тут учні відчують "суперсилу" TypeScript.

### `enum` — набір іменованих констант

```ts
enum Role {
  Admin,
  Editor,
  Viewer,
}

let userRole: Role = Role.Admin;
console.log(userRole); // 0 — TS автоматично нумерує з 0

// Можна задати власні значення
enum Status {
  Active = "ACTIVE",
  Blocked = "BLOCKED",
}
```

### `tuple` — масив із фіксованою кількістю елементів і типів

```ts
let point: [number, number] = [10, 20];
let userInfo: [string, number, boolean] = ["Ольга", 15, true];

// point[0] завжди number, point[1] завжди number — порядок важливий!
```

### `any` — "вимикач" перевірки типів (використовувати обережно!)

```ts
let anything: any = 5;
anything = "тепер я рядок";
anything = true; // TS нічого не перевіряє — це небезпечно
```

> ⚠️ **Жарт для класу:** `any` — це як сказати вчительці "довірся мені". Іноді працює, але краще так не робити 😅

### `unknown` — безпечніший брат `any`

```ts
let value: unknown = "привіт";

// value.toUpperCase(); // ❌ помилка — TS не дозволить без перевірки типу

if (typeof value === "string") {
  console.log(value.toUpperCase()); // ✅ тепер можна
}
```

### `never` — тип, що ніколи не повертає значення

```ts
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}
```

### `void` — функція нічого не повертає

```ts
function logMessage(text: string): void {
  console.log(text);
}
```

### Порівняльна таблиця (показати дітям на екрані)

| Тип       | Є в JS?            | Навіщо потрібен                                           |
| --------- | ------------------ | --------------------------------------------------------- |
| `enum`    | ❌                 | Іменовані набори констант замість "магічних" рядків/чисел |
| `tuple`   | ❌                 | Масив фіксованої довжини й типів (напр. `useState`)       |
| `unknown` | ❌                 | Безпечна альтернатива `any`                               |
| `never`   | ❌                 | Функції, що завжди кидають помилку або не завершуються    |
| `void`    | ❌ (є `undefined`) | Явно показати, що функція нічого не повертає              |

### Реальний приклад використання tuple (для мотивації — це прямо з React)

```ts
// Саме так типізований useState у React!
function useState<T>(initial: T): [T, (value: T) => void] {
  // спрощена реалізація для прикладу
  let state = initial;
  const setState = (value: T) => {
    state = value;
  };
  return [state, setState];
}

const [count, setCount] = useState<number>(0);
```

---

## Блок 5. Налаштування компілятора — tsconfig.json (15 хв)

### Базовий файл після `tsc --init`

```jsonc
{
  "compilerOptions": {
    "target": "ES2020", // до якої версії JS компілювати
    "module": "commonjs", // система модулів
    "strict": true, // вмикає всі суворі перевірки одразу
    "outDir": "./dist", // куди складати скомпільовані .js файли
    "rootDir": "./src", // де лежать вихідні .ts файли
    "esModuleInterop": true, // сумісність import/export між CJS та ESM
    "skipLibCheck": true, // не перевіряти типи в node_modules (швидше)
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"],
}
```

### Найважливіші опції для пояснення дітям

**`strict: true`** — головний перемикач. Вмикає одразу кілька перевірок:

```ts
// Без strict — це б скомпілювалось
function add(a, b) {
  // ❌ з strict: параметри мають неявний тип 'any'
  return a + b;
}

// Правильно зі strict
function add(a: number, b: number): number {
  return a + b;
}
```

**`target`** — визначає, наскільки "старий" JS буде на виході:

```ts
// Вихідний TS
const greet = (name: string) => `Привіт, ${name}`;

// При target: "ES5" стрілочна функція та шаблонний рядок
// перетворяться на код, зрозумілий навіть старим браузерам
```

### Практична команда для проєктів (watch-режим)

```bash
npx tsc --watch
```

Компілятор сам перекомпілює файли при кожному збереженні — покажіть це наживо, діти люблять такі "магічні" моменти.

---

## Домашнє завдання

1. Встановити TypeScript у новому проєкті та налаштувати `tsconfig.json` зі `strict: true`.
2. Створити файл `library.ts`, де є:
   - `interface Book` з полями `title`, `author`, `year`, `genre`;
   - `enum Genre` (наприклад: `Fiction`, `NonFiction`, `Science`);
   - масив книжок типу `Book[]`;
   - функцію `findBookByAuthor(books: Book[], author: string): Book | undefined`.
3. Скомпілювати та запустити результат через `ts-node`.

## Питання для повторення (усно, наприкінці уроку)

- Чим `interface` відрізняється від `type`? _(розширена тема — можна лише позначити, детально розберете в наступних уроках)_
- Чому `any` — це "небезпечно", а `unknown` — "безпечно"?
- Що робить `strict: true` у `tsconfig.json`?
- Навіщо потрібен `tuple`, якщо вже є звичайний масив?

---

### Нотатка для викладача

Найчастіша помилка учнів на старті — вони сприймають типи як "додаткову роботу", а не як інструмент, що економить час на дебазі. Гарний прийом: покажіть один і той самий баг спочатку на чистому JS (падає в рантаймі, незрозуміло де), а потім на TS (компілятор одразу підсвічує рядок і пояснює причину). Це найкраща демонстрація "навіщо це все".
