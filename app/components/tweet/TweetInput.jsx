"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createTweet } from "../../lib/createTweet"

export default function TweetInput({ onTweetPosted }) {
    const [content, setContent] = useState("");
    const [ user, setUser ] = useState(null)
    const { data: session, status } = useSession();


    useEffect(() => {
        if (!session?.user?.id) return;

        async function fetchUser() {
            const res = await fetch(`/api/users/${session.user.id}`)
            const data = await res.json();
            setUser(data);
              console.log("USER", data)
        }

        fetchUser();
    }, [session])

  
    async function saveTweet() {
        if (!content.trim()) return;

        await createTweet(content, session.user.id);

        setContent("")

        if (onTweetPosted) {
            onTweetPosted();
        }
    }

    return (
        <div className="p-4 border-b border-gray-800 flex space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                <Link href={`/users/${session?.user.id}`}>
                    <img
                        src={user?.image || session?.user?.image  || 'https://media.idownloadblog.com/wp-content/uploads/2017/03/Twitter-new-2017-avatar-001.png'}
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
                        className="bg-blue-500 px-8 py-1 rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={saveTweet}
                       disabled={!content.trim()}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
}