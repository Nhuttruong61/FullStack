const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    des: { type: String, required: true },
    price: { type: String, required: true },
    discount: { type: String },
    quality: { type: Number, required: true },
    reviews: [
      {
        user: {
          type: Object,
        },
        rating: {
          type: Number,
        },
        comment: {
          type: String,
        },
        createAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    sold_out: {
      type: Number,
      default: 0,
    },
    ratings: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Product", productSchema);
