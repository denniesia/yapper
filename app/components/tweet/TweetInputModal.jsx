"use client";

import { useState } from "react";
import { X } from "lucide-react";
import useCurrentUser from "../../hooks/useCurrentUser";
import { createTweet } from "../../lib/createTweet"
import { useRouter } from "next/navigation";


export default function TweetInputModal({
    onClose,
}) {
    const [content, setContent] = useState("");
    const { user, loading } = useCurrentUser();
    const router = useRouter();
  
    async function saveTweet() {
        if (!content.trim()) return;
    
        await createTweet(content);
    
        setContent("");
        onClose();     
        router.refresh();
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="w-full max-w-xl rounded-2xl bg-black border-2 border-gray-800 shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-900"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Content */}
                <div className="flex gap-4 p-4">
                    <img
                        src={
                            user?.image ||
                            "https://media.idownloadblog.com/wp-content/uploads/2017/03/Twitter-new-2017-avatar-001.png"
                        }
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover"
                    />

                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's happening?"
                        className="w-full bg-transparent resize-none outline-none text-xl min-h-[140px]"
                    />
                </div>

                {/* Footer */}
                <div className="flex justify-between p-4 border-t border-gray-800">
                     <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-full bg-gray-500 font-semibold hover:bg-gray-600"
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