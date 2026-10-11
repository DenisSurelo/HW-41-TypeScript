1. Конструктор і оголошення властивостей

🟢 Створи клас Pet з властивостями name: string і age: number. Додай конструктор, створи двох улюбленців і виведи їх у консоль.

🟡 Створи клас Hero з полями name, health, level. Конструктор має приймати всі три значення. Створи трьох героїв і виведи у консоль масив їхніх імен.

🔴 Створи клас Book з полями title, author, pages. Спробуй створити new Book("Гаррі") без інших аргументів і прочитай помилку TS. Поясни своїми словами, що вона означає.

2. Методи класу (отримання значень)

🟢 У класі Pet додай метод getInfo(): string, що повертає "Барсик, 3 роки".

🟡 У класі Hero додай методи isAlive(): boolean (чи health > 0) і describe(): string. Створи героя з health = 0 і перевір обидва.

🔴 Створи клас Rectangle з width і height. Додай методи getArea(), getPerimeter() і isSquare(). Порівняй 3 різні прямокутники.

3. Модифікатори доступу (public, private, protected)

🟢 Створи клас Wallet з private balance = 0. Спробуй зробити wallet.balance = 1000 і подивись на помилку.

🟡 Додай у Wallet публічні методи deposit(amount), spend(amount) і getBalance(). Метод spend не має дозволяти піти в мінус.

🔴 Створи клас Character з protected secretPower: string і клас-нащадок, який може його читати. Перевір, що ззовні поле недоступне, а зсередини нащадка доступне. Поясни різницю між private і protected на прикладі «сімейного сейфа».

4. Скорочена ініціалізація (parameter properties)

🟢 Перепиши клас Pet з Завдання 1 так, щоб не було окремого оголошення полів і присвоєнь у конструкторі:

🟡 Перепиши Hero зі скороченням, але так, щоб name був public, а health private.

🔴 Дай однокласнику код зі скороченням і попроси відновити довгу версію. Потім навпаки. Хто швидше й без помилок?

5. readonly

🟢 Створи клас Student з readonly id: number. Спробуй змінити id після створення і прочитай помилку.

🟡 Створи клас Passport з readonly полями firstName, lastName, birthDate і звичайним полем photoUrl. Перевір, що можна змінювати, а що ні.

🔴 Придумай і поясни: чому readonly tags: string[] не забороняє tags.push("new")? Як зробити масив справді незмінним? (підказка: readonly string[] або ReadonlyArray<string>)

6. Наслідування (extends, super)

🟢 Створи базовий клас Animal з name і методом eat(). Створи Dog extends Animal з методом bark() і Cat extends Animal з методом meow().

🟡 Додай у Dog власний конструктор з додатковим полем breed. Не забудь викликати super(name). Що буде, якщо забути?

🔴 Школа магії: створи Wizard (базовий) → FireWizard і IceWizard. Перевизнач метод castSpell() у кожному нащадку. Зроби масив із різних магів і в циклі викличи castSpell() для всіх.

7. Getter / Setter

🟢 У класі Circle зроби private \_radius і getter radius. Прочитай його як звичайну властивість (circle.radius, без дужок).

🟡 Додай setter, який не дозволяє від'ємний радіус (кидає Error або ігнорує значення). Додай getter area, що обчислює площу.

🔴 Створи клас Temperature з private \_celsius. Додай getter/setter fahrenheit, який автоматично перераховує значення. temp.fahrenheit = 212 має встановити celsius = 100.

8. Static методи й властивості

🟢 Створи клас MathHelper зі static PI = 3.14 і static square(n: number). Виклич їх без створення об'єкта.

🟡 Створи клас Player зі статичним лічильником private static total = 0. Конструктор збільшує його. Додай static getTotal(). Створи 5 гравців і перевір результат.

🔴 Генератор ID: створи клас Ticket, де кожен новий квиток автоматично отримує унікальний номер (1, 2, 3...) завдяки статичному полю. Додай readonly id.

9. Abstract classes

🟢 Створи abstract class Shape з абстрактним методом getArea(): number. Спробуй зробити new Shape() і прочитай помилку.

🟡 Створи Circle і Square, що наслідують Shape і реалізують getArea(). Забудь реалізувати метод в одному з них, щоб побачити помилку.

🔴 У abstract class Vehicle зроби один абстрактний метод move() і один звичайний stop(), що вже має реалізацію. Створи Car, Boat, Plane. Склади масив Vehicle[] і запусти move() кожного.

10. Extending Interfaces

🟢 Створи interface Person { name: string; age: number } і interface Student extends Person { school: string }. Створи об'єкт типу Student.

🟡 Створи interface Flyer { fly(): void } і interface Swimmer { swim(): void }. Тоді interface Duck extends Flyer, Swimmer. Створи клас MallardDuck implements Duck.

🔴 Побудуй ієрархію гри: GameObject (x, y) → Character (name, health) → Enemy (damage). Створи об'єкт Enemy і поясни, які поля в нього є «в спадок».

11. Інтерфейси як тип функції

🟢 Створи interface Greeter { (name: string): string }. Реалізуй функцію-вітання через стрілочну функцію цього типу.

12. Опціональні параметри

🟢 Напиши функцію greet(name: string, title?: string). Якщо title є, виведи "Пан Іван", якщо ні — "Іван".

🟡 Створи клас User з обов'язковими name, email і опціональним nickname?: string. Додай метод getDisplayName(), що повертає nickname, якщо він є, і name інакше. Використай ??.

🔴 Створи інтерфейс Product з title, price і опціональними discount? та description?. Напиши функцію getFinalPrice(product), що враховує знижку лише тоді, коли вона є. Протестуй на трьох товарах.
