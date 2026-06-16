import { makeSureDbIsReady } from "../lib/db";
import Tweet from "../lib/schemas/TweetSchema";

export async function getTweets() {
  await makeSureDbIsReady();

  const tweets = await Tweet.find({})
    .sort({ createdAt: -1 })
    .populate("author", "name username image")
    .lean();

  return JSON.parse(JSON.stringify(tweets));
}