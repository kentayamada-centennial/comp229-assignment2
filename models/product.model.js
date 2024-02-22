import mongoose from "mongoose"

export const Product = mongoose.model(
  "products",
  new mongoose.Schema(
    {
      name: {
        required: true,
        trim: true,
        type: String
      },
      description: {
        required: true,
        trim: true,
        type: String
      },
      price: {
        required: true,
        type: Number,
      },
      quantity: {
        required: true,
        type: Number,
      },
      category: {
        required: true,
        trim: true,
        type: String
      },
    }
  )
)
