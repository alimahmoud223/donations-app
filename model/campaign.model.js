import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "title must be more than 3 chars"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: [10, "description must be more than 10 chars"],
    },
    targetAmount: {
      type: Number,
      required: true,
      min: [1, "target amount must be greater than 0"],
    },
    collectedAmount: {
      type: Number,
      default: 0,
      min: [0, "collected amount cannot be negative"],
    },
    category: {
      type: String,
      enum: ["medical", "education", "charity", "emergency", "other"],
      default: "other",
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "completed", "closed"],
      default: "active",
    },
    createdBy: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const campaignModel = mongoose.model("Campaign", campaignSchema);

export default campaignModel;
