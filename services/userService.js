
import User from '../models/User.js';

const getUserById = async (id) => {
  const user = await User.findById(id).select('-password'); 
  if (!user) {
    throw new Error('User not found');
    
  }
  return user;
};
const promoteUserToAdmin = async (id) => {
  const user = await User.findById(id);
  if (user.role === 'admin') {
    throw new Error('User is already an admin');
  }

  user.role = 'admin';
  await user.save();

  return user;
};

export default {
  getUserById,
  promoteUserToAdmin
};


