import clientPromise from "../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;

    const db = client.db("yapper");

    const collections = await db.collections();

    return Response.json({
      success: true,
      collections: collections.map((c) => c.collectionName),
    });
  } catch (error) {
    return Response.json({
      success: false,
      error,
    });
  }
}