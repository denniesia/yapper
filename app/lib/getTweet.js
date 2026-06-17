import { makeSureDbIsReady } from "./db";
import Tweet from "./schemas/TweetSchema";

export async function getTweet(id) {
	await makeSureDbIsReady();

	const tweet = await Tweet.findById(id)
		.populate({
			path: "author",
			select: "name username image",
		})
		.populate({
			path: "replies",
			populate: {
				path: "author",
				select: "name username image",
			},
		});

	return JSON.parse(JSON.stringify(tweet));
}
