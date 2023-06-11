import { IsNumber, IsNotEmpty, IsPositive } from "class-validator";

export class Product {
  @IsNotEmpty({ message: "Product title should not be empty" })
  title: string;
  @IsNumber()
  @IsPositive({ message: "Product price should be positive" })
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }

  getInformation() {
    return [this.title, `${this.price}`];
  }
}
