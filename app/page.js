import TweetCard from "./components/TweetCard";

async function getTweets() {
  const res = await fetch("https://dummyjson.com/posts");
  return res.json();
}

export default async function HomePage() {
  const tweets = await getTweets();

  return (
    <main>
      <h1>📝 Latest Tweets</h1>
      <ul>
        {tweets.posts.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
      </ul>
    </main>
  );
}