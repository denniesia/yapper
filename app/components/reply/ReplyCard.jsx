import { useSession } from "next-auth/react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Trash2, Pencil, PencilIcon } from 'lucide-react';
import DeleteReplyModal from "./DeleteReplyModal";
import { useRouter } from "next/navigation";
import EditReplyModal from "./EditReplyModal";



export default function ReplyCard({ reply }) {
    const { data: session, status } = useSession();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const router = useRouter();
    const isAuthor = session?.user?.id === reply.author._id



    async function handleDeleteReply() {
        try {
            const res = await fetch(`/api/replies/${reply._id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Failed to delete reply");
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
                                {/* <EditButton tweet={reply} /> */}
                                <button className="hover:text-red-400 transition align-end cursor-pointer" onClick={() => setShowEditModal(true)}>
                                    <PencilIcon size={18} />
                                </button>
                                <button className="hover:text-red-400 transition align-end cursor-pointer" onClick={() => setShowDeleteModal(true)}>
                                    <Trash2 size={18} />
                                </button>

                            </div>
                        )
                    }

                    {showDeleteModal && (
                        <DeleteReplyModal
                            isOpen={showDeleteModal}
                            onClose={() => setShowDeleteModal(false)}
                            onConfirm={handleDeleteReply}
                        />
                    )}
                    {showEditModal && (
                        <EditReplyModal
                            isOpen={showEditModal}
                            onClose={() => setShowEditModal(false)}
                            reply={reply}
                        />
                    )}

                </div>
                <p className="text-white mt-1 text-sm ml-3" > {reply.content} </p>
            </div>
        </div>)
};