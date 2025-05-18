import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { userValidationSchema } from '../validations/userValidation.js';

// @desc    Login
// @route   POST /user/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate incoming data
  const loginSchema = userValidationSchema.fork(['name'], (schema) =>
    schema.optional()
  );

  const { error } = loginSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const formattedErrors = error.details.reduce((acc, curr) => {
      acc[curr.path[0]] = curr.message;
      return acc;
    }, {});

    res.status(400).json({ errors: formattedErrors });
    return;
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register
// @route   POST /user/signup
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate incoming data
  const { error } = userValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const formattedErrors = error.details.reduce((acc, curr) => {
      acc[curr.path[0]] = curr.message;
      return acc;
    }, {});

    res.status(400).json({ errors: formattedErrors });
    return;
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error('Invalid user data');
  }
});

export { loginUser, registerUser };
