import mongoose from "mongoose";

//creating a new schema for the input
const Post = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});

//creating a model for the schema
const postSchema = mongoose.model('Post', Post);

export default postSchema;