"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import TweetEditModal from "./TweetEditModal";

export default function EditTweetButton({ tweet }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                className="p-2 rounded-full text-gray-500 hover:bg-gray-800 hover:text-sky-500 transition"
                onClick={() => setShowModal(true)}
            >
                <Pencil size={16} />
            </button>

            {showModal && (
                <TweetEditModal
                    tweet={tweet}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
}