import { makeSureDbIsReady } from "../../lib/db";
import  Tweet from "../../schemas/TweetSchema";

export async function POST(req) {
    await makeSureDbIsReady();

    const body = await req.json();

    try {
        const newTweet = await Tweet.create(body);
        return new Response(JSON.stringify(newTweet), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({error: "Error creating tweet"}), { status: 500})
    }
}