### Інкапсуляція

З об'єкта ми можемо достукатися до методу myPublicMethod, але викликати напряму protectedMethod з об'єкта не можемо, тільки за допомогою myPublicMethod, тим самим ми обмежили взаємодію з об'єктом,

```js
function protectedMethod() {
  return "Something";
}

class myClass {
  myPublicMethod() {
    return protectedMethod();
  }
}
```

І тепер ми явно вказали, що protectedMethod приватний, що покращує читання коду.

Суть не тільки в модифікаторах як ми бачимо, суть у тому, що ми приховуємо реалізацію та видаємо якийсь інтерфейс для взаємодії, а все, що його не стосується, приховано.

```ts
class myClass {
  private protectedMethod() {
    return "Something";
  }

  public myPublicMethod() {
    return this.protectedMethod();
  }
}
```

### Наслідування

Це коли один об'єкт може мати властивості іншого, в js це реалізовано через прототипи.

```ts
class classA {
  myMethod() {
    return "I'm a class A";
  }
}

class classB extends classA {}
```

### Поліморфізм

```ts
class classA {
  myMethod() {
    return "I'm a class A";
  }
}

class classB extends classA {
  myMethod() {
    return "I'm a class B";
  }
}

class Animal {
  public say() {
    console.log("Nothing to say");
  }
}

class Cat extends Animal {
  public say() {
    console.log("Meow");
  }
}

class Dog extends Animal {
  public say() {
    console.log("Woof");
  }
}

const cat = new Cat();
cat.say(); // Meow

const dog = new Dog();
dog.say(); // Woof


Собака і кішка є тваринами, але звуки вони видають різні, тому хоч це і метод say, повертає він різні результати, залежно від того, який об'єкт його викликає.
```

### Абстракція

це не пиляти все в один великий метод, а розділити на кілька методів, який виконує кожен своє завдання, і викликати їх усіх в одному методі:

```ts
class classA {
  private process1() {
    return 1;
  }
  private process2() {
    return 2;
  }
  private process3() {
    return 3;
  }

  public superProcess() {
    return this.process1() + this.process2() + this.process3();
  }
}
```

Давайте приклад із життя, де ми бачимо реалізацію абстракції, візьмемо, наприклад, ліфт. Ви заходите в кабіну ліфта і натискаєте на кнопку поверху, і все, ліфт уже поїхав, ось кнопка поверху - це абстракція над усіма процесами ліфта, натискаючи на неї, вам не потрібно думати, що запускається мотор (і тим паче самому його запускати), що вгору-вниз їздять противаги та натягуються троси. Простіше кажучи, це зменшення складності компонентів програми за рахунок приховування від програміста, який використовує ці компоненти, непотрібних подробиць. Натиснув кнопку і поїхав.
