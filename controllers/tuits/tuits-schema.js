import mongoose from 'mongoose';
const schema = mongoose.Schema({
    topic: String,
    time: String,
    title: String,
    image: String,
    replies: Number,
    retuits: Number,
    handle: String,
    username: String,
    tuit: String,
    likes: Number,
    liked: Boolean,
}, {collection: 'tuits'});
export default schema;