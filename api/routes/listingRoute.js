import express from 'express';
import {
  createListing,
  deleteListing,
  getListing,
  updateListing,
} from '../controllers/listingController.js';
import { verifyToken } from '../utils/verify.js';
import { getUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);
router.get('/:id', verifyToken, getUser);

export default router;
