import { NextResponse } from "next/server";
import Tweet from "../../../../lib/schemas/TweetSchema";

export async function GET(req, { params }) {
    try {
        await makeSureDbIsReady();

        console.log("params.id:", params.id);

        const tweets = await Tweet.find({ author: params.id })
            .populate("author")
            .sort({ createdAt: -1 });

        console.log("tweets:", tweets);

        return NextResponse.json(tweets);
    } catch (err) {
        console.error("GET tweets error:", err);

        return NextResponse.json(
            { error: "Failed to fetch tweets" },
            { status: 500 }
        );
    }
}