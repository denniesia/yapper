import { makeSureDbIsReady } from "../../../lib/db";
import User from "../../../lib/schemas/UserSchema";


export async function GET(req, { params }) {
    await makeSureDbIsReady();
      console.log("params:", params);
  const { id } = await params;

  const user = await User.findById(id);

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  // fetch user
  return Response.json(user);
}