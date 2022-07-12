import express from 'express';

const router = express.Router();

import {signup, verify} from '../controllers/user.js';

router.post('/signup', signup);
// router.post('/signin', signin);
router.get('/:id/verify/:token', verify);

export default router;