import mongoose from "mongoose";
import Tweet from "./TweetSchema"


const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: false,
			unique: true,
			trim: true,
			minlength: 3,
			maxlength: 20,
		},

		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},

		password: {
			type: String,
			required: false,
		},

		image: {
			type: String,
			default: "",
		},
		tweets: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Tweet",
			},
		],
		likedTweets: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Tweet",
			},
		],
	},
	{ timestamps: true },
);

const User = mongoose.models.User ?? mongoose.model("User", UserSchema);

export default User;
