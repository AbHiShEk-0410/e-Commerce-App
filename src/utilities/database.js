import faker from "faker"
faker.seed(123);

export const data = [...Array(50)].map((item) => ({
  id: faker.random.uuid(),
  name: faker.commerce.productName(),
  image: faker.image.food(),
  price: faker.commerce.price(),
  brand: faker.lorem.word(),
  inStock: faker.random.boolean(),
  ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  offer: faker.random.arrayElement([
    "Save 50",
    "70% bonanza",
    "Republic Day Sale",
    "Buy 1 get 1"
  ]),
  origin: faker.random.arrayElement([
    "Indian",
    "Western",
    "Chinese",
    "Italian",
    "Mexican"
  ]),
  type: faker.random.arrayElement([
    "Sweet",
    "Spicy",
    "Hot and Sweet",
    "Beverage",
    "Desert"
  ]),
  delivery: faker.random.arrayElement(["1 Day", "2-3 Days", "5-7 Days"])
}));