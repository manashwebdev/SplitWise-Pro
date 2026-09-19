import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    budget: {
      type: Number,
      required: true,
    },

    members: {
      type: [String],
      default: [],
    },
    coverImage: {
      type: String,
      default: "",
    },

  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.model(
  "Trip",
  tripSchema
);

export default Trip;