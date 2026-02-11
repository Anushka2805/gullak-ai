import mongoose, { Schema, models, model } from "mongoose";

export interface IDocument {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  assetId?: mongoose.Types.ObjectId;
  name: string;
  filePath: string;
  createdAt: Date;
}

const DocumentSchema = new Schema<IDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    assetId: {
      type: Schema.Types.ObjectId,
      ref: "Asset",
      required: false,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    filePath: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Document =
  models.Document || model<IDocument>("Document", DocumentSchema);

export default Document;
