"use client";

import { useState } from "react";
import { X } from "lucide-react";
import useCurrentUser from "../../hooks/useCurrentUser";
import { createTweet } from "../../lib/createTweet"
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export default function TweetEditModal({
    tweet,
    onClose,
}) {
    const [content, setContent] = useState(tweet.content);

    const router = useRouter();

    async function saveTweet() {
        if (!content.trim()) return;

        await createTweet(content, user._id);

        setContent("");
        onClose();
        router.refresh();
    }

    const fullDate = format(
        new Date(tweet.createdAt),
        "h:mm a · MMM d, yyyy"
    );

    const editedFullDate = format(
        new Date(tweet.updatedAt),
        "h:mm a · MMM d, yyyy"
    );




    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" >
            <div className="w-full max-w-xl rounded-2xl bg-black border-2 border-gray-800 shadow-xl" >

                {/* Header */}
                <div className="flex items-center gap-4 px-4 py-3 border-b border-gray-800">
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full transition-colors hover:bg-gray-800"
                    >
                        <X size={20} className="text-gray-300" />
                    </button>

                    <h2 className="text-lg font-semibold text-white">
                        Edit Tweet
                    </h2>
                </div>
                <div className="flex gap-3 px-4 pt-4">
                    <img
                        src={
                            tweet.author?.image ||
                            "https://media.idownloadblog.com/wp-content/uploads/2017/03/Twitter-new-2017-avatar-001.png"
                        }
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />

                    <div className="flex-1">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="What's happening?"
                            className="w-full bg-transparent resize-none outline-none text-xl text-gray-400 min-h-[140px] "
                        />

                        {/* Tweet metadata */}
                        {
                            editedFullDate !== fullDate && 
                            (<div className="text-sm text-gray-500 text-end mb-1">Edited· {editedFullDate}</div>)
                        }

                        <div className="text-sm text-gray-500 text-end">
                            Originally posted · {fullDate}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-4" />
                {/* Footer */}
                <div className="flex justify-between p-4 border-t border-gray-800">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-full bg-gray-500 font-semibold hover:bg-gray-600 "
                    >
                        Cancel
                    </button>
                    <button
                        onClick={saveTweet}
                        disabled={!content.trim()}
                        className="px-6 py-2 rounded-full bg-blue-500 font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
}