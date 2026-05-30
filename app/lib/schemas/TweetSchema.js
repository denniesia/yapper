import mongoose from "mongoose";
import ReplySchema from "./ReplySchema"

const TweetSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
			maxlength: 280,
		},

		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		replies: [ReplySchema],
		likes : [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User"
			}
		]
	},
	{
		timestamps: true,
	},
);

const Tweet = mongoose.models.Tweet ?? mongoose.model("Tweet", TweetSchema);

export default Tweet;
