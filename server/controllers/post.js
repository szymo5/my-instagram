import mongoose from 'mongoose';
import Post from '../models/post.js';

export const getPosts = async (req, res) => {
    const {page} = req.query;

    try{   
        const LIMIT = 8;
        const startIndex =  (Number(page) - 1) * LIMIT; 
        const total = await PostMessage.countDocuments({});

        const posts= await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
        
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getPost = async (req, res) => {
    const {id} = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new Post({...post, creator: req.userId, createdAt: new Date().toISOString()});

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({error: error.message});
    }
}