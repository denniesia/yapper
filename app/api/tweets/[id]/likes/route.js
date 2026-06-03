import { NextResponse } from "next/server";
import { toggleLike } from "../../../../lib/toggleLike";

export async function POST(req, { params }) {
	const result = await toggleLike(tweetId, session.user.id);

	return Response.json(result);
}
