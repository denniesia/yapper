import ReplyCard from "./ReplyCard";

export default function RepliesSection({ tweet }) {

    return (
        <div>
            {tweet.replies.length > 0 ?

                tweet.replies.map((r) => (
                    <ReplyCard key={r._id} reply={r} />
                ))


                : <p className="text-gray-500  text-center mt-4 italic">No replies yet</p>

            }
        </div>
    );
};