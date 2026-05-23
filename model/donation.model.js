import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
  purpose: { type: String, enum: ["medical", "tools", "social"], default: "social" },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  status: { type: String, enum: ["pending", "confirmed", "refunded"], default: "pending" },
  message: { type: String },
  isAnonymous: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Donation", donationSchema);