import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "../../../../lib/db";
import Tweet from "../../../../lib/schemas/TweetSchema";

export async function GET(req, { params }) {
	try {
		const { id } = await params;

		await makeSureDbIsReady();
		const tweets = await Tweet.find({
			author: id,
		})
			.populate("author", "username name image")
			.sort({ createdAt: -1 });

		return NextResponse.json(tweets, { status: 200 });
	} catch (error) {
		console.error("Error fetching user tweets:", error);

		return NextResponse.json(
			{ message: "Failed to fetch tweets" },
			{ status: 500 },
		);
	}
}
