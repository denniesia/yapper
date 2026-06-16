import { ObjectId } from "mongodb";
import { makeSureDbIsReady } from "../../lib/db";
import Tweet from "../../lib/schemas/TweetSchema";
import { getServerSession } from "next-auth";
import User from "../../lib/schemas/UserSchema";
import mongoose from "mongoose";
import { authOptions } from "../auth/[...nextauth]/route";


export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    await makeSureDbIsReady();

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await req.json();

    if (!content?.trim()) {
      return Response.json({ error: "Content is required" }, { status: 400 });
    }

    const newTweet = await Tweet.create({
      author: session.user.id,
      content: content.trim(),
    });

    await newTweet.populate("author", "name username image");

    await User.findByIdAndUpdate(session.user.id, {
      $push: { tweets: newTweet._id },
    });

    return Response.json(newTweet, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
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
