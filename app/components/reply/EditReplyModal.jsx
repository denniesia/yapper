import { X } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditReplyModal({
    reply,
    isOpen,
    onClose
}) {

 const [content, setContent] = useState(reply.content);

    const router = useRouter();
    const fullDate = formatDate(reply.createdAt)
      
        const editedFullDate = formatDate(reply.updatedAt)
     async function handleEditReply() {
            try {
                const res = await fetch(`/api/replies/${reply._id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        content,
                    }),
                });
    
                if (!res.ok) {
                    throw new Error("Failed to edit reply");
                }

                onClose();
                router.refresh();
    
            } catch (error) {
                console.error(error);
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
                        Edit Reply
                    </h2>
                </div>
                <div className="flex gap-3 px-4 pt-4">
                    <img
                        src={
                            reply.author?.image ||
                            "https://media.idownloadblog.com/wp-content/uploads/2017/03/Twitter-new-2017-avatar-001.png"
                        }
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />

                    <div className="flex-1">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="What's happening?"
                            className="w-full bg-transparent resize-none outline-none text-xl text-gray-400 min-h-[140px] "
                        />

                        {/* Tweet metadata */}
                        {
                            editedFullDate !== fullDate &&
                            (<div className="text-sm text-gray-500 text-end mb-1">Edited· {editedFullDate}</div>)
                        }

                        <div className="text-sm text-gray-500 text-end">
                            Originally posted · {fullDate}
                        </div>
                    </div>
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
                        onClick={handleEditReply}
                        disabled={!content.trim()}
                        className="px-6 py-2 rounded-full bg-blue-500 font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}