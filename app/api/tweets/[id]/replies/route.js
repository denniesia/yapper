import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "../../../../lib/db";
import Reply from "../../../../lib/schemas/ReplySchema";
import Tweet from "../../../../lib/schemas/TweetSchema";

export async function POST(req, { params }) {
    try {
        await makeSureDbIsReady();

        const { id } = await  params;
        const { content, author } = await req.json();

        if (!content) {
            return NextResponse.json(
                {error: "Content is required"},
                {status: 400}
            )
        }

        const reply = await Reply.create({
            content,
            author,
            tweet: id
        })

        await Tweet.findByIdAndUpdate(id, {
            $push: {
                replies: reply._id
            }
        })

        return NextResponse.json(reply, { status: 201 });
    } catch(error) {
        console.error(error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}

export async function GET(req, { params }) {
  try {
    await makeSureDbIsReady();

    const { id } = await params;

    const replies = await Reply.find({ tweet: id })
      .populate("author", "name username image")
      .sort({ createdAt: -1 });

    return Response.json(replies, { status: 200 });
  } catch (error) {
    console.log("GET ERROR:", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
	try {
		await makeSureDbIsReady();

		const { id } = await params;

		const deletedReply = await Reply.findByIdAndDelete(id);

		if (!deletedReply) {
			return Response.json({ error: "Reply not found" }, { status: 404 });
		}

		return Response.json(
			{ message: "Reply deleted successfully" },
			{ status: 200 },
		);
	} catch (error) {
		console.log("GET ERROR:", error);

		return Response.json({ error: error.message }, { status: 500 });
	}
}