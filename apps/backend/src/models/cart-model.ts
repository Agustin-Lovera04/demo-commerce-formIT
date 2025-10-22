import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: { type: String, required: true },
      quantity: { type: Number, default: 1 },
      price: {type: Number},
      subtotal: {type: Number}
    },
  ],
  total: { type: Number, required: true, default: 0 }
});

export const CartModel = mongoose.model("Cart", cartSchema);
