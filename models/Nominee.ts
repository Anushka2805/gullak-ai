import mongoose, { Schema, models, model } from "mongoose";

export interface INominee {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  name: string;
  relation: string;
  email: string;
  accessGranted: boolean;
  createdAt: Date;
}

const NomineeSchema = new Schema<INominee>(
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

    relation: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    accessGranted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Nominee = models.Nominee || model<INominee>("Nominee", NomineeSchema);
export default Nominee;
