/* eslint-disable new-cap */
// Contains all POST requests routes
// REST API requests to DB
import express from 'express';
import {getPosts, createPost, updatePost,
  deletePost,
  likePost} from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts); // retrieve all posts
router.post('/', createPost); // create a post
router.patch('/:id', updatePost); // update an existing post
router.delete('/:id', deletePost); // delete an existing post
router.patch('/:id/likePost', likePost); // like an existing post


export default router;
