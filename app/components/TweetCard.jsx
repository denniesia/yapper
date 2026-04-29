export default function TweetCard({ tweet }) {
    return (
        <div className="border border-gray-200 rounded-2xl p-5 m-3 shadow-sm hover:shadow-md transition bg-white">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {tweet.title}
            </h3>

            <p className="text-gray-600 mb-4">
                {tweet.body}
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <span>👍 {tweet.reactions.likes}</span>
                <span>👎 {tweet.reactions.dislikes}</span>
            </div>

            <p className="text-xs text-gray-400">
                Tags: {tweet.tags.join(", ")}
            </p>
        </div>
    );
}

