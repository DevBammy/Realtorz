import express from 'express';
import {
  updateUser,
  deleteUser,
  getUserListings,
} from '../controllers/userController.js';
import { verifyToken } from '../utils/verify.js';

const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);

router.delete('/delete/:id', verifyToken, deleteUser);

router.get('/listings/:id', verifyToken, getUserListings);

export default router;
