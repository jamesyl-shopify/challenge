import { SchemaTypes, Schema, model } from "mongoose";
const { String, Number: MNumber } = SchemaTypes;

export interface IInventory {
  name: string;
  desc?: string;
  currLocation: string;
  totalItems: number;
}

const Inventory = new Schema<IInventory>({
  name: {
    type: String,
    required: true,
    validate: [
      (v: string) => v.length >= 1,
      "Name string must be at least length 1",
    ],
  },
  desc: { type: String, required: false },
  currLocation: {
    type: String,
    required: true,
    validate: [
      (v: string) => v.length >= 1,
      "Location string must be at least length 5",
    ],
  },
  totalItems: {
    type: MNumber,
    validate: [
      (item: unknown) => Number.isInteger(item) && (item as number) >= 1,
      "Total items must be at least 1 and an integer",
    ],
    required: true,
  },
});

Inventory.set("toJSON", {
  versionKey: false,
  transform: (_, ret) => {
    const id = ret._id;
    delete ret._id;
    ret.id = id;
  },
});
Inventory.set("toObject", {
  versionKey: false,
  transform: (_, ret) => {
    const id = ret._id;
    delete ret._id;
    ret.id = id;
  },
});
export default model("Inventory", Inventory);
