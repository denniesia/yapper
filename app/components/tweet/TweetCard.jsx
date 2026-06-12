"use client";

import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Heart, MessageCircle, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import useCurrentUser from "@/app/hooks/useCurrentUser";

export default function TweetCard({ tweet }) {
    const { user } = useCurrentUser();
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(tweet.likes.length);

    useEffect(() => {
        if (!user?.id) return;

        setIsLiked(
            tweet.likes.some(
                (id) => id.toString() === user.id
            )
        );
    }, [user, tweet.likes]);

    const createdTimeAgo = formatDistanceToNow(
        new Date(tweet.createdAt),
        { addSuffix: true }
    );

    async function handleLikeAction(e) {
        e.preventDefault();
        e.stopPropagation();

        const res = await fetch(
            `/api/tweets/${tweet._id}/like`,
            {
                method: "POST",
            }
        );

        const data = await res.json();

        setIsLiked(data.liked);
        setLikesCount(data.likesCount)
    }

    return (
        <div className="relative p-4 border-b border-gray-800 flex space-x-4 hover:bg-gray-900">

            {/* Edit button top-right */}
            {user?._id === tweet.author?._id && (
                <div className="absolute top-4 right-4 flex items-center gap-2">

                    <button
                        className="p-2 rounded-full text-gray-500 hover:bg-gray-800 hover:text-sky-500 transition"
                    >
                        <Pencil size={16} />
                    </button>

                    <button
                        className="p-2 rounded-full text-gray-500 hover:bg-gray-800 hover:text-red-500 transition"
                    >
                        <Trash2 size={16} />
                    </button>

                </div>
            )}

            {/* Avatar */}
            <div className="w-12 h-12 bg-gray-700 rounded-full flex-shrink-0">
                <Link href={`/users/${tweet.author?._id}`}>
                    <img
                        className="w-12 h-12 rounded-full object-cover"
                        src={
                            tweet.author?.image ||
                            "https://media.idownloadblog.com/wp-content/uploads/2017/03/Twitter-new-2017-avatar-001.png"
                        }
                        alt={tweet.author?.username || tweet.author?.name}
                    />
                </Link>
            </div>

            {/* Content */}
            <div className="flex-1 pr-12">
                <Link href={`/tweets/${tweet._id}?liked=${isLiked}`}>
                    <div>
                        <div className="text-gray-400 text-sm">
                            @{tweet.author?.username || tweet.author?.name} · {createdTimeAgo}
                        </div>

                        <p className="mt-2 break-words">
                            {tweet.content}
                        </p>
                    </div>
                </Link>

                {/* Actions */}
                <div className="mt-4 flex justify-between max-w-md text-gray-500">

                    <button
                        className="flex items-center gap-2 hover:text-sky-500 transition"
                    >
                        <MessageCircle size={18} />
                        {tweet.replies.length}
                    </button>

                    <button
                        className="flex items-center gap-2 hover:text-pink-500 transition"
                        onClick={handleLikeAction}
                    >
                        {isLiked ? (
                            <Heart
                                size={22}
                                color="#F23299"
                                fill="#F23299"
                            />
                        ) : (
                            <Heart size={22} />
                        )}

                        <span>{likesCount}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}