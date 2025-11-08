import mongoose from "mongoose";

const ReviewItemSchema = new mongoose.Schema({
  listingName: String,
  guestName: String,
  rating: Number,
  reviewCategory: Array,   
  type: String,
  submittedAt: Date,
  publicReview: String,
  channel: String,
  isApproved: { type: Boolean, default: false },
});

export default mongoose.model("ReviewItem", ReviewItemSchema);
