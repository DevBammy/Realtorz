import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

// Create a user account
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    next(errorHandler(501, 'Fields cannot be empty'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json('user created successfully');
  } catch (error) {
    next(errorHandler(550, 'Wrong credentials'));
  }
};

// Sign user in
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(401, 'Wrong credential'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return errorHandler(401, 'Wrong credential');
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: _, ...userWithoutPassword } = validUser._doc;
    res
      .cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};
