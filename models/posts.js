const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  imageUrl: { type: String },
  status: { type: String },
  sqft: { type: Number, required: true },
  description: { type: String, required: true, trim: true },
  postDate: { type: Date, default: Date.now },
  plantedDate: { type: String },
  harvestDate: { type: Date },
  user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;