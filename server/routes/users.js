import express from 'express';

const router = express.Router();

import {signup, signin, verify, requestResetPassword, checkPasswordReset, passwordReset} from '../controllers/user.js';

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/:id/verify/:token', verify);
router.post('/password/reset', requestResetPassword);
router.get('/:id/password/reset/:token', checkPasswordReset);
router.post('/:id/password/reset', passwordReset);

export default router;