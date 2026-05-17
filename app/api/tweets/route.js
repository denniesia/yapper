import { makeSureDbIsReady } from "../../lib/db";
import Tweet from "../../schemas/TweetSchema";

export async function POST(req) {
  try {
    await makeSureDbIsReady();

    const body = await req.json();

    const newTweet = await Tweet.create(body);

    return Response.json(newTweet, {
      status: 201,
    });
  } catch (error) {
    console.log("POST ERROR:", error);

    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    await makeSureDbIsReady();

    const tweets = await Tweet.find().sort({
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
      }
    );
  }
}