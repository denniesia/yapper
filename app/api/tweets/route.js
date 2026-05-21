import { ObjectId } from "mongodb";
import { makeSureDbIsReady } from "../../lib/db";
import Tweet from "../../lib/schemas/TweetSchema";
import { getServerSession } from "next-auth";




export async function POST(req) {
	try {
        const session = await getServerSession();
		await makeSureDbIsReady();

		const body = await req.json();

		const { content, author } = body;

		if (!content?.trim()) {
			return Response.json(
				{
					error: "Content is required",
				},
				{
					status: 400,
				},
			);
		}

        let authorId;
        try {
            authorId = new ObjectId(author);
        } catch (err) {
            return new Response(JSON.stringify({ 
                error: "Invalid author ID format" 
            }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

		const newTweet = await Tweet.create({
			author: authorId,
			content: content.trim(),
		});
        

		return Response.json(newTweet, {
			status: 201,
		});
	} catch (error) {
		console.log("POST ERROR:", error);

		return Response.json(
			{
				error: error.message,
			},
			{
				status: 500,
			},
		);
	}
}

export async function GET() {
	try {
		await makeSureDbIsReady();

		const tweets = await Tweet.find()
		.populate("author", "name username image")
		.sort({
			createdAt: -1,
		});

		return Response.json(tweets, {
			status: 200,
		});
	} catch (error) {
		console.log("GET ERROR:", error);

		return Response.json(
			{
				error: error.message,
			},
			{
				status: 500,
			},
		);
	}
}
