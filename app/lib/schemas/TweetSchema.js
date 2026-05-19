import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: 280,
    },

    // author: {
    //   type: String,
    //   required: true,
    // },

    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Tweet =
  mongoose.models.Tweet ??
  mongoose.model("Tweet", TweetSchema);

export default Tweet;