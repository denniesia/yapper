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