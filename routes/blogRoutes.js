import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  addBlog,
  updateBlog,
  getAllBlogs,
  deleteBlog,
} from '../controllers/blogController.js';
const router = express.Router();

// @desc  Add Blog
router.route('/add').post(protect, addBlog);

// @desc  Update Blog
router.route('/edit/:id').put(protect, updateBlog);

// @desc  Add Blog
router.route('/all').get(protect, getAllBlogs);

// @desc  Add Blog
router.route('/delete/:id').delete(protect, deleteBlog);

export default router;
