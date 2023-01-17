import express from 'express';

const router = express.Router();

import {signup, signin, verify, requestResetPassword} from '../controllers/user.js';

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/:id/verify/:token', verify);
router.post('/password/reset', requestResetPassword);

export default router;