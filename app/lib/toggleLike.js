import Tweet from "../lib/schemas/TweetSchema";
import { makeSureDbIsReady } from "./db";

export async function toggleLike(tweetId, userId) {

    await makeSureDbIsReady();

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
        throw new Error("Tweet not found");
    }   

	const alreadyLiked = tweet.likes.some((id) => id.toString() === userId);


	if (alreadyLiked) {
        tweet.likes.pull(userId);
    } else {
        tweet.likes.push(userId);
    }

    await tweet.save();

    return {
        liked: !alreadyLiked,
        likesCount: tweet.likes.length,
    };
}