"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function TweetInput() {
    const [content, setContent] = useState("");
    const { data: session, status } = useSession();

    if (status === "loading") return null;
    if (!session) return null;

    async function saveTweet() {
        if (!content.trim()) return;

        const response = await fetch("/api/tweets", {
            method: "POST",
            body: JSON.stringify({ content }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        setContent("");
    }

    return (
        <div className="p-4 border-b border-gray-800 flex space-x-4">

            {/* AVATAR IMAGE */}
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                {session?.user?.image &&
                    <img
                        src={session.user.image}
                        alt="avatar"
                        className="w-full h-full object-cover"
                    />

                }
            </div>

            {/* INPUT */}
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