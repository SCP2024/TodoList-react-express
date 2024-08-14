import mongoose from "mongoose";

const todolistSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
    },
    deadline: {
        type: String,
    },
    user: {
        type: String,
    }
});

export default todolistSchema;

