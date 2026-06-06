import { makeSureDbIsReady } from "../../../lib/db";
import Tweet from "../../../lib/schemas/TweetSchema";

export async function GET(request, { params }) {
	try {
		await makeSureDbIsReady();

		const { id } = await params;

		const tweet = await Tweet.findById(id)
			.populate("author")
			.populate({
				path: "replies",
				populate: {
					path: "author",
					select: "name username image",
				},
			});

		if (!tweet) {
			return Response.json({ error: "Tweet not found" }, { status: 404 });
		}

		return Response.json(tweet, { status: 200 });
	} catch (error) {
		console.error("API Error:", error);
		return Response.json({ error: error.message }, { status: 500 });
	}
}
