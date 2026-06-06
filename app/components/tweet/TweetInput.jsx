"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";


export default function TweetInput({ onTweetPosted }) {
    const [content, setContent] = useState("");
    const { data: session, status } = useSession();

    if (!session) return null;

    async function saveTweet() {
        if (!content.trim()) return;

        const response = await fetch("/api/tweets", {
            method: "POST",
            body: JSON.stringify({
                content,
                author: session.user.id,
            }),
            headers: {
                "Content-Type": "application/json",
            },

        });

        if (response.ok) {
            setContent("");

            if (onTweetPosted) {
                onTweetPosted();
            }
        }

    }

    return (
        <div className="p-4 border-b border-gray-800 flex space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                <Link href={`/users/${session.user.id}`}>
                    <img
                        src={session.user.image || 'https://media.idownloadblog.com/wp-content/uploads/2017/03/Twitter-new-2017-avatar-001.png'}
                        alt="avatar"
                        className="w-full h-full object-cover"
                    />
                </Link>


            </div>

            <div className="flex-1">
                <input
                    className="w-full bg-transparent outline-none text-lg"
                    placeholder="What's happening?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <div className="flex justify-end mt-2">
                    <button
                        className="bg-blue-500 px-8 py-1 rounded-full hover:bg-blue-600"
                        onClick={saveTweet}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
}