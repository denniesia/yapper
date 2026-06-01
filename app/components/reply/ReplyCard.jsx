import { useSession } from "next-auth/react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Trash2, Pencil } from 'lucide-react';

export default function ReplyCard({ reply }) {
    const { data: session, status } = useSession();
    const isAuthor = session?.user?.id === reply.author._id
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    function handleDeleteReply() {
        setShowDeleteModal(true)
    }
    return (
        <div key={reply._id} className="flex gap-3 p-4 border-b border-gray-800">
            <img src={reply.author?.image} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <span className="font-semibold text-white text-sm"> {reply.author?.name} </span>
                        <span className="text-gray-500 text-sm"> @{reply.author?.username} </span>
                        <span className="text-gray-600 text-xs"> · {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })} </span>



                    </div>
                    {
                        isAuthor &&
                        (
                            <div className="flex text-gray-500 mr-4 gap-4">
                                <button className="hover:text-yellow-400 cursor-pointer transition align-end">
                                    <Pencil size={18} />
                                </button>
                                <button className="hover:text-red-400 transition align-end cursor-pointer" onClick={handleDeleteReply}>
                                    <Trash2 size={18} />
                                </button>

                            </div>
                        )
                    }

                    {showDeleteModal && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
                                <h2 className="text-lg font-semibold mb-2">
                                    Delete Reply
                                </h2>

                                <p className="text-gray-600 mb-6">
                                    Are you sure you want to delete this reply?
                                </p>

                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setShowDeleteModal(false)}
                                        className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>

                                    <button

                                        className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
                <p className="text-white mt-1 text-sm ml-3" > {reply.content} </p>
            </div>
        </div>)
};