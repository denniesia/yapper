import TweetCard from "../tweet/TweetCard";
import TweetInput from "../tweet/TweetInput";



export default function Feed({ tweets }) {
  return (
    <main className="flex-1 border-r border-gray-800 max-w-3xl">
      <div className="p-4 border-b border-gray-800 text-xl font-bold">
        Home
      </div>

      <TweetInput />

      {tweets.map((tweet) => (
        <TweetCard key={tweet._id} tweet={tweet} />
      ))}
    </main>
  );
}