import mongoose from "mongoose";

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
	},
	{ timestamps: true },
);

const User = mongoose.models.User ?? mongoose.model("User", UserSchema);

export default User;
