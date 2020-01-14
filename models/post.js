const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    url: String,
    userID: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    likes: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    comments: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;