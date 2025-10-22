import mongoose, { Schema } from "mongoose";
import { IProduct } from "../../../../domain/dist";

const ProductSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Boolean, required: true },
});

export const ProductModel = mongoose.model<IProduct>("Products", ProductSchema);
