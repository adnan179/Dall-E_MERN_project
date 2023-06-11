//routes for gettting and posting the posts

//requirements needed
import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

//getting the post model 
import Post from '../mongodb/models/post.js';

//to get env vars
dotenv.config();

//intializing the router for use
const router = express.Router();

//configuring the cloudinary to store our imgs to save space in the atlas server
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//get posts route
router.route('/').get(async (req, res) => {
  try {
    //finding all posts
    const posts = await Post.find({});
    //updating the received conetent to the website through the json
    res.status(200).json({ success: true, data: posts });
  } 
  catch (err) {
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
  }
});

//route for posting the post to the DALL-E 
router.route('/').post(async (req, res) => {
  try {
    //getting the props from the req body send by the website
    const { name, prompt, photo } = req.body;
    //uploading the photo to the cloudinary server and creating the url for it
    const photoUrl = await cloudinary.uploader.upload(photo);

    //updating the atlas with the new post with the photo url
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    //updating the res to the website
    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
  }
});

export default router;