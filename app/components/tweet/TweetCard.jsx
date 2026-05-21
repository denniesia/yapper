export default function TweetCard({ tweet }) {
    
    return (
        <div
            key={tweet._id}
            className="p-4 border-b border-gray-800 flex space-x-4 hover:bg-gray-900"
        >
            <div className="w-12 h-12 bg-gray-700 rounded-full flex-shrink-0">
                <img className="w-12 h-12 bg-gray-700 rounded-full flex-shrink-0" src={tweet.author.image || 'https://media.idownloadblog.com/wp-content/uploads/2017/03/Twitter-new-2017-avatar-001.png'}></img>
            </div> 

            <div>

                <div className="text-gray-400 text-sm">
                    @{tweet.author.username} · 1h
                </div>

                <p className="mt-2">
                    {tweet.content}
                </p>
            </div>
        </div>
    );
}

