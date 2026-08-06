# TypeScript Course

```ts
class Car {
  brand: sting;
  private fuel: number = 55;

  constructor(brand: string) {
    this.brand = brand;
  }

  drive(km: number): void {
    const fuelNeeded = km * 0.1;
    if (fuelNeeded > this.fuel) {
      console.log(`${this.brand}: мало палива`);
      return;
    }

    this.fuel -= fuelNeeded;
    console.log(
      `${this.brand} проїхав ${km} км. Залишилось пального: ${this.fuel.toFixed(1)}`,
    );
  }

  refuel(): void {
    this.fuel = 55;
    console.log(`${this.brand}: бак повний`);
  }
}

const audi = new Car("Audi");
const bmw = new Car("BMW");
audi.drive(20);
bmw.refuel();
```
