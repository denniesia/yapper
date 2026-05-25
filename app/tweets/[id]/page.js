async function getTweet(id) {
  const res = await fetch(`http://localhost:3001/api/tweets/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch tweet");
  }

  return res.json();
}

export default async function TweetPage({ params }) {
  const { id } = await params;

  const tweet = await getTweet(id);

  return (
    <main>
      <h1>{tweet.title}</h1>

      <p>{tweet.body}</p>

      <p>
        👍 {tweet.reactions.likes} | 👎 {tweet.reactions.dislikes}
      </p>
    </main>
  );
}