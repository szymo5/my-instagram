import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    describe: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    comments: {
        type: Object,
        default: []
    },
    likes: {
        type: [String],
        default: []
    }
})

export default mongoose.model('posts', postSchema);