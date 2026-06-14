"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import TweetDeleteModal from "./TweetDeleteModal";


export default function DeleteTweetButton({ tweet }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                className="p-2 rounded-full text-gray-500 hover:bg-gray-800 hover:text-red-500 transition"
            >
                <Trash2 size={16} onClick={() => setShowModal(true)} />
            </button>

            {showModal &&
                <TweetDeleteModal
                    tweet={tweet}
                    onClose={() => setShowModal(false)}
                />
            }
        </>
    )
}