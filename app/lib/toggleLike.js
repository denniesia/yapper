import Tweet from "../lib/schemas/TweetSchema";

export async function toggleLike(tweetId, userId) {
	const alreadyLiked = await Tweet.exists({
		_id: tweetId,
		likes: userId,
	});

	let updatedTweet;

	if (alreadyLiked) {
		updatedTweet = await Tweet.findByIdAndUpdate(
			tweetId,
			{
				$pull: { likes: userId },
			},
			{ new: true }
		);
	} else {
		updatedTweet = await Tweet.findByIdAndUpdate(
			tweetId,
			{
				$addToSet: { likes: userId },
			},
			{ new: true }
		);
	}

	return {
		liked: !alreadyLiked,
		likesCount: updatedTweet.likes.length,
	};
}