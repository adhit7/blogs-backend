import Joi from 'joi';

const blogValidationSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.base': 'Title must be a string',
    'any.required': 'Title is required',
  }),

  category: Joi.string().required().messages({
    'string.base': 'Category must be a string',
    'any.required': 'Category is required',
  }),

  author: Joi.string().required().messages({
    'string.base': 'Author must be a string',
    'any.required': 'Author is required',
  }),

  content: Joi.string().required().messages({
    'string.base': 'Content must be a string',
    'any.required': 'Content is required',
  }),

  image: Joi.string().optional().messages({
    'string.base': 'Image must be a string',
  }),

  userId: Joi.string()
    .optional()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      'string.base': 'User ID must be a string',
      'string.pattern.base': 'User ID must be a valid MongoDB ObjectId',
    }),
});

export { blogValidationSchema };
