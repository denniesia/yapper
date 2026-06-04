import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema(
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
		tweet: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tweet",
			required: true,
		},
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

const Reply = mongoose.models.Reply || mongoose.model("Reply", ReplySchema);

export default Reply;
