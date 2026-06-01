import { useSession } from "next-auth/react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Trash2, Pencil } from 'lucide-react';
import ReplyDeleteModal from "./ReplyDeleteModal";
import { useRouter } from "next/navigation";

export default function ReplyCard({ reply }) {
    const { data: session, status } = useSession();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const router = useRouter();
    const isAuthor = session?.user?.id === reply.author._id
    


    async function handleDeleteReply() {
        try {
            const res = await fetch(`/api/replies/${reply._id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error( "Failed to delete reply");
            }

            setShowDeleteModal(false)
            router.refresh();

        } catch (error) {
            console.error(error);
        }
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
                                <button className="hover:text-red-400 transition align-end cursor-pointer" onClick={() => setShowDeleteModal(true)}>
                                    <Trash2 size={18} />
                                </button>

                            </div>
                        )
                    }

                    {showDeleteModal && (
                        <ReplyDeleteModal
                            isOpen={showDeleteModal}
                            onClose={() => setShowDeleteModal(false)}
                            onConfirm={handleDeleteReply}
                        />
                    )}

                </div>
                <p className="text-white mt-1 text-sm ml-3" > {reply.content} </p>
            </div>
        </div>)
};