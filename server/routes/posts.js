import express from 'express';

import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', getPosts);

router.post('/create', auth, createPost);

export default router;