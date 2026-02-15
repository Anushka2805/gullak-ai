import mongoose, { Schema, models, model, Types } from "mongoose";

/* ---------------- TYPES ---------------- */

export interface AssetDocument {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  name: string;
  type:
    | "Bank"
    | "Insurance"
    | "Investment"
    | "Property"
    | "Gold"
    | "FD"
    | "Other";
  notes?: string;
  createdAt: Date;
}

/* ---------------- SCHEMA ---------------- */

const AssetSchema = new Schema<AssetDocument>(
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
      enum: [
        "Bank",
        "Insurance",
        "Investment",
        "Property",
        "Gold",
        "FD",
        "Other",
      ],
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

/* ---------------- MODEL ---------------- */

// Prevent model overwrite in dev
const Asset =
  (models.Asset as mongoose.Model<AssetDocument>) ||
  model<AssetDocument>("Asset", AssetSchema);

export default Asset;
