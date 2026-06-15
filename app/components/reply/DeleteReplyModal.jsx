export default function DeleteReplyDModal({
    isOpen,
    onClose,
    onConfirm
}) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-black border-gray-600 border-2 rounded-xl p-6 w-full max-w-sm shadow-lg">
                <h2 className="text-lg font-semibold mb-2 text-red-500">
                    Delete Reply
                </h2>

                <p className="text-gray-400 mb-6">
                    Are you sure you want to delete this reply?
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-400 cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                        
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>

    );
};