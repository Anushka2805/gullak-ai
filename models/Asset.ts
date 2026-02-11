import mongoose, { Schema, models, model } from "mongoose";

export interface IAsset {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  name: string;
  type: "Bank" | "Insurance" | "Investment" | "Other";
  notes?: string;
  createdAt: Date;
}

const AssetSchema = new Schema<IAsset>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["Bank", "Insurance", "Investment", "Other"],
      required: true,
    },

    notes: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Prevent model overwrite in dev
const Asset = models.Asset || model<IAsset>("Asset", AssetSchema);

export default Asset;
