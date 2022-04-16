import Inventory, { IInventory } from "../model/Inventory";
import mongoose from "mongoose";

const stringToId = (id: string) => {
  try {
    return new mongoose.Types.ObjectId(id);
  } catch (err) {
    return new Error("Invalid id");
  }
};

export const getInventory = async () => Inventory.find({});
export const deleteInventory = async (id: string) =>
  Inventory.findByIdAndRemove(stringToId(id));
export const editInventory = async (id: string, body: IInventory) =>
  Inventory.findByIdAndUpdate(
    stringToId(id),
    { ...body, _id: undefined },
    { runValidators: true }
  );
export const addInventory = async (body: IInventory) =>
  new Inventory({ ...body, _id: undefined }).save();