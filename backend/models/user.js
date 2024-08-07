const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    role: { type: String, default: "user" },
    phone: { type: String },
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        color: { type: String, required: true },
      },
    ],
    address: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
