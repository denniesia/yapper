import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema(
    {
        content: {
            type: String,
            require: true,
            maxlength: 280
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    {
        timestamp: true,
    }
)


const Reply = mongoose.models.Reply ?? mongoose.model("Reply", ReplySchema);

export default Reply;