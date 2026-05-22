"use client"

import { useRouter } from "next/navigation";
import TweetCard from "../tweet/TweetCard";
import TweetInput from "../tweet/TweetInput";



export default function Feed({ tweets }) {
    const router = useRouter();

    const handleTweetPosted = () => {
        router.refresh();
    }

    return (
        <main className="flex-1 border-r border-gray-800 max-w-3xl">
            <div className="p-4 border-b border-gray-800 text-3xl font-bold mb-4">
                Home

            </div>

            <TweetInput onTweetPosted={handleTweetPosted} />
            {tweets.length > 0
                ? tweets.map((tweet) => (
                    <TweetCard key={tweet._id} tweet={tweet} />
                ))
                : <div className="flex items-center justify-center mt-10 text-gray-500">
                    No tweets yet
                </div>
            }


        </main>
    );
}