const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { type: Array },
    totalPrice: { type: String, required: true },
    status: { type: String, default: "Chờ xử lý" },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Order", orderSchema);
