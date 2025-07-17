import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/User.js';
import Session from '../models/session.js';
import TokenBlacklist from '../models/TokenBlacklist.js';

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (userId, sessionId) => {
  return jwt.sign({ userId, sessionId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

const registerUser = async ({ name, email, password,role}) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('Email already registered');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword,role });
  return { message: 'User registered successfully'};
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }

  const sessionId = uuidv4();

  await Session.create({ sessionId, userId: user._id });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id, sessionId);

  return { accessToken, refreshToken, user: { id: user._id, username: user.username } };
};

const refreshToken = async (token) => {
  if (!token) throw new Error('No token provided');

  let payload;
  try {
    payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw new Error('Invalid refresh token');
  }

  const isBlacklisted = await TokenBlacklist.findOne({ sessionId: payload.sessionId });
  if (isBlacklisted) throw new Error('Session invalidated');

  return generateAccessToken(payload.userId);
};

const logout = async (token) => {
  if (!token) throw new Error('No token found');

  let payload;
  try {
    payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw new Error('Invalid refresh token');
  }

  await TokenBlacklist.create({ sessionId: payload.sessionId });
  await Session.deleteOne({ sessionId: payload.sessionId });
};

const getProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};

export default {
  registerUser,
  loginUser,
  refreshToken,
  logout,
  getProfile
};
