'use client'

import { useState } from "react";

export default function TweetInput() {
    let content = useState("");

    function writePost(e) {
        content = e.target.value;
    }

    async function saveTweet() {
        let response = await fetch(
            'api/tweets', {
                method: "POST",
                body: JSON.stringify({
                    content: content
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        const data = await response.json();
        console.log(data)
    }

    return (
        <div className="p-4 border-b border-gray-800 flex space-x-4">
            <div className="w-12 h-12 bg-gray-700 rounded-full" />
            <div className="flex-1">
                <input
                    className="w-full bg-transparent outline-none text-lg"
                    placeholder="What's happening?"
                    onInput={writePost}
                    type="text"
                    name="content"
                    id="content"
                />
                <div className="flex justify-end mt-2">
                    <button className="bg-blue-500 px-4 py-1 rounded-full hover:bg-blue-600" onClick={saveTweet}>
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
}