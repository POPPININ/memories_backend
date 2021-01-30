// Business logic for API calls in routes/posts.js
import PostMessage from "../models/postMessage.js";


// Get all posts made by users
export async function getPosts(request, response)
{
    try {
        const postMessages = await PostMessage.find();
        console.log(postMessages);
        response.status(200).json(postMessages);

    } catch (error) {
        response.status(404).json({ message : error.message });
    }
}


// Create a post
export async function createPost(request, response)
{
    const post = request.body;
    const newPost = new PostMessage(post);

    try {
        await newPost.save();
        response.status(200).json(newPost); 
        
    } catch (error) {
        response.status(409).json({ message : error.message });
    }
}