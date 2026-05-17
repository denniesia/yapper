export default function TweetCard({ tweet }) {
    console.log(tweet)
    return (
        <div
            key={tweet._id}
            className="p-4 border-b border-gray-800 flex space-x-4 hover:bg-gray-900"
        >
            <div className="w-12 h-12 bg-gray-700 rounded-full flex-shrink-0" />

            <div>
                {/* <div className="font-semibold">User {tweet.userId}</div> */}

                <div className="text-gray-400 text-sm">
                    @username · 1h
                </div>

                <p className="mt-2">
                    {tweet.content}
                </p>
            </div>
        </div>
    );
}

