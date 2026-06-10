import Tweet from "./schemas/TweetSchema";

export async function getTweetsByUser(userId) {
	return Tweet.find({ author: userId })
		.populate("author")
		.sort({ createdAt: -1})
}