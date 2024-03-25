import express from 'express';
import { updateUser } from '../controllers/updateController.js';
import { verifyToken } from '../utils/verify.js';

const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);

export default router;
