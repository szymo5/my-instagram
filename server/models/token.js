import mongoose from 'mongoose';

const tokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
    token: {
        type: String,
        required: true,
      },
    createdAt: {
        type: Date,
        default: new Date(),
        expires: 900
    }
})

export default mongoose.model('tokens', tokenSchema)