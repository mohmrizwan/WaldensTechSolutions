import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    highlight: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
    },
    primaryCtaText: {
      type: String,
      required: true,
      trim: true,
    },
    primaryCtaUrl: {
      type: String,
      default: "/contact",
      trim: true,
    },
    secondaryCtaText: {
      type: String,
      required: true,
      trim: true,
    },
    secondaryCtaUrl: {
      type: String,
      default: "/project",
      trim: true,
    },
    cards: [
      {
        title: { type: String, required: true, trim: true },
        value: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Banner", bannerSchema);
