import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import {
    Heart
} from "lucide-react";
import { useState } from "react";

export default function TweetCard({ tweet }) {
    const [isLiked, setIsLiked] = useState(false);
    const createdTimeAgo = formatDistanceToNow(new Date(tweet.createdAt), { addSuffix: true });


    function handleLikeAction() {
        setIsLiked(prev => !prev);
    }

    return (
        <>

            <div className="p-4 border-b border-gray-800 flex space-x-4 hover:bg-gray-900">
                <Link href={`/tweets/${tweet._id}`}>
                    <div className="flex space-x-4">
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex-shrink-0">
                            <img
                                className="w-12 h-12 rounded-full object-cover"
                                src={
                                    tweet.author.image ||
                                    "https://media.idownloadblog.com/wp-content/uploads/2017/03/Twitter-new-2017-avatar-001.png"
                                }
                                alt=""
                            />
                        </div>

                        <div className="flex-1">
                            <div className="text-gray-400 text-sm">
                                @{tweet.author.username} · {createdTimeAgo}
                            </div>

                            <p className="mt-2">{tweet.content}</p>
                        </div>
                    </div>
                </Link>
                <button className="ml-auto hover:text-pink-500 transition text-gray-500 cursor-pointer mr-4" onClick={handleLikeAction}>
                    {
                        isLiked
                            ? <Heart size={22} color="#F23299" fill="#F23299" />
                            : <Heart size={22} />
                    }

                </button>

            </div >
        </>
    );
}

