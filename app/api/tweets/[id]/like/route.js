import { NextResponse } from "next/server";
import { toggleLike } from "../../../../lib/toggleLike";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../api/auth/[...nextauth]/route";

export async function POST(req, { params }) {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { id } = await params;
		console.log("Tweet ID:", id);
		const result = await toggleLike(id, session.user.id);

		return NextResponse.json(result);
	} catch (err) {
		console.error("LIKE ERROR:", err);

		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}

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

		const liked = session
            ? tweet.likes.some(
                  likeId =>
                      likeId.toString() === session.user.id
              )
            : false;

        return Response.json({
            tweet,
            liked,
            likesCount: tweet.likes.length,
        });
	} catch (error) {
		console.error("API Error:", error);
		return Response.json({ error: error.message }, { status: 500 });
	}
}
