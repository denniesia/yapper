"use client"

import { formatDistanceToNow, format } from "date-fns";
import {
    MessageCircle,
    Heart
} from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import RepliesSection from "../reply/RepliesSection";

export default function TweetDetailsCard({ tweet }) {
    const { data: session, status } = useSession();

    const [reply, setReply] = useState("");
    const router = useRouter();

    async function saveReply() {
        if (!reply.trim()) return;

        try {
            await fetch(`/api/tweets/${tweet._id}/replies`, {
                method: "POST",
                body: JSON.stringify({
                    content: reply,
                    author: session.user.id,
                }),
                headers: {
                    "Content-Type": "application/json",
                },

            });

            setReply("");
            router.refresh();

        } catch (error) {
            console.error(error);
        }
    };

    const createdTimeAgo = formatDistanceToNow(
        new Date(tweet.createdAt),
        { addSuffix: true }
    );

    const fullDate = format(
        new Date(tweet.createdAt),
        "h:mm a · MMM d, yyyy"
    );

    return (
        <>
            <div className="max-w-3xl mx-auto border-b border-gray-800 p-6">
                {/* Header */}
                <div className="flex items-start gap-3">
                    <img
                        src={
                            tweet.author.image ||
                            "https://media.idownloadblog.com/wp-content/uploads/2017/03/Twitter-new-2017-avatar-001.png"
                        }
                        alt={tweet.author.username}
                        className="w-14 h-14 rounded-full object-cover"
                    />

                    <div className="flex-1">
                        <div className="flex flex-col">
                            <span className="font-bold text-white text-lg">
                                {tweet.author.name || tweet.author.username}
                            </span>

                            <span className="text-gray-500">
                                @{tweet.author.username}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-xl leading-relaxed text-white whitespace-pre-wrap">
                        {tweet.content}
                    </p>
                </div>

                {/* Timestamp */}
                <div className="mt-5 text-gray-500 text-sm -b border-gray-800 pb-4">
                    {fullDate}
                    <span className="ml-2">·</span>
                    <span className="ml-2">{createdTimeAgo}</span>
                </div>

                {/* Stats */}
                <div className="flex gap-6 py-4 text-sm border-b border-gray-800">
                    <span>
                        <strong className="text-white">
                            {tweet.replies?.length || 0}
                        </strong>{" "}
                        <span className="text-gray-500">Replies</span>
                    </span>

                    <span>
                        <strong className="text-white">
                            {tweet.likes?.length || 0}
                        </strong>{" "}
                        <span className="text-gray-500">Likes</span>
                    </span>
                </div>

                {/* Actions */}
                <div className="flex justify-around mt-4 text-gray-500">
                    <button className="hover:text-blue-400 transition">
                        <MessageCircle size={20} />
                    </button>
                    <button className="hover:text-pink-500 transition">
                        <Heart size={20} />
                    </button>
                </div>

            </div>
            {session?.user && <div className="border-b border-gray-800 p-4">
                <div className="flex gap-3">
                    <img
                        src={session.user.image || 'https://media.idownloadblog.com/wp-content/uploads/2017/03/Twitter-new-2017-avatar-001.png'}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                    />

                    <div className="flex-1">
                        <textarea
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            placeholder="Post your reply"
                            className="
                                w-full
                                bg-transparent
                                text-white
                                text-lg
                                resize-none
                                outline-none
                                placeholder:text-gray-500
                                "
                            rows={2}
                        />

                        <div className="flex justify-end mt-1">
                            <button
                                onClick={saveReply}
                                disabled={!reply.trim()}
                                className="
                                    bg-blue-500
                                    hover:bg-blue-600   
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                    text-white
                                    font-semibold
                                    px-5
                                    py-2
                                    rounded-full
                                "
                            >
                                Reply
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            }

            <RepliesSection tweet={tweet} />
            
        </>

    );
}