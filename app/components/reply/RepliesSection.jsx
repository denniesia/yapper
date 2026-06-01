import { formatDistanceToNow } from "date-fns";

export default function RepliesSection({ tweet }) {
    return (
        <div>
            {tweet.replies.length > 0 ?

                tweet.replies.map((r) => (
                    <div key={r._id} className="flex gap-3 p-4 border-b border-gray-800">
                        <img src={r.author?.image} className="w-10 h-10 rounded-full object-cover" />
                        <div className="flex-1">
                            <div className="flex gap-2 items-center">
                                <span className="font-semibold text-white text-sm"> {r.author?.name} </span>
                                <span className="text-gray-500 text-sm"> @{r.author?.username} </span>
                                <span className="text-gray-600 text-xs"> · {formatDistanceToNow(new Date(r.createdAt), { addSuffix: true })} </span>
                            </div>
                            <p className="text-white mt-1 text-sm ml-3" > {r.content} </p>
                        </div>
                    </div>))

                : <p className="text-gray-500  text-center mt-4 italic">No replies yet</p>

            }
        </div>
    );
};