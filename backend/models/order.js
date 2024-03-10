const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { typpe: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { typpe: mongoose.Schema.Types.ObjectId, ref: "Product" },
    totalPrice: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Order", orderSchema);
