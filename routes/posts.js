// Contains all POST requests routes
// REST API requests to DB
import express from "express";
import { getPosts, createPost } from "../controllers/posts.js";

const router = express.Router()

router.get('/', getPosts);
router.post('/', createPost);
router.get('/', );
router.get('/', );

export default router;