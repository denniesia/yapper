import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "../../../lib/db";
import Reply from "../../../lib/schemas/ReplySchema";



export async function DELETE(req, { params }) {
	try {
		await makeSureDbIsReady();

		const { id } = await params;
        console.log("Deleting reply with ID:", id);

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


export async function PATCH(req, { params }) {
	try {
		await makeSureDbIsReady();

		const { id } = await params;
		const { content } = await req.json();
		
		const updatedReply = await Reply.findByIdAndUpdate(
			id, 
			{
				content
			},
			{ new: true }
		)

		if (!updatedReply) {
			return NextResponse.json(
				{ message: "Reply not found" },
				{ status: 404 }
			)
		}

		return NextResponse.json(updatedReply);
	} catch(error) {
		return NextResponse.json(
			{ message : error.message },
			{ status: 500 }
		)
	}
}
