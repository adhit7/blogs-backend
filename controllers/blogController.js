import asyncHandler from '../middleware/asyncHandler.js';
import Blog from '../models/Blog.js';
import { blogValidationSchema } from '../validations/blogValidation.js'; // import validation schema

// @desc    Add blog
// @route   POST /add
// @access  Public
const addBlog = asyncHandler(async (req, res) => {
  // Validate incoming data using Joi
  const { error } = blogValidationSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message); // Send the error message if validation fails
  }

  const { title, category, author, content, userId, image } = req.body;

  // Create a new actor in the database
  const blog = await Blog.create({
    title,
    category,
    author,
    content,
    userId,
    image,
  });

  if (blog) {
    res.status(201).json({
      _id: blog._id,
      title: blog.title,
    });
  } else {
    res.status(400);
    throw new Error('Failed to create actor');
  }
});

// @desc    Add blog
// @route   PUT /update/:id
// @access  Public
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, category, author, content, userId, image } = req.body;

  let blog = await Blog.findById(id);
  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  // Update the blog using findByIdAndUpdate
  blog = await Blog.findByIdAndUpdate(
    id,
    { title, category, author, content, userId, image },
    { new: true, runValidators: true }
  );

  // Create a new actor in the database

  if (blog) {
    res.status(200).json(blog);
  } else {
    res.status(400);
    throw new Error('Failed to update blog');
  }
});

// @desc    Get blogs
// @route   /all
// @access  Private
const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find();

  if (blogs) {
    res.json(blogs);
  } else {
    res.status(404);
    throw new Error('No blogs found');
  }
});

// @desc    Get blogs
// @route   /delete/:id
// @access  Private
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  await blog.deleteOne();

  res.status(200).json({ message: 'Blog deleted successfully' });
});

export { addBlog, updateBlog, getAllBlogs, deleteBlog };
