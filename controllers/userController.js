import userService from '../services/userService.js';

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await userService.getUserById(userId);
    res.json(user); 
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};


export const makeAdmin = async (req, res) => {
  const id = req.params.id;

  try {
    if (req.user._id.toString() === id) {
      return res.status(403).json({ error: "You can't promote yourself to admin" });
    }

    const updatedUser = await userService.promoteUserToAdmin(id);
    res.json({ message: 'User promoted to admin successfully', user: updatedUser });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

