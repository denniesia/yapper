import mongoose from "mongoose";


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

		replies: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Reply",
			},
		],
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		timestamps: true,
	},
);

const Tweet = mongoose.models.Tweet ?? mongoose.model("Tweet", TweetSchema);

export default Tweet;
