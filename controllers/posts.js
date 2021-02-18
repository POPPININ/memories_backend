// Business logic for API calls in routes/posts.js
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';


/**
 * Get all posts made by users.
 * @param {string} request the API GET request.
 * @param {string} response the response returned to client.
 * @return {json} all posts stored in DB.
 */
export async function getPosts(request, response) {
  try {
    const postMessages = await PostMessage.find();
    console.log(postMessages);
    response.status(200).json(postMessages);
  } catch (error) {
    response.status(404).json({message: error.message});
  }
}


/**
 * Create a post.
 * @param {string} request the API GET request.
 * @param {string} response the response returned to client.
 * @return {json} the post created.
 */
export async function createPost(request, response) {
  const post = request.body;
  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    response.status(200).json(newPost);
  } catch (error) {
    response.status(409).json({message: error.message});
  }
}


/**
 * Update an existing post using its ID.
 * @param {string} request the API GET request.
 * @param {string} response the response returned to client.
 * @return {json} the updated post.
 */
export const updatePost = async (request, response) => {
  try {
    const id = request.params.id; // post ID
    const post = request.body; // updated post data

    // ascertain the validity of ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(404).send('No post with that ID!');
    }

    const newPost = {...post, id};

    const updatedPost = await PostMessage.findByIdAndUpdate(id,
        newPost, {new: true});

    response.status(200).json(updatedPost); // return updated post
  } catch (error) {
    response.status(409).json({message: error.message});
  }
};


/**
 * Delete an existing post using its ID.
 * @param {string} request the API GET request.
 * @param {string} response the response returned to client.
 * @return {json} the delete message.
 */
export const deletePost = async (request, response) => {
  try {
    const id = request.params.id;

    // ascertain the validity of ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(404).send('No post with that ID!');
    }

    await PostMessage.findByIdAndRemove(id);

    // return delete success message
    response.json({message: 'Post deleted successfully.'});
  } catch (error) {
    response.status(409).json({message: error.message});
  }
};


/**
 * Like a post.
 * @param {string} request the API GET request.
 * @param {string} response the response returned to client.
 * @return {json} the updated post, with incremented likes.
 */
export const likePost = async (request, response) => {
  try {
    const id = request.params.id;

    // ascertain the validity of ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(404).send('No post with that ID!');
    }

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id,
        {likeCount: post.likeCount + 1}, {new: true});

    response.json(updatedPost); // return the updated post
  } catch (error) {
    response.status(409).json({message: error.message});
  }
};
