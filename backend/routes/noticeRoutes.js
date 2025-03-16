import express from 'express';
import { createNotice, getNotices, deleteNotice } from '../controllers/noticeController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, createNotice)
    .get(protect, getNotices);

router.route('/:id')
    .delete(protect, deleteNotice);

export default router;
