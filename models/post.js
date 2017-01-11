const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  published: { type: Boolean, default: false }
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
