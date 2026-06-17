"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDate } from "../../utils/formatDate"
import { toast } from "sonner";


export default function TweetDeleteModal({
    tweet,
    onClose,
}) {
    const router = useRouter();

    const fullDate = formatDate(tweet.createdAt)
    const editedFullDate = formatDate(tweet.updatedAt)

    async function deleteTweet() {
        try {
            const res = await fetch(`${process.env.BASE_URL}/api/tweets/${tweet._id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message);
            }

            toast.success("Tweet deleted successfully");
            router.refresh();
        } catch (error) {
            toast.error(error.message);
        }
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" >
            <div className="w-full max-w-xl rounded-2xl bg-black border-2 border-gray-800 shadow-xl" >

                {/* Header */}
                <div className="flex items-center gap-4 px-4 py-3 border-b border-gray-800">
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full transition-colors hover:bg-gray-800"
                    >
                        <X size={20} className="text-gray-300" />
                    </button>

                    <h2 className="text-lg font-semibold text-white">
                        Delete Tweet
                    </h2>
                </div>
                <div className="flex gap-3 px-4 pt-4">
                   <p className="text-xl m-3">Are you sure you want to <span className="text-red-500">delete</span> this tweet?</p>
                
                </div>

                <div className="border-t border-gray-800 mt-4" />
                {/* Footer */}
                <div className="flex justify-between p-4 border-t border-gray-800">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-full bg-gray-500 font-semibold hover:bg-gray-600 "
                    >
                        Cancel
                    </button>
                    <button
                        onClick={deleteTweet}
                        className="px-6 py-2 rounded-full bg-red-500 font-semibold hover:bg-red-600 "
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}