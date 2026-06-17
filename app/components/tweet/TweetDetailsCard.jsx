"use client"

import { formatDistanceToNow, format } from "date-fns";
import {
    MessageCircle,
    Heart,
    Trash2,
    Pencil
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import RepliesSection from "../reply/RepliesSection";
import { formatDate } from "../../utils/formatDate"
import EditTweetButton from "./EditTweetButton"
import DeleteTweetButton from "./DeleteTweetButton"
import Link from "next/link";


export default function TweetDetailsCard({ tweet, liked }) {
    const [isLiked, setIsLiked] = useState(liked);
    const [countLikes, setCountLikes] = useState(
        tweet.likes.length
    );
    const [user, setUser] = useState(null)

    const { data: session, status } = useSession();

    const [reply, setReply] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (!session?.user?.id) return;

        setIsLiked(
            tweet.likes.some(
                (id) => id.toString() === session.user.id
            )
        );
    }, [session, tweet.likes]);

    

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
        setCountLikes(data.likesCount);
    }

    useEffect(() => {
        if (!session?.user?.id) return;

        async function fetchUser() {
            const res = await fetch(`/api/users/${session.user.id}`)
            const data = await res.json();
            setUser(data);
        }

        fetchUser();
    }, [session])


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
    const editedDate = formatDate(tweet.updatedAt);

    const fullDate = formatDate(tweet.createdAt)

    const isAuthor = user?._id === tweet.author._id;

    return (
        <>
            <div className="max-w-3xl mx-auto border-b border-gray-800 p-6">
                {/* Header */}
                <div className="flex items-start gap-3">
                    <Link href={`/users/${tweet.author?._id}`}>
                    <img
                        src={
                            tweet.author.image ||
                            "https://media.idownloadblog.com/wp-content/uploads/2017/03/Twitter-new-2017-avatar-001.png"
                        }
                        alt={tweet.author.username}
                        className="w-14 h-14 rounded-full object-cover"
                    />
                    </Link>

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
                    {isAuthor && (
                        <div className=" flex items-center gap-2">
                            <EditTweetButton tweet={tweet} />

                            <DeleteTweetButton tweet={tweet} />

                        </div>
                    )}

                </div>

                <div className="mt-4">
                    <p className="text-xl leading-relaxed text-white whitespace-pre-wrap">
                        {tweet.content}
                    </p>
                </div>

                {/* Timestamp */}
                <div className="mt-5 text-gray-500 text-sm -b border-gray-800 pb-1">
                    {fullDate}
                    <span className="ml-2">·</span>
                    <span className="ml-2">{createdTimeAgo}</span>


                </div>
                {editedDate !== fullDate && <span className="text-gray-500 text-sm -b border-gray-800 pb-4"> Edited {editedDate}</span>}

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
                            {countLikes}
                        </strong>{" "}
                        <span className="text-gray-500">Likes</span>
                    </span>
                </div>

                {/* Actions */}
                <div className="flex justify-around mt-4 text-gray-500">
                    <button className="hover:text-blue-400 transition cursor-pointer" >
                        <MessageCircle size={20} />
                    </button>
                    <button className="hover:text-pink-500 transition cursor-pointer" onClick={handleLikeAction}>
                        {isLiked ? (
                            <Heart size={20} color="#F23299" fill="#F23299" />
                        ) : (
                            <Heart size={20} />
                        )}
                    </button>
                </div>

            </div>
            {user && <div className="border-b border-gray-800 p-4">
                <div className="flex gap-3">
                    <img
                        src={user.image || 'https://media.idownloadblog.com/wp-content/uploads/2017/03/Twitter-new-2017-avatar-001.png'}
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