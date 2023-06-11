import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import { Product } from "./product.model";

const products = [
  { title: "DSA Javascript", price: 12.99 },
  { title: "DSA Python", price: 10.99 },
  { title: "DSA Java", price: 13.99 },
];

const loadedProducts = plainToClass(Product, products);

for (const product of loadedProducts) {
  console.log(product.getInformation());
}

// const product1 = new Product("DSA Javascript", 12.99);

const newProductWithValidator = new Product("", -5);
validate(newProductWithValidator).then((errors) => {
  if (errors.length > 0) {
    console.log("VALIDATION ERRORS", errors);
  } else {
    console.log(newProductWithValidator);
  }
});
