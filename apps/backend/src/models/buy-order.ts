import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  cartId: { type: String, required: true },
  products: [
    {
      product: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      subtotal: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});


export const OrderModel = mongoose.model("Orders", orderSchema);
