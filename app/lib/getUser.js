import { makeSureDbIsReady } from "./db";
import User from "./schemas/UserSchema";


export async function getUser(id) {
  await makeSureDbIsReady();

  const user = await User.findById(id).lean();

  return JSON.parse(JSON.stringify(user));
}